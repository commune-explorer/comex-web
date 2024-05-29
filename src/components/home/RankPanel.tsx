import type { IModule } from '@/types'

const columns: Array<{
  title: string
  prop: keyof IModule
}> = [
  { title: 'Uid', prop: 'uid' },
  { title: 'Key', prop: 'key' },
  { title: 'Emission', prop: 'emission' },
  { title: 'Incentive', prop: 'incentive' },
  { title: 'Dividends', prop: 'dividends' },
  { title: 'Delegation Fee', prop: 'delegation_fee' },
  { title: 'Stake', prop: 'stake' },
  { title: 'Address', prop: 'address' },
  { title: 'Active', prop: 'active' },
  { title: 'In Immunity', prop: 'in_immunity' },
]

export const RankPanel = ({ list }: { list?: IModule[] }) => {
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const total = list?.length ?? 0
  const pageCount = useMemo(() => (!isNaN(total) ? Math.ceil(total / pageSize) : 0), [total, pageSize])
  const currentList = useMemo(() => {
    console.log('currentlist change')
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return list?.slice(start, end)
  }, [currentPage, list, pageSize])
  return (
    <div className="py-5">
      <div className="flex justify-between">
        <div className="flex text-brand gap-5 items-center">
          Show
          <ToggleGroup type="single" value={`${pageSize}`} onValueChange={(val) => setPageSize(Number(val))}>
            {['10', '25', '50', '100'].map((i) => (
              <ToggleGroupItem key={i} value={i} aria-label={`Toggle ${i}`}>
                {i}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-brand">Search:</span>
          <div className="flex w-40 h-9 px-2.25 py-0.25 items-center gap-2.5 border-rd-1.25 bg-[rgba(173,172,227,0.03)]">
            <span className="w-4 h-4 text-brand i-lucide-search"></span>
            <Input className="p-0 !border-none !shadow-[none] !outline-none rounded-none bg-transparent" />
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-10">
        {columns.map((column) => (
          <div key={column.title} className="h-10 text-brand uppercase flex-col-center items-start first:pl-4">
            {column.title}
          </div>
        ))}
      </div>
      {currentList?.map((data, index) => (
        <div key={index} className="grid grid-cols-10 even:bg-[rgba(173,172,227,0.03)]">
          {columns.map((item, idx: number) => (
            <div key={`item_${index}_${idx}`} className="h-12 flex-col-center items-start first:pl-4">
              {data?.[item.prop]}
            </div>
          ))}
        </div>
      ))}

      <div className="mt-8 flex justify-between">
        <div className="flex text-brand gap-1">
          Showing <span>{(currentPage - 1) * pageSize + 1}</span> to{' '}
          <span>{Math.min(currentPage * pageSize, total)}</span> of <span>{total}</span> entries
        </div>
        <div className="flex justify-end">
          <Pagination
            count={pageCount}
            onChange={(page) => {
              if (page >= 1 && page <= pageCount) {
                setCurrentPage(page)
              }
            }}
          ></Pagination>
        </div>
      </div>
    </div>
  )
}
