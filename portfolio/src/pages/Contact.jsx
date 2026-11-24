import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { LanguageContext } from '../context/LanguageContext.js'

const Contact = () => {
  const { translations } = useContext(LanguageContext)
  const contact = translations.pages.contact
  const linkClassName = 'inline-flex min-h-12 items-center gap-3 rounded-lg border border-border px-4 py-3 font-semibold text-primary transition-colors hover:border-copper hover:bg-surface'

  return (
    <section aria-labelledby="contact-heading" className="max-w-2xl">
      <p className="mb-6 text-sm tracking-widest text-champagne uppercase">
        {translations.placeholderLabel}
      </p>
      <h1 id="contact-heading" className="max-w-md text-5xl leading-tight font-semibold tracking-tight sm:text-7xl">
        {contact.heading}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary">
        {contact.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="mailto:eemilxhakala@gmail.com"
          aria-label={`${contact.emailLabel}: eemilxhakala@gmail.com`}
          className={linkClassName}
        >
          <img src="/images/email.png" alt="" aria-hidden="true" width={24} height={24} className="h-6 w-6 shrink-0 object-contain brightness-0 invert" />
          {contact.emailLabel}
        </a>
        <a href="https://github.com/diggeridoo95" className={linkClassName}>
          <img src="/images/github.png" alt="" aria-hidden="true" width={24} height={24} className="h-6 w-6 shrink-0 object-contain brightness-0 invert" />
          {contact.githubLabel}
        </a>
        <a href="https://www.linkedin.com/in/hakalaeemil/" className={linkClassName}>
          <span aria-hidden="true" className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0a66c2] text-sm leading-none font-bold tracking-tighter text-white">
            in
          </span>
          {contact.linkedInLabel}
        </a>
      </div>
      <Link to="/projects" className="mt-6 inline-flex items-center gap-3 py-2 font-medium text-copper underline-offset-4 hover:underline">
        {contact.projectsLink}
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </section>
  )
}

export default Contact
