import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext.js'

const Footer = () => {
  const { translations } = useContext(LanguageContext)

  return (
    <footer className="border-t border-border py-7 text-sm text-secondary sm:py-9">
      <p>{translations.footer.text}</p>
    </footer>
  )
}

export default Footer
