import { ReactNode } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

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
        <Link to="/" className="flex items-center font-bold cursor-pointer">
          <span className="text-xl font-[Krona_One]">
            <span className="text-brand">C</span>omex
          </span>
        </Link>
        <div className="flex gap-4">
          {links.map((link, index) => (
            <Link
              ref={svgRef}
              key={index}
              to={link.href}
              className={cn('relative p-.25 flex-col-center', pathname === link.href ? '' : '[&>svg]:hidden')}
            >
              <Button
                variant="link"
                className={cn(
                  'relative text-brand font-medium rounded-none underline-transparent',
                  pathname === link.href ? 'btn-brand-bg' : 'bg-transparent hover:btn-brand-bg'
                )}
              >
                {link.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
