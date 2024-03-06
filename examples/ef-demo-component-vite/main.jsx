import React from 'react'
import ReactDOM from 'react-dom/client'
import EFDemoComponent from './EFDemoComponent.jsx'
import './style.css'

export async function init() {

}

export function mount() {
  ReactDOM.createRoot(document.getElementById('ef-demo-vite-container')).render(
    <React.StrictMode>
      <EFDemoComponent />
    </React.StrictMode>,
  )
}
