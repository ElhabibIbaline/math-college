import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">
            <span className="brand-mark small" aria-hidden="true">MS</span>
            <strong>MathSimple</strong>
          </div>
          <p>Les maths, expliquées simplement et sereinement.</p>
        </div>
        <div className="footer-links" aria-label="Liens du pied de page">
          <Link to="/niveau/6e">6e</Link>
          <Link to="/niveau/5e">5e</Link>
          <Link to="/niveau/4e">4e</Link>
          <Link to="/niveau/3e">3e</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <p className="footer-meta">Programme français · Version pédagogique 2026</p>
      </div>
    </footer>
  )
}

export default Footer
