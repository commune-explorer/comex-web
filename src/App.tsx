import { useEffect } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import routes from '~react-pages'

import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'

function Redirect({ to }: { to: string }) {
  let navigate = useNavigate()
  useEffect(() => {
    navigate(to)
  }, [navigate, to])
  return null
}
console.log({ routes })
function App() {
  const { toasts } = useToast()
  return (
    <div className="min-h-100vh flex flex-col bg-gradient-to-br from-#191A2B to-#191A2B">
      <Header />
      <div className="flex-1"> {useRoutes([...routes, { path: '*', element: <Redirect to="/" /> }])}</div>
      <Footer />
      <ToastProvider duration={2000}>
        {toasts.map(function ({ id, title, description, action, ...props }) {
          return (
            <Toast key={id} {...props}>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
              {action}
              <ToastClose />
            </Toast>
          )
        })}
        <ToastViewport />
      </ToastProvider>
    </div>
  )
}

export default App
