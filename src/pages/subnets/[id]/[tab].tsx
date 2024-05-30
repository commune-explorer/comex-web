import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'

import { subnetKeys } from '@/apis/queries'
import { LeaderBoard } from '@/components/subnets/LeaderBoard'
import { ModulesPanel } from '@/components/subnets/ModulesPanel'
import { ParamsPanel } from '@/components/subnets/ParamsPanel'
import { Prompting } from '@/components/subnets/Prompting'
import { useSvgBg } from '@/hooks/use-svg'
import { cn } from '@/lib/utils'
import type { ISubnet } from '@/types'
import { get } from '@/utils'

export default function SubnetsPage() {
  const nav = useNavigate()
  const { id, tab = '' } = useParams()
  const netuid = parseInt(id ?? '0')
  const currentTab = tab.charAt(0).toUpperCase() + tab.slice(1)

  const tabs = useMemo(() => (netuid > 0 ? ['Modules', 'Parameters', 'Leaderboard'] : ['Modules']), [netuid])

  const { svgRef } = useSvgBg()
  const { data: { data } = {} } = useQuery<{ data: ISubnet }>({
    queryKey: subnetKeys.detail(netuid),
    queryFn: () => get(`/api/subnets/${netuid}`),
    enabled: !!id,
  })

  if (!id || !data) return null

  return (
    <div className="mt-10">
      <div className="container mx-auto">
        <Prompting subnet={data} />

        <div className="mt-15 flex items-center gap-3">
          {tabs.map((tab) => (
            <div
              ref={svgRef}
              key={tab}
              className={cn(
                'relative flex-col-center items-stretch [&>svg]:cursor-pointer',
                currentTab === tab
                  ? '[&>div]:btn-brand-bg text-primary'
                  : '[&>svg]:hidden text-brand hover:btn-brand-bg'
              )}
              onClick={() => nav(`/subnets/${id}/${tab.toLowerCase()}`)}
            >
              <div className="px-4 py-2.5 h-full w-full font-medium cursor-pointer">{tab}</div>
            </div>
          ))}
        </div>

        {currentTab === 'Modules' && <ModulesPanel netuid={netuid} />}
        {currentTab === 'Parameters' && <ParamsPanel params={data.params} />}
        {currentTab === 'Leaderboard' && <LeaderBoard netuid={netuid} />}
      </div>
    </div>
  )
}
