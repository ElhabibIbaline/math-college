import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fourthLessons } from '../content/lessons/quatrieme'
import { readProgress } from '../content/progress'
import MemoryDeck from './MemoryDeck'
import { memoryCards } from '../content/memoryCards'
export default function FourthLevel({ level }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const progress = readProgress()
  const done = fourthLessons.filter(l => Number.isFinite(progress[l.slug]?.score)).length
  const needsReview = l => Number.isFinite(progress[l.slug]?.lastScore ?? progress[l.slug]?.score) && (progress[l.slug].lastScore ?? progress[l.slug].score) < l.quiz.length
  const review = fourthLessons.filter(needsReview)
  const next = review[0] || fourthLessons.find(l => !Number.isFinite(progress[l.slug]?.score)) || fourthLessons[0]
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const chapters = level.chapters.map(c => ({ ...c, lessons: c.lessons.filter(l => normalize(l.title+' '+l.chapter).includes(normalize(search)) && (filter!=='review'||needsReview(l))) })).filter(c=>c.lessons.length)
  useEffect(() => { document.title = 'Programme de 4e · MathSimple'; window.scrollTo(0,0) }, [])
  return <section className="page-section level-page fourth-level">
    <div className="page-intro"><span className="level-badge level-4e">4e</span><div><span className="eyebrow">Mathématiques · 2026–2027</span><h1>{level.title}</h1><p>Comprends une idée, essaie, puis vérifie. Un parcours complet pour apprendre à ton rythme.</p></div></div>
    <div className="study-start"><div><span className="eyebrow">Ta prochaine séance · 20 minutes</span><h2>{next.title}</h2><p>5 min de cours · 10 min de pratique · 5 min pour te tester.</p><Link className="button primary" to={`/niveau/4e/lecon/${next.slug}`}>{review.length ? 'Reprendre une notion' : 'Ouvrir ma leçon'}</Link></div><div className="study-count"><strong>{done}<small> / {fourthLessons.length}</small></strong><span>quiz terminés</span><progress value={done} max={fourthLessons.length} aria-label="Quiz terminés"/><Link to="/progression">Voir mes résultats →</Link></div></div>
    <div className="content-counts"><span><strong>8</strong> chapitres</span><span><strong>17</strong> leçons</span><span><strong>34</strong> exercices corrigés</span><span><strong>51</strong> questions de quiz</span><a href="#revision">Cartes de révision ↓</a></div>
    <div className="course-toolbar"><label>Rechercher une notion<input type="search" placeholder="Fractions, Pythagore, volumes…" value={search} onChange={e=>setSearch(e.target.value)}/></label><label>Afficher<select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">Toutes les leçons</option><option value="review">À retravailler ({review.length})</option></select></label></div>
    <p role="status">{chapters.reduce((n,c)=>n+c.lessons.length,0)} leçon(s) affichée(s){filter==='review' && ' · Selon ton dernier quiz : moins de 3 bonnes réponses.'}</p>
    <div className="chapter-grid">{chapters.map(c=><article className="chapter-card" key={c.title}><span className="chapter-number">CHAPITRE {level.chapters.findIndex(ch=>ch.title===c.title)+1}</span><h2>{c.title}</h2><ul className="lesson-directory">{c.lessons.map(l=><li key={l.slug}><Link to={`/niveau/4e/lecon/${l.slug}`}><span>{l.title}</span><small>{Number.isFinite(progress[l.slug]?.score) ? `Meilleur quiz : ${progress[l.slug].score}/${l.quiz.length}` : `${l.duration} · Cours + exercices`}<span aria-hidden="true"> →</span></small></Link></li>)}</ul></article>)}</div>
    {!chapters.length && <div className="empty-state"><h2>{filter==='review'&&!search ? 'Aucune notion signalée à retravailler' : 'Aucune leçon trouvée'}</h2><p>{filter==='review' ? 'Les quiz déjà tentés avec moins de 3 bonnes réponses apparaîtront ici.' : 'Essaie un terme plus court, comme « fraction » ou « triangle ».'}</p><button className="button secondary" onClick={()=>{setFilter('all');setSearch('')}}>Afficher tout le programme</button></div>}
    <section className="lesson-block revision-deck" id="revision"><span className="eyebrow">Révision active</span><h2>Les règles de 4e à mémoriser</h2><p>Réponds de mémoire, vérifie et repère les cartes à revoir.</p><MemoryDeck level="4e" cards={memoryCards['4e']}/><Link className="back-link" to="/cartes-memoire/4e">Cartes mémoire de tous les niveaux →</Link></section>
    <details className="curriculum-note"><summary>Programme et sources pédagogiques</summary><p>Contenus originaux conçus pour les attendus de 4e applicables en 2026–2027. Le nouveau programme de cycle 4 publié en 2026 entre en vigueur en 4e à la rentrée 2027. La progression proposée peut être adaptée à l’ordre des chapitres de ton professeur.</p><p><a href="https://eduscol.education.gouv.fr/media/74682/download?attachment=" target="_blank" rel="noreferrer">Attendus de fin d’année de 4e · Éduscol (PDF)</a> · <a href="https://www.education.gouv.fr/bo/2026/Hebdo10/MENE2602912A" target="_blank" rel="noreferrer">Calendrier officiel d’application</a></p><p>Références vérifiées en septembre 2026. Les résultats sont conservés uniquement dans ce navigateur, sans compte ni synchronisation.</p></details>
    <Link className="back-link" to="/">← Retour à l’accueil</Link>
  </section>
}

