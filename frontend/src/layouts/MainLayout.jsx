import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

function MainLayout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <Header />
      <main id="contenu"><Outlet /></main>
      <Footer />
    </div>
  )
}

export default MainLayout
