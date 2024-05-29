import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { subnetKeys } from '@/apis/queries'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
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
    <div className="h-16 border-b-1 border-solid border-border box-border sticky top-0 z-10 bg-#191A2B">
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

          <NavigationMenu className="relative flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  ref={svgRef}
                  className={cn(
                    'flex relative py-2 px-4 text-brand font-medium rounded-none border-none underline-transparent flex-col-center h-9 bg-transparent focus-visible:ring-0 focus-visible:ring-0',
                    isSubnetDetail ? 'btn-brand-bg' : 'bg-transparent hover:!btn-brand-bg [&>svg]:hidden'
                  )}
                >
                  Subnet
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-#191A2B">
                  <ul className="grid w-[200px] gap-3 p-4 md:w-[200px] md:grid-cols-2 lg:w-[300px] 2xl:w-[600px]">
                    {subnets.map((item) => (
                      <Link
                        key={item.id}
                        to={`/subnets/${item.id}`}
                        className={`${navigationMenuTriggerStyle()} !w-full !justify-start`}
                      >
                        {item.id}: {item.name}
                      </Link>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            ref={svgRef}
            to={'/blockchain'}
            className={cn('relative p-.25 flex-col-center', pathname === '/blockchain' ? '' : '[&>svg]:hidden')}
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
