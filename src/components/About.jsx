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
              The person behind the code
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                By day, I lead engineering teams at a global trading fintech — building and managing the complex systems that power real-time stock trading for thousands of users.
              </p>
              <p>
                By night, I channel that same enterprise discipline into building high-performance web and mobile applications for small businesses and startups. Based in <strong className="text-white">Edinburgh, Scotland</strong>, I work with clients across the UK — from the Highlands and Isle of Skye to London and beyond.
              </p>
              <p>
                I don&apos;t outsource. I don&apos;t cut corners. Every project gets the same engineering rigour I apply to trading systems handling millions in daily volume. You get a direct line to the person building your product — no account managers, no hand-offs.
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
