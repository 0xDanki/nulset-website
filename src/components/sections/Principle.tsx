import { assets } from '../../content'
import { SectionLabel } from '../SectionLabel'

export function Principle() {
  return (
    <section
      className="principle-section"
      id="protocol"
      aria-labelledby="principle-title"
    >
      <div className="principle-copy" data-reveal>
        <SectionLabel number="01">The principle</SectionLabel>
        <h2 id="principle-title">
          Efficiency can be attained by excluding the few—not by identifying the
          many.
        </h2>
        <p>
          Most compliance systems ask who a person is. Nulset asks only what the
          platform actually needs to know.
        </p>
      </div>

      <div className="principle-visual" aria-hidden="true" data-reveal>
        <img
          className="principle-shape"
          src={assets.principleShape}
          alt=""
        />
        <img
          className="principle-animal"
          src={assets.crocodile}
          alt=""
          data-parallax="0.35"
        />
      </div>

      <div className="comparison">
        <div className="comparison-default">
          <span>Most systems prove</span>
          <p>I am X / I passed KYC / I have done XYZ</p>
        </div>
        <div className="comparison-focus">
          <span>Nulset proves</span>
          <strong>This user is not in the set.</strong>
        </div>
      </div>
    </section>
  )
}
