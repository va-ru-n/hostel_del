import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  ['Home', '#home'],
  ["Today's special", '#special'],
  ['How it works', '#how-it-works'],
  ['Feedback', '#feedback'],
]

export default function Navbar({ onOrder }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="site-header">
      <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); navigate('#home') }}>
        <img className="brand-logo" src="/hostelhome-logo.png" alt="HostelHome rice bowl and house logo" />
      </a>
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={(event) => { event.preventDefault(); navigate(href) }}>
            {label}
          </a>
        ))}
        <button className="button button-dark nav-order" type="button" onClick={() => { setMenuOpen(false); onOrder() }}>
          Order today <span aria-hidden="true">↗</span>
        </button>
      </nav>
    </header>
  )
}
