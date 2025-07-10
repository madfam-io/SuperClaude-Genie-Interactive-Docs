'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  id?: string
  hover?: boolean
}

export function Card({ children, className = '', id, hover = true }: CardProps) {
  return (
    <div
      id={id}
      className={`
        bg-bg-light border border-white/10 rounded-2xl backdrop-blur-sm
        ${hover ? 'hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1' : ''}
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  )
}