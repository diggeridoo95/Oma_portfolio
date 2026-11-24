import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LanguageContext } from '../context/LanguageContext.js'
import LanguageSwitcher from './LanguageSwitcher.jsx'

const links = [
  { path: '/', key: 'home' },
  { path: '/projects', key: 'projects' },
  { path: '/about', key: 'about' },
  { path: '/contact', key: 'contact' },
]

const Navbar = () => {
  const { translations } = useContext(LanguageContext)

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-border py-6 sm:py-8">
      <Link to="/" className="text-xl font-semibold">
        {translations.siteName}
      </Link>
      <div className="flex w-full flex-wrap items-center justify-between gap-x-8 gap-y-4 md:w-auto lg:w-[28rem]">
        <nav aria-label={translations.navigation.label}>
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm sm:text-base">
            {links.map((link) => (
              <li key={link.key}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `inline-block border-b py-3 transition-colors hover:text-copper ${
                      isActive ? 'border-copper text-copper' : 'border-transparent text-primary'
                    }`
                  }
                >
                  {translations.navigation[link.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}

export default Navbar
