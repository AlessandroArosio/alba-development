import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import TechStack from './components/TechStack'
import About from './components/About'
import HowWeWork from './components/HowWeWork'
import FAQ from './components/FAQ'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-page font-sans text-gray-300">
      <Navbar />
      <Hero />
      <Portfolio />
      <Services />
      <TechStack />
      <About />
      <HowWeWork />
      <FAQ />
      <ContactForm />
      <Footer />
    </div>
  )
}
