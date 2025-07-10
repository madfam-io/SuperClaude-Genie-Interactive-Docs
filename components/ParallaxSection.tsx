'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  offset?: number
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  scale?: boolean
  rotate?: boolean
}

export function ParallaxSection({ 
  children, 
  className = '', 
  id, 
  offset = 100,
  speed = 0.5,
  direction = 'up',
  scale = false,
  rotate = false
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start end`, `end start`]
  })

  // Transform values based on direction
  const distance = offset * speed
  
  // Always call hooks in the same order
  const upTransform = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const downTransform = useTransform(scrollYProgress, [0, 1], [-distance, distance])
  const leftTransform = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const rightTransform = useTransform(scrollYProgress, [0, 1], [-distance, distance])
  const noTransform = useTransform(scrollYProgress, [0, 1], [0, 0])
  
  const transform = direction === 'up' ? upTransform
    : direction === 'down' ? downTransform
    : direction === 'left' ? leftTransform
    : direction === 'right' ? rightTransform
    : noTransform

  const scaleTransform = useTransform(scrollYProgress, [0, 0.5, 1], scale ? [0.8, 1, 0.8] : [1, 1, 1])
  const rotateTransform = useTransform(scrollYProgress, [0, 1], rotate ? [0, 360] : [0, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const motionStyle = direction === 'left' || direction === 'right' 
    ? { x: transform, scale: scaleTransform, rotate: rotateTransform, opacity }
    : { y: transform, scale: scaleTransform, rotate: rotateTransform, opacity }

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      style={motionStyle}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  )
}