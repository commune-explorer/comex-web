import { shorten } from '@did-network/dapp-sdk'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table'
import * as changeCase from 'change-case'
import { useState } from 'react'
import * as React from 'react'
import { useParams } from 'react-router-dom'

import { extrinsicKeys } from '@/apis/queries'
import { BlockHead } from '@/components/block/BlockHead'
import { ExpandableJSONContainer } from '@/components/block/ExpandableJSONContainer'
import { CopyButton } from '@/components/blockchain/CopyButton'
import type { IExtrinsic } from '@/types'
import { get } from '@/utils'

export default function Index() {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sorting, setSorting] = useState<SortingState>([])
  const [filters, setFilters] = useState<ColumnFiltersState>([])
  const height = useParams().block ?? '0'

  const columns: ColumnDef<IExtrinsic>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: ({ row }) => (
        <a href={`/extrinsic/${row.getValue('id')}`} className="hover:(underline)">
          {row.getValue('id')}
        </a>
      ),
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
      accessorKey: 'signer',
      header: 'Account',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <span className="text-center">
            <a href={`/account/${row.getValue('signer')}`} className="hover:(underline)">
              {shorten(row.getValue('signer'), 10, 10)}
            </a>
          </span>
          <CopyButton value={row.getValue('signer')} />
        </div>
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

  const {
    data: { data: { records = [], totalCount = 0 } = {} } = {},
    isPending,
    isFetching,
  } = useQuery({
    queryKey: [
      'extrinsics',
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
      } as Record<PropertyKey, any>
      const sortingParams = sorting.map((s) => `${changeCase.snakeCase(s.id)}_${s.desc ? 'desc' : 'asc'}`.toUpperCase())

      if (sortingParams?.[0]) {
        params.orderBy = sortingParams[0]
      }
      params.blockNumber = height
      if (filters.length > 0) {
        const account = filters.find((i) => i.id === 'from')?.value
        if (account) {
          params.account2 = account
        }
      }
      return await get<{ data: { records: IExtrinsic[]; totalCount: number } }>(`/api/extrinsic`, { params })
    },
    placeholderData: keepPreviousData,
  })
  return (
    <div className="container mx-auto py-6 lt-sm:(px-4)">
      <BlockHead currentTab="extrinsics" height={height} />
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
