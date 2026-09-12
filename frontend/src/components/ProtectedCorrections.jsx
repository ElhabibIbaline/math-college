import { useState } from 'react'

function ProtectedCorrections() {
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('La vérification sécurisée sera activée avec le serveur. Aucun corrigé n’est stocké dans la page publique.')
  }

  return (
    <aside className="corrections-lock">
      <div className="lock-icon" aria-hidden="true">⌁</div>
      <div><span className="eyebrow">Espace protégé</span><h3>Corrigés détaillés</h3><p>Les corrigés sont réservés aux parents et aux enseignants disposant d’un code.</p></div>
      <form onSubmit={handleSubmit}><label htmlFor="correction-code">Code d’accès</label><div className="code-row"><input id="correction-code" type="password" required autoComplete="current-password" /><button className="button secondary" type="submit">Déverrouiller</button></div></form>
      {message && <p className="lock-message" role="status">{message}</p>}
    </aside>
  )
}

export default ProtectedCorrections
