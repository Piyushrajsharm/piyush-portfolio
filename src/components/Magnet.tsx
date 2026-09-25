import React, { useRef, useState, useEffect, ReactNode } from 'react'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const minX = rect.left - padding
      const maxX = rect.right + padding
      const minY = rect.top - padding
      const maxY = rect.bottom + padding

      const mouseX = e.clientX
      const mouseY = e.clientY

      if (mouseX >= minX && mouseX <= maxX && mouseY >= minY && mouseY <= maxY) {
        const dx = (mouseX - centerX) / strength
        const dy = (mouseY - centerY) / strength
        setPosition({ x: dx, y: dy })
        setIsActive(true)
      } else if (isActive) {
        setPosition({ x: 0, y: 0 })
        setIsActive(false)
      }
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
      setIsActive(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [padding, strength, isActive])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
