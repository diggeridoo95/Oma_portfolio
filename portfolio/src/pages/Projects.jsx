import { useContext } from 'react'
import ProjectCard from '../components/ProjectCard.jsx'
import { LanguageContext } from '../context/LanguageContext.js'
import { projects } from '../data/projects.js'

const Projects = () => {
  const { translations } = useContext(LanguageContext)
  const labels = translations.pages.projects

  return (
    <section aria-labelledby="projects-heading">
      <h1 id="projects-heading" className="text-5xl leading-tight font-semibold tracking-tight sm:text-7xl">
        {labels.title}<span aria-hidden="true" className="text-copper">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-secondary">{labels.description}</p>
      <div className="mt-10 space-y-6 sm:mt-12">
        {projects.length > 0 ? (
          projects.map((project) => <ProjectCard key={project.slug} project={project} />)
        ) : (
          <p className="text-secondary">{labels.emptyMessage}</p>
        )}
      </div>
    </section>
  )
}

export default Projects
