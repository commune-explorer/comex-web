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
        <div className="flex text-muted-foreground gap-5 font-medium">
          Show <span>10</span> <span>25</span> <span>50</span> <span>100</span>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-10">
        {columns.map((column) => (
          <div
            key={column.title}
            className="h-10 text-muted-foreground uppercase font-medium flex-col-center items-start first:pl-4"
          >
            {column.title}
          </div>
        ))}
      </div>
      {fakeData.map((data) => (
        <div className="grid grid-cols-10  even:bg-[rgba(173,172,227,0.03)]">
          {data.map((item: any) => (
            <div className="h-12 flex-col-center items-start first:pl-4">{item}</div>
          ))}
        </div>
      ))}

      <div className="mt-8 flex justify-between">
        <div className="flex text-muted-foreground gap-5 font-medium">
          Show <span>10</span> <span>25</span> <span>50</span> <span>100</span>
        </div>
      </div>
    </div>
  )
}
