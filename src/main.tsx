import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PhaseThree from './PhaseThree.tsx'
import PhaseFour from './PhaseFour.tsx'
import PhaseFive from './PhaseFive.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <PhaseThree />
    <PhaseFour />
    <PhaseFive />
  </StrictMode>,
)
