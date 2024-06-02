import { formatAmount, shorten } from '@did-network/dapp-sdk'
import { CaretSortIcon, CopyIcon } from '@radix-ui/react-icons'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table'
import * as changeCase from 'change-case'
import dayjs from 'dayjs'
import { NavLink, useParams } from 'react-router-dom'
import { useCopyToClipboard } from 'usehooks-ts'

import { blockchainKeys } from '@/apis/queries'
import { cn } from '@/lib/utils'
import type { IAccountInfo } from '@/types'
import { get } from '@/utils'

export default function Accounts() {
  const { tab = 'accounts' } = useParams()
  const currentTab = tab.charAt(0).toUpperCase() + tab.slice(1)
  const [, copy] = useCopyToClipboard()
  const columns: ColumnDef<IAccountInfo>[] = [
    {
      header: 'Rank',
      accessorKey: 'rank',
    },
    {
      header: 'Address',
      accessorKey: 'address',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <span>{shorten(row.getValue('address'), 10, 10)}</span>
          <CopyIcon
            className="h-4 text-muted-foreground hover:text-foreground"
            onClick={async () => {
              const success = await copy(row.getValue('address'))
              if (success) {
                toast({ title: 'Address Copied' })
              } else {
                console.error('Failed to copy text to clipboard.')
              }
            }}
          />
        </div>
      ),
    },
    {
      accessorKey: 'balanceFree',
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="px-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Free
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => formatAmount(row.getValue('balanceFree'), 9, 2),
    },
    {
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="px-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Staked
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorKey: 'balanceStaked',
      cell: ({ row }) => formatAmount(row.getValue('balanceStaked'), 9, 2),
    },
    {
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="px-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Total
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorKey: 'balanceTotal',
      cell: ({ row }) => formatAmount(row.getValue('balanceTotal'), 9, 2),
    },
    {
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="px-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Last Update
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorKey: 'updatedAt',
      cell: ({ row }) => (
        <a className="text-$green" target="_blank" href={``}>
          {row.getValue('updatedAt')}
        </a>
      ),
    },
  ]
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sorting, setSorting] = useState<SortingState>([])
  const [filters, setFilters] = useState<ColumnFiltersState>([])
  const {
    data: { data: { records = [], totalCount = 0 } = {} } = {},
    isPending,
    isFetching,
  } = useQuery({
    queryKey: blockchainKeys.list({
      pageIndex,
      pageSize,
      sorting,
      filters,
    }),
    queryFn: async () => {
      let params = {
        limit: pageSize,
        offset: pageSize * pageIndex,
      } as Record<PropertyKey, any>
      const sortingParams = sorting.map((s) => `${changeCase.snakeCase(s.id)}_${s.desc ? 'desc' : 'asc'}`.toUpperCase())
      const filterParams = filters.map((f) => `${f.id}=${f.value}`)

      if (sortingParams?.[0]) {
        params.orderBy = sortingParams[0]
      }
      if (filterParams) {
        // TODO
      }
      return await get<{ data: { records: IAccountInfo[]; totalCount: number } }>(`/api/accounts`, { params })
    },
    placeholderData: keepPreviousData,
  })

  return (
    <div className="container mx-auto py-6">
      <div className="py-4 flex items-center gap-3">
        {['Accounts'].map((tab) => (
          <NavLink
            key={tab}
            className={cn(
              'border-b-2',
              currentTab === tab ? 'text-foreground border-brand' : 'text-brand border-transparent'
            )}
            to={`/blockchain/${tab.toLowerCase()}`}
          >
            <div className="px-1 pb-2 h-full w-full font-medium cursor-pointer">{tab}</div>
          </NavLink>
        ))}
      </div>
      <div className="text-sm py-4">
        <DataTableServer
          columns={columns}
          data={records}
          total={totalCount || 0}
          pageIndex={pageIndex}
          pageSize={pageSize}
          pending={isPending}
          fetching={isFetching}
          onPageChange={setPageIndex}
          onPageSizeChange={setPageSize}
          onSortingChange={setSorting}
          onColumnFiltersChange={setFilters}
          searchKey="address"
        />
      </div>
    </div>
  )
}
