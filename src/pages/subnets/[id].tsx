import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { subnetKeys } from '@/apis/queries'
import { RankPanel } from '@/components/home/RankPanel'
import { TradingView } from '@/components/home/TradingView'
import { LeaderBoard } from '@/components/subnets/LeaderBoard'
import { ParamsPanel } from '@/components/subnets/ParamsPanel'
import { Prompting } from '@/components/subnets/Prompting'
import { useSvgBg } from '@/hooks/use-svg'
import { cn } from '@/lib/utils'
import type { IModule, ISubnet } from '@/types'
import { get } from '@/utils'

const tabs = ['Metagraph', 'Hyperparams', 'Registration', 'Leaderboard']

export default function SubnetsPage() {
  const { id } = useParams()
  const { svgRef } = useSvgBg()
  const [currentTab, setCurrentTab] = useState(tabs[0])
  const { data: { data } = {} } = useQuery<{ data: ISubnet }>({
    queryKey: subnetKeys.detail(id!),
    queryFn: () => get(`/api/subnets/${id}`),
    enabled: !!id,
  })
  const { data: { data: { modules = [] } = {} } = {} } = useQuery<{ data: { modules: IModule[] } }>({
    queryKey: subnetKeys.detailModules(id!),
    queryFn: () => get(`/api/subnets/${id}/modules`),
  })

  if (!data) return null

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
              onClick={() => setCurrentTab(tab)}
            >
              <div className="px-4 py-2.5 h-full w-full font-medium cursor-pointer">{tab}</div>
            </div>
          ))}
        </div>

        {currentTab === tabs[0] && <RankPanel list={modules} />}

        {currentTab === tabs[1] && <ParamsPanel params={data.params} />}

        {currentTab === tabs[2] && (
          <div className="py-10 flex justify-between">
            <TradingView />
            <Separator orientation="vertical" className="h-auto mx-5" />
            <div className="min-w-280px">
              <div>Current Registration Cost</div>
            </div>
          </div>
        )}

        {currentTab === tabs[3] && <LeaderBoard />}
      </div>
    </div>
  )
}
