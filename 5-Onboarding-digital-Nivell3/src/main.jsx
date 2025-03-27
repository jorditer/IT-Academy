import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './css/style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App className='text-justify bg-fuchsia-900'/>
  </StrictMode>
)