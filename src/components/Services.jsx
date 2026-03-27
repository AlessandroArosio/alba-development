import { Globe, Smartphone, BrainCircuit, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: Globe,
    color: 'orange',
    title: 'Web Applications',
    description: 'Custom web apps that look sharp and perform fast — from booking platforms and client portals to internal business tools. Built to scale with your growth.',
    examples: ['Customer portals', 'Booking systems', 'SaaS platforms', 'Admin dashboards'],
  },
  {
    icon: Smartphone,
    color: 'rose',
    title: 'Mobile Apps',
    description: 'Native-quality iOS and Android apps from a single codebase. Offline-capable, smooth, and built for real users — not just demos.',
    examples: ['Android apps', 'Offline-first design', 'Push notifications', 'Google Play launch'],
  },
  {
    icon: BrainCircuit,
    color: 'cyan',
    title: 'AI Integration',
    description: 'Add intelligent features to your product — from AI-powered chatbots and content generation to smart recommendations and automated workflows.',
    examples: ['AI chatbots', 'Content generation', 'Smart search', 'Workflow automation'],
  },
  {
    icon: BarChart3,
    color: 'purple',
    title: 'Data & Analytics',
    description: 'Turn your raw data into clear, actionable insights. Interactive dashboards, automated reports, and API integrations that connect your tools.',
    examples: ['Analytics dashboards', 'API integrations', 'Automated reports', 'Data pipelines'],
  },
]

const colorMap = {
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', dot: 'bg-orange-400' },
  rose:   { bg: 'bg-rose-500/10',   text: 'text-rose-400',   dot: 'bg-rose-400' },
  cyan:   { bg: 'bg-cyan-500/10',   text: 'text-cyan-400',   dot: 'bg-cyan-400' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', dot: 'bg-purple-400' },
}

export default function Services() {
  return (
    <section id="services" className="py-24 border-t border-gray-800 bg-page-alt">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What I Can Build for You</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Whether you need a customer-facing app, an internal tool, or AI-powered features — I deliver production-ready software tailored to your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon
            const colors = colorMap[service.color]
            return (
              <motion.div
                key={service.title}
                className="p-8 border border-gray-800 rounded-3xl bg-surface hover:border-gray-600 transition-colors group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{service.description}</p>
                <ul className="grid grid-cols-2 gap-2">
                  {service.examples.map((example) => (
                    <li key={example} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} shrink-0`} />
                      {example}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
