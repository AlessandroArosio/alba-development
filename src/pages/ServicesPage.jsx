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
          <h2 className="text-3xl font-bold text-white mb-4">Need a clearer route from problem to solution?</h2>
          <p className="text-gray-400 mb-8">
            If you know the business goal but not the right product shape yet, I can help you scope the most useful next step.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-orange-400 hover:text-white transition-all duration-300"
          >
            Discuss the Right Approach
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
}
