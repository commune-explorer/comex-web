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
  // under maintenance
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-3xl text-emerald">Under maintenance</h1>
    <p>We apologize for the inconvenience. Our site is currently undergoing maintenance and will be back soon.</p>
  </div>
  // <QueryClientProvider client={queryClient}>
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // </QueryClientProvider>
)
