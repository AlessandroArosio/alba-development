import { useState } from 'react'
import { Activity, ArrowRight, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const projects = [
  {
    id: 'albastays',
    title: 'Alba Stays',
    subtitle: 'Direct Booking Platform',
    description: 'A complete direct-booking platform for holiday-let operators. Guests check live availability and pay securely by card, while hosts manage properties, calendars, pricing, and reservations from an admin console — with Airbnb calendars kept in sync automatically.',
    outcome: 'Removes marketplace commission on direct bookings and gives operators one place to run their whole rental business.',
    tags: ['Booking Platform', 'Stripe Payments', 'Java Spring Boot', 'Multi-tenant SaaS'],
    color: 'emerald',
    image: '/images/portfolio/albastays-booking.webp',
    link: 'https://www.albahouse.co.uk',
  },
  {
    id: 'datamill',
    title: 'DataMill',
    subtitle: 'Airbnb Analytics Dashboard',
    description: 'A real-time analytics platform for Airbnb hosts managing multiple properties. Tracks net income, platform fees, cleaning revenue, and occupancy with interactive financial charts and a live activity feed.',
    outcome: 'Gives hosts a clearer view of performance so they can spot revenue leaks and make faster pricing or occupancy decisions.',
    tags: ['Data Visualisation', 'REST APIs', 'Java', 'React'],
    color: 'orange',
    image: '/images/portfolio/datamill-dashboard.webp',
  },
  {
    id: 'concierge',
    title: 'Digital Guest Concierge',
    subtitle: 'Holiday Let Platform',
    description: 'A comprehensive digital concierge for holiday lets. Guests get live bus times, local events with smart search, an AI-powered itinerary planner, weather forecasts, and curated local recommendations — all from a simple link.',
    outcome: 'Improves the guest experience while helping accommodation businesses stand out, reduce repetitive guest questions, and encourage repeat stays.',
    tags: ['Web App', 'AI Integration', 'Live APIs', 'PostgreSQL'],
    color: 'rose',
    image: '/images/portfolio/concierge-marketing.webp',
    images: [
      { src: '/images/portfolio/concierge-marketing.webp', label: 'Marketing Page' },
      { src: '/images/portfolio/concierge-events.webp', label: 'Events Explorer' },
      { src: '/images/portfolio/concierge-itinerary.webp', label: 'AI Itinerary Planner' },
    ],
    link: 'https://demo.albahouse.co.uk',
  },
  {
    id: 'aircleaning',
    title: 'AirCleaning',
    subtitle: 'Cleaning Operations PWA',
    description: 'A mobile-first scheduling app that coordinates Airbnb cleaning across multiple companies. Managers assign jobs from a weekly dashboard synced with Airbnb calendars; cleaners follow a simple 7-day schedule in five languages, with Telegram alerts when properties are guest-ready.',
    outcome: 'Cuts the daily back-and-forth of changeover coordination and gives managers instant visibility of what is clean, booked, and ready.',
    tags: ['Mobile PWA', 'Airbnb Sync', 'Telegram Alerts', 'Multi-language'],
    color: 'cyan',
    image: '/images/portfolio/aircleaning-landing.webp',
    link: 'https://clean.albahouse.co.uk',
  },
  {
    id: 'laura',
    title: "L'Aura",
    subtitle: 'Fine Dining Restaurant',
    description: 'An elegant website for a fine dining restaurant with online table reservations and AI-powered personalised menu and wine pairing suggestions tailored to each booking.',
    outcome: 'Turns a restaurant website into a better booking and upsell channel instead of a static brochure.',
    tags: ['Web Design', 'AI Features', 'Booking System'],
    color: 'amber',
    image: '/images/portfolio/laura-restaurant.webp',
  },
  {
    id: 'parkiq',
    title: 'ParkIQ',
    subtitle: 'Parking Management Dashboard',
    description: 'A live parking management dashboard tracking occupancy, session counts, revenue, and overstay alerts. Features real-time vehicle monitoring with colour-coded occupancy trends and an AI briefing tool.',
    outcome: 'Helps operators react faster to site issues, monitor revenue, and manage capacity with less manual oversight.',
    tags: ['Dashboard', 'Real-time Data', 'AI Briefing', 'Analytics'],
    color: 'blue',
    image: '/images/portfolio/parkiq-dashboard.webp',
  },
  {
    id: 'laschicas',
    title: 'Las Chicas Cleaning',
    subtitle: 'Premium Cleaning Business Website',
    description: 'A fast, SEO-focused website for an Edinburgh premium cleaning business, with dedicated landing pages for domestic, commercial, holiday-let, and end-of-tenancy cleaning, plus structured data for local search.',
    outcome: 'Positions the business for local search visibility and turns visits into quote requests with clear calls to action on every page.',
    tags: ['Astro', 'Local SEO', 'Lead Generation'],
    color: 'amber',
    image: '/images/portfolio/laschicas-hero.webp',
    link: 'https://alessandroarosio.github.io/las-chicas/',
  },
  {
    id: 'laundroute',
    title: 'LaundRoute',
    subtitle: 'Laundry Logistics PWA',
    description: 'A route-planning app for laundry collection and delivery across Edinburgh. Managers build weekly rotas with pickup and drop-off windows and optimise driver routes with AI; drivers follow an ordered stop list with completion tracking and Telegram notifications.',
    outcome: 'Shrinks route-planning time and mileage while giving managers live confirmation that every stop is done.',
    tags: ['AI Route Optimisation', 'Next.js PWA', 'PostgreSQL', 'Telegram'],
    color: 'blue',
    image: null,
  },
  {
    id: 'haven',
    title: 'Haven',
    subtitle: 'Property Search Platform',
    description: 'A property search platform for buying, renting, and selling homes. Features location-based search with property type filters, a curated featured listings feed, and agent profiles.',
    outcome: 'Makes discovery easier for buyers and renters while giving property businesses a stronger digital storefront.',
    tags: ['Web App', 'Search & Filtering', 'Property Tech'],
    color: 'indigo',
    image: '/images/portfolio/haven-property.webp',
  },
  {
    id: 'gymtracker',
    title: 'Native Gym Tracker',
    subtitle: 'iOS & Android App',
    description: 'A mobile application to log workouts, track exercise progression over time, and visualise fitness journeys. Built with offline-first capabilities and native performance on iOS and Android.',
    outcome: 'Keeps users engaged with a smoother mobile experience and a product they can rely on anywhere, even without a connection.',
    tags: ['React Native', 'SQLite', 'iOS & Android'],
    color: 'purple',
    image: '/images/portfolio/gymtracker-app.webp',
  },
]

const colorMap = {
  orange:  { bg: 'bg-orange-500/10',  text: 'text-orange-400',  border: 'hover:border-orange-500/50',  dot: 'bg-orange-400' },
  rose:    { bg: 'bg-rose-500/10',    text: 'text-rose-400',    border: 'hover:border-rose-500/50',    dot: 'bg-rose-400' },
  amber:   { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'hover:border-amber-500/50',   dot: 'bg-amber-400' },
  blue:    { bg: 'bg-blue-500/10',    text: 'text-blue-400',    border: 'hover:border-blue-500/50',    dot: 'bg-blue-400' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'hover:border-emerald-500/50', dot: 'bg-emerald-400' },
  cyan:    { bg: 'bg-cyan-500/10',    text: 'text-cyan-400',    border: 'hover:border-cyan-500/50',    dot: 'bg-cyan-400' },
  indigo:  { bg: 'bg-indigo-500/10',  text: 'text-indigo-400',  border: 'hover:border-indigo-500/50',  dot: 'bg-indigo-400' },
  purple:  { bg: 'bg-purple-500/10',  text: 'text-purple-400',  border: 'hover:border-purple-500/50',  dot: 'bg-purple-400' },
}

function ProjectCard({ project, index }) {
  const [activeImage, setActiveImage] = useState(0)
  const colors = colorMap[project.color]
  const hasMultipleImages = project.images && project.images.length > 1
  const displaySrc = hasMultipleImages ? project.images[activeImage].src : project.image
  const displayAlt = hasMultipleImages
    ? `${project.title} — ${project.images[activeImage].label}`
    : `${project.title} — ${project.subtitle}`

  return (
    <motion.div
      className={`bg-surface border border-gray-800 rounded-3xl overflow-hidden ${colors.border} transition-all hover:-translate-y-1 group flex flex-col`}
      data-analytics-label={`Portfolio: ${project.title}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Screenshot */}
      <div className="relative overflow-hidden bg-gray-900">
        <div className="aspect-video">
          {project.image ? (
            <img
              src={displaySrc}
              alt={displayAlt}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${colors.bg}`}>
              <Activity className={`w-16 h-16 ${colors.text} opacity-30`} />
              <span className="sr-only">{project.title} — screenshot coming soon</span>
            </div>
          )}
        </div>
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {project.images.map((img, i) => (
              <button
                key={img.label}
                onClick={() => setActiveImage(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeImage ? `${colors.dot} scale-125` : 'bg-gray-500 hover:bg-gray-300'
                }`}
                aria-label={`View ${img.label}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <p className={`text-xs font-semibold uppercase tracking-widest ${colors.text} mb-1`}>
          {project.subtitle}
        </p>
        <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-5">
          {project.description}
        </p>
        <div className="mb-5 rounded-2xl border border-gray-800 bg-gray-900/40 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 mb-1">
            Business impact
          </p>
          <p className="text-sm leading-relaxed text-gray-300">{project.outcome}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-gray-800 text-gray-300 rounded-md">
              {tag}
            </span>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-label={`Portfolio live link: ${project.title}`}
            className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${colors.text} hover:underline underline-offset-4`}
          >
            View live site
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Portfolio({ limit }) {
  const displayed = limit ? projects.slice(0, limit) : projects

  return (
    <section id="projects" className="py-24 border-t border-gray-800 relative bg-page-alt">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl font-bold text-white">Selected Work</h2>
            <div className="h-px bg-gray-800 flex-grow" />
          </div>
          <p className="max-w-3xl text-gray-400 text-lg">
            A sample of products, platforms, and internal tools built to improve conversion, streamline operations, and give teams better visibility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {displayed.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {limit && projects.length > limit && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium group"
            >
              View Full Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
