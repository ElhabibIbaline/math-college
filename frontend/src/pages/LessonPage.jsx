import { Link, useParams } from 'react-router-dom'
import LessonQuiz from '../components/LessonQuiz'
import ProtectedCorrections from '../components/ProtectedCorrections'
import additionSoustractionRelatifs from '../content/lessons/additionSoustractionRelatifs'
import NotFoundPage from './NotFoundPage'
import { fourthLessons } from '../content/lessons/quatrieme'
import FourthLesson from '../components/FourthLesson'
import { sixthLessons } from '../content/lessons/sixieme'

const lessons = [additionSoustractionRelatifs, ...fourthLessons, ...sixthLessons]

function LessonPage() {
  const { levelId, lessonSlug } = useParams()
  const lesson = lessons.find((item) => item.level === levelId && item.slug === lessonSlug)
  if (!lesson) return <NotFoundPage />
  if (lesson.level === '4e') return <FourthLesson key={lesson.slug} lesson={lesson} />
  if (lesson.level === '6e') return <FourthLesson key={lesson.slug} lesson={lesson} sequence={sixthLessons} />

  return (
    <article className="page-section lesson-page">
      <nav className="breadcrumbs" aria-label="Fil d’Ariane"><Link to="/">Accueil</Link><span>›</span><Link to={`/niveau/${levelId}`}>{levelId}</Link><span>›</span><span>{lesson.chapter}</span></nav>
      <header className="lesson-header">
        <div><span className="eyebrow">Mathématiques · {lesson.level}</span><h1>{lesson.title}</h1><p>Une méthode simple pour comprendre les signes et calculer sans se tromper.</p></div>
        <div className="lesson-meta"><span>◷ {lesson.duration}</span><span>10 questions</span></div>
      </header>

      <section className="objectives-card"><strong>À la fin de cette leçon, tu sauras :</strong><ul>{lesson.objectives.map((objective) => <li key={objective}>✓ {objective}</li>)}</ul></section>

      <section className="lesson-block">
        <div className="block-heading"><span className="step-icon">1</span><div><span className="eyebrow">Je découvre</span><h2>Qu’est-ce qu’un nombre relatif ?</h2></div></div>
        <p>Un nombre relatif est formé d’un <strong>signe</strong>, positif ou négatif, et d’une <strong>distance à zéro</strong>.</p>
        <div className="definition-box"><strong>Exemples</strong><p><span className="math-pill positive">+5</span> est positif et <span className="math-pill negative">−3</span> est négatif. Leur distance à zéro est respectivement 5 et 3.</p></div>
      </section>

      <section className="lesson-block">
        <div className="block-heading"><span className="step-icon">2</span><div><span className="eyebrow">Je comprends</span><h2>Les trois règles essentielles</h2></div></div>
        <div className="rule-grid">
          <article><span>1</span><h3>Même signe</h3><p>J’additionne les distances à zéro et je garde le signe.</p><code>(−4) + (−3) = −7</code></article>
          <article><span>2</span><h3>Signes différents</h3><p>Je soustrais et je garde le signe du nombre le plus éloigné de zéro.</p><code>(+9) + (−4) = +5</code></article>
          <article><span>3</span><h3>Soustraction</h3><p>Je transforme la soustraction en addition de l’opposé.</p><code>a − b = a + (−b)</code></article>
        </div>
      </section>

      <section className="lesson-block">
        <div className="block-heading"><span className="step-icon">3</span><div><span className="eyebrow">J’observe</span><h2>Exemples expliqués</h2></div></div>
        <div className="worked-examples">
          <article><h3>(+3) − (−8)</h3><ol><li>Je transforme la soustraction : <strong>(+3) + (+8)</strong>.</li><li>Les deux nombres sont positifs : <strong>3 + 8 = 11</strong>.</li></ol><div className="example-answer">Résultat : <strong>+11</strong></div></article>
          <article><h3>(−12) − (−7)</h3><ol><li>Je transforme la soustraction : <strong>(−12) + (+7)</strong>.</li><li>Les signes diffèrent : <strong>12 − 7 = 5</strong>.</li><li>−12 est le plus éloigné de zéro.</li></ol><div className="example-answer">Résultat : <strong>−5</strong></div></article>
        </div>
      </section>

      <section className="lesson-block exercises-block">
        <div className="block-heading"><span className="step-icon">✎</span><div><span className="eyebrow">Je m’entraîne</span><h2>Exercices</h2><p>Effectue les calculs en détaillant les étapes.</p></div></div>
        <ol className="exercise-list">{lesson.exercises.map((exercise) => <li key={exercise}><span>{exercise}</span><span className="answer-line" aria-hidden="true" /></li>)}</ol>
        <ProtectedCorrections />
      </section>

      <LessonQuiz lesson={lesson} />
      <Link className="back-link" to={`/niveau/${levelId}`}>← Retour au programme de {levelId}</Link>
    </article>
  )
}

export default LessonPage
