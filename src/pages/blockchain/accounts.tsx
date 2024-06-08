import { formatAmount, shorten } from '@did-network/dapp-sdk'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table'
import * as changeCase from 'change-case'

import { accountKeys } from '@/apis/queries'
import { BlockchainTabs } from '@/components/blockchain/BlockchainTabs'
import { CopyButton } from '@/components/blockchain/CopyButton'
import type { IAccountInfo } from '@/types'
import { get } from '@/utils'

export default function Accounts() {
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
          <CopyButton value={row.getValue('address')} />
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
    queryKey: [
      'accounts',
      ...accountKeys.list({
        pageIndex,
        pageSize,
        sorting,
        filters,
      }),
    ],
    queryFn: async () => {
      let params = {
        limit: pageSize,
        offset: pageSize * pageIndex,
      } as Record<PropertyKey, any>
      const sortingParams = sorting.map((s) => `${changeCase.snakeCase(s.id)}_${s.desc ? 'desc' : 'asc'}`.toUpperCase())

      if (sortingParams?.[0]) {
        params.orderBy = sortingParams[0]
      }
      if (filters.length > 0) {
        const account = filters.find((i) => i.id === 'address')?.value
        if (account) {
          params.account = account
        }
      }
      return await get<{ data: { records: IAccountInfo[]; totalCount: number } }>(`/api/accounts`, { params })
    },
    placeholderData: keepPreviousData,
  })

  return (
    <div className="container mx-auto py-6">
      <BlockchainTabs currentTab="accounts" />
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
          searchKey={'address'}
        />
      </div>
    </div>
  )
}
