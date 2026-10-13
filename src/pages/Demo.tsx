import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { assets } from '../content'
import { BrandLockup } from '../components/BrandLockup'
import { Button, ButtonLink } from '../components/Button'

type DemoStep = 'intro' | 'banlist' | 'identity' | 'proving' | 'result'

// Generate a fake but realistic-looking Merkle root
function generateFakeRoot(items: string[]): string {
  // Create a deterministic-looking hash based on the items
  let hash = 0
  const str = items.join(',')
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  // Convert to hex-like string
  const hex = Math.abs(hash).toString(16).padStart(8, '0')
  return `0x${hex}${'0'.repeat(56)}${Date.now().toString(16).slice(-8)}`
}

function DemoHeader() {
  return (
    <header className="demo-header">
      <Link to="/" className="demo-brand-link" aria-label="Back to home">
        <BrandLockup />
      </Link>
      <div className="demo-header-badge">
        <span>Interactive Demo</span>
      </div>
    </header>
  )
}

function DemoDisclaimer() {
  return (
    <div className="demo-disclaimer">
      <div className="demo-disclaimer-text">
        <strong>Heads up:</strong> This is a simplified demo to show you how it works. 
        The real deal gets custom-fitted to each system that uses it. Different lists, 
        different checking standards, way more security and UX layers. Think of this as 
        the trailer, not the movie.
      </div>
    </div>
  )
}

function ProgressBar({ step }: { step: DemoStep }) {
  const steps: { key: DemoStep; label: string }[] = [
    { key: 'intro', label: 'Start' },
    { key: 'banlist', label: 'Ban List' },
    { key: 'identity', label: 'Your ID' },
    { key: 'proving', label: 'Proof' },
    { key: 'result', label: 'Result' },
  ]
  
  const currentIndex = steps.findIndex(s => s.key === step)
  
  return (
    <div className="demo-progress">
      {steps.map((s, i) => (
        <div 
          key={s.key} 
          className={`demo-progress-step ${i <= currentIndex ? 'active' : ''} ${i === currentIndex ? 'current' : ''}`}
        >
          <span className="demo-progress-dot" />
          <span className="demo-progress-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

function IntroStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="demo-card">
      <div className="demo-card-header">
        <span className="demo-step-number">01</span>
        <h2>How it works</h2>
      </div>
      <div className="demo-card-body">
        <p>
          Imagine you want to use a service, but they need to know you're not 
          on some exclusion list—sanctions, bans, whatever. 
        </p>
        <p>
          Old way: You hand over your identity. They check a list. Now they 
          know who you are forever. Creepy.
        </p>
        <p>
          <strong>NulSet way:</strong> You prove you're <em>not</em> on the list 
          without revealing who you are. They get a yes/no answer. That's it.
        </p>
        <div className="demo-visual">
          <div className="demo-visual-old">
            <span className="demo-visual-label">Traditional</span>
            <div className="demo-visual-flow">
              <span>You</span>
              <span className="demo-arrow">→</span>
              <span className="demo-highlight-bad">Full Identity</span>
              <span className="demo-arrow">→</span>
              <span>Service</span>
            </div>
          </div>
          <div className="demo-visual-new">
            <span className="demo-visual-label">NulSet</span>
            <div className="demo-visual-flow">
              <span>You</span>
              <span className="demo-arrow">→</span>
              <span className="demo-highlight-good">ZK Proof</span>
              <span className="demo-arrow">→</span>
              <span>Service</span>
            </div>
          </div>
        </div>
      </div>
      <div className="demo-card-footer">
        <Button variant="dark" onClick={onNext}>
          Let's try it
        </Button>
      </div>
    </div>
  )
}

function BanListStep({ 
  onNext, 
  onBack,
  bannedList,
  setBannedList,
  exclusionRoot,
  setExclusionRoot 
}: { 
  onNext: () => void
  onBack: () => void
  bannedList: string[]
  setBannedList: (list: string[]) => void
  exclusionRoot: string
  setExclusionRoot: (root: string) => void
}) {
  const [inputValue, setInputValue] = useState(bannedList.join(', '))
  const [isBuilding, setIsBuilding] = useState(false)
  
  const handleInputChange = (value: string) => {
    setInputValue(value)
    // Parse comma-separated values
    const items = value
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(s => s.length > 0)
    setBannedList(items)
    // Clear the root when list changes
    if (exclusionRoot) {
      setExclusionRoot('')
    }
  }
  
  const buildRoot = () => {
    if (bannedList.length === 0) return
    
    setIsBuilding(true)
    // Simulate building time
    setTimeout(() => {
      const root = generateFakeRoot(bannedList)
      setExclusionRoot(root)
      setIsBuilding(false)
    }, 1200)
  }
  
  return (
    <div className="demo-card">
      <div className="demo-card-header">
        <span className="demo-step-number">02</span>
        <h2>Create a ban list</h2>
      </div>
      <div className="demo-card-body">
        <p>
          You're now playing the role of an <strong>authority</strong>—someone who 
          decides who's banned. This could be a compliance team, a platform admin, 
          or any trusted party.
        </p>
        <p>
          Enter some names or emails of people you want to exclude. The actual 
          list stays private—only you (the authority) know who's on it.
        </p>
        
        <div className="demo-input-group">
          <label htmlFor="banlist">Banned identifiers (comma-separated)</label>
          <textarea
            id="banlist"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="bob@banned.com, eve@malicious.org, badguy@example.com"
            rows={3}
          />
        </div>

        {bannedList.length > 0 && (
          <div className="demo-parsed-list">
            <span className="demo-parsed-label">Your ban list ({bannedList.length} {bannedList.length === 1 ? 'entry' : 'entries'}):</span>
            <div className="demo-parsed-items">
              {bannedList.map((item, i) => (
                <span key={i} className="demo-parsed-item">{item}</span>
              ))}
            </div>
          </div>
        )}

        {bannedList.length > 0 && !exclusionRoot && (
          <div className="demo-build-section">
            <Button 
              variant="dark" 
              onClick={buildRoot}
              disabled={isBuilding}
            >
              {isBuilding ? 'Building tree...' : 'Build exclusion root'}
            </Button>
            {isBuilding && (
              <p className="demo-building-note">Hashing identifiers with Poseidon and building sparse Merkle tree...</p>
            )}
          </div>
        )}

        {exclusionRoot && (
          <div className="demo-root-display">
            <div className="demo-root-header">
              <span className="demo-root-label">Exclusion Root</span>
              <span className="demo-root-badge">Ready to use</span>
            </div>
            <code className="demo-root-value">{exclusionRoot}</code>
            <p className="demo-root-note">
              This root is a cryptographic commitment to your ban list. Anyone can use 
              it to verify proofs, but they can't see who's actually on the list. 
              Platforms integrate this root—the next step simulates a user trying to 
              prove they're not banned.
            </p>
          </div>
        )}
      </div>
      <div className="demo-card-footer">
        <button className="demo-back-btn" onClick={onBack}>← Back</button>
        <Button variant="dark" onClick={onNext} disabled={!exclusionRoot}>
          Next: Test as a user
        </Button>
      </div>
    </div>
  )
}

function IdentityStep({ 
  onNext, 
  onBack,
  identifier,
  setIdentifier,
  bannedList,
  exclusionRoot
}: { 
  onNext: () => void
  onBack: () => void
  identifier: string
  setIdentifier: (id: string) => void
  bannedList: string[]
  exclusionRoot: string
}) {
  const isBanned = bannedList.includes(identifier.toLowerCase())
  
  return (
    <div className="demo-card">
      <div className="demo-card-header">
        <span className="demo-step-number">03</span>
        <h2>Now you're a user</h2>
      </div>
      <div className="demo-card-body">
        <p>
          Switch hats—you're now a regular user trying to access a platform that 
          uses the ban list you just created. Enter an identifier to see if you 
          can generate a valid proof.
        </p>
        
        <div className="demo-root-mini">
          <span className="demo-root-mini-label">Platform is checking against:</span>
          <code>{exclusionRoot.slice(0, 20)}...{exclusionRoot.slice(-8)}</code>
        </div>
        
        <div className="demo-input-group">
          <label htmlFor="identifier">Your identifier</label>
          <input
            id="identifier"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="alice@example.com"
          />
        </div>

        <div className="demo-hint">
          <strong>Try it out:</strong>
          <ul>
            <li>Enter something <em>not</em> on your ban list → proof works</li>
            <li>Enter something from your ban list → proof fails</li>
          </ul>
          <p className="demo-hint-reminder">
            Your banned list: {bannedList.slice(0, 3).map(b => <code key={b}>{b}</code>).reduce((prev, curr, i) => (
              <>{prev}{i > 0 ? ', ' : ''}{curr}</>
            ), <></>)}
            {bannedList.length > 3 && <span> and {bannedList.length - 3} more</span>}
          </p>
        </div>

        {identifier && (
          <div className={`demo-status ${isBanned ? 'demo-status-warning' : 'demo-status-ok'}`}>
            {isBanned ? (
              <>This identifier is in the exclusion list (you'll see what happens)</>
            ) : (
              <>This identifier is not in the exclusion list</>
            )}
          </div>
        )}
      </div>
      <div className="demo-card-footer">
        <button className="demo-back-btn" onClick={onBack}>← Back</button>
        <Button variant="dark" onClick={onNext} disabled={!identifier}>
          Generate proof
        </Button>
      </div>
    </div>
  )
}

function ProvingStep({ 
  onNext, 
  onBack,
  identifier,
  bannedList
}: { 
  onNext: () => void
  onBack: () => void 
  identifier: string
  bannedList: string[]
}) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState<'hashing' | 'tree' | 'proving' | 'done'>('hashing')
  
  const isBanned = bannedList.includes(identifier.toLowerCase())
  
  useEffect(() => {
    // Simulate the ZK proof generation process
    const timeouts: ReturnType<typeof setTimeout>[] = []
    
    const stages: { name: 'hashing' | 'tree' | 'proving' | 'done'; duration: number }[] = [
      { name: 'hashing', duration: 800 },
      { name: 'tree', duration: 1200 },
      { name: 'proving', duration: 1800 },
      { name: 'done', duration: 500 },
    ]
    
    let totalElapsed = 0
    const totalDuration = stages.reduce((acc, s) => acc + s.duration, 0)
    
    stages.forEach((s) => {
      timeouts.push(setTimeout(() => {
        setStage(s.name)
        if (s.name === 'done') {
          setProgress(100)
          timeouts.push(setTimeout(onNext, 600))
        }
      }, totalElapsed))
      
      // Animate progress within each stage
      const startProgress = (totalElapsed / totalDuration) * 100
      const endProgress = ((totalElapsed + s.duration) / totalDuration) * 100
      const steps = 10
      for (let j = 0; j <= steps; j++) {
        timeouts.push(setTimeout(() => {
          setProgress(startProgress + ((endProgress - startProgress) * j) / steps)
        }, totalElapsed + (s.duration * j) / steps))
      }
      
      totalElapsed += s.duration
    })
    
    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [onNext])
  
  const stageLabels = {
    hashing: 'Hashing your identifier...',
    tree: 'Checking the exclusion list...',
    proving: isBanned ? 'Attempting to generate proof...' : 'Generating proof...',
    done: isBanned ? 'Could not generate valid proof' : 'Proof complete!',
  }
  
  return (
    <div className="demo-card">
      <div className="demo-card-header">
        <span className="demo-step-number">04</span>
        <h2>Generating proof</h2>
      </div>
      <div className="demo-card-body demo-card-body-centered">
        <div className="demo-proving-visual">
          <img src={assets.symbol} alt="" className="demo-proving-symbol" />
        </div>
        
        <div className="demo-progress-bar">
          <div className="demo-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        
        <p className="demo-proving-stage">{stageLabels[stage]}</p>
      </div>
      <div className="demo-card-footer">
        <button className="demo-back-btn" onClick={onBack} disabled>← Back</button>
        <Button variant="dark" disabled>
          Processing...
        </Button>
      </div>
    </div>
  )
}

function ResultStep({ 
  onReset,
  identifier,
  bannedList,
  exclusionRoot
}: { 
  onReset: () => void
  identifier: string
  bannedList: string[]
  exclusionRoot: string
}) {
  const isBanned = bannedList.includes(identifier.toLowerCase())
  
  return (
    <div className="demo-card">
      <div className="demo-card-header">
        <span className="demo-step-number">05</span>
        <h2>{isBanned ? 'Proof failed' : 'Proof verified!'}</h2>
      </div>
      <div className="demo-card-body">
        {isBanned ? (
          <>
            <div className="demo-result demo-result-fail">
              <span className="demo-result-icon">✗</span>
              <span className="demo-result-text">Cannot generate valid proof</span>
            </div>
            <p>
              <strong>What happened:</strong> The identifier <code>{identifier}</code> is 
              in the exclusion list. The circuit detected it, so it couldn't produce a valid proof.
            </p>
            <p>
              This is the whole point—if you're on the list, you simply can't fake a proof. 
              Math doesn't lie.
            </p>
          </>
        ) : (
          <>
            <div className="demo-result demo-result-success">
              <span className="demo-result-icon">✓</span>
              <span className="demo-result-text">Valid non-membership proof</span>
            </div>
            <p>
              <strong>What the verifier sees:</strong> A cryptographic proof that your 
              identifier is NOT in the exclusion list. That's literally all they know.
            </p>
            <div className="demo-proof-display">
              <span className="demo-proof-label">Proof output (simplified)</span>
              <pre>{JSON.stringify({
                protocol: "groth16",
                verified: true,
                publicSignals: [exclusionRoot.slice(0, 20) + "..."],
                identityRevealed: false,
                listContentsRevealed: false,
              }, null, 2)}</pre>
            </div>
            <p className="demo-proof-note">
              Notice: no identity info, no list contents. Just "verified: true"
            </p>
          </>
        )}
      </div>
      <div className="demo-card-footer">
        <Button variant="yellow" onClick={onReset}>
          Start over
        </Button>
        <ButtonLink href="/#request-access" variant="dark">
          Get in touch
        </ButtonLink>
      </div>
    </div>
  )
}

export function Demo() {
  const [step, setStep] = useState<DemoStep>('intro')
  const [identifier, setIdentifier] = useState('')
  const [bannedList, setBannedList] = useState<string[]>(['bob@banned.com', 'eve@malicious.org'])
  const [exclusionRoot, setExclusionRoot] = useState('')
  
  const reset = () => {
    setStep('intro')
    setIdentifier('')
    setBannedList(['bob@banned.com', 'eve@malicious.org'])
    setExclusionRoot('')
  }
  
  return (
    <div className="demo-shell">
      <DemoHeader />
      <main className="demo-main">
        <DemoDisclaimer />
        <ProgressBar step={step} />
        
        <div className="demo-content">
          {step === 'intro' && (
            <IntroStep onNext={() => setStep('banlist')} />
          )}
          {step === 'banlist' && (
            <BanListStep 
              onNext={() => setStep('identity')}
              onBack={() => setStep('intro')}
              bannedList={bannedList}
              setBannedList={setBannedList}
              exclusionRoot={exclusionRoot}
              setExclusionRoot={setExclusionRoot}
            />
          )}
          {step === 'identity' && (
            <IdentityStep 
              onNext={() => setStep('proving')}
              onBack={() => setStep('banlist')}
              identifier={identifier}
              setIdentifier={setIdentifier}
              bannedList={bannedList}
              exclusionRoot={exclusionRoot}
            />
          )}
          {step === 'proving' && (
            <ProvingStep 
              onNext={() => setStep('result')}
              onBack={() => setStep('identity')}
              identifier={identifier}
              bannedList={bannedList}
            />
          )}
          {step === 'result' && (
            <ResultStep 
              onReset={reset}
              identifier={identifier}
              bannedList={bannedList}
              exclusionRoot={exclusionRoot}
            />
          )}
        </div>
      </main>
    </div>
  )
}
