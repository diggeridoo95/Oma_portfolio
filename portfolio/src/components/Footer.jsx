import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext.js'

const currentYear = new Date().getFullYear()

const Footer = () => {
  const { translations } = useContext(LanguageContext)

  return (
    <footer className="border-t border-border py-7 text-sm text-secondary sm:py-9">
      <p>© {currentYear} {translations.siteName}.</p>
    </footer>
  )
}

export default Footer
