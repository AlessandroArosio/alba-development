import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Services from '../components/Services'
import TechStack from '../components/TechStack'
import Footer from '../components/Footer'

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <Services />
      <TechStack />
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-gray-400 mb-8">
            Let&apos;s discuss your project and find the right solution for your business.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-orange-400 hover:text-white transition-all duration-300"
          >
            Get a Free Consultation
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
}
