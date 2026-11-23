import { useEffect, useState } from 'react'
import { LanguageContext } from './LanguageContext.js'
import { fi } from '../translations/fi.js'
import { en } from '../translations/en.js'

const translations = { fi, en }
const storageKey = 'portfolio-language'

const getInitialLanguage = () => {
  try {
    const savedLanguage = window.localStorage.getItem(storageKey)
    return savedLanguage === 'en' ? 'en' : 'fi'
  } catch {
    return 'fi'
  }
}

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage)

  const changeLanguage = (nextLanguage) => {
    if (nextLanguage !== 'fi' && nextLanguage !== 'en') return

    setLanguage(nextLanguage)

    try {
      window.localStorage.setItem(storageKey, nextLanguage)
    } catch {
      // Language switching also works when browser storage is unavailable.
    }
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translations: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
