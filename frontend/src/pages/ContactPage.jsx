import { useState } from 'react'

function ContactPage() {
  const [sent, setSent] = useState(false)
  function handleSubmit(event) { event.preventDefault(); setSent(true) }

  return (
    <section className="page-section contact-page">
      <div className="contact-intro">
        <span className="eyebrow">Une question ?</span><h1>Contactez MathSimple</h1>
        <p>Une remarque, une erreur à signaler ou une idée d’amélioration ? Écrivez-nous.</p>
        <div className="contact-note"><strong>Votre avis compte</strong><p>MathSimple s’améliorera progressivement grâce aux retours des élèves, parents et enseignants.</p></div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Nom ou pseudonyme<input name="name" required /></label>
        <label>Adresse électronique<input name="email" type="email" required /></label>
        <label>Vous êtes<select name="profile" defaultValue="eleve"><option value="eleve">Élève</option><option value="parent">Parent</option><option value="enseignant">Enseignant</option><option value="autre">Autre</option></select></label>
        <label>Message<textarea name="message" rows="6" required /></label>
        <button className="button primary" type="submit">Envoyer mon message</button>
        {sent && <p className="form-message" role="status">Formulaire validé. L’envoi réel sera connecté au futur serveur.</p>}
      </form>
    </section>
  )
}

export default ContactPage
