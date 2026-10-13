import { useState } from 'react'
import { Link } from 'react-router'
import { assets, navLinks } from '../content'
import { BrandLockup } from './BrandLockup'
import { DownGlyph } from './Button'

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <Link className="brand-link" to="/" aria-label="Nulset home">
        <BrandLockup />
      </Link>

      {/* Desktop nav */}
      <nav className="nav-desktop" aria-label="Primary navigation">
        {navLinks.map((link) => 
          link.href.startsWith('/') ? (
            <Link key={link.href} to={link.href} className="nav-demo-link">
              {link.label}
            </Link>
          ) : (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          )
        )}
      </nav>

      <img
        className="header-nav-symbol"
        src={assets.symbol}
        alt=""
        aria-hidden="true"
      />

      <a className="header-cta" href="#request-access">
        Request access
        <DownGlyph />
      </a>

      {/* Mobile hamburger */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
          <span />
          <span />
          <span />
        </span>
      </button>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <nav className="nav-mobile" aria-label="Mobile navigation">
          {navLinks.map((link) => 
            link.href.startsWith('/') ? (
              <Link 
                key={link.href} 
                to={link.href} 
                className="nav-demo-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a 
                key={link.href} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            )
          )}
          <a 
            href="#request-access" 
            className="nav-mobile-cta"
            onClick={() => setMobileMenuOpen(false)}
          >
            Request access
          </a>
        </nav>
      )}
    </header>
  )
}
