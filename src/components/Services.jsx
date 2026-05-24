import { Globe, Smartphone, BrainCircuit, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: Globe,
    color: 'orange',
    title: 'Increase Revenue',
    description: 'Turn more visitors into customers with websites, booking flows, customer portals, and digital products designed around commercial conversion.',
    examples: ['Direct bookings', 'Lead generation', 'Customer portals', 'Paid MVPs'],
  },
  {
    icon: Smartphone,
    color: 'rose',
    title: 'Save Time',
    description: 'Replace repetitive manual work with tools your team can actually use, from mobile workflows in the field to internal systems that remove daily admin.',
    examples: ['Internal tools', 'Mobile workflows', 'Offline capture', 'Team automation'],
  },
  {
    icon: BrainCircuit,
    color: 'cyan',
    title: 'Reduce Friction',
    description: 'Use AI and workflow design where it genuinely removes bottlenecks, improves customer experience, or speeds up decision-making.',
    examples: ['Smart search', 'AI assistants', 'Workflow automation', 'Recommendation tools'],
  },
  {
    icon: BarChart3,
    color: 'purple',
    title: 'See What Is Working',
    description: 'Get clearer reporting, better dashboards, and joined-up systems so you can make faster decisions without chasing data across tools.',
    examples: ['Live dashboards', 'API integrations', 'Automated reports', 'Data pipelines'],
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Business outcomes first. Technology second.</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The right software should help you grow revenue, save time, or reduce operational drag. I choose the stack around the problem, not the other way around.
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
