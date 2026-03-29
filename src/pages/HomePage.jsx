import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Portfolio from '../components/Portfolio'
import Services from '../components/Services'
import TechStack from '../components/TechStack'
import About from '../components/About'
import HowWeWork from '../components/HowWeWork'
import FAQ from '../components/FAQ'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Portfolio limit={4} />
      <Services />
      <TechStack />
      <About />
      <HowWeWork />
      <FAQ />
      <ContactForm />
      <Footer />
    </>
  )
}
