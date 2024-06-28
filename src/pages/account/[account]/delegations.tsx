import { formatAmount, shorten } from '@did-network/dapp-sdk'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table'
import * as changeCase from 'change-case'
import { useParams } from 'react-router-dom'

import { accountKeys, delegationKeys, transferKeys } from '@/apis/queries'
import { AccountHead } from '@/components/account/AccountHead'
import { AccountTag } from '@/components/account/AccountTag'
import { BlockchainTabs } from '@/components/blockchain/BlockchainTabs'
import { CopyButton } from '@/components/blockchain/CopyButton'
import type { IAccountInfo, IDelegationEvents, ITransfer } from '@/types'
import { get } from '@/utils'

export default function Index() {
  const accountAddress = useParams().account
  const columns: ColumnDef<IDelegationEvents>[] = [
    {
      header: 'Net UID',
      accessorKey: 'netUid',
    },
    {
      header: 'account',
      accessorKey: 'account',
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-$green">
          <span className="text-center">
            {row.original.accountTag && <AccountTag tag={row.original.accountTag}></AccountTag>}
            <span>{shorten(row.getValue('account'), 10, 10)}</span>
          </span>
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
          <span className="text-center">
            {row.original.moduleTag && <AccountTag tag={row.original.moduleTag}></AccountTag>}
            <a
              href={`/account/${row.getValue('module')}`}
              className={`hover:(underline)` && accountAddress === row.getValue('module') ? 'text-$green' : ''}
            >
              {shorten(row.getValue('module'), 10, 10)}
            </a>
          </span>
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
        account: accountAddress ?? '',
      } as Record<PropertyKey, any>

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
      <AccountHead currentTab="delegations" account={accountAddress ?? ''} />
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
        />
      </div>
    </div>
  )
}
