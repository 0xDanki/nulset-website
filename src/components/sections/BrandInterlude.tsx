import { assets } from '../../content'

export function BrandInterlude() {
  return (
    <section className="brand-interlude" aria-label="Nulset brand statement">
      <div className="interlude-copy" data-reveal>
        <span>The third path</span>
        <h2>
          Compliance<br />
          without surveillance.<br />
          Freedom<br />
          without chaos.
        </h2>
        <p>
          Nulset gives platforms a reusable way to enforce an exclusion boundary
          while revealing as little as possible about the person standing outside
          it.
        </p>
      </div>

      <div className="interlude-art" aria-hidden="true">
        <img
          className="interlude-animal"
          src={assets.interludeArt}
          alt=""
          data-parallax="0.25"
        />
      </div>
    </section>
  )
}
