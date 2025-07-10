'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { TabSection } from '@/components/TabSection'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { GenieInterface } from '@/components/GenieInterface'
import { PersonaDashboard } from '@/components/PersonaDashboard'
import { MagicUIStudio } from '@/components/MagicUIStudio'
import { AttachmentIntegration } from '@/components/AttachmentIntegration'
import { Footer } from '@/components/Footer'
import { NotificationProvider } from '@/components/NotificationProvider'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <NotificationProvider>
      <main className="min-h-screen bg-bg-dark text-text-primary overflow-x-hidden">
        <AnimatedBackground />
        <Navigation />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
          <Hero />
          <TabSection />
          <GenieInterface />
          <PersonaDashboard />
          <MagicUIStudio />
          <AttachmentIntegration />
        </div>
        
        <Footer />
      </main>
    </NotificationProvider>
  )
}