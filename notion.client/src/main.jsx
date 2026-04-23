import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {MantineProvider} from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import './index.css'


import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles={false} withNormalizeCSS={false}>
            <App/>
        </MantineProvider>
    </QueryClientProvider>
)