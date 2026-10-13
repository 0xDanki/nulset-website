import { type FormEvent, useState } from 'react'
import { assets, REPO_URL } from '../../content'
import { Button, ExternalGlyph } from '../Button'
import { SectionLabel } from '../SectionLabel'

export function RequestAccess() {
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus('')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formsubmit.co/ajax/tin@nulset.xyz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
      })

      if (response.ok) {
        setStatus("Thanks! We'll be in touch soon :)")
        form.reset()
      } else {
        setStatus('Something went wrong. Please try again or email us directly.')
      }
    } catch {
      setStatus('Something went wrong. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
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

      <div className="request-heading">
        <SectionLabel number="05">Build with Nulset</SectionLabel>
        <h2 id="request-title">
          Bring privacy-preserving checks to your platform.
        </h2>
        <p>
          Tell us where reusable exclusion proofs could fit your workflow.
        </p>
        <a href={REPO_URL} target="_blank" rel="noreferrer">
          Explore the repository
          <ExternalGlyph />
        </a>
      </div>

      <form className="request-form" onSubmit={onSubmit}>
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

        {/* Hidden fields for FormSubmit configuration */}
        <input type="hidden" name="_subject" value="New NulSet Access Request" />
        <input type="hidden" name="_template" value="table" />

        <Button type="submit" variant="dark" icon="external" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Request access'}
        </Button>

        <p 
          className={`form-status ${status.includes('Thanks') ? 'form-status-success' : ''}`} 
          role="status" 
          aria-live="polite"
        >
          {status}
        </p>
      </form>
    </section>
  )
}
