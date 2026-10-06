import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Icon = 'external' | 'down'

function Glyph({ icon }: { icon: Icon }) {
  return (
    <span aria-hidden="true">{icon === 'external' ? '↗' : '↓'}</span>
  )
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'dark' | 'yellow'
  icon?: Icon
  children: ReactNode
}

export function ButtonLink({
  variant = 'dark',
  icon,
  children,
  className = '',
  ...props
}: ButtonLinkProps) {
  return (
    <a className={`button button-${variant} ${className}`.trim()} {...props}>
      {children}
      {icon ? <Glyph icon={icon} /> : null}
    </a>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'dark' | 'yellow'
  icon?: Icon
  children: ReactNode
}

export function Button({
  variant = 'dark',
  icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button className={`button button-${variant} ${className}`.trim()} {...props}>
      {children}
      {icon ? <Glyph icon={icon} /> : null}
    </button>
  )
}

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: Icon
  children: ReactNode
}

export function TextLink({
  icon,
  children,
  className = '',
  ...props
}: TextLinkProps) {
  return (
    <a className={`text-link ${className}`.trim()} {...props}>
      {children}
      {icon ? <Glyph icon={icon} /> : null}
    </a>
  )
}

export function ExternalGlyph() {
  return <Glyph icon="external" />
}

export function DownGlyph() {
  return <Glyph icon="down" />
}
