import { useQuery } from '@tanstack/react-query'

import { subnetKeys } from '@/apis/queries'
import { cn } from '@/lib/utils'
import { type ISubnet } from '@/types'
import { get } from '@/utils'

export const SubnetsPanel = () => {
  const { data: { data: { subnets = [] } = {} } = {} } = useQuery<{ data: { subnets: Array<ISubnet> } }>({
    queryKey: subnetKeys.all,
    queryFn: () => get('/api/subnets'),
  })

  const [subnetId, setSubnetId] = useState<number | undefined>(undefined)

  const subnet = useMemo(() => subnets.find((item) => item.id === subnetId), [subnets, subnetId])

  useEffect(() => {
    if (subnets.length > 0) {
      setSubnetId(subnets[0].id)
    }
  }, [subnets])

  return !subnets.length ? (
    <div className="w-90 space-y-8 [&>div]:space-y-3">
      <div>
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-30" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div>
        <Skeleton className="h-4 w-30" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div>
        <Skeleton className="h-4 w-30" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div>
        <Skeleton className="h-4 w-30" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  ) : (
    <div className="shrink-0">
      <div className="uppercase text-lg">Subnets</div>
      <div className="mt-4 grid grid-cols-8 gap-1">
        {subnets?.map((item, index) => (
          <div
            key={`subnet_${item.id}`}
            className={cn(
              'w-8 h-8 text-primary bg-[rgba(173,172,227,0.08)] hover:btn-brand-bg-bold cursor-pointer flex-col-center',
              item.id === subnetId ? 'btn-brand-bg-bold' : ''
            )}
            onClick={() => setSubnetId(item.id)}
          >
            {item.id}
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-5">
        {[
          { key: 'Subnet Name', value: subnet?.name.toUpperCase() },
          { key: 'Active Keys', value: subnet?.activeKeys, totalValue: subnet?.totalKeys },
          { key: 'Active Validators', value: subnet?.activeValidators, totalValue: subnet?.totalValidators },
          { key: 'Active Miners', value: subnet?.activeMiners, totalValue: subnet?.totalMiners },
          { key: 'Registration Cost', value: subnet?.registerCost.toFixed(2) },
        ].map((item) => (
          <div key={item.key} className="flex-center justify-between">
            <div className="flex flex-col gap-.5">
              <span className="text-emerald text-sm">{item.key}</span>
              <span className="text-brand text-primary">
                <span>{item.totalValue ? `${item.value}/${item.totalValue}` : item.value}</span>
              </span>
            </div>
            {item.totalValue && (
              <div className="flex gap-1">
                {Array(10)
                  .fill(1)
                  .map((_i, idx) => {
                    const length = item.value && item.totalValue ? item.value / item.totalValue : 0
                    return (
                      <span
                        key={`${item.key}_indicator_${idx}`}
                        className={cn('w-1 h-5 rounded-sm', idx <= length * 10 ? ' bg-#119040' : 'bg-#26253B')}
                      />
                    )
                  })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
