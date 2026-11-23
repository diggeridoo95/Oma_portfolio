import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext.js'

const LanguageSwitcher = () => {
  const { language, changeLanguage, translations } = useContext(LanguageContext)

  return (
    <div role="group" aria-label={translations.language.label} className="flex items-center gap-6">
      {['fi', 'en'].map((option) => (
        <button
          key={option}
          type="button"
          aria-label={translations.language[option]}
          aria-pressed={language === option}
          onClick={() => changeLanguage(option)}
          className={`min-h-11 cursor-pointer border-b py-3 text-sm font-medium transition-colors hover:text-copper sm:text-base ${
            language === option ? 'border-copper text-copper' : 'border-transparent text-primary'
          }`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
