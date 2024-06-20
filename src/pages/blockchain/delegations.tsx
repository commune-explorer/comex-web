import { formatAmount, shorten } from '@did-network/dapp-sdk'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table'
import * as changeCase from 'change-case'

import { delegationKeys } from '@/apis/queries'
import { BlockchainTabs } from '@/components/blockchain/BlockchainTabs'
import { CopyButton } from '@/components/blockchain/CopyButton'
import type { IDelegationEvents } from '@/types'
import { get } from '@/utils'

export default function Accounts() {
  const columns: ColumnDef<IDelegationEvents>[] = [
    {
      header: 'Net UID',
      accessorKey: 'netUid',
    },
    {
      header: 'account',
      accessorKey: 'account',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <span>{shorten(row.getValue('account'), 10, 10)}</span>
          <CopyButton value={row.getValue('account')} />
        </div>
      ),
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => <div className="capitalize">{`${row.getValue('action')}`.toLowerCase()}</div>,
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => formatAmount(row.getValue('amount'), 9, 2),
    },
    {
      accessorKey: 'module',
      header: 'Module',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <span>{shorten(row.getValue('module'), 10, 10)}</span>
          <CopyButton value={row.getValue('module')} />
        </div>
      ),
    },
    {
      header: 'Block Height',
      accessorKey: 'height',
      cell: ({ row }) => (
        <a className="text-$green" target="_blank" href={``}>
          {row.getValue('height')}
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
      'delegations',
      ...delegationKeys.list({
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
        const account = filters.find((i) => i.id === 'account')?.value
        if (account) {
          params.account = account
        }
      }
      return await get<{ data: { records: IDelegationEvents[]; totalCount: number } }>(
        `/api/accounts/delegation-events`,
        {
          params,
        }
      )
    },
    placeholderData: keepPreviousData,
  })

  return (
    <div className="container mx-auto py-6 lt-sm:(px-4)">
      <BlockchainTabs currentTab="delegations" />{' '}
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
          searchKey="account"
        />
      </div>
    </div>
  )
}
