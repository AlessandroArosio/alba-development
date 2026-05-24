import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: 'How do I know if custom software is worth it for my business?',
    answer: 'It is usually worth it when the same bottleneck keeps costing you revenue, time, or customer experience every week. If a process is repetitive, error-prone, or limiting growth, software can create a meaningful return. I will tell you plainly if a lighter option is better than a custom build.',
  },
  {
    question: 'Can you help if I only know the outcome I want, not the exact product?',
    answer: 'Yes. That is a common starting point. You can come with a goal such as increasing bookings, reducing admin, or improving reporting, and I can help shape the smallest useful product or workflow to get you there.',
  },
  {
    question: 'Do you work with non-technical founders and business owners?',
    answer: 'Absolutely. Most buyers care about outcomes, not frameworks. I translate your goal into a practical plan, explain trade-offs in plain English, and keep the process transparent from first call to launch.',
  },
  {
    question: 'When does it make sense to start with an MVP instead of a full build?',
    answer: 'Start with an MVP when the idea still needs validation, when budget needs to stay tight, or when you want real user feedback before expanding scope. A full build makes more sense once the workflow, audience, and desired outcome are clearer.',
  },
  {
    question: 'Do you offer AI features for every project?',
    answer: 'No, and that is deliberate. AI is useful when it improves speed, search, support, recommendations, or workflow quality. If it adds cost and complexity without a real business benefit, I will recommend a simpler approach.',
  },
  {
    question: 'What happens after I fill in the contact form?',
    answer: 'I will review your goal, bottleneck, and context, then reply within 24 hours with suggested next steps. That may be a short call, a recommendation for a focused discovery sprint, or a simple note if the problem does not need a custom build yet.',
  },
]

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left gap-4"
      >
        <span className="text-white font-semibold text-lg">{faq.question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 border-t border-gray-800 bg-page-alt">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">Answers to the commercial questions most buyers ask before starting.</p>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.question} faq={faq} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
