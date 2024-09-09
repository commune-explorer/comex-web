import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Link, NavLink } from 'react-router-dom'

import { subnetKeys } from '@/apis/queries'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSvgBg } from '@/hooks/use-svg'
import { cn } from '@/lib/utils'
import { type IBlock, type IDelegationEvents, type ISubnet } from '@/types'
import { get } from '@/utils'

export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { svgRef } = useSvgBg()

  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const { data: { data: { subnets = [] } = {} } = {} } = useQuery<{ data: { subnets: Array<ISubnet> } }>({
    queryKey: subnetKeys.all,
    queryFn: () => get('/api/subnets'),
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    let params = {
      query: searchQuery,
    } as Record<PropertyKey, any>
    get<{ data: { url: string } }>(`/api/search`, { params })
      .then((resp) => {
        navigate(resp.data.url)
      })
      .finally(() => {
        setSearchQuery('')
        setIsSearching(false)
      })
  }

  return (
    <div className="h-16 border-b-1 border-solid box-border sticky top-0 z-10 bg-#070907 lt-sm:(px-4)">
      <div className="container m-auto h-full flex justify-between items-center">
        <Link to="/" className="flex items-center font-bold cursor-pointer">
          <span className="text-xl font-[Orbitron]">
            <span className="text-brand">C</span>OMEX
          </span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 mx-4 lt-sm:(hidden)">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by Account / Block / Extrinsic"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-20 !shadow-[none] !outline-none rounded-none bg-transparent text-brand placeholder-green-500/90 caret-green-500"
            />
            <Button
              type="submit"
              className="absolute right-0 top-0 bottom-0 uppercase px-3 py-2 self-stretch bg-transparent hover:text-foreground hover:bg-#ADACE316 text-brand"
            >
              {isSearching ? <span className="animate-spin text-brand i-mingcute:loading-fill"></span> : 'Search'}
            </Button>
          </div>
        </form>
        <div className="flex gap-4 lt-sm:(hidden)">
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
                pathname.startsWith('/subnets/') ? 'btn-brand-bg' : 'bg-transparent hover:!btn-brand-bg [&>svg]:hidden'
              )}
            >
              <div className="py-2 px-4 text-brand font-medium">Subnets</div>
            </PopoverTrigger>
            <PopoverContent className="bg-[#060606] p-0 mt-4 mr-2 w-150 shadow-lg text-sm">
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
            className={cn(
              'relative flex-col-center',
              pathname.startsWith('/blockchain') ? 'btn-brand-bg' : '[&>svg]:hidden bg-transparent hover:btn-brand-bg'
            )}
          >
            <div className="py-2 px-4 text-brand font-medium">Blockchain</div>
          </Link>
        </div>

        <MenuItem subnets={subnets} />
      </div>
    </div>
  )
}

function MenuItem({ subnets }: { subnets: any[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="w-6 h-6 sm:hidden i-lucide:menu"></span>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-3">
          <SheetClose asChild>
            <NavLink to="/">Home</NavLink>
          </SheetClose>

          <Separator />

          <span>Subnets</span>
          {subnets.map((item) => (
            <SheetClose asChild key={item.id}>
              <NavLink
                to={`/subnets/${item.id}`}
                className={'text-xs uppercase self-stretch bg-transparent text-muted-foreground'}
              >
                {item.id}: {item.name}
              </NavLink>
            </SheetClose>
          ))}

          <Separator />

          <SheetClose asChild>
            <NavLink to="/blockchain" className="capitalize">
              blockchain
            </NavLink>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
