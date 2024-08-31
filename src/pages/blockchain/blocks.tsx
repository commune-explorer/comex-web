import { CaretSortIcon } from '@radix-ui/react-icons'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table'
import * as changeCase from 'change-case'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Tooltip } from 'react-tooltip'

import { eventKeys, transferKeys } from '@/apis/queries'
import { BlockchainTabs } from '@/components/blockchain/BlockchainTabs'
import type { IBlock } from '@/types'
import { get } from '@/utils'
import { formatTimestampToAgo } from '@/utils/formatSecondsToAgo'

export default function Blocks() {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sorting, setSorting] = useState<SortingState>([])
  const [filters, setFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<IBlock>[] = [
    {
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="px-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Height
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorKey: 'height',
      cell: ({ row }) => (
        <span className="text-$green">
          <a href={`/block/${row.getValue('height')}`} className="hover:(underline)">
            {row.getValue('height')}
          </a>
        </span>
      ),
    },
    {
      accessorKey: 'specVersion',
      header: 'Spec Version',
      cell: ({ row }) => row.getValue('specVersion'),
    },
    {
      accessorKey: 'eventCount',
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="px-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Events
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => row.getValue('eventCount'),
    },
    {
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="px-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Extrinsics
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorKey: 'extrinsicCount',
      cell: ({ row }) => row.getValue('extrinsicCount'),
    },
    {
      header: 'Time',
      accessorKey: 'timestamp',
      cell: ({ row }) => {
        const timestamp = row.getValue('timestamp') as string
        const formattedTime = formatTimestampToAgo(timestamp)
        const utcTime = dayjs(timestamp).format('MMM D, YYYY h:mm:ss A (UTC)')

        return (
          <div className="cursor-default">
            <Tooltip id={`${utcTime}`} />
            <span data-tooltip-content={utcTime} data-tooltip-id={`${utcTime}`} data-tooltip-place="top">
              {formattedTime}
            </span>
          </div>
        )
      },
    },
  ]

  const {
    data: { data: { records = [], totalCount = 0 } = {} } = {},
    isPending,
    isFetching,
  } = useQuery({
    queryKey: [
      'blocks',
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
      if (filters.length > 0) {
        const height = filters.find((i) => i.id === 'height')?.value
        if (height) {
          params.height = height
        }
      }
      return await get<{ data: { records: IBlock[]; totalCount: number } }>(`/api/block`, { params })
    },
    placeholderData: keepPreviousData,
  })

  return (
    <div className="container mx-auto py-6 lt-sm:(px-4)">
      <BlockchainTabs currentTab="blocks" />
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
          searchKey="height"
        />
      </div>
    </div>
  )
}
