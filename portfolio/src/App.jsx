import { useContext, useEffect } from 'react'
import { Link, Route, Routes, useLocation, useMatch } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import { LanguageContext } from './context/LanguageContext.js'
import { projects } from './data/projects.js'

const pages = [
  { path: '/', key: 'home' },
  { path: '/projects', key: 'projects' },
  { path: '/about', key: 'about' },
  { path: '/contact', key: 'contact' },
]

const NotFoundPage = () => {
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

const App = () => {
  const { language, translations } = useContext(LanguageContext)
  const { pathname } = useLocation()
  const projectMatch = useMatch('/projects/:slug')
  const normalizedPath = pathname.replace(/\/+$/, '').toLowerCase() || '/'
  const currentPage = pages.find((page) => page.path === normalizedPath)
  const project = projects.find((entry) => entry.slug === projectMatch?.params.slug)
  const pageTitle = projectMatch
    ? project?.content[language].title ?? translations.pages.projectDetail.notFoundTitle
    : translations.pages[currentPage?.key ?? 'notFound'].title

  useEffect(() => {
    document.title = `${pageTitle} | ${translations.siteName}`
  }, [pageTitle, translations.siteName])

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 sm:px-10 lg:px-16">
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:top-4 focus:left-4 focus:z-10 focus:not-sr-only focus:rounded focus:bg-primary focus:px-4 focus:py-3 focus:text-background"
      >
        {translations.skipToContent}
      </a>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className={`flex-1 ${projectMatch ? 'py-8 lg:py-6' : 'py-14 sm:py-20'}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
