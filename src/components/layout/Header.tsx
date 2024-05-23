import { ReactNode } from 'react'
import { useLocation } from 'react-router'

import { useSvgBg } from '@/hooks/use-svg'
import { cn } from '@/lib/utils'

const links = [
  { title: 'Home', href: '/' },
  { title: 'Subnets', href: '/subnets' },
  { title: 'Blockchain', href: '/blockchain' },
]

export const Header = ({ action }: { action?: ReactNode }) => {
  const { pathname } = useLocation()
  const { svgRef } = useSvgBg()

  return (
    <div className="h-16 border-b-1 border-solid border-border box-border sticky top-0 z-10 bg-#191A2B">
      <div className="container m-auto h-full flex justify-between items-center">
        <div className="flex items-center font-bold cursor-pointer">
          <span className="text-xl">Comex</span>
        </div>
        <div className="flex gap-4">
          {links.map((link, index) => (
            <a
              ref={svgRef}
              key={index}
              href={link.href}
              className={cn('relative p-.25 flex-col-center', pathname === link.href ? '' : '[&>svg]:hidden')}
            >
              <Button
                variant="link"
                className={cn(
                  'relative text-brand font-medium rounded-none underline-transparent',
                  pathname === link.href ? 'btn-brand-bg' : 'bg-transparent hover:bg-brand/5'
                )}
              >
                {link.title}
              </Button>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
