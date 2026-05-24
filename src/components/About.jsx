import { Briefcase, GraduationCap, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  { icon: Briefcase, label: 'Enterprise Fintech', value: 'Technical Leader' },
  { icon: GraduationCap, label: 'Years in Software', value: '5+' },
  { icon: Clock, label: 'Availability', value: 'Evenings & Weekends' },
]

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-gray-800 bg-page">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Senior delivery without agency layers
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I lead engineering teams at a global trading fintech, working on complex systems where reliability, clarity, and good technical decisions matter every day.
              </p>
              <p>
                That matters because when I work with a business owner or founder, you are not buying a generic freelancer. You are getting direct access to someone who can translate business goals into sensible product decisions, technical trade-offs, and dependable delivery.
              </p>
              <p>
                I work directly with clients from <strong className="text-white">Edinburgh, Scotland</strong> across the UK. No account managers, no outsourcing, no inflated agency overhead. Just honest advice, clear communication, and software built around outcomes that matter to your business.
              </p>
            </div>
          </motion.div>

          {/* Stats side */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="flex items-center gap-5 p-6 border border-gray-800 rounded-2xl bg-gray-900/30 hover:border-gray-600 transition-colors">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
