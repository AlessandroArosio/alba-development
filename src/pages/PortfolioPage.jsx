import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Portfolio from '../components/Portfolio'
import Footer from '../components/Footer'

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <Portfolio />
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Have a project in mind?</h2>
          <p className="text-gray-400 mb-8">
            Let&apos;s build something great together. Get in touch for a free consultation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-orange-400 hover:text-white transition-all duration-300"
          >
            Start a Project
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
}
