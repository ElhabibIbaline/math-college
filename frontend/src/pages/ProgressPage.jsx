import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { readProgress } from '../content/progress'
import { fourthLessons } from '../content/lessons/quatrieme'
import { sixthLessons } from '../content/lessons/sixieme'
import additionSoustractionRelatifs from '../content/lessons/additionSoustractionRelatifs'

export default function ProgressPage() {
  const [progress, setProgress] = useState(readProgress)
  const [message, setMessage] = useState('')
  const [undo, setUndo] = useState(null)
  useEffect(() => { document.title = 'Ma progression · MathSimple'; window.scrollTo(0,0) }, [])
  function update(next) {
    try { localStorage.setItem('mathsimple-progress', JSON.stringify(next)); setProgress(next); return true }
    catch { setMessage('Le navigateur ne permet pas de modifier les résultats enregistrés.'); return false }
  }
  function remove(slug) {
    const next = { ...progress }; delete next[slug]
    if (update(next)) { setUndo({ slug, result: progress[slug] }); setMessage('Résultat effacé. Tu peux annuler cette action.') }
  }
  function restore() {
    if (undo && update({ ...progress, [undo.slug]: undo.result })) { setUndo(null); setMessage('Résultat restauré.') }
  }
  const completed = [...sixthLessons, additionSoustractionRelatifs, ...fourthLessons].filter(l => Number.isFinite(progress[l.slug]?.score))
  return <section className="page-section narrow-page"><span className="eyebrow">Mon espace</span><h1>Ma progression</h1><p className="lead">{completed.length} quiz terminé(s). Tes meilleurs scores sont conservés dans ce navigateur.</p><p role="status">{message}</p>{undo && <button className="button secondary" onClick={restore}>Annuler l’effacement</button>}{completed.length ? completed.map(l=><article className="progress-result-card" key={l.slug}><span className={`level-badge level-${l.level}`}>{l.level}</span><div><h2>{l.title}</h2><p>Dernier résultat : {progress[l.slug].lastScore ?? progress[l.slug].score}/{l.quiz.length} · {(progress[l.slug].lastScore ?? progress[l.slug].score) < l.quiz.length ? 'À retravailler' : 'Quiz réussi'}</p><Link className="text-link" to={`/niveau/${l.level}/lecon/${l.slug}`}>Revoir et s’entraîner →</Link><br/><button className="text-link button-reset correction-toggle" onClick={()=>remove(l.slug)}>Effacer ce résultat</button></div><strong>{progress[l.slug].score}/{l.quiz.length}</strong></article>) : <div className="empty-state"><h2>Ton parcours commence ici</h2><p>Termine un quiz pour retrouver ton résultat et les notions à reprendre.</p><Link className="button primary" to="/">Choisir mon niveau</Link></div>}<Link className="back-link" to="/">← Tous les niveaux</Link></section>
}

