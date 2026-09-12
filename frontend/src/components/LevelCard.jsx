import { Link } from 'react-router-dom'

function LevelCard({ level }) {
  return (
    <article className={`level-card level-${level.id}`}>
      <div className="level-card-top">
        <span className="level-badge">{level.shortLabel}</span>
        <span className="chapter-count">{level.chapters.length} thèmes</span>
      </div>
      <h3>{level.title}</h3>
      <p>{level.description}</p>
      <Link className="text-link" to={`/niveau/${level.id}`}>
        Voir les leçons <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}

export default LevelCard
