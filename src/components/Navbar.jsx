import { Link } from 'react-router-dom'
import { Sunrise, Mail } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-white tracking-tighter flex items-center gap-2 group">
          <Sunrise className="text-orange-400 w-7 h-7 group-hover:rotate-45 transition-transform duration-500" />
          ALBA<span className="text-gray-600 font-light">DEV</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/services" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hidden sm:block">
            Services
          </Link>
          <Link to="/portfolio" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hidden sm:block">
            Portfolio
          </Link>
          <Link
            to="/contact"
            className="text-sm font-semibold bg-white text-black px-6 py-2.5 rounded-full hover:bg-orange-400 hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            <Mail className="w-4 h-4" /> Get in Touch
          </Link>
        </div>
      </div>
    </nav>
  )
}
