import { Link } from 'react-router-dom'
import LevelCard from '../components/LevelCard'
import { levels } from '../content/levels'

function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Apprendre à son rythme</span>
          <h1>Les maths deviennent <span>plus simples.</span></h1>
          <p>Des cours courts, des exemples expliqués et des quiz pour progresser sereinement de la 6e à la 3e.</p>
          <div className="hero-actions">
            <a className="button primary" href="#niveaux">Choisir mon niveau</a>
            <Link className="button secondary" to="/progression">Voir ma progression</Link>
          </div>
          <div className="trust-row" aria-label="Avantages de MathSimple">
            <span>✓ Conforme au programme</span><span>✓ Explications pas à pas</span><span>✓ Travail sans distraction</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Exemple de parcours MathSimple">
          <div className="formula-bubble formula-one">3 × (4 + 2)</div>
          <div className="lesson-preview">
            <div className="preview-top"><span className="preview-icon" aria-hidden="true">π</span><span>Leçon du jour</span></div>
            <h2>Les nombres relatifs</h2>
            <p>Comprendre les signes et calculer sans se tromper.</p>
            <div className="progress-track" aria-label="Progression 65 %"><span style={{ width: '65%' }} /></div>
            <small>65 % terminé</small>
          </div>
          <div className="formula-bubble formula-two">x + 7 = 12</div>
        </div>
      </section>
      <section className="levels-section" id="niveaux">
        <div className="section-heading">
          <div><span className="eyebrow">Ton parcours</span><h2>Choisis ton niveau</h2></div>
          <p>Chaque espace rassemble les leçons, exercices et quiz de ton programme.</p>
        </div>
        <div className="level-grid">{levels.map((level) => <LevelCard key={level.id} level={level} />)}</div>
      </section>
      <section className="method-section">
        <div className="section-heading centered"><span className="eyebrow">Une méthode simple</span><h2>Comprendre, pratiquer, réussir</h2><p>Avance tranquillement, une étape après l’autre.</p></div>
        <div className="method-grid">
          <article><span>1</span><h3>Je comprends</h3><p>Un cours court et des exemples détaillés.</p></article>
          <article><span>2</span><h3>Je m’entraîne</h3><p>Des exercices progressifs adaptés à mon niveau.</p></article>
          <article><span>3</span><h3>Je me teste</h3><p>Un quiz de 10 questions avec des explications.</p></article>
        </div>
      </section>
    </>
  )
}

export default HomePage
