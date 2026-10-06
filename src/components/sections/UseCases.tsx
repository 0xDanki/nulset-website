import { useCases } from '../../content'
import { SectionLabel } from '../SectionLabel'

export function UseCases() {
  return (
    <section
      className="use-section"
      id="use-cases"
      aria-labelledby="use-title"
    >
      <div className="use-heading" data-reveal>
        <SectionLabel number="04">Use cases</SectionLabel>
        <h2 id="use-title">Guardrails without surveillance.</h2>
      </div>

      <div className="use-grid">
        {useCases.map((useCase) => (
          <article
            key={useCase.number}
            className={`use-case use-case-${useCase.tone}`}
            data-reveal
          >
            <div className="use-case-copy">
              <span>{useCase.number}</span>
              <h3>{useCase.title}</h3>
              <p>{useCase.copy}</p>
            </div>
            <div className="use-case-art" aria-hidden="true">
              {useCase.shape ? (
                <img
                  className="use-case-shape"
                  src={useCase.shape}
                  alt=""
                />
              ) : null}
              <img
                className="use-case-animal"
                src={useCase.artwork}
                alt=""
                data-parallax={useCase.number === '03' ? '0.45' : '0.3'}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
