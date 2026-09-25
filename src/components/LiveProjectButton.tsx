import React from 'react'

interface LiveProjectButtonProps {
  className?: string
  href?: string
  onClick?: () => void
}

export function LiveProjectButton({ className = '', href = '#', onClick }: LiveProjectButtonProps) {
  const content = (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-all duration-200 hover:bg-[#D7E2EA]/10 cursor-pointer px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base ${className}`}
    >
      Live Project
    </button>
  )

  if (href && !onClick) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {content}
      </a>
    )
  }

  return content
}
