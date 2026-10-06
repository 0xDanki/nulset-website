import { assets, whyNowReasons } from '../../content'
import { SectionLabel } from '../SectionLabel'

export function WhyNow() {
  return (
    <section className="why-section" id="why-now" aria-labelledby="why-title">
      <div className="why-heading" data-reveal>
        <SectionLabel number="03">Why now</SectionLabel>
        <h2 id="why-title">The market gap is already here.</h2>
      </div>

      <div className="reason-panel" data-reveal>
        {whyNowReasons.map((reason) => (
          <article key={reason.number}>
            <span>{reason.number}</span>
            <h3>{reason.title}</h3>
            <p>{reason.copy}</p>
          </article>
        ))}
      </div>

      <img
        className="why-shape"
        src={assets.whyShape}
        alt=""
        aria-hidden="true"
      />
    </section>
  )
}
