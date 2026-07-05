import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sunrise, Mail, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <nav className="border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" onClick={close} className="text-2xl font-black text-white tracking-tighter flex items-center gap-2 group">
          <Sunrise className="text-orange-400 w-7 h-7 group-hover:rotate-45 transition-transform duration-500" />
          ALBA<span className="text-gray-600 font-light">DEV</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/services" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hidden sm:block">
            Services
          </Link>
          <Link to="/portfolio" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hidden sm:block">
            Portfolio
          </Link>
          <Link
            to="/contact"
            onClick={close}
            className="text-sm font-semibold bg-white text-black px-4 sm:px-6 py-2.5 rounded-full hover:bg-orange-400 hover:text-white transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
          >
            <Mail className="w-4 h-4" /> Get in Touch
          </Link>
          <button
            type="button"
            className="sm:hidden text-gray-400 hover:text-white transition-colors p-1 -ml-2"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="sm:hidden border-t border-gray-800 px-6 py-4 flex flex-col gap-4 bg-[#0a0a0a]/95">
          <Link to="/services" onClick={close} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
            Services
          </Link>
          <Link to="/portfolio" onClick={close} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
            Portfolio
          </Link>
          <Link to="/contact" onClick={close} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
            Contact
          </Link>
        </div>
      )}
    </nav>
  )
}
