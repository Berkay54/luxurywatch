import { useEffect, useRef, useState } from 'react'
import './PhaseThree.css'

const models = [
  { name: 'NOCTURNE', size: '41', movement: 'AUTOMATIC', reserve: '72', image: '/media/nocturne-41.png', description: 'Black sunburst dial and brushed steel bracelet' },
  { name: 'SQUELETTE', size: '41', movement: 'SKELETON AUTOMATIC', reserve: '72', image: '/media/squelette-41.png', description: 'Openworked mechanical dial and brushed steel bracelet' },
  { name: 'ÉCLIPSE', size: '42', movement: 'CHRONOGRAPH', reserve: '60', image: '/media/eclipse-42.png', description: 'Black three-register chronograph and brushed steel bracelet' },
]

const nameDepth = [8, 7, 6, 5, 4, 3, 2, 1]

function SpatialName({ index, phase = '' }: { index: number; phase?: string }) {
  return (
    <div className={`collection-backtype ${phase}`} data-model={index} aria-hidden="true">
      <span className="collection-name-material">
        {nameDepth.map((depth) => <span key={depth} className={`collection-name-slice collection-name-slice-${depth}`}>{models[index].name}</span>)}
        <span className="collection-name-face">{models[index].name}</span>
      </span>
    </div>
  )
}

function ModelInformation({ index }: { index: number }) {
  const model = models[index]
  return <>
    <p className="collection-model-kind">{model.movement}</p>
    <h3>{model.name} <span>{model.size}</span></h3>
    <dl className="collection-technical">
      <div><dt>CASE</dt><dd>{model.size} MM</dd></div>
      <div><dt>POWER RESERVE</dt><dd>{model.reserve} H</dd></div>
      <div><dt>WATER RESISTANCE</dt><dd>10 ATM</dd></div>
    </dl>
  </>
}

export default function PhaseThree() {
  const [selected, setSelected] = useState(0)
  const [incoming, setIncoming] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)
  const [reducedSwitch, setReducedSwitch] = useState(false)
  const [entrance, setEntrance] = useState('')
  const [error, setError] = useState('')
  const section = useRef<HTMLElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const switching = useRef(false)
  const mounted = useRef(false)
  const current = models[selected]

  useEffect(() => {
    const element = section.current
    if (!element) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const reset = () => {
      cancelAnimationFrame(frame)
      element.style.setProperty('--collection-pointer-x', '0')
      element.style.setProperty('--collection-pointer-y', '0')
    }
    const move = (event: PointerEvent) => {
      if (switching.current || reduced.matches || !fine.matches || event.pointerType === 'touch') { reset(); return }
      cancelAnimationFrame(frame)
      const bounds = element.getBoundingClientRect()
      const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1))
      const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1))
      const radius = Math.max(1, Math.hypot(x, y))
      frame = requestAnimationFrame(() => {
        if (switching.current || reduced.matches || !fine.matches) return
        element.style.setProperty('--collection-pointer-x', String(x / radius))
        element.style.setProperty('--collection-pointer-y', String(y / radius))
      })
    }
    element.addEventListener('pointermove', move, { passive: true })
    element.addEventListener('pointerleave', reset)
    fine.addEventListener('change', reset)
    reduced.addEventListener('change', reset)
    return () => {
      reset()
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerleave', reset)
      fine.removeEventListener('change', reset)
      reduced.removeEventListener('change', reset)
    }
  }, [])

  // A live preference change finishes the pending scene immediately. The
  // static composition is identical, including the registered type anchors.
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finish = () => {
      if (!preference.matches || incoming === null) return
      if (timer.current) clearTimeout(timer.current)
      setSelected(incoming)
      setIncoming(null)
      setBusy(false)
      switching.current = false
    }
    preference.addEventListener('change', finish)
    return () => preference.removeEventListener('change', finish)
  }, [incoming])

  useEffect(() => {
    mounted.current = true
    const element = section.current
    let observer: IntersectionObserver | undefined
    if (element && 'IntersectionObserver' in window) {
      setEntrance(' collection-ready')
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setEntrance(' collection-ready collection-entered')
          observer?.disconnect()
        }
      }, { threshold: .12 })
      observer.observe(element)
    }
    return () => {
      mounted.current = false
      observer?.disconnect()
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  async function selectModel(index: number) {
    if (index === selected || switching.current) return
    switching.current = true
    section.current?.style.setProperty('--collection-pointer-x', '0')
    section.current?.style.setProperty('--collection-pointer-y', '0')
    setBusy(true)
    setError('')
    try {
      // Decode off-DOM before starting the reveal, retaining the current object
      // during loading. Only the outgoing and incoming images coexist briefly.
      const next = new Image()
      next.src = models[index].image
      await next.decode()
      if (!mounted.current) return
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setReducedSwitch(reduced)
      setIncoming(index)
      timer.current = setTimeout(() => {
        setSelected(index)
        setIncoming(null)
        setBusy(false)
        switching.current = false
      }, reduced ? 140 : 1000)
    } catch {
      if (!mounted.current) return
      setError('This model could not be loaded. Please select it again.')
      setBusy(false)
      switching.current = false
    }
  }

  return (
    <section ref={section} id="collection" className={`collection-scene${entrance}${incoming === null ? '' : ` collection-switching collection-${incoming > selected ? 'forward' : 'backward'}${reducedSwitch ? ' collection-switch-reduced' : ''}`}`} aria-labelledby="collection-title">
      <div className="collection-chapter"><span>02 <span aria-hidden="true">—</span> THE COLLECTION</span><span>03 MODELS</span></div>
      <h2 id="collection-title" className="collection-statement">OBJECTS OF<br /><span>PRECISION.</span></h2>
      <nav id="collection-models" className="collection-index" aria-label="Select a watch model">
        {models.map((model, index) => (
          <button key={model.name} type="button" aria-label={`${model.name} ${model.size}, ${model.movement}`} aria-pressed={selected === index} aria-controls="collection-exhibit" aria-disabled={busy}
            onClick={() => void selectModel(index)}>
            <span className="collection-index-number">0{index + 1}</span><span>{model.name} {model.size}<small>{model.movement}</small></span>
            <span className="collection-index-mark" aria-hidden="true">↗</span>
          </button>
        ))}
      </nav>
      <div id="collection-exhibit" className="collection-exhibit" aria-busy={busy}>
        <SpatialName key={current.name} index={selected} phase={incoming === null ? '' : 'collection-type-leaving'} />
        {incoming !== null && <SpatialName key={models[incoming].name} index={incoming} phase="collection-type-arriving" />}
        <div className="collection-object">
          <img key={current.image} className={incoming === null ? 'collection-product' : 'collection-product collection-product-leaving'}
            src={current.image} alt={`${current.name} ${current.size} — ${current.description}`} width="1145" height="1374" loading="lazy" decoding="async"
            onError={() => setError('The product image could not be loaded. Please select another model.')} />
          {incoming !== null && <img key={models[incoming].image} className="collection-product collection-product-arriving" src={models[incoming].image}
            alt="" aria-hidden="true" width="1145" height="1374" decoding="async" />}
          {incoming !== null && <span className="collection-studio-light" aria-hidden="true" />}
        </div>
        <span className="collection-object-number" aria-hidden="true">
          <span className={incoming === null ? 'collection-counter-face' : 'collection-counter-face collection-copy-leaving'}>0{selected + 1}<span className="collection-counter-total">/ 03</span></span>
          {incoming !== null && <span className="collection-counter-face collection-copy-arriving">0{incoming + 1}<span className="collection-counter-total">/ 03</span></span>}
        </span>
      </div>
      <div className="collection-information" aria-live="polite" aria-atomic="true">
        <div className={incoming === null ? 'collection-info-copy' : 'collection-info-copy collection-copy-leaving'}><ModelInformation index={selected} /></div>
        {incoming !== null && <div className="collection-info-copy collection-copy-arriving" aria-hidden="true"><ModelInformation index={incoming} /></div>}
      </div>
      <p className="collection-error" role="status">{error}</p>
      <button className="collection-discover" type="button" onClick={() => dialog.current?.showModal()}>
        DISCOVER THE COLLECTION <span aria-hidden="true">⟶</span>
      </button>
      <p className="collection-footnote" aria-hidden="true">THREE EXPRESSIONS.<br />ONE PURSUIT OF PRECISION.</p>
      <dialog ref={dialog} className="collection-dialog" aria-labelledby="collection-register-title" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close() }}>
        <div className="collection-register">
          <button className="collection-dialog-close" type="button" onClick={() => dialog.current?.close()}>CLOSE <span aria-hidden="true">×</span></button>
          <p className="collection-model-kind">VÉRON — THE COLLECTION</p>
          <h2 id="collection-register-title">Three expressions.<br />One precision.</h2>
          <div className="collection-register-models">
            {models.map((model, index) => <button key={model.name} type="button" onClick={() => { dialog.current?.close(); void selectModel(index) }}>
              <span className="collection-index-number">0{index + 1}</span><span>{model.name} {model.size}<small>{model.movement} · {model.size} MM · {model.reserve} H · 10 ATM</small></span><span aria-hidden="true">↗</span>
            </button>)}
          </div>
        </div>
      </dialog>
    </section>
  )
}
