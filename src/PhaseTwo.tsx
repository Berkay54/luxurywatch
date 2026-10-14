import { useEffect, useRef, useState } from 'react'
import './PhaseTwo.css'

const specifications = [
  { value: '72 H', label: 'POWER RESERVE' },
  { value: '28,800', label: 'VIBRATIONS / HOUR' },
  { value: '10 ATM', label: 'WATER RESISTANCE' },
  { value: '41 MM', label: 'CASE' },
]

function SkeletonFilm() {
  const film = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const video = film.current
    if (!video) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let active = true
    const syncPlayback = () => {
      if (preference.matches) video.pause()
      else void video.play().catch(() => { if (active) setFailed(true) })
    }
    syncPlayback()
    preference.addEventListener('change', syncPlayback)
    return () => { active = false; preference.removeEventListener('change', syncPlayback) }
  }, [])
  return (
    <div className="cinematic-film cinematic-film-skeleton" role="img" aria-label="A dark skeleton watch revealing its balance wheel, gears and mechanical architecture">
      <video ref={film} src="/media/movement-skeleton.mp4" autoPlay muted loop playsInline
        preload="auto" aria-hidden="true" tabIndex={-1}
        onLoadedData={() => {
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) film.current?.pause()
        }}
        onPlaying={() => {
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) film.current?.pause()
          else setFailed(false)
        }} onError={() => setFailed(true)} />
      {failed && <span className="cinematic-fallback">Mechanical detail</span>}
    </div>
  )
}

export default function PhaseTwo() {
  return (
    <div className="phase-two">
      <section className="cinematic-scene skeleton-scene" aria-labelledby="movement-title">
        <SkeletonFilm />
        <div className="scene-editorial skeleton-editorial">
          <p className="scene-label">01 <span aria-hidden="true">—</span> THE MOVEMENT</p>
          <h2 id="movement-title">ENGINEERED<br /><span>TO ENDURE.</span></h2>
          <p className="scene-copy">A mechanical architecture shaped by precision, balance and uninterrupted motion.</p>
        </div>
      </section>
      <dl className="precision-rail" aria-label="Watch specifications">
        {specifications.map(({ value, label }) => (
          <div className="precision-spec" key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}
      </dl>
    </div>
  )
}
