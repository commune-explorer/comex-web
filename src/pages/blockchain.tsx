import { formatAmount, shorten } from '@did-network/dapp-sdk'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table'
import * as changeCase from 'change-case'
import dayjs from 'dayjs'

import { blockchainKeys } from '@/apis/queries'
import type { IAccountInfo } from '@/types'
import { get } from '@/utils'

const columns: ColumnDef<IAccountInfo>[] = [
  {
    header: 'Rank',
    accessorKey: 'rank',
  },
  {
    header: 'Address',
    accessorKey: 'address',
    cell: ({ row }) => shorten(row.getValue('address')),
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="uppercase px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created At
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'createdAt',
    cell: ({ row }) =>
      row.getValue('createdAt') &&
      dayjs((parseInt(row.getValue('createdAt') as string) * 1000).toString()).format('DD MMM YYYY'),
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="uppercase px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Updated At
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'updatedAt',
    cell: ({ row }) =>
      row.getValue('updatedAt') &&
      dayjs((parseInt(row.getValue('updatedAt') as string) * 1000).toString()).format('DD MMM YYYY'),
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="uppercase px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Balance Free
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'balanceFree',
    cell: ({ row }) => formatAmount(row.getValue('balanceFree')),
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="uppercase px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Balance Staked
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'balanceStaked',
    cell: ({ row }) => formatAmount(row.getValue('balanceStaked')),
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="uppercase px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Balance Total
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'balanceTotal',
    cell: ({ row }) => formatAmount(row.getValue('balanceTotal')),
  },
]

const Blockchain = () => {
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
      const result = await get<{ data: { records: IAccountInfo[]; totalCount: number } }>(`/api/accounts`, { params })
      return result
    },
    placeholderData: keepPreviousData,
  })

  return (
    <div className="container mx-auto">
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

export default Blockchain
