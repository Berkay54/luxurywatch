import { useEffect, useRef, useState } from 'react'
import './PhaseTwo.css'

const specifications = [
  { value: '72 H', label: 'POWER RESERVE' },
  { value: '28,800', label: 'VIBRATIONS / HOUR' },
  { value: '10 ATM', label: 'WATER RESISTANCE' },
  { value: '41 MM', label: 'CASE' },
]

// Back-to-front slices share the face's font metrics, without rasterizing it.
const depthSlices = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

function SculpturalType({ children }: { children: string }) {
  return <>
    {depthSlices.map((slice) => (
      <span key={slice} className={`movement-type-slice movement-type-slice-${slice}`} aria-hidden="true">{children}</span>
    ))}
    <span className="movement-type-face">{children}</span>
  </>
}

function MovementObject() {
  const film = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  const [prepared, setPrepared] = useState(() => !('IntersectionObserver' in window))
  useEffect(() => {
    const video = film.current
    if (!video) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let active = true
    let near = !('IntersectionObserver' in window)
    const syncPlayback = () => {
      if (!near || preference.matches) video.pause()
      else void video.play().catch(() => { /* A decoded frame remains visible if autoplay is unavailable. */ })
    }
    const ready = () => {
      if (active) setFailed(false)
      syncPlayback()
    }
    video.addEventListener('loadeddata', ready)
    preference.addEventListener('change', syncPlayback)
    let observer: IntersectionObserver | undefined
    if (!near) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= .01) {
          near = true
          video.preload = 'auto'
          setPrepared(true)
          syncPlayback()
          observer?.disconnect()
        }
      }, { threshold: .01 })
      observer.observe(video.closest('.movement-scene') ?? video)
    } else {
      video.preload = 'auto'
    }
    syncPlayback()
    return () => {
      active = false
      video.removeEventListener('loadeddata', ready)
      preference.removeEventListener('change', syncPlayback)
      observer?.disconnect()
    }
  }, [])
  return (
    <div className="movement-object" role="img" aria-label="An intimate view of a skeleton watch: sculpted bridges, interlocking gears and a living balance wheel">
      <video ref={film} src="/media/movement-skeleton.mp4" autoPlay={prepared} muted loop playsInline
        preload="metadata" aria-hidden="true" tabIndex={-1}
        onPlaying={() => {
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) film.current?.pause()
        }} onError={() => setFailed(true)} />
      {failed && <span className="movement-fallback">Mechanical detail unavailable</span>}
    </div>
  )
}

export default function PhaseTwo() {
  const scene = useRef<HTMLElement>(null)
  useEffect(() => {
    const section = scene.current
    if (!section || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add('movement-entered')
        observer.disconnect()
      }
    }, { threshold: 0.12 })
    section.classList.add('movement-ready')
    observer.observe(section)
    return () => {
      observer.disconnect()
      section.classList.remove('movement-ready', 'movement-entered')
    }
  }, [])

  return (
    <section ref={scene} id="movement" className="movement-scene" aria-labelledby="movement-title">
      <div className="movement-index"><span>01 <span aria-hidden="true">—</span> THE MOVEMENT</span><span aria-hidden="true">MECHANICAL EXCELLENCE</span></div>
      <h2 id="movement-title" className="movement-title" aria-label="Engineered to endure.">
        <span className="movement-engineered" aria-hidden="true"><SculpturalType>ENGINEERED</SculpturalType></span>
        <span className="movement-endure" aria-hidden="true"><SculpturalType>TO ENDURE.</SculpturalType></span>
        {/* Registered copies let the mechanism pass between selected letterforms.
            They share the exact type metrics and responsive anchors of the originals. */}
        <span className="movement-engineered movement-type-front" aria-hidden="true"><SculpturalType>ENGINEERED</SculpturalType></span>
        <span className="movement-endure movement-type-front" aria-hidden="true"><SculpturalType>TO ENDURE.</SculpturalType></span>
      </h2>
      <MovementObject />
      <div className="movement-note"><span className="movement-note-number" aria-hidden="true">01 /</span><p>A mechanical architecture<br />shaped by precision, balance<br />and uninterrupted motion.</p></div>
      <p className="movement-detail" aria-hidden="true">BENEATH THE SURFACE<br /><span>PRECISION IN EVERY PART.</span></p>
      <dl className="movement-rail" aria-label="Watch specifications">
        {specifications.map(({ value, label }) => (
          <div className="movement-spec" key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}
      </dl>
    </section>
  )
}
