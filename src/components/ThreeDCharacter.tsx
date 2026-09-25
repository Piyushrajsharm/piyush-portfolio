import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

interface ThreeDCharacterProps {
  imageSrc?: string
  className?: string
}

export function ThreeDCharacter({
  imageSrc = '/images/piyush_hero.jpg',
  className = '',
}: ThreeDCharacterProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [particleCount, setParticleCount] = useState(0)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth || 400
    const height = container.clientHeight || 550

    // 1. Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0c0c0c, 0.002)

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 320)

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x051525, 1.5)
    scene.add(ambientLight)

    const mouseLight = new THREE.PointLight(0x00f0ff, 4, 350)
    mouseLight.position.set(0, 0, 100)
    scene.add(mouseLight)

    const rimLight = new THREE.PointLight(0x3b82f6, 3, 400)
    rimLight.position.set(-150, 100, -50)
    scene.add(rimLight)

    const purpleBackLight = new THREE.PointLight(0x7c3aed, 3, 400)
    purpleBackLight.position.set(150, -50, -50)
    scene.add(purpleBackLight)

    // Group for character and its attachments
    const characterGroup = new THREE.Group()
    scene.add(characterGroup)

    // 5. 3D Orbital Cyber Rings
    const ringGeo = new THREE.TorusGeometry(85, 1.2, 16, 100)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6,
      wireframe: true,
    })
    const cyberRing1 = new THREE.Mesh(ringGeo, ringMat)
    cyberRing1.rotation.x = Math.PI / 2.3
    cyberRing1.position.y = -60
    characterGroup.add(cyberRing1)

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.5,
      wireframe: true,
    })
    const cyberRing2 = new THREE.Mesh(new THREE.TorusGeometry(105, 1.0, 16, 100), ringMat2)
    cyberRing2.rotation.x = Math.PI / 2.1
    cyberRing2.rotation.y = Math.PI / 6
    cyberRing2.position.y = -70
    characterGroup.add(cyberRing2)

    // 6. 3D Lightning System
    const lightningGroup = new THREE.Group()
    characterGroup.add(lightningGroup)
    let lightningTimer = 0

    const createLightningBolt = (start: THREE.Vector3, end: THREE.Vector3, color = 0x00f0ff) => {
      const points: THREE.Vector3[] = []
      const segments = 8
      for (let i = 0; i <= segments; i++) {
        const t = i / segments
        const p = new THREE.Vector3().lerpVectors(start, end, t)
        if (i > 0 && i < segments) {
          p.x += (Math.random() - 0.5) * 16
          p.y += (Math.random() - 0.5) * 16
          p.z += (Math.random() - 0.5) * 16
        }
        points.push(p)
      }
      const curve = new THREE.CatmullRomCurve3(points)
      const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.7, 4, false)
      const tubeMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.9,
      })
      const mesh = new THREE.Mesh(tubeGeo, tubeMat)
      mesh.userData = { life: 10 + Math.random() * 8 }
      return mesh
    }

    // 7. Load Image and generate 3D Volumetric Pixel Character
    let pointCloud: THREE.Points | null = null
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imageSrc

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Sample resolution for performance and high density
      const sampleW = 160
      const sampleH = Math.round((img.height / img.width) * sampleW)
      canvas.width = sampleW
      canvas.height = sampleH

      ctx.drawImage(img, 0, 0, sampleW, sampleH)
      const imgData = ctx.getImageData(0, 0, sampleW, sampleH)
      const pixels = imgData.data

      const positions: number[] = []
      const colors: number[] = []
      const originalPositions: number[] = []
      const phases: number[] = []

      const scale = 1.3
      const offsetX = -(sampleW * scale) / 2
      const offsetY = (sampleH * scale) / 2

      for (let y = 0; y < sampleH; y++) {
        for (let x = 0; x < sampleW; x++) {
          const idx = (y * sampleW + x) * 4
          const r = pixels[idx] / 255
          const g = pixels[idx + 1] / 255
          const b = pixels[idx + 2] / 255
          const brightness = (r + g + b) / 3

          // Filter out dark background
          if (brightness > 0.08) {
            const posX = x * scale + offsetX
            const posY = -y * scale + offsetY

            // Calculate depth (z):
            // Center (face/torso) projects forward; laptop held in hands projects furthest forward
            const normX = (x / sampleW - 0.5) * 2
            const normY = (y / sampleH - 0.5) * 2
            
            // Laptop region (lower center-right): projects out in 3D
            const isLaptop = normX > -0.3 && normX < 0.3 && normY > -0.2 && normY < 0.4
            const laptopBonus = isLaptop ? 22 : 0

            // Facial region: projects forward
            const isFace = Math.abs(normX) < 0.25 && normY < -0.4
            const faceBonus = isFace ? 18 : 0

            const curveDepth = (1.0 - (normX * normX)) * 25
            const posZ = curveDepth + laptopBonus + faceBonus + (brightness * 12) + (Math.random() - 0.5) * 3

            positions.push(posX, posY, posZ)
            originalPositions.push(posX, posY, posZ)

            // Neon dark blue & cyan color boost for lightning aesthetic
            const cyanBoost = Math.max(r, g, b) > 0.6 ? 0.3 : 0
            colors.push(
              Math.min(1.0, r * 0.9 + cyanBoost * 0.2),
              Math.min(1.0, g * 1.1 + cyanBoost * 0.8),
              Math.min(1.0, b * 1.4 + cyanBoost * 1.0)
            )

            phases.push(Math.random() * Math.PI * 2)
          }
        }
      }

      setParticleCount(positions.length / 3)

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
      geometry.setAttribute('originalPosition', new THREE.Float32BufferAttribute(originalPositions, 3))
      geometry.setAttribute('phase', new THREE.Float32BufferAttribute(phases, 1))

      // Glowing circular point shader
      const pointShaderMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPointSize: { value: 3.2 * (window.devicePixelRatio || 1) },
          uMouse: { value: new THREE.Vector3(0, 0, 0) },
        },
        vertexShader: `
          uniform float uTime;
          uniform float uPointSize;
          uniform vec3 uMouse;
          attribute vec3 originalPosition;
          attribute float phase;
          varying vec3 vColor;
          varying float vDist;

          void main() {
            vColor = color;
            vec3 pos = originalPosition;

            // 1. Organic Breathing in 3D
            float breath = sin(uTime * 2.0 + pos.y * 0.02) * 2.0;
            pos.z += breath;
            pos.y += sin(uTime * 1.5) * 1.2;

            // 2. Subtle electric ripple through pixels
            float electricWave = sin(uTime * 8.0 + pos.y * 0.1 + pos.x * 0.1);
            if (electricWave > 0.85) {
              pos += normal * 1.5;
            }

            // 3. Mouse electromagnetic repulsion/pull
            float dist = distance(pos.xy, uMouse.xy);
            if (dist < 60.0 && uMouse.z > 0.5) {
              vec2 dir = normalize(pos.xy - uMouse.xy);
              float force = (1.0 - dist / 60.0) * 15.0;
              pos.xy += dir * force;
              pos.z += force * 1.5;
            }

            vDist = dist;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = uPointSize * (280.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vDist;

          void main() {
            // Circular point with soft glowing edge
            vec2 coord = gl_PointCoord - vec2(0.5);
            float r = length(coord);
            if (r > 0.5) discard;

            float alpha = smoothstep(0.5, 0.1, r);
            vec3 glowColor = vColor + vec3(0.0, 0.2, 0.4);

            gl_FragColor = vec4(glowColor, alpha * 0.95);
          }
        `,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      pointCloud = new THREE.Points(geometry, pointShaderMat)
      characterGroup.add(pointCloud)
      setIsLoaded(true)
    }

    // 8. Mouse interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false }

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouse.targetX = x
      mouse.targetY = y
      mouse.active = true

      // Map to 3D coords for mouse light
      mouseLight.position.x = x * 140
      mouseLight.position.y = y * 180
    }

    const onMouseLeave = () => {
      mouse.targetX = 0
      mouse.targetY = 0
      mouse.active = false
    }

    const onResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', onResize)
    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mouseleave', onMouseLeave)

    // 9. Animation Loop
    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse damping (Lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.06
      mouse.y += (mouse.targetY - mouse.y) * 0.06

      // Rotate entire 3D character in space toward cursor
      characterGroup.rotation.y = mouse.x * 0.35 + Math.sin(elapsedTime * 0.5) * 0.05
      characterGroup.rotation.x = -mouse.y * 0.2
      characterGroup.position.x = mouse.x * 12
      characterGroup.position.y = mouse.y * 8 + Math.sin(elapsedTime * 1.5) * 4

      // Rotate cyber rings
      cyberRing1.rotation.z = elapsedTime * 0.8
      cyberRing2.rotation.z = -elapsedTime * 0.5

      // Update shader uniform time
      if (pointCloud && pointCloud.material instanceof THREE.ShaderMaterial) {
        pointCloud.material.uniforms.uTime.value = elapsedTime
        pointCloud.material.uniforms.uMouse.value.set(
          mouse.targetX * 100,
          mouse.targetY * 140,
          mouse.active ? 1.0 : 0.0
        )
      }

      // Procedural 3D Lightning Bolts spawning
      if (elapsedTime - lightningTimer > 0.4 && Math.random() > 0.3) {
        lightningTimer = elapsedTime
        // Arc between shoulder and laptop in 3D
        const start = new THREE.Vector3(-40 + Math.random() * 80, 50 + Math.random() * 40, 20)
        const end = new THREE.Vector3(start.x + (Math.random() - 0.5) * 70, start.y - 60 - Math.random() * 40, start.z + 15)
        const bolt = createLightningBolt(start, end, Math.random() > 0.5 ? 0x00f0ff : 0x0077ff)
        lightningGroup.add(bolt)
      }

      // Update and prune lightning bolts
      for (let i = lightningGroup.children.length - 1; i >= 0; i--) {
        const bolt = lightningGroup.children[i] as THREE.Mesh
        bolt.userData.life--
        if (bolt.material instanceof THREE.MeshBasicMaterial) {
          bolt.material.opacity = bolt.userData.life / 18
        }
        if (bolt.userData.life <= 0) {
          lightningGroup.remove(bolt)
          bolt.geometry.dispose()
          if (Array.isArray(bolt.material)) {
            bolt.material.forEach((m) => m.dispose())
          } else {
            bolt.material.dispose()
          }
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseleave', onMouseLeave)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [imageSrc])

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-[450px] sm:h-[550px] md:h-[620px] lg:h-[680px] cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      {/* 3D Character Status Indicator */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-black/70 backdrop-blur-md text-[10px] sm:text-xs font-mono tracking-wider text-cyan-300">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>3D LIVE CHARACTER • {isLoaded ? `${particleCount.toLocaleString()} VOXELS` : 'COMPUTING...'}</span>
      </div>

      {/* Subtle Glow Backdrop */}
      <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent pointer-events-none blur-3xl -z-10" />
    </div>
  )
}
