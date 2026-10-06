import { REPO_URL } from '../../content'
import { BrandLockup } from '../BrandLockup'
import { ExternalGlyph } from '../Button'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <BrandLockup compact />
        <p>Compliance without surveillance, at scale.</p>
      </div>

      <div className="footer-meta">
        <a href={REPO_URL} target="_blank" rel="noreferrer">
          GitHub
          <ExternalGlyph />
        </a>
        <span>Privacy / Proof / Protocol</span>
      </div>
    </footer>
  )
}
