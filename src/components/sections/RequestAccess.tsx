import { type FormEvent, useState } from 'react'
import { assets, REPO_URL } from '../../content'
import { Button, ExternalGlyph } from '../Button'
import { SectionLabel } from '../SectionLabel'

const PREVIEW_MESSAGE =
  'This preview is not connected to a submission endpoint, so no information was sent.'

export function RequestAccess() {
  const [status, setStatus] = useState('')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus(PREVIEW_MESSAGE)
  }

  return (
    <section
      className="request-section"
      id="request-access"
      aria-labelledby="request-title"
    >
      <img
        className="request-shape"
        src={assets.shapeSocial}
        alt=""
        aria-hidden="true"
      />

      <div className="request-heading" data-reveal>
        <SectionLabel number="05">Build with Nulset</SectionLabel>
        <h2 id="request-title">
          Bring privacy-preserving checks to your platform.
        </h2>
        <p>
          Tell us where reusable exclusion proofs could fit your workflow. This
          interface is a preview while the request endpoint is being connected.
        </p>
        <a href={REPO_URL} target="_blank" rel="noreferrer">
          Explore the repository
          <ExternalGlyph />
        </a>
      </div>

      <form className="request-form" onSubmit={onSubmit} data-reveal>
        <div className="form-grid">
          <label>
            <span>Name</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            <span>Work email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
        </div>

        <label>
          <span>Organization / project</span>
          <input
            name="organization"
            type="text"
            autoComplete="organization"
            required
          />
        </label>

        <label>
          <span>How would you use Nulset?</span>
          <textarea name="useCase" rows={4} required />
        </label>

        <p className="form-note">
          Preview form — submissions are not connected yet.
        </p>

        <Button type="submit" variant="dark" icon="external">
          Request access
        </Button>

        <p className="form-status" role="status" aria-live="polite">
          {status}
        </p>
      </form>
    </section>
  )
}
