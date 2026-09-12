import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fourthLessons } from '../content/lessons/quatrieme'
import { parseAnswer } from '../content/progress'
import LessonQuiz from './LessonQuiz'
import MathLab from './MathLab'
import SixthLab from './SixthLab'

function Practice({ exercise, index }) {
  const [value, setValue] = useState('')
  const [feedback, setFeedback] = useState('')
  const [reveal, setReveal] = useState(false)
  function check(event) {
    event.preventDefault()
    const number = parseAnswer(value)
    setFeedback(number === null ? 'Écris un nombre ou une fraction, par exemple −2,5 ou 1/3, sans unité.' : Math.abs(number - exercise.answer) < 0.00001 ? 'Bravo, ta réponse est correcte ! Explique maintenant ta démarche.' : 'Pas encore. Consulte l’indice, puis essaie à nouveau.')
  }
  return <article className="practice-card">
    <span className="eyebrow">{index === 0 ? 'Application directe' : 'Je résous un problème'}</span>
    <h3>{exercise.question}</h3>
    <form onSubmit={check}><label htmlFor={`answer-${index}`}>Ta réponse (sans unité)</label><div className="practice-input"><input id={`answer-${index}`} value={value} onChange={e => { setValue(e.target.value); setFeedback('') }} placeholder="Ex. : 2,5 ou 1/3" autoComplete="off" /><button className="button primary" type="submit">Vérifier</button></div></form>
    <p role="status" className="practice-feedback">{feedback}</p>
    <details><summary>Un indice</summary><p>{exercise.hint}</p></details>
    <button className="text-link button-reset correction-toggle" type="button" aria-expanded={reveal} onClick={() => setReveal(!reveal)}>{reveal ? 'Masquer la solution' : 'Comprendre la solution'}</button>
    {reveal && <p className="example-answer">{exercise.solution}</p>}
  </article>
}

export default function FourthLesson({ lesson, sequence = fourthLessons }) {
  const [shown, setShown] = useState(1)
  const index = sequence.indexOf(lesson)
  const next = sequence[index + 1]
  useEffect(() => { window.scrollTo(0, 0); document.title = `${lesson.title} · ${lesson.level} · MathSimple` }, [lesson])
  return <article className={`page-section lesson-page fourth-lesson ${lesson.level === '6e' ? 'sixth-lesson' : ''}`}>
    <nav className="breadcrumbs" aria-label="Fil d’Ariane"><Link to="/">Accueil</Link><span>›</span><Link to={`/niveau/${lesson.level}`}>{lesson.level}</Link><span>›</span><span>{lesson.chapter}</span></nav>
    <header className="lesson-header"><div><span className="eyebrow">Leçon {index + 1} / {sequence.length} · {lesson.level}</span><h1>{lesson.title}</h1><p>À connaître avant de commencer : {lesson.prerequisite}</p></div><div className="lesson-meta"><span>{lesson.duration}</span><span>2 exercices · 3 questions</span></div></header>
    <nav className="lesson-jumps" aria-label="Étapes de la leçon"><a href="#cours">1. Comprendre</a><a href="#exemple">2. Observer</a>{lesson.lab && <a href="#laboratoire">Manipuler</a>}<a href="#exercices">3. Pratiquer</a><a href="#quiz">4. Se tester</a><a href="#memo">Mémo</a></nav>
    <section className="objectives-card"><strong>{lesson.level === '6e' ? 'Les questions à explorer' : 'Ton objectif'}</strong><ul>{lesson.objectives.map(o => <li key={o}>✓ {o}</li>)}</ul></section>
    <section className="lesson-block" id="cours"><span className="eyebrow">Je comprends</span><h2>Les repères essentiels</h2><div className="course-rules">{lesson.rules.map(([title, text], i) => <section key={title}><span className="step-icon">{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></section>)}</div></section>
    <section className="lesson-block" id="exemple"><span className="eyebrow">Un exemple pas à pas</span><h2>{lesson.example[0]}</h2><p>Essaie sur ton brouillon avant d’afficher chaque étape.</p><ol className="example-steps">{lesson.example.slice(1, shown + 1).map(s => <li key={s}>{s}</li>)}</ol><div aria-live="polite" className="sr-only">{shown} étape(s) affichée(s)</div>{shown < lesson.example.length - 1 ? <button type="button" className="button secondary" onClick={() => setShown(shown + 1)}>Afficher l’étape suivante</button> : <button type="button" className="text-link button-reset" onClick={() => setShown(1)}>Reprendre l’exemple</button>}</section>
    {lesson.lab && (lesson.level === '6e' ? <SixthLab kind={lesson.lab} /> : <MathLab kind={lesson.lab} />)}
    <section className="lesson-block" id="exercices"><span className="eyebrow">Je m’entraîne</span><h2>À toi de chercher</h2><p>Écris les étapes sur ton brouillon. Saisis une réponse exacte : les virgules et les fractions sont acceptées.</p><div className="practice-grid">{lesson.exercises.map((e, i) => <Practice key={e.question} exercise={e} index={i} />)}</div></section>
    <LessonQuiz lesson={lesson} />
    <section className="lesson-block memo-card" id="memo"><span className="eyebrow">Je mémorise</span><h2>Ce que je dois pouvoir expliquer</h2><p>Cache les réponses et explique chaque règle à voix haute. Reviens demain, dans trois jours, puis dans une semaine.</p>{lesson.rules.map(([title, text]) => <details key={title}><summary>{title}</summary><p>{text}</p></details>)}<Link className="button secondary print-button" to={`/cartes-memoire/${lesson.level}`}>Mes cartes mémoire</Link> <button type="button" className="button secondary print-button" onClick={() => window.print()}>Imprimer la fiche mémo</button></section>
    <div className="print-memo">{lesson.rules.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}<h2>Exemple</h2><p>{lesson.example.join(' ')}</p></div>
    <nav className="lesson-bottom" aria-label="Continuer le parcours"><Link to={`/niveau/${lesson.level}`}>← Programme de {lesson.level}</Link>{next && <Link to={`/niveau/${lesson.level}/lecon/${next.slug}`}>Leçon suivante : {next.title} →</Link>}</nav>
  </article>
}


