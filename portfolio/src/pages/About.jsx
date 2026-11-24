import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { LanguageContext } from '../context/LanguageContext.js'

const About = () => {
  const { translations } = useContext(LanguageContext)
  const about = translations.pages.about

  return (
    <section aria-labelledby="about-heading" className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-16">
      <div>
        <h1 id="about-heading" className="max-w-sm text-5xl leading-tight font-semibold tracking-tight sm:text-7xl">
          {about.heading}
        </h1>
        <div className="mt-6 max-w-xl space-y-5 text-lg leading-relaxed text-secondary">
          {about.description.split(/\n\s*\n/).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link to="/projects" className="mt-6 inline-flex items-center gap-3 py-2 font-medium text-copper underline-offset-4 hover:underline">
          {about.projectsLink}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <img
        src="/images/esittely.webp"
        alt={about.photoAlt}
        className="aspect-[4/5] w-full max-w-80 justify-self-center rounded-2xl border border-border object-cover lg:max-w-none lg:justify-self-end"
      />
    </section>
  )
}

export default About
