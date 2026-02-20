import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <MantineProvider withGlobalStyles={false} withNormalizeCSS={false}>
      <App />
    </MantineProvider>
)