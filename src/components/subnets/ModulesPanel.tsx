import { useQuery } from '@tanstack/react-query'

import { subnetKeys } from '@/apis/queries'
import type { IModule } from '@/types'
import { get } from '@/utils'

const columns: Array<{
  title: string
  prop: keyof IModule
}> = [
  { title: 'Uid', prop: 'uid' },
  { title: 'Key', prop: 'key' },
  { title: 'Emission', prop: 'emission' },
  { title: 'Incentive', prop: 'incentive' },
  { title: 'Dividends', prop: 'dividends' },
  { title: 'Delegation Fee', prop: 'delegationFee' },
  { title: 'Stake', prop: 'stake' },
  { title: 'Address', prop: 'address' },
  { title: 'Active', prop: 'active' },
  { title: 'In Immunity', prop: 'inImmunity' },
]

export const ModulesPanel = ({ netuid }: { netuid: number }) => {
  const { data: { data: { modules = [] } = {} } = {} } = useQuery<{ data: { modules: IModule[] } }>({
    queryKey: subnetKeys.detailModules(netuid),
    queryFn: () => get(`/api/subnets/${netuid}/modules`),
  })

  const pagers = [10, 25, 50, 100]
  const [pageSize, setPageSize] = useState(pagers[0])
  const [currentPage, setCurrentPage] = useState(1)
  const total = modules.length ?? 0
  const pageCount = useMemo(() => (!isNaN(total) ? Math.ceil(total / pageSize) : 0), [total, pageSize])
  const currentList = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return modules.slice(start, end)
  }, [currentPage, modules, pageSize])

  return (
    <div className="py-5">
      <div className="flex justify-between">
        <div className="flex text-brand gap-5 items-center text-sm">
          Show
          <ToggleGroup
            type="single"
            value={`${pageSize}`}
            onValueChange={(val) => {
              setCurrentPage(1)
              setPageSize(Number(val))
            }}
          >
            {pagers.map((i) => (
              <ToggleGroupItem key={i} value={`${i}`} aria-label={`Toggle ${i}`} className="text-sm">
                {i}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-brand text-sm">Search:</span>
          <div className="flex w-40 h-9 px-2.25 py-0.25 items-center gap-2.5 border-rd-1.25 bg-[rgba(173,172,227,0.03)]">
            <span className="w-4 h-4 text-brand i-lucide-search"></span>
            <Input className="p-0 !border-none !shadow-[none] !outline-none rounded-none bg-transparent" />
          </div>
        </div>
      </div>
      <div className="bg-#ADACE311 text-sm">
        <div className="mt-8 grid grid-cols-10">
          {columns.map((column) => (
            <div key={column.title} className="h-10 text-brand uppercase flex-col-center items-start first:pl-4">
              {column.title}
            </div>
          ))}
        </div>
        {currentList?.map((data, index) => (
          <div key={index} className="grid grid-cols-10 even:bg-[rgba(173,172,227,0.06)]">
            {columns.map((item, idx: number) => (
              <div
                key={`item_${index}_${idx}`}
                className="h-12 flex-col-center items-start px-2 first:pl-4 overflow-hidden"
              >
                <span className="w-full truncate">{`${data?.[item.prop]}`}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      {total > 0 && (
        <div className="mt-8 flex justify-between">
          <div className="flex text-brand gap-1">
            Showing <span>{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span>{Math.min(currentPage * pageSize, total)}</span> of <span>{total}</span> entries
          </div>
          <div className="flex justify-end">
            <Pagination
              page={currentPage}
              count={pageCount}
              onChange={(page) => {
                if (page >= 1 && page <= pageCount) {
                  setCurrentPage(page)
                }
              }}
            ></Pagination>
          </div>
        </div>
      )}
    </div>
  )
}
