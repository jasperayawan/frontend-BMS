import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './routes/router'
import { BrowserRouter } from 'react-router-dom'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Theme>
  </StrictMode>,
)
