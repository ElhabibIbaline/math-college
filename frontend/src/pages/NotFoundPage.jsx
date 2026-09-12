import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="page-section narrow-page not-found">
      <span className="error-code">404</span><h1>Cette page n’existe pas</h1>
      <p>Pas d’inquiétude, tu peux reprendre ton parcours depuis l’accueil.</p>
      <Link className="button primary" to="/">Retour à l’accueil</Link>
    </section>
  )
}

export default NotFoundPage
