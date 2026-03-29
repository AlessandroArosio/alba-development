import { useState } from 'react'
import { Activity, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const projects = [
  {
    id: 'datamill',
    title: 'DataMill',
    subtitle: 'Airbnb Analytics Dashboard',
    description: 'A real-time analytics platform for Airbnb hosts managing multiple properties. Tracks net income, platform fees, cleaning revenue, and occupancy with interactive financial charts and a live activity feed.',
    tags: ['Data Visualisation', 'REST APIs', 'Java', 'React'],
    color: 'orange',
    image: '/images/portfolio/datamill-dashboard.webp',
  },
  {
    id: 'concierge',
    title: 'Digital Guest Concierge',
    subtitle: 'Holiday Let Platform',
    description: 'A comprehensive digital concierge for holiday lets. Guests get live bus times, local events with smart search, an AI-powered itinerary planner, weather forecasts, and curated local recommendations — all from a simple link.',
    tags: ['Web App', 'AI Integration', 'Live APIs', 'PostgreSQL'],
    color: 'rose',
    image: '/images/portfolio/concierge-marketing.webp',
    images: [
      { src: '/images/portfolio/concierge-marketing.webp', label: 'Marketing Page' },
      { src: '/images/portfolio/concierge-events.webp', label: 'Events Explorer' },
      { src: '/images/portfolio/concierge-itinerary.webp', label: 'AI Itinerary Planner' },
    ],
  },
  {
    id: 'laura',
    title: "L'Aura",
    subtitle: 'Fine Dining Restaurant',
    description: 'An elegant website for a fine dining restaurant with online table reservations and AI-powered personalised menu and wine pairing suggestions tailored to each booking.',
    tags: ['Web Design', 'AI Features', 'Booking System'],
    color: 'amber',
    image: '/images/portfolio/laura-restaurant.webp',
  },
  {
    id: 'parkiq',
    title: 'ParkIQ',
    subtitle: 'Parking Management Dashboard',
    description: 'A live parking management dashboard tracking occupancy, session counts, revenue, and overstay alerts. Features real-time vehicle monitoring with colour-coded occupancy trends and an AI briefing tool.',
    tags: ['Dashboard', 'Real-time Data', 'AI Briefing', 'Analytics'],
    color: 'blue',
    image: '/images/portfolio/parkiq-dashboard.webp',
  },
  {
    id: 'ecoclean',
    title: 'EcoClean UK',
    subtitle: 'Cleaning Service Website',
    description: 'A conversion-focused website for an eco-friendly cleaning company. Features an instant quote builder where customers select service type, bedrooms, and postcode to receive a price in seconds.',
    tags: ['Web Design', 'Lead Generation', 'Quote Engine'],
    color: 'emerald',
    image: '/images/portfolio/ecoclean-hero.webp',
  },
  {
    id: 'haven',
    title: 'Haven',
    subtitle: 'Property Search Platform',
    description: 'A property search platform for buying, renting, and selling homes. Features location-based search with property type filters, a curated featured listings feed, and agent profiles.',
    tags: ['Web App', 'Search & Filtering', 'Property Tech'],
    color: 'indigo',
    image: '/images/portfolio/haven-property.webp',
  },
  {
    id: 'gymtracker',
    title: 'Native Gym Tracker',
    subtitle: 'iOS & Android App',
    description: 'A mobile application to log workouts, track exercise progression over time, and visualise fitness journeys. Built with offline-first capabilities and native performance on iOS and Android.',
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
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-gray-800 text-gray-300 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Portfolio({ limit }) {
  const displayed = limit ? projects.slice(0, limit) : projects

  return (
    <section id="projects" className="py-24 border-t border-gray-800 relative bg-page-alt">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-white">Selected Work</h2>
          <div className="h-px bg-gray-800 flex-grow" />
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
