import { useRef, useEffect } from 'react'

interface ElectricPortraitProps {
  imageSrc: string
  className?: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
}

interface LightningBolt {
  points: { x: number; y: number }[]
  alpha: number
  life: number
  color: string
}

export function ElectricPortrait({ imageSrc, className = '' }: ElectricPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const particles: Particle[] = []
    let bolts: LightningBolt[] = []
    let lastBoltTime = 0

    const resize = () => {
      if (!canvas || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    resize()
    window.addEventListener('resize', resize)

    // Colors: Premium neon dark blues and electric cyans
    const neonColors = [
      '#00f0ff', // electric cyan
      '#0099ff', // vibrant electric blue
      '#3b82f6', // bright blue
      '#00e5ff', // cyan glow
      '#7c3aed', // neon violet-blue
    ]

    // Initialize ambient electric particles
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 400),
        y: Math.random() * (canvas.height || 600),
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 1.2 - 0.3,
        size: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.7 + 0.3,
        color: neonColors[Math.floor(Math.random() * neonColors.length)],
      })
    }

    // Helper to generate fractal lightning path
    const createLightningPath = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      displace: number
    ): { x: number; y: number }[] => {
      const points = [{ x: x1, y: y1 }]
      const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * displace
      const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * displace
      
      points.push({ x: midX, y: midY })
      points.push({ x: x2, y: y2 })
      return points
    }

    // Spawn spontaneous electrical arc around the silhouette
    const spawnBolt = () => {
      const w = canvas.width
      const h = canvas.height
      if (!w || !h) return

      // Targets: shoulders, laptop, arms
      const startX = w * (0.2 + Math.random() * 0.6)
      const startY = h * (0.3 + Math.random() * 0.4)
      const endX = startX + (Math.random() - 0.5) * 120
      const endY = startY + (Math.random() - 0.5) * 100

      bolts.push({
        points: createLightningPath(startX, startY, endX, endY, 40),
        alpha: 0.9,
        life: 12,
        color: neonColors[Math.floor(Math.random() * neonColors.length)],
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }

      // Spawn lightning bolt striking near cursor
      if (Math.random() > 0.4) {
        const startX = rect.width / 2 + (Math.random() - 0.5) * 80
        const startY = rect.height * 0.45
        bolts.push({
          points: createLightningPath(startX, startY, mouseRef.current.x, mouseRef.current.y, 60),
          alpha: 1,
          life: 15,
          color: '#00f0ff',
        })
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Randomly trigger spontaneous silhouette lightning
      if (time - lastBoltTime > 350 && Math.random() > 0.3) {
        spawnBolt()
        lastBoltTime = time
      }

      // Draw lightning bolts
      ctx.save()
      ctx.shadowBlur = 12
      bolts = bolts.filter((bolt) => {
        bolt.life--
        if (bolt.life <= 0) return false

        ctx.strokeStyle = bolt.color
        ctx.shadowColor = bolt.color
        ctx.lineWidth = Math.random() * 2 + 1
        ctx.globalAlpha = (bolt.life / 15) * bolt.alpha

        ctx.beginPath()
        bolt.points.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y)
          else ctx.lineTo(pt.x + (Math.random() - 0.5) * 4, pt.y + (Math.random() - 0.5) * 4)
        })
        ctx.stroke()
        return true
      })
      ctx.restore()

      // Draw and update neon floating particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.y < 0) {
          p.y = canvas.height
          p.x = Math.random() * canvas.width
        }
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0

        // Repel from mouse slightly
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x
          const dy = p.y - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            p.x += (dx / dist) * 2
            p.y += (dy / dist) * 2
          }
        }

        ctx.save()
        ctx.shadowBlur = 8
        ctx.shadowColor = p.color
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-visible group ${className}`}
    >
      {/* Background Neon Pulse Aura */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-t from-cyan-500/20 via-blue-600/25 to-purple-600/10 blur-2xl opacity-60 group-hover:opacity-90 transition duration-700 pointer-events-none" />

      {/* Portrait Image */}
      <img
        src={imageSrc}
        alt="Piyush Raj Sharma"
        className="relative z-10 w-full h-auto object-contain max-h-[75vh] drop-shadow-[0_15px_35px_rgba(0,240,255,0.25)] rounded-2xl pointer-events-none"
        draggable={false}
      />

      {/* Interactive Electric Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 pointer-events-none w-full h-full"
      />
    </div>
  )
}
