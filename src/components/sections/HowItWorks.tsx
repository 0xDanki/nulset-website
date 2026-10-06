import { assets, protocolSteps } from '../../content'
import { SectionLabel } from '../SectionLabel'

export function HowItWorks() {
  return (
    <section
      className="how-section"
      id="how-it-works"
      aria-labelledby="how-title"
    >
      <div className="how-heading" data-reveal>
        <SectionLabel number="02">Protocol</SectionLabel>
        <h2 id="how-title">How it works</h2>
      </div>

      <div className="protocol-geometry" aria-hidden="true" data-reveal>
        <img src={assets.shapeGeometry} alt="" data-parallax="0.55" />
      </div>

      <ol className="protocol-steps" data-reveal>
        {protocolSteps.map((step) => (
          <li key={step.number}>
            <span>{step.number}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
