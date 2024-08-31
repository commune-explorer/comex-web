import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/react-table'
import * as changeCase from 'change-case'
import * as React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { eventKeys } from '@/apis/queries'
import { ExpandableJSONContainer } from '@/components/block/ExpandableJSONContainer'
import { ExtrinsicHead } from '@/components/block/ExtrinsicHead'
import type { IEvent } from '@/types'
import { get } from '@/utils'

export default function Index() {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sorting, setSorting] = useState<SortingState>([])
  const [filters, setFilters] = useState<ColumnFiltersState>([])
  const id = useParams().id ?? '0-0'

  const blockNumber = id.split('-')[0]
  const extrinsicId = parseInt(id.split('-')[1])

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
      accessorKey: 'data',
      header: 'Data',
      cell: ({ row }) => {
        return <ExpandableJSONContainer data={JSON.parse(row.getValue('data'))} />
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
      params.blockNumber = blockNumber
      params.extrinsicId = extrinsicId
      return await get<{ data: { records: IEvent[]; totalCount: number } }>(`/api/events`, { params })
    },
    placeholderData: keepPreviousData,
  })

  return (
    <div className="container mx-auto py-6 lt-sm:(px-4)">
      <ExtrinsicHead id={id} />
      <div className="justify-between flex">
        <div className="py-4 flex items-center gap-4">
          <div className="px-2 pb-2 h-full w-full font-medium">Events</div>
        </div>
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
        />
      </div>
    </div>
  )
}
