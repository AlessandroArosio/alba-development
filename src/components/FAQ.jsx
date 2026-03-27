import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: 'How much does a web or mobile app cost?',
    answer: 'Every project is different, so I provide custom quotes based on the specific features and complexity involved. For a rough sense: a simple MVP starts from a few hundred pounds, while a full-featured custom application runs into the low thousands. I\'ll always give you a clear breakdown before any work begins.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'An MVP prototype can be ready in 2–4 weeks. A full custom application typically takes 6–12 weeks depending on scope. I\'ll give you a realistic timeline upfront and keep you updated throughout.',
  },
  {
    question: 'Do you work with non-technical founders?',
    answer: 'Absolutely. Most of my clients aren\'t technical — they have a business idea and need someone to build it. I\'ll translate your vision into a technical plan, explain trade-offs in plain English, and keep you in the loop every step of the way.',
  },
  {
    question: 'I\'m based outside Edinburgh — can we still work together?',
    answer: 'Yes. While I\'m based in Edinburgh, I work with clients across Scotland, the Isle of Skye, and the wider UK. Everything is managed remotely via video calls, shared project boards, and regular demos. Geography is never a barrier.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer: 'Yes. I offer flexible maintenance and support arrangements after launch — from ad-hoc bug fixes to monthly retainers for continued development. Your app won\'t be left unsupported.',
  },
  {
    question: 'What happens after I fill in the contact form?',
    answer: 'I\'ll reply within 24 hours to schedule a free 30-minute consultation call. On the call, we\'ll discuss your idea, I\'ll ask some questions to understand the scope, and then I\'ll follow up with a proposal and quote — no obligation.',
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
          <p className="text-gray-400 text-lg">Answers to common questions about working with me.</p>
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
