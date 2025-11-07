import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { DocumentProvider } from './contexts/DocumentContext'
import { VersionProvider } from './contexts/VersionContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VersionProvider>
      <DocumentProvider>
        <App />
      </DocumentProvider>
    </VersionProvider>
  </React.StrictMode>,
)
