import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../context/LanguageContext.js'

const NotFound = () => {
  const { translations } = useContext(LanguageContext)

  return (
    <section aria-labelledby="page-heading" className="max-w-2xl">
      <h1 id="page-heading" className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
        {translations.pages.notFound.title}
      </h1>
      <p className="mt-6 text-lg text-secondary">
        {translations.pages.notFound.description}
      </p>
      <Link to="/" className="mt-8 inline-block py-2 font-medium text-copper underline-offset-4 hover:underline">
        {translations.pages.notFound.backHome}
      </Link>
    </section>
  )
}

export default NotFound
