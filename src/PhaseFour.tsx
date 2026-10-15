import { useEffect, useRef, useState } from 'react'
import './PhaseFour.css'

const chapters = [
  { name: 'MATERIAL', image: '/media/atelier-case.png', alt: 'Macro view of brushed steel, a polished case bevel and the signed VÉRON crown', copy: 'Finished by contrast.\nBrushed surfaces meet\nmirror-polished edges.', data: [['316L STEEL', 'MATERIAL'], ['BRUSHED / POLISHED', 'SURFACE FINISH'], ['MICRON', 'PRECISION']] },
  { name: 'CALIBRE', image: '/media/atelier-calibre.png', alt: 'A balance assembly, ruby jewels and finely finished bridges inside the mechanical calibre', copy: 'Hundreds of interactions.\nOne continuous measure of time.', data: [['28,800', 'VIBRATIONS / HOUR'], ['72 H', 'POWER RESERVE'], ['JEWELLED', 'ESCAPEMENT']] },
  { name: 'ASSEMBLY', image: '/media/atelier-craft.png', alt: 'A watchmaker uses tweezers to place a ruby jewel into a mechanical movement', copy: 'Precision becomes personal.', data: [['ASSEMBLED', 'BY HAND'], ['INSPECTED', 'BY EYE'], ['REGULATED', 'BY PRECISION']] },
]
const sequenceQuery = '(max-width: 1023px), (max-height: 650px), (prefers-reduced-motion: reduce)'
const decoded = new Map<string, Promise<void>>()
function prepareImage(source: string) {
  let pending = decoded.get(source)
  if (!pending) {
    const image = new Image()
    image.src = source
    pending = image.decode().catch((error: unknown) => { decoded.delete(source); throw error })
    decoded.set(source, pending)
  }
  return pending
}

function AtelierIntroduction() {
  return <div className="atelier-introduction">
    <p className="atelier-kicker">03 <span aria-hidden="true">—</span> THE ATELIER</p>
    <h2 id="atelier-title">CRAFTED<br /><span>BEYOND</span><br />MEASURE.</h2>
    <p className="atelier-intro-copy">Every surface finished.<br />Every component considered.<br />Every movement assembled by precision.</p>
  </div>
}

function AtelierFrame({ index, phase = '', decorative = false }: { index: number; phase?: string; decorative?: boolean }) {
  const chapter = chapters[index]
  const [failed, setFailed] = useState(false)
  return <article className={`atelier-frame atelier-frame-${index} ${phase}`} aria-hidden={decorative || undefined} aria-label={`${index + 1} — ${chapter.name}`}>
    <span className="atelier-architectural" aria-hidden="true">{chapter.name}</span>
    <div className="atelier-photograph">
      <img src={chapter.image} alt={decorative ? '' : chapter.alt} width="1672" height="941" loading="lazy" decoding="async" onError={() => setFailed(true)} />
      {failed && <p className="atelier-image-error">{chapter.name} photograph unavailable.</p>}
    </div>
    <div className="atelier-scene-heading"><span>0{index + 1}</span><h3>{chapter.name}</h3></div>
    <p className="atelier-scene-copy">{chapter.copy}</p>
    <div className="atelier-measure" aria-hidden="true"><span className="atelier-measure-point" /><span className="atelier-measure-rule" /><span>DETAIL / 0{index + 1}</span></div>
    <dl className="atelier-data">{chapter.data.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <span className="atelier-plate" aria-hidden="true">VÉRON / ATELIER STUDY 0{index + 1}</span>
  </article>
}

export default function PhaseFour() {
  const [sequence, setSequence] = useState(() => window.matchMedia(sequenceQuery).matches)
  const [desired, setDesired] = useState(0)
  const [active, setActive] = useState(0)
  const [incoming, setIncoming] = useState<number | null>(null)
  const [error, setError] = useState('')
  const region = useRef<HTMLElement>(null)

  useEffect(() => {
    const preference = window.matchMedia(sequenceQuery)
    const sync = () => { setSequence(preference.matches); setIncoming(null) }
    preference.addEventListener('change', sync)
    return () => preference.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const element = region.current
    if (!element) return
    // Warm the three decoded images only when the reader approaches Atelier.
    // The cache holds no additional full-resolution DOM image elements.
    const preload = () => { void Promise.allSettled(chapters.map(chapter => prepareImage(chapter.image))) }
    if (!('IntersectionObserver' in window)) { preload(); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { preload(); observer.disconnect() }
    }, { rootMargin: '100% 0px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (sequence) return
    let frame = 0
    const update = () => {
      const element = region.current
      if (!element) return
      const travel = Math.max(1, element.offsetHeight - window.innerHeight)
      const progress = Math.max(0, Math.min(1, -element.getBoundingClientRect().top / travel))
      setDesired(Math.min(2, Math.floor(progress * 3)))
    }
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [sequence])

  useEffect(() => {
    if (sequence || incoming !== null || desired === active) return
    let cancelled = false
    void prepareImage(chapters[desired].image).then(() => {
      if (!cancelled) { setError(''); setIncoming(desired) }
    }).catch(() => { if (!cancelled) setError(`${chapters[desired].name} photograph could not be loaded. Scroll to another chapter to continue.`) })
    return () => { cancelled = true }
  }, [sequence, desired, active, incoming])

  useEffect(() => {
    if (sequence || incoming === null) return
    // One controlled sequence at a time. If scrolling changes direction or
    // skips chapters, the newest desired chapter is resolved after this one.
    const timer = setTimeout(() => { setActive(incoming); setIncoming(null) }, 900)
    return () => clearTimeout(timer)
  }, [incoming, sequence])

  return <section ref={region} id="atelier" className={`atelier-region ${sequence ? 'atelier-sequence' : 'atelier-sticky'}${incoming === null ? '' : ` atelier-changing atelier-${incoming > active ? 'forward' : 'backward'}`}`} aria-labelledby="atelier-title">
    {sequence ? <>
      <AtelierIntroduction />
      {chapters.map((chapter, index) => <AtelierFrame key={chapter.name} index={index} />)}
    </> : <>
      <div className="atelier-stage" data-active={active} data-target={desired} aria-busy={incoming !== null}>
        <AtelierIntroduction />
        <AtelierFrame key={active} index={active} phase={incoming === null ? '' : 'atelier-outgoing'} decorative />
        {incoming !== null && <AtelierFrame key={incoming} index={incoming} phase="atelier-incoming" decorative />}
        <div className="atelier-progress" aria-hidden="true">{chapters.map((chapter, index) => <span key={chapter.name} className={active === index ? 'atelier-progress-current' : ''}>0{index + 1}<span>{chapter.name}</span></span>)}</div>
        <p className="atelier-scroll-note" aria-hidden="true">SCROLL TO EXPLORE <span>↓</span></p>
        <p className="atelier-status" role="status">{error || `${String(active + 1).padStart(2, '0')} — ${chapters[active].name}`}</p>
      </div>
      <div className="atelier-accessible">{chapters.map((chapter) => <div key={chapter.name}><h3>{chapter.name}</h3><p>{chapter.alt}</p><p>{chapter.copy}</p><dl>{chapter.data.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div>)}</div>
    </>}
  </section>
}
