import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { LanguageContext } from '../context/LanguageContext.js'

const Home = () => {
  const { translations } = useContext(LanguageContext)
  const home = translations.pages.home

  return (
    <section aria-labelledby="home-heading" className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
      <div>
        <p className="mb-6 text-sm tracking-widest text-champagne uppercase">
          {home.welcome}
        </p>
        <h1 id="home-heading" className="text-5xl leading-tight font-semibold tracking-tight sm:text-6xl xl:text-7xl">
          <span className="block">{home.greeting}</span>
          <span className="block">{translations.siteName}.</span>
        </h1>
        <div aria-hidden="true" className="mt-5 h-0.5 w-20 rounded-full bg-copper" />
        <p className="mt-6 text-xl font-medium text-champagne">{home.role}</p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary">
          {home.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-4 sm:mt-14">
          <Link
            to="/projects"
            className="inline-flex items-center justify-between gap-6 rounded-full border border-copper bg-copper px-6 py-3 font-semibold text-background transition-colors hover:border-champagne hover:bg-champagne"
          >
            {home.projectsLink}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-between gap-6 rounded-full border border-champagne px-6 py-3 font-medium text-primary transition-colors hover:bg-surface"
          >
            {home.contactLink}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <figure className="flex w-full flex-col items-center gap-6">
        <div className="aspect-square w-full max-w-72 rounded-full border border-border p-3 sm:max-w-80 sm:p-4 lg:max-w-[480px]">
          <div className="h-full rounded-full bg-surface p-4 sm:p-5">
            <div className="flex h-full items-center justify-center rounded-full border border-border p-6 text-center">
              <p className="max-w-44 text-2xl leading-tight font-medium sm:text-3xl">
                {home.photoPlaceholder}
              </p>
            </div>
          </div>
        </div>
        <figcaption className="text-sm text-secondary">{home.photoCaption}</figcaption>
      </figure>
    </section>
  )
}

export default Home
