import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './routes/router'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>,
)
