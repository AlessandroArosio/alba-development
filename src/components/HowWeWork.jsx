import { Rocket, Code2, MessageSquare, FileText, Hammer } from 'lucide-react'
import { motion } from 'framer-motion'

const process = [
  {
    icon: MessageSquare,
    title: 'Free Consultation',
    description: 'We hop on a quick call to discuss your idea. I\'ll ask the right questions and give you honest feedback.',
  },
  {
    icon: FileText,
    title: 'Proposal & Quote',
    description: 'You\'ll receive a clear proposal with scope, timeline, and transparent pricing — no surprises, no hidden fees.',
  },
  {
    icon: Hammer,
    title: 'Build & Launch',
    description: 'I build your product with regular demos and updates, then deploy it live. You\'re involved every step of the way.',
  },
]

export default function HowWeWork() {
  return (
    <section className="py-24 border-t border-gray-800 bg-page-alt">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How We Work</h2>
          <p className="text-gray-400 text-lg">Transparent pricing. No agency bloat. Just engineering excellence.</p>
        </motion.div>

        {/* 3-step process */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {process.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="text-center relative">
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gray-800" />
                )}
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <Icon className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </motion.div>

        {/* Pricing models */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Step 1 */}
          <motion.div
            className="p-8 border border-gray-800 rounded-3xl bg-gradient-to-b from-gray-900 to-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-orange-400 font-bold">01</div>
              <Rocket className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">The MVP Prototype</h3>
            <p className="text-gray-400 leading-relaxed">
              Not sure if your idea will work? Let&apos;s start small. I offer a low-cost, rapid prototyping phase to build a core MVP. This gives you a tangible &ldquo;flavor&rdquo; of the app to test with users or investors without breaking the bank.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="p-8 border border-gray-800 rounded-3xl bg-gradient-to-b from-gray-900 to-transparent relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl" />
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-purple-400 font-bold">02</div>
              <Code2 className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 relative z-10">The Custom Build</h3>
            <p className="text-gray-400 leading-relaxed relative z-10">
              When you&apos;re ready to scale, we build the full product. Pricing is entirely transparent and custom-quoted based on the project&apos;s specific complexity, required features, and the exact hours needed to deliver enterprise-grade quality.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
