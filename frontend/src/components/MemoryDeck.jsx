import { useState } from 'react'
import { Link } from 'react-router-dom'

const storageKey = 'mathsimple-memory-v1'
export function readMemory() {
  try { const data = JSON.parse(localStorage.getItem(storageKey) || '{}'); return data && typeof data === 'object' && !Array.isArray(data) ? data : {} } catch { return {} }
}
export default function MemoryDeck({ cards, level }) {
  const [topic, setTopic] = useState('all')
  const [mode, setMode] = useState('all')
  const [order, setOrder] = useState(cards.map(c=>c.id))
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [ratings, setRatings] = useState(readMemory)
  const [notice, setNotice] = useState('')
  const lookup = new Map(cards.map(c=>[c.id,c]))
  const pool = order.map(id=>lookup.get(id)).filter(c=>c && (topic==='all'||c.topic===topic) && (mode==='all'||ratings[c.id]==='review'))
  const position = pool.length ? index % pool.length : 0
  const current = pool[position]
  const known = cards.filter(c=>ratings[c.id]==='known').length
  const review = cards.filter(c=>ratings[c.id]==='review').length
  function move(delta) { setIndex((position+delta+pool.length)%pool.length); setRevealed(false); setNotice('') }
  function rate(value) {
    const next = {...ratings, [current.id]:value}
    setRatings(next)
    let saved = true
    try { localStorage.setItem(storageKey,JSON.stringify({...readMemory(),...next})) } catch { saved=false }
    setNotice(`${value==='known' ? 'Carte marquée « Je savais ».' : 'Carte ajoutée à tes révisions.'}${saved ? '' : ' Ce choix reste valable ici, mais sa sauvegarde est bloquée par le navigateur.'}`)
    if(mode==='all'||value==='review') setIndex((position+1)%pool.length)
    else setIndex(position)
    setRevealed(false)
  }
  function shuffle() {
    const next=[...order]
    for(let i=next.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[next[i],next[j]]=[next[j],next[i]]}
    setOrder(next);setIndex(0);setRevealed(false);setNotice('Les cartes ont été mélangées.')
  }
  function clearRating() {
    const next={...ratings};delete next[current.id];setRatings(next)
    try { const saved=readMemory();delete saved[current.id];localStorage.setItem(storageKey,JSON.stringify(saved));setNotice('Cette carte est de nouveau non évaluée.') } catch { setNotice('Choix retiré ici ; sauvegarde indisponible.') }
    setRevealed(false)
  }
  return <section className={`memory-deck memory-${level}`} aria-label={`Cartes mémoire de ${level}`}>
    <div className="memory-score"><span><strong>{cards.length}</strong> cartes</span><span><strong>{known}</strong> « Je savais »</span><span><strong>{review}</strong> à revoir</span></div>
    <div className="course-toolbar memory-toolbar"><label>Choisir un thème<select aria-label="Choisir un thème" value={topic} onChange={e=>{setTopic(e.target.value);setIndex(0);setRevealed(false)}}><option value="all">Tous les thèmes</option>{[...new Set(cards.map(c=>c.topic))].map(t=><option key={t}>{t}</option>)}</select></label><label>Mon paquet<select aria-label="Mon paquet" value={mode} onChange={e=>{setMode(e.target.value);setIndex(0);setRevealed(false)}}><option value="all">Toutes les cartes</option><option value="review">Seulement « À revoir »</option></select></label><button type="button" className="button secondary" onClick={shuffle}>Mélanger</button></div>
    <p className="memory-notice" role="status">{notice}</p>
    {current ? <>
      <div className="memory-card-top"><span>{current.topic}</span><span>Carte {position+1} / {pool.length}</span></div>
      <div className="memory-flip-stage"><button type="button" className={`memory-flip ${revealed?'is-flipped':''}`} aria-label={revealed?'Revenir à la question':'Retourner la carte pour voir la réponse'} aria-pressed={revealed} onClick={()=>setRevealed(!revealed)} onKeyDown={e=>{if(e.key==='ArrowRight'&&pool.length>1){e.preventDefault();move(1)}else if(e.key==='ArrowLeft'&&pool.length>1){e.preventDefault();move(-1)}}}>
        <span className="memory-face memory-front" aria-hidden={revealed}><span className="memory-face-label">RECTO · LA QUESTION</span><span className="memory-flip-question">{current.question}</span><span className="memory-flip-hint">Réponds de mémoire, puis retourne la carte.</span><span className="memory-flip-action">Voir la réponse ↻</span></span>
        <span className="memory-face memory-back" aria-hidden={!revealed}><span className="memory-face-label">VERSO · LA RÈGLE À RETENIR</span><span className="memory-flip-answer">{current.answer}</span><span className="memory-flip-action">Revoir la question ↻</span></span>
      </button></div>
      <div className="memory-review-panel"><p>{revealed?'L’avais-tu trouvée sans regarder ?':'Retourne la carte avant de choisir ton repère.'}</p><div className="memory-rating"><button type="button" className="button secondary" disabled={!revealed} onClick={()=>rate('review')}>À revoir</button><button type="button" className="button primary" disabled={!revealed} onClick={()=>rate('known')}>Je savais ✓</button></div>{revealed && current.href && <Link className="text-link memory-course-link" to={current.href}>Revoir le cours et les exercices →</Link>}</div>
      {ratings[current.id] && <div className="memory-existing"><span>Ton repère : {ratings[current.id]==='known'?'Je savais':'À revoir'}</span><button type="button" className="text-link button-reset" onClick={clearRating}>Retirer ce repère</button></div>}
      <div className="deck-controls"><button type="button" className="button secondary" disabled={pool.length<2} onClick={()=>move(-1)}>← Précédente</button><span>Clavier : Entrée pour retourner · ← → pour changer</span><button type="button" className="button secondary" disabled={pool.length<2} onClick={()=>move(1)}>Suivante →</button></div>
    </> : <div className="empty-state"><h2>Aucune carte à revoir dans ce thème</h2><p>Après avoir retourné une carte, choisis « À revoir » pour la retrouver ici.</p><button className="button primary" onClick={()=>{setMode('all');setIndex(0)}}>Voir les cartes du thème</button></div>}
    <p className="memory-footnote">Tes repères sont une autoévaluation, pas une note. Reviens demain, puis quelques jours plus tard. Ils sont enregistrés dans ce navigateur uniquement.</p>
  </section>
}

