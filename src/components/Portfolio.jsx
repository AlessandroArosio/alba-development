import { BarChart3, Building, Activity } from 'lucide-react'
import { motion } from 'framer-motion'

const projects = [
  {
    icon: BarChart3,
    color: 'orange',
    title: 'Airbnb Analytics Engine',
    description: 'A complex data application utilizing external APIs to extract and analyze Airbnb metrics. Features include booking trends, revenue tracking, and interactive heat maps.',
    tags: ['Data Viz', 'REST APIs', 'Java'],
  },
  {
    icon: Building,
    color: 'rose',
    title: 'Digital Concierge Platform',
    description: 'A bespoke web application designed for holiday lets. It serves as a comprehensive digital concierge with smart integrations to elevate the guest experience and streamline property management.',
    tags: ['Web App', 'AI Integration', 'PostgreSQL'],
  },
  {
    icon: Activity,
    color: 'purple',
    title: 'Native Gym Tracker App',
    description: 'A mobile application designed to log workouts, track exercise progression over time, and visualize fitness journeys. Built with offline-first capabilities and native performance.',
    tags: ['React Native', 'SQLite', 'iOS & Android'],
  },
]

const colorMap = {
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'hover:border-orange-500/50' },
  rose:   { bg: 'bg-rose-500/10',   text: 'text-rose-400',   border: 'hover:border-rose-500/50' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'hover:border-purple-500/50' },
}

export default function Portfolio() {
  return (
    <section id="projects" className="py-24 border-t border-gray-800 relative bg-page-alt">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-white">Selected Work</h2>
          <div className="h-px bg-gray-800 flex-grow" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon
            const colors = colorMap[project.color]
            return (
              <motion.div
                key={project.title}
                className={`bg-surface border border-gray-800 p-8 rounded-3xl ${colors.border} transition-all hover:-translate-y-1 group flex flex-col`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-gray-800 text-gray-300 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
