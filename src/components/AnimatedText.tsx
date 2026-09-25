import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
}

interface CharProps {
  char: string
  progress: MotionValue<number>
  range: [number, number]
}

function AnimatedChar({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1])

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {char}
      </motion.span>
    </span>
  )
}

export function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const words = text.split(' ')
  let charCounter = 0
  const totalChars = text.length

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split('')
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {wordChars.map((char, charIndex) => {
              const start = charCounter / totalChars
              const end = (charCounter + 1) / totalChars
              charCounter++
              return (
                <AnimatedChar
                  key={charIndex}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              )
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        )
      })}
    </p>
  )
}
