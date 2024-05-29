const columns = [
  {
    title: 'pos',
  },
  {
    title: 'UID',
  },
  {
    title: 'Stake',
  },
  {
    title: 'HOTKEY',
  },
  {
    title: 'SN0',
  },
  {
    title: 'SN1',
  },
  {
    title: 'SN2',
  },
  {
    title: 'SN3',
  },
  {
    title: 'SN4',
  },
  {
    title: 'SN5',
  },
]

const fakeData = Array(12).fill([1, 2, '1,298,375', '0.04', '0.04', '0.04', '0.04', '0.04', '0.04', '0.04'])

export const RankPanel = () => {
  return (
    <div className="py-5">
      <div className="flex justify-between">
        <div className="flex text-brand gap-5">
          Show <span>10</span> <span>25</span> <span>50</span> <span>100</span>
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
      {fakeData.map((data, index) => (
        <div key={index} className="grid grid-cols-10 even:bg-[rgba(173,172,227,0.03)]">
          {data.map((item: any, idx: number) => (
            <div key={`item_${index}_${idx}`} className="h-12 flex-col-center items-start first:pl-4">
              {item}
            </div>
          ))}
        </div>
      ))}

      <div className="mt-8 flex justify-between">
        <div className="flex text-brand gap-1">
          Showing <span>1</span> to <span>25</span> of <span>256</span> entries
        </div>

        <Pagination className="max-w-auto w-auto mx-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
