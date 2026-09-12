import { NavLink } from 'react-router-dom'

const navigation = [
  { label: 'Accueil', to: '/' },
  { label: '6e', to: '/niveau/6e' },
  { label: '5e', to: '/niveau/5e' },
  { label: '4e', to: '/niveau/4e' },
  { label: '3e', to: '/niveau/3e' },
  { label: 'Cartes mémoire', to: '/cartes-memoire' },
  { label: 'Ma progression', to: '/progression' },
  { label: 'Contact', to: '/contact' },
]

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink className="brand" to="/" aria-label="MathSimple, accueil">
          <span className="brand-mark" aria-hidden="true">MS</span>
          <span>MathSimple</span>
        </NavLink>
        <nav className="main-nav" aria-label="Navigation principale">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
