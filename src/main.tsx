import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './assets/styles/index.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

console.table(import.meta.env)

const queryClient = new QueryClient()

const root = createRoot(document.getElementById('root')!)
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
)
