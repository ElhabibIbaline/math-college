import { Link, useParams } from 'react-router-dom'
import { getLevel } from '../content/levels'
import NotFoundPage from './NotFoundPage'
import FourthLevel from '../components/FourthLevel'
import SixthLevel from '../components/SixthLevel'
import { memoryCards } from '../content/memoryCards'

function LevelPage() {
  const { levelId } = useParams()
  const level = getLevel(levelId)
  if (!level) return <NotFoundPage />
  if (levelId === '4e') return <FourthLevel level={level} />
  if (levelId === '6e') return <SixthLevel level={level} />

  return (
    <section className="page-section level-page">
      <div className="page-intro">
        <span className={`level-badge level-${level.id}`}>{level.shortLabel}</span>
        <div><span className="eyebrow">Programme de {level.shortLabel}</span><h1>{level.title}</h1><p>{level.description}</p></div>
      </div>
      <aside className="level-memory-banner"><div><span className="eyebrow">Un rituel de 5 minutes</span><h2>Les règles essentielles de {levelId}</h2><p>{memoryCards[levelId].length} cartes mémoire : réponds, vérifie, puis retrouve les notions à revoir.</p></div><Link className="button primary" to={`/cartes-memoire/${levelId}`}>Ouvrir mes cartes</Link></aside>
      <div className="chapter-grid">
        {level.chapters.map((chapter, index) => (
          <article className="chapter-card" key={chapter.title}>
            <span className="chapter-number">{String(index + 1).padStart(2, '0')}</span>
            <h2>{chapter.title}</h2>
            {chapter.lessons.length > 0 ? (
              <>
                <p>{chapter.lessons[0].title}</p>
                <Link className="text-link" to={`/niveau/${level.id}/lecon/${chapter.lessons[0].slug}`}>Commencer la leçon →</Link>
              </>
            ) : (
              <>
                <p>Les leçons et exercices de ce chapitre seront ajoutés prochainement.</p>
                <button className="text-link button-reset" type="button" disabled>Bientôt disponible</button>
              </>
            )}
          </article>
        ))}
      </div>
      <Link className="back-link" to="/">← Retour à l’accueil</Link>
    </section>
  )
}

export default LevelPage
