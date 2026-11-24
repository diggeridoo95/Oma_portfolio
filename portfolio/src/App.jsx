import { useContext, useEffect } from 'react'
import { Route, Routes, useLocation, useMatch } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import NavigationManager from './components/NavigationManager.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import { LanguageContext } from './context/LanguageContext.js'
import { projects } from './data/projects.js'
import { navigation } from './data/navigation.js'

const pageComponents = {
  home: Home,
  projects: Projects,
  about: About,
  contact: Contact,
}

const App = () => {
  const { language, translations } = useContext(LanguageContext)
  const { pathname } = useLocation()
  const projectMatch = useMatch('/projects/:slug')
  const normalizedPath = pathname.replace(/\/+$/, '').toLowerCase() || '/'
  const currentPage = navigation.find((page) => page.path === normalizedPath)
  const project = projects.find((entry) => entry.slug === projectMatch?.params.slug)
  const pageTitle = projectMatch
    ? project?.content[language].title ?? translations.pages.projectDetail.notFoundTitle
    : translations.pages[currentPage?.key ?? 'notFound'].title

  useEffect(() => {
    document.title = `${pageTitle} | ${translations.siteName}`
  }, [pageTitle, translations.siteName])

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 sm:px-10 lg:px-16">
      <NavigationManager />
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
        <div key={pathname} className="page-enter">
          <Routes>
            {navigation.map((page) => {
              const Page = pageComponents[page.key]
              return <Route key={page.key} path={page.path} element={<Page />} />
            })}
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
