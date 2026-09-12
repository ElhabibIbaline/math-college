import { useEffect } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { memoryCards } from '../content/memoryCards'
import MemoryDeck from '../components/MemoryDeck'
import NotFoundPage from './NotFoundPage'
export default function MemoryPage(){
  const {levelId}=useParams()
  useEffect(()=>{document.title=`Cartes mémoire · ${levelId} · MathSimple`;window.scrollTo(0,0)},[levelId])
  if(!memoryCards[levelId])return <NotFoundPage/>
  return <div className="page-section memory-page"><span className="eyebrow">5 minutes pour mémoriser</span><h1>Les règles dans la tête.</h1><p className="lead">Une question à la fois. Réponds à voix haute, retourne la carte, puis repère ce qu’il faut revoir.</p><nav className="memory-levels" aria-label="Niveau des cartes mémoire">{['6e','5e','4e','3e'].map(level=><NavLink key={level} to={`/cartes-memoire/${level}`}>{level}<span>{memoryCards[level].length} cartes</span></NavLink>)}</nav><MemoryDeck key={levelId} level={levelId} cards={memoryCards[levelId]}/><Link className="back-link" to={`/niveau/${levelId}`}>← Programme de {levelId}</Link><details className="curriculum-note"><summary>À propos de ces cartes</summary><p>Des règles essentielles et des exemples originaux, à compléter par les cours et la pratique. Les cartes de 5e et de 3e sont disponibles même lorsque les leçons correspondantes ne sont pas encore rédigées.</p><p><a href="https://eduscol.education.gouv.fr/5712/ressources-d-accompagnement-du-programme-de-mathematiques-au-cycle-3">Programme de cycle 3</a> · <a href="https://eduscol.education.gouv.fr/5736/ressources-d-accompagnement-du-programme-de-mathematiques-au-cycle-4">Programmes et ressources de cycle 4</a></p></details></div>
}
