import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'Client testimonial coming soon — this space is reserved for feedback from early clients.',
    name: 'Your Name Here',
    role: 'Future Client',
    stars: 5,
  },
  {
    quote: 'Client testimonial coming soon — this space is reserved for feedback from early clients.',
    name: 'Your Name Here',
    role: 'Future Client',
    stars: 5,
  },
  {
    quote: 'Client testimonial coming soon — this space is reserved for feedback from early clients.',
    name: 'Your Name Here',
    role: 'Future Client',
    stars: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 border-t border-gray-800 bg-page">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Clients Say</h2>
          <p className="text-gray-400 text-lg">Real feedback from real projects.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="p-8 border border-gray-800 rounded-3xl bg-surface flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Quote className="w-8 h-8 text-orange-400/30 mb-4" />
              <p className="text-gray-400 leading-relaxed mb-6 flex-grow italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-orange-400 fill-orange-400" />
                ))}
              </div>
              <p className="text-white font-semibold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
