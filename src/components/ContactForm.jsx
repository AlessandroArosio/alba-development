import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const WEB3FORMS_KEY = 'f5050471-e607-48f2-8b40-b65f8aab4d81'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New enquiry from ${formData.name}`,
          from_name: formData.name,
          ...formData,
          botcheck: '',
        }),
      })

      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 border-t border-gray-800 bg-page">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to bring your idea to light?</h2>
          <p className="text-gray-400 text-lg">
            Send me a brief overview of what you&apos;re looking to build, and we can set up a quick follow-up call.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Honeypot (hidden from humans, catches bots) */}
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Project Overview</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none"
              placeholder="Tell me briefly about your project — what are you looking to build?"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-3.5 rounded-full font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send className="w-5 h-5" /> Send Message
              </>
            )}
          </button>

          {status === 'success' && (
            <motion.div
              className="flex items-center gap-3 text-green-400 bg-green-400/10 border border-green-400/20 px-4 py-3 rounded-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm">Message sent successfully! I&apos;ll get back to you shortly.</p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              className="flex items-center gap-3 text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 rounded-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm">
                Something went wrong. Please try again, or email me directly at{' '}
                <a href="mailto:hello@albadevelopment.co.uk" className="underline hover:text-white">hello@albadevelopment.co.uk</a>.
              </p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  )
}
