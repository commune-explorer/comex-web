import { formatAmount, shorten } from '@did-network/dapp-sdk'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table'
import * as changeCase from 'change-case'
import * as React from 'react'
import { useParams } from 'react-router-dom'

import { extrinsicKeys } from '@/apis/queries'
import { AccountHead } from '@/components/account/AccountHead'
import { ExpandableJSONContainer } from '@/components/block/ExpandableJSONContainer'
import { BlockTime } from '@/components/blockchain/BlockTime'
import { CopyButton } from '@/components/blockchain/CopyButton'
import { useBlockMetadata } from '@/hooks/useBlockMetadata'
import type { IExtrinsic } from '@/types'
import { get } from '@/utils'

export default function Index() {
  const accountAddress = useParams().account
  const { lastProcessedHeight } = useBlockMetadata()

  const columns: ColumnDef<IExtrinsic>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: ({ row }) => (
        <a href={`/extrinsic/${row.getValue('id')}`} className="text-$green hover:(underline)">
          {row.getValue('id')}
        </a>
      ),
    },
    {
      header: 'Time',
      accessorKey: 'blockNumber',
      cell: ({ row }) => {
        return (
          <div className="text-$green">
            <BlockTime blockNumber={row.getValue('blockNumber')} latestBlockHeight={lastProcessedHeight} />
          </div>
        )
      },
    },
    {
      accessorKey: 'method',
      header: 'Call',
      cell: ({ row }) => (
        <code className="bg-black/50 text-green-400 px-2 py-1 font-mono">
          {row.original.module}::{row.original.method}
        </code>
      ),
    },
    {
      header: 'Success',
      accessorKey: 'success',
      cell: ({ row }) =>
        row.getValue('success') ? <div className="text-$green">✔</div> : <div className="text-$red">✗</div>,
    },
    {
      accessorKey: 'args',
      header: 'Args',
      cell: ({ row }) => {
        return <ExpandableJSONContainer data={JSON.parse(row.getValue('args'))} />
      },
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
      'extrinsic',
      ...extrinsicKeys.list({
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
        orderBy: 'BLOCK_NUMBER_DESC',
        signer: accountAddress ?? '',
      } as Record<PropertyKey, any>

      return await get<{ data: { records: IExtrinsic[]; totalCount: number } }>(`/api/extrinsic`, {
        params,
      })
    },
    placeholderData: keepPreviousData,
  })

  return (
    <div className="container mx-auto py-6 lt-sm:(px-4)">
      <AccountHead currentTab="extrinsics" account={accountAddress ?? ''} />
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
