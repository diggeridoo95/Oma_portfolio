import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { LanguageContext } from '../context/LanguageContext.js'

const statusDotClasses = {
  inProgress: 'bg-copper',
  mvpReady: 'bg-emerald-300',
  prototype: 'bg-champagne',
  completed: 'bg-emerald-500',
}

const ProjectCard = ({ project }) => {
  const { language, translations } = useContext(LanguageContext)
  const content = project.content[language]
  const labels = translations.pages.projects

  return (
    <article className="grid items-center gap-6 rounded-xl border border-border p-5 sm:p-7 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
      {project.image ? (
        <img
          src={project.image}
          alt={project.imageAlt[language]}
          loading="lazy"
          className="aspect-16/10 w-full rounded-lg bg-surface object-contain"
        />
      ) : (
        <div className="flex aspect-16/10 items-center justify-center rounded-lg bg-surface p-6 text-center text-secondary">
          <p>{labels.imagePlaceholder}</p>
        </div>
      )}
      <div className="min-w-0">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-primary">
          <span
            aria-hidden="true"
            className={`h-2 w-2 shrink-0 rounded-full ${statusDotClasses[project.status] ?? 'bg-secondary'}`}
          />
          {labels.statuses[project.status] ?? labels.projectLabel}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{content.title}</h2>
        <p className="mt-2 text-champagne">{content.category}</p>
        <p className="mt-4 text-secondary">{content.description}</p>
        <ul aria-label={labels.technologiesLabel} className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <li key={technology} className="rounded-full bg-surface px-3 py-1 text-sm text-champagne">
              {technology}
            </li>
          ))}
        </ul>
        <Link
          to={`/projects/${project.slug}`}
          aria-label={`${labels.viewProject}: ${content.title}`}
          className="mt-6 inline-flex items-center gap-3 py-2 font-medium text-copper underline-offset-4 hover:underline"
        >
          {labels.viewProject}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export default ProjectCard
