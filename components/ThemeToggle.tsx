'use client'

import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: resolvedTheme === 'dark' ? 0 : 180,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative w-6 h-6"
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: resolvedTheme === 'dark' ? 1 : 0,
            scale: resolvedTheme === 'dark' ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        >
          🌙
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: resolvedTheme === 'light' ? 1 : 0,
            scale: resolvedTheme === 'light' ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        >
          ☀️
        </motion.div>
      </motion.div>
    </motion.button>
  )
}