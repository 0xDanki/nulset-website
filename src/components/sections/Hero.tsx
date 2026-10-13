import { Link } from 'react-router'
import { assets, heroMeta } from '../../content'
import { ButtonLink } from '../Button'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">
          Prove less.
          <br />
          Know enough.
        </h1>
        <p className="hero-lede">
          Prove you’re not on the list. Reusable, privacy-preserving exclusion
          checks for platforms that need confidence—not another identity
          database to maintain and secure.
        </p>
        <div className="hero-actions">
          <ButtonLink href="#request-access" variant="dark" icon="external">
            Request access
          </ButtonLink>
          <Link to="/demo" className="button button-yellow">
            Try the demo
          </Link>
        </div>
      </div>

      <div className="hero-art" aria-hidden="true">
        <img src={assets.heroArt} alt="" data-parallax="0.7" />
        <img className="hero-symbol" src={assets.symbol} alt="" />
      </div>

      <div className="hero-meta" aria-label="Nulset protocol attributes">
        {heroMeta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  )
}
