type SectionLabelProps = {
  number: string
  children: string
}

export function SectionLabel({ number, children }: SectionLabelProps) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <p>{children}</p>
    </div>
  )
}
