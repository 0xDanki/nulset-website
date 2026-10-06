import { assets } from '../content'

type BrandLockupProps = {
  compact?: boolean
}

export function BrandLockup({ compact = false }: BrandLockupProps) {
  return (
    <img
      className={`brand-lockup${compact ? ' brand-lockup-compact' : ''}`}
      src={assets.logo}
      alt="Nulset"
    />
  )
}
