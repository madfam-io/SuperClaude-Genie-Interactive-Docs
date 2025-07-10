'use client'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-center p-6 bg-gradient-to-br from-bg-light to-bg-card rounded-xl border border-white/10 hover:border-primary/30 hover:scale-105 transition-all duration-300">
      <div className="text-4xl mb-4 animate-float">{icon}</div>
      <h3 className="text-xl font-semibold text-primary mb-3">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
  )
}