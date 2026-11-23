import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { LanguageContext } from '../context/LanguageContext.js'
import { projects } from '../data/projects.js'

const ProjectDetail = () => {
  const { language, translations } = useContext(LanguageContext)
  const { slug } = useParams()
  const project = projects.find((entry) => entry.slug === slug)
  const labels = translations.pages.projectDetail
  const projectLabels = translations.pages.projects

  if (!project) {
    return (
      <section aria-labelledby="project-heading" className="max-w-2xl">
        <h1 id="project-heading" className="text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
          {labels.notFoundTitle}
        </h1>
        <p className="mt-6 text-lg text-secondary">{labels.notFoundDescription}</p>
        <Link to="/projects" className="mt-8 inline-block py-2 font-medium text-copper underline-offset-4 hover:underline">
          {labels.backToProjects}
        </Link>
      </section>
    )
  }

  const content = project.content[language]

  return (
    <article aria-labelledby="project-heading">
      <Link to="/projects" className="mb-5 inline-flex items-center gap-2 py-2 font-medium text-copper underline-offset-4 hover:underline">
        <ArrowLeft size={16} aria-hidden="true" />
        {labels.backToProjects}
      </Link>
      <header className="mb-8 border-b border-border pb-6">
        <h1 id="project-heading" className="text-4xl leading-tight font-semibold tracking-tight break-words sm:text-5xl">
          {content.title}<span aria-hidden="true" className="text-copper">.</span>
        </h1>
      </header>
      <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10 xl:gap-12">
        <div className="min-w-0">
          <section aria-labelledby="summary-heading">
            <h2 id="summary-heading" className="text-xl font-semibold">{labels.summaryTitle}</h2>
            <p className="mt-3 leading-relaxed text-secondary">{content.summary}</p>
          </section>

          {(project.githubUrl || project.demoUrl) && (
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {project.githubUrl && (
                <a href={project.githubUrl} className="inline-flex items-center gap-2 py-2 font-medium text-copper underline-offset-4 hover:underline">
                  {labels.githubLink}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} className="inline-flex items-center gap-2 py-2 font-medium text-copper underline-offset-4 hover:underline">
                  {labels.demoLink}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="w-full max-w-[480px] lg:justify-self-end">
          <figure>
            {project.image ? (
              <img
                src={project.image}
                alt={project.imageAlt[language]}
                className="h-auto max-h-[300px] w-full rounded-lg object-contain"
              />
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center rounded-lg border border-border bg-surface p-6 text-center text-lg text-secondary sm:text-2xl">
                <p>{projectLabels.imagePlaceholder}</p>
              </div>
            )}
          </figure>

          <section aria-labelledby="technologies-heading" className="mt-5">
            <h2 id="technologies-heading" className="text-xl font-semibold">{projectLabels.technologiesLabel}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li key={technology} className="rounded-full bg-surface px-3 py-1 text-sm text-champagne">
                  {technology}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  )
}

export default ProjectDetail
