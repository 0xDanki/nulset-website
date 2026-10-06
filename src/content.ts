export const REPO_URL = 'https://github.com/0xDanki/nulset'

const base = import.meta.env.BASE_URL

export const assets = {
  logo: `${base}assets/logo.png`,
  symbol: `${base}assets/symbol.png`,
  heroArt: `${base}assets/hero-art.png`,
  principleShape: `${base}assets/principle-shape.png`,
  crocodile: `${base}assets/crocodile.png`,
  pig: `${base}assets/pig.png`,
  monkey: `${base}assets/monkey.png`,
  shapeInfra: `${base}assets/shape-infra.png`,
  shapeGeometry: `${base}assets/shape-geometry.png`,
  shapeSocial: `${base}assets/shape-social.png`,
  whyShape: `${base}assets/why-shape.png`,
  interludeArt: `${base}assets/interlude-art.png`,
} as const

export const navLinks = [
  { href: '#top', label: 'Overview' },
  { href: '#protocol', label: 'Principle' },
  { href: '#how-it-works', label: 'Protocol' },
  { href: '#why-now', label: 'Market gap' },
  { href: '#use-cases', label: 'Use cases' },
] as const

export const heroMeta = [
  'No list disclosure',
  'No identity collection',
  'Reusable roots',
  'Verifiable anywhere',
] as const

export const protocolSteps = [
  {
    number: '1',
    title: 'Publish an updateable exclusion root',
    copy: 'An authority commits a known bad-actor set to a reusable Merkle root.',
  },
  {
    number: '2',
    title: 'Generate a zero-knowledge proof',
    copy: 'A user proves non-membership against that root without revealing their identity.',
  },
  {
    number: '3',
    title: 'Verify on-chain or off-chain',
    copy: 'Any platform can check the same precise result wherever its workflow runs.',
  },
  {
    number: '4',
    title: 'Disclose neither list nor identity',
    copy: 'The proof reveals only the fact the platform actually needs to know.',
  },
  {
    number: '5',
    title: 'Reuse roots across platforms',
    copy: 'One exclusion boundary can support many products without rebuilding compliance logic.',
  },
] as const

export const whyNowReasons = [
  {
    number: '01',
    title: 'The lists already exist',
    copy: 'Platforms already use blacklists, but enforcement remains centralized and permissioned.',
  },
  {
    number: '02',
    title: 'Identity creates liability',
    copy: 'Collecting more personal data increases privacy risk without making every decision more trustworthy.',
  },
  {
    number: '03',
    title: 'ZK is ready for workflows',
    copy: 'Zero-knowledge proofs are fast and practical enough to move beyond bespoke demonstrations.',
  },
] as const

export type UseCaseTone = 'signal' | 'mist' | 'paper'

export const useCases: {
  number: string
  title: string
  copy: string
  artwork: string
  shape: string | null
  tone: UseCaseTone
}[] = [
  {
    number: '01',
    title: 'Infrastructure access',
    copy: 'Gate APIs and critical infrastructure against known bad-actor sets without collecting every user’s identity.',
    artwork: assets.crocodile,
    shape: assets.shapeInfra,
    tone: 'signal',
  },
  {
    number: '02',
    title: 'Payments & DeFi',
    copy: 'Add reusable exclusion checks to payment and decentralized finance workflows without exposing the underlying list.',
    artwork: assets.pig,
    shape: assets.shapeGeometry,
    tone: 'mist',
  },
  {
    number: '03',
    title: 'Social platforms',
    copy: 'Moderate forums and social systems with narrowly scoped proofs instead of building permanent identity dossiers.',
    artwork: assets.monkey,
    shape: assets.shapeSocial,
    tone: 'paper',
  },
  {
    number: '04',
    title: 'Anonymous markets',
    copy: 'Preserve pseudonymity while proving one precise fact: the participant is not part of an excluded set.',
    artwork: assets.heroArt,
    shape: null,
    tone: 'mist',
  },
]
