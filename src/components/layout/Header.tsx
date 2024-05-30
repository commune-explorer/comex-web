import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { subnetKeys } from '@/apis/queries'
import { useSvgBg } from '@/hooks/use-svg'
import { cn } from '@/lib/utils'
import { type ISubnet } from '@/types'
import { get } from '@/utils'

export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { svgRef } = useSvgBg()

  const { data: { data: { subnets = [] } = {} } = {} } = useQuery<{ data: { subnets: Array<ISubnet> } }>({
    queryKey: subnetKeys.all,
    queryFn: () => get('/api/subnets'),
  })

  const isSubnetDetail = /^\/subnets\/[^/]+$/.test(pathname)

  return (
    <div className="h-16 border-b-1 border-solid box-border sticky top-0 z-10 bg-#191A2B">
      <div className="container m-auto h-full flex justify-between items-center">
        <Link to="/" className="flex items-center font-bold cursor-pointer">
          <span className="text-xl font-[Orbitron]">
            <span className="text-brand">C</span>OMEX
          </span>
        </Link>
        <div className="flex gap-4">
          <Link
            ref={svgRef}
            to={'/'}
            className={cn('relative p-.25 flex-col-center', pathname === '/' ? '' : '[&>svg]:hidden')}
          >
            <Button
              variant="link"
              className={cn(
                'relative text-brand font-medium rounded-none underline-transparent',
                pathname === '/' ? 'btn-brand-bg' : 'bg-transparent hover:btn-brand-bg'
              )}
            >
              Home
            </Button>
          </Link>

          <Popover>
            <PopoverTrigger
              ref={svgRef}
              className={cn(
                'relative',
                isSubnetDetail ? 'btn-brand-bg' : 'bg-transparent hover:!btn-brand-bg [&>svg]:hidden'
              )}
            >
              <div className="py-2 px-4 text-brand font-medium">Subnets</div>
            </PopoverTrigger>
            <PopoverContent className="bg-#191A29 p-0 mt-4 mr-2 w-150 shadow-lg text-sm">
              <div className="bg-#ADACE308 grid gap-3 p-4 grid-cols-1 md:grid-cols-3">
                {subnets.map((item) => (
                  <Link
                    key={item.id}
                    to={`/subnets/${item.id}`}
                    className={
                      'uppercase px-3 py-2 self-stretch bg-transparent text-muted-foreground hover:text-foreground hover:bg-#ADACE316'
                    }
                  >
                    {item.id}: {item.name}
                  </Link>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Link
            ref={svgRef}
            to={'/blockchain'}
            className={cn('!hidden relative p-.25 flex-col-center', pathname === '/blockchain' ? '' : '[&>svg]:hidden')}
          >
            <Button
              variant="link"
              className={cn(
                'relative text-brand font-medium rounded-none underline-transparent',
                pathname === '/blockchain' ? 'btn-brand-bg' : 'bg-transparent hover:btn-brand-bg'
              )}
            >
              Blockchain
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
