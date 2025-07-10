'use client'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer className="bg-bg-light border-t border-white/10 py-12 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-3xl">🧞</span>
            <span className="text-2xl font-bold text-gradient">SuperClaude Genie</span>
          </div>
          <p className="text-text-secondary mb-4">
            Transform your AI into a SuperClaude wizard
          </p>
          <p className="text-text-muted text-sm">
            Made with ✨ for developers who build amazing things
          </p>
        </div>
      </footer>

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          title="Back to Top"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
        
        <button
          onClick={() => {
            const geniePrompt = "You are SuperClaude Genie 🧞, an expert assistant specialized in generating precise SuperClaude commands..."
            navigator.clipboard.writeText(geniePrompt)
            // Could use notification here if needed
          }}
          className="w-12 h-12 bg-secondary hover:bg-secondary/80 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          title="Copy Genie Prompt"
        >
          <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </>
  )
}