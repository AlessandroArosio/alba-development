import {
  Terminal,
  Smartphone,
  Layers,
  Code2,
  MonitorSmartphone,
  Server,
  BrainCircuit,
  Database,
  Sparkles,
  Network,
  Link2,
} from 'lucide-react'
import { motion } from 'framer-motion'

const categories = [
  {
    icon: MonitorSmartphone,
    color: 'text-orange-400',
    title: 'Frontend & Mobile',
    items: [
      { name: 'React.js / Next.js', icon: Terminal },
      { name: 'React Native', icon: Smartphone },
      { name: 'Angular', icon: Terminal },
      { name: 'Flutter', icon: Smartphone },
    ],
  },
  {
    icon: Server,
    color: 'text-rose-400',
    title: 'Backend Architecture',
    items: [
      { name: 'Java (Enterprise)', icon: Layers },
      { name: 'Node.js', icon: Layers },
      { name: 'Python', icon: Code2 },
    ],
  },
  {
    icon: BrainCircuit,
    color: 'text-cyan-400',
    title: 'AI & API Integration',
    items: [
      { name: 'LLM / OpenAI Integration', icon: Sparkles },
      { name: 'RESTful & GraphQL APIs', icon: Network },
      { name: 'Third-Party System Sync', icon: Link2 },
    ],
  },
  {
    icon: Database,
    color: 'text-purple-400',
    title: 'Databases & Data',
    items: [
      { name: 'PostgreSQL', icon: Database },
      { name: 'Oracle DB', icon: Database },
      { name: 'MySQL & SQLite', icon: Database },
    ],
  },
]

export default function TechStack() {
  return (
    <section className="py-24 border-t border-gray-800 relative bg-page">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Engineering Capabilities</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From enterprise trading systems to AI-powered mobile applications, I use the right tool for the job.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, i) => {
            const CatIcon = cat.icon
            return (
              <motion.div
                key={cat.title}
                className="p-8 border border-gray-800 rounded-3xl bg-gray-900/30 hover:border-gray-600 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <CatIcon className={`w-8 h-8 ${cat.color} mb-6`} />
                <h3 className="text-xl font-bold text-white mb-6">{cat.title}</h3>
                <ul className="space-y-4">
                  {cat.items.map((item) => {
                    const ItemIcon = item.icon
                    return (
                      <li key={item.name} className="flex items-center justify-between text-gray-400 hover:text-white transition-colors">
                        <span className="font-medium">{item.name}</span>
                        <div className="h-px bg-gray-800 flex-grow mx-4" />
                        <ItemIcon className="w-4 h-4 text-gray-600" />
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
