import { useEffect, useRef, useState } from 'react'
import './PhaseFive.css'

const conceptNotes = {
  contact: 'VÉRON is a fictional horology brand. Contact details are not available for this concept.',
  instagram: 'This VÉRON concept has no official Instagram destination.',
  legal: 'VÉRON is a fictional horology brand created for this website concept.',
}

export default function PhaseFive() {
  const [entered, setEntered] = useState(false)
  const [ready, setReady] = useState(false)
  const [note, setNote] = useState('')
  const statement = useRef<HTMLDivElement>(null)
  const notes = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const showContact = () => {
      setNote(conceptNotes.contact)
      notes.current?.focus({ preventScroll: true })
    }
    window.addEventListener('veron:contact', showContact)
    return () => window.removeEventListener('veron:contact', showContact)
  }, [])

  useEffect(() => {
    const element = statement.current
    if (!element || !('IntersectionObserver' in window)) return
    setReady(true)
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setEntered(true); observer.disconnect() }
    }, { threshold: .18 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  function showNote(kind: keyof typeof conceptNotes) {
    setNote(conceptNotes[kind])
    notes.current?.focus({ preventScroll: true })
  }

  return <section id="veron" className={`closing-chapter${ready ? ' closing-ready' : ''}${entered ? ' closing-entered' : ''}`} aria-labelledby="closing-title">
    <div ref={statement} className="closing-statement">
      <p className="closing-index">04 <span aria-hidden="true">—</span> VÉRON</p>
      <h2 id="closing-title" className="closing-title" aria-label="Beyond time.">
        <span className="closing-line" aria-hidden="true"><span>BEYOND</span></span>
        <span className="closing-line" aria-hidden="true"><span>TIME.</span></span>
      </h2>
      <p className="closing-philosophy">Precision is not a feature.<br />It is a philosophy.</p>
    </div>
    <div className="closing-identity">
      <div className="closing-signature"><p className="closing-wordmark">VÉRON</p><p className="closing-origin">GENEVA / 2026</p><p className="closing-discipline">MECHANICAL HOROLOGY</p></div>
      <nav className="closing-navigation" aria-label="Closing navigation">
        <a href="#collection">COLLECTION</a><a href="#movement">MOVEMENT</a><a href="#atelier">ATELIER</a><a href="#closing-notes" onClick={() => showNote('contact')}>CONTACT</a>
      </nav>
    </div>
    <footer className="closing-footer">
      <div className="closing-footer-row"><p>© VÉRON 2026</p><span>GENEVA</span><nav aria-label="Concept information"><a href="#closing-notes" onClick={() => showNote('instagram')}>INSTAGRAM</a><a href="#closing-notes" onClick={() => showNote('legal')}>LEGAL</a></nav></div>
      <p ref={notes} id="closing-notes" className="closing-notes" role="status" tabIndex={-1}>{note}</p>
    </footer>
  </section>
}
