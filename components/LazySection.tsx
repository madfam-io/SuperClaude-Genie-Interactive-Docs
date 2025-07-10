'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { LoadingSpinner } from './LoadingSpinner'

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  threshold?: number
  className?: string
}

export function LazySection({ 
  children, 
  fallback,
  threshold = 0.1,
  className = '' 
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setIsLoaded(true), 100)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref} className={className}>
      {!isVisible ? (
        <div className="h-64 flex items-center justify-center">
          {fallback || <LoadingSpinner variant="magic" size="lg" />}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}