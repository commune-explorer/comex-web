import { shorten } from '@did-network/dapp-sdk'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table'
import * as changeCase from 'change-case'
import { useState } from 'react'
import * as React from 'react'
import { Link, useParams } from 'react-router-dom'

import { eventKeys } from '@/apis/queries'
import { BlockHead } from '@/components/block/BlockHead'
import { ExpandableJSONContainer } from '@/components/block/ExpandableJSONContainer'
import { JSONObjectContainer } from '@/components/block/JSONObjectContainer'
import { CopyButton } from '@/components/blockchain/CopyButton'
import { DataList } from '@/components/ui/data-list'
import type { IEvent } from '@/types'
import { get } from '@/utils'

export default function Events() {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sorting, setSorting] = useState<SortingState>([])
  const [filters, setFilters] = useState<ColumnFiltersState>([])
  const height = useParams().block ?? '0'

  const columns: ColumnDef<IEvent>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: ({ row }) => row.getValue('id'),
    },
    {
      accessorKey: 'eventName',
      header: 'Name',
      cell: ({ row }) => (
        <code className="bg-black/50 text-green-400 px-2 py-1 font-mono">
          {row.original.module}::{row.original.eventName}
        </code>
      ),
    },
    {
      header: 'Extrinsic id',
      accessorKey: 'extrinsicId',
      cell: ({ row }) => {
        if ((row.getValue('extrinsicId') as number) < 0) {
          return '-'
        }
        const formattedNumber = (num: number) =>
          num < 10 ? `000${num}` : num < 100 ? `00${num}` : num < 1000 ? `0${num}` : `${num}`
        const extrinsicFormatted = `${(row.getValue('id') as string).split('-')[0]}-${formattedNumber(
          row.getValue('extrinsicId')
        )}`
        return (
          <Link to={`/extrinsic/${extrinsicFormatted}`} className="hover:underline">
            {extrinsicFormatted}
          </Link>
        )
      },
    },
    {
      accessorKey: 'data',
      header: 'Data',
      cell: ({ row }) => {
        return <JSONObjectContainer data={JSON.parse(row.getValue('data'))} />
      },
    },
  ]

  const {
    data: { data: { records = [], totalCount = 0 } = {} } = {},
    isPending,
    isFetching,
  } = useQuery({
    queryKey: [
      'events',
      ...eventKeys.list({
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
      return await get<{ data: { records: IEvent[]; totalCount: number } }>(`/api/evvents`, { params })
    },
    placeholderData: keepPreviousData,
  })
  return (
    <div className="container mx-auto py-6 lt-sm:(px-4)">
      <BlockHead currentTab="events" height={height} />
      <div className="text-sm py-4">
        <DataList
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
