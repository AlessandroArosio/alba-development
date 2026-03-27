import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <header className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative overflow-hidden">
      {/* Dawn Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/20 via-rose-500/10 to-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        className="max-w-3xl relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-800/50 border border-gray-700 text-sm font-medium text-orange-300 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" /> Accepting New Projects
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
          Enterprise-grade tech for the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-purple-500">
            dawn of your business.
          </span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl">
          I&apos;m an active Technical Leader at a global trading fintech. I spend my days managing complex stock systems, and my nights building high-performance, AI-ready web &amp; mobile apps for ambitious small companies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-3.5 rounded-full font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
          >
            Start a Conversation <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#projects"
            className="bg-gray-800/80 text-white px-8 py-3.5 rounded-full font-bold text-lg hover:bg-gray-700 transition-colors border border-gray-700 flex items-center justify-center backdrop-blur-sm"
          >
            View My Work
          </a>
        </div>
      </motion.div>
    </header>
  )
}
