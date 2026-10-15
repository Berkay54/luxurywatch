import { useEffect, useRef, useState } from 'react'
import './App.css'
import PhaseTwo from './PhaseTwo'

// Brand identity and the completed site's section labels.
const brand = { name: 'VÉRON', navigation: ['COLLECTION', 'MOVEMENT', 'ATELIER', 'CONTACT'] }

function WatchFilm() {
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    const film = video.current
    if (!film) return
    let active = true
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPlayback = () => {
      if (preference.matches) {
        film.pause()
        setPlaying(false)
      } else {
        void film.play().catch(() => { if (active) setPlaying(false) })
      }
    }
    syncPlayback()
    preference.addEventListener('change', syncPlayback)
    return () => { active = false; preference.removeEventListener('change', syncPlayback) }
  }, [])
  return (
    <div className="watch-film" role="img" aria-label="A skeleton mechanical watch in polished steel, revealing its intricate movement">
      <img className="watch-poster" src="/media/hero-watch-poster.jpg" alt="" fetchPriority="high" />
      <video ref={video} className={playing ? 'watch-video is-playing' : 'watch-video'}
        src="/media/hero-watch.mov" poster="/media/hero-watch-poster.jpg"
        autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1}
        onPlaying={() => {
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.current?.pause()
          else setPlaying(true)
        }} onError={() => setPlaying(false)} />
    </div>
  )
}

function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label={`${brand.name} home`}>{brand.name}</a>
        <nav aria-label="Main navigation">
          {brand.navigation.map((item) => (
            <a key={item} href={item === 'CONTACT' ? '#closing-notes' : `#${item.toLowerCase()}`}
              onClick={item === 'CONTACT' ? () => window.dispatchEvent(new Event('veron:contact')) : undefined}>{item}</a>
          ))}
        </nav>
      </header>
      <main id="main" className="hero" aria-labelledby="hero-title">
        <WatchFilm />
        <div className="hero-editorial">
          <h1 id="hero-title" aria-label="Precision never stops.">
            <span className="headline-line"><span>PRECISION</span></span>
            <span className="headline-line"><span>NEVER</span></span>
            <span className="headline-line"><span>STOPS.</span></span>
          </h1>
          <div className="hero-details">
            <p className="supporting-copy">Mechanical excellence<br />beneath the surface.</p>
            <a className="collection-link" href="#collection">
              <span>EXPLORE COLLECTION</span><span className="cta-arrow" aria-hidden="true">⟶</span>
            </a>
          </div>
        </div>
      </main>
      <PhaseTwo />
    </div>
  )
}
export default App
