import Navbar from '../components/Navbar'
import ContactForm from '../components/ContactForm'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <section className="py-20 px-6 border-b border-gray-800 bg-page-alt">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300 mb-4">
            Start with the business goal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tell me where the friction is and what better looks like
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Whether you want more bookings, less admin, better reporting, or a faster route to launch, I&apos;ll help you work out the most useful next step.
          </p>
        </div>
      </section>
      <ContactForm />
      <FAQ />
      <Footer />
    </>
  )
}
