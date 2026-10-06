import { assets, navLinks } from '../content'
import { BrandLockup } from './BrandLockup'
import { DownGlyph } from './Button'

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand-link" href="#top" aria-label="Nulset home">
        <BrandLockup />
      </a>

      <nav aria-label="Primary navigation">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
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
    </header>
  )
}
