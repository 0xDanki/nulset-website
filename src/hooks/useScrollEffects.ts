import { useEffect } from 'react'

export function useScrollEffects() {
  // Handle hash scrolling on page load and hash link clicks
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }

    // Handle clicks on hash links
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href?.startsWith('#')) {
          e.preventDefault()
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            history.pushState(null, '', href)
          }
        }
      }
    }

    document.addEventListener('click', handleHashClick)
    return () => document.removeEventListener('click', handleHashClick)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const parallaxNodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]'),
    )
    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    )

    let frame = 0

    const updateParallax = () => {
      parallaxNodes.forEach((node) => {
        const rect = node.getBoundingClientRect()
        const progress =
          (window.innerHeight / 2 - (rect.top + rect.height / 2)) /
          window.innerHeight
        const strength = Number(node.dataset.parallax || 1)
        const offset = Math.max(-28, Math.min(28, progress * 30 * strength))
        node.style.setProperty('--parallax-y', `${offset}px`)
      })
    }

    const onScrollOrResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateParallax)
    }

    updateParallax()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    revealNodes.forEach((node) => observer.observe(node))

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])
}
