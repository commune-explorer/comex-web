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

function App() {
  const { toasts } = useToast()
  return (
    <div className="min-h-100vh flex flex-col">
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -10,
          backgroundImage: 'url("/bg-pattern.svg")',
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
        }}
      />
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
