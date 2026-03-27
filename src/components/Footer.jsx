import { Sunrise } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-16 border-t border-gray-800 text-center relative overflow-hidden bg-page">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-orange-500/10 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-gray-600">
          <Sunrise className="w-5 h-5 text-orange-400/40" />
          <span className="text-sm font-medium">Alba Development</span>
        </div>
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Alba Development. Built in Scotland.
        </p>
      </div>
    </footer>
  )
}
