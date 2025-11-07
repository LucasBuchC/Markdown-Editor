import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AnalyticsProvider } from './contexts/AnalyticsContext'
import { VersionProvider } from './contexts/VersionContext'
import { DocumentProvider } from './contexts/DocumentContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AnalyticsProvider>
      <VersionProvider>
        <DocumentProvider>
          <App />
        </DocumentProvider>
      </VersionProvider>
    </AnalyticsProvider>
  </React.StrictMode>,
)
