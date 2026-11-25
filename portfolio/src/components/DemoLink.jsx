import { useContext } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { LanguageContext } from '../context/LanguageContext.js'

const DemoLink = ({ href, projectTitle }) => {
  const { translations } = useContext(LanguageContext)
  const label = translations.pages.projectDetail.demoLink

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: ${projectTitle}`}
      className="inline-flex min-h-11 items-center gap-3 rounded-lg border border-copper px-4 py-2 font-semibold text-primary transition-colors hover:bg-copper/15"
    >
      {label}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  )
}

export default DemoLink
