'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ResponsiveGridProps {
  children: ReactNode
  className?: string
  cols?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export function ResponsiveGrid({ 
  children, 
  className = '', 
  cols = { sm: 1, md: 2, lg: 3, xl: 4 } 
}: ResponsiveGridProps) {
  const gridClasses = [
    cols.sm && `grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
  ].filter(Boolean).join(' ')

  return (
    <motion.div
      className={`grid gap-4 sm:gap-6 lg:gap-8 ${gridClasses} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {children}
    </motion.div>
  )
}