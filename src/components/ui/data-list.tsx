import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import { Pagination } from './pagination'

interface ServerDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  total: number
  pageIndex: number
  pageSize: number
  searchKey?: string
  pending?: boolean
  fetching?: boolean
  onPageChange: (pageIndex: number) => void
  onPageSizeChange: (pageSize: number) => void
  onSortingChange: (sorting: SortingState) => void
  onColumnFiltersChange: (filters: ColumnFiltersState) => void
}

export function DataList<TData, TValue>({
  columns,
  data,
  total,
  pageIndex,
  pageSize,
  searchKey,
  pending = false,
  fetching = false,
  onPageChange,
  onPageSizeChange,
  onSortingChange,
  onColumnFiltersChange,
}: ServerDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set())

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / pageSize),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onSortingChange: (newSorting) => {
      setSorting(newSorting)
      onSortingChange(newSorting as SortingState)
    },
    onColumnFiltersChange: (newFilters) => {
      setColumnFilters(newFilters)
      onColumnFiltersChange(newFilters as ColumnFiltersState)
    },
    state: {
      sorting,
      columnFilters,
      pagination: { pageIndex, pageSize },
    },
    getCoreRowModel: getCoreRowModel(),
  })

  const pagers = [10, 25, 50, 100]

  const toggleRow = (rowId: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      if (next.has(rowId)) {
        next.delete(rowId)
      } else {
        next.add(rowId)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between lt-sm:(flex-col gap-3)">
        <div className="flex text-brand gap-5 items-center text-sm">
          Show
          <ToggleGroup
            type="single"
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              onPageChange(0)
              onPageSizeChange(Number(value))
            }}
          >
            {pagers.map((i) => (
              <ToggleGroupItem key={i} value={`${i}`} aria-label={`Toggle ${i}`} className="text-sm">
                {i}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        {searchKey && (
          <div className="flex items-center gap-2">
            {fetching && (
              <span className="translate-x-10 w-5 h-5 animate-spin text-brand/60 i-mingcute:loading-fill"></span>
            )}

            <span className="text-brand text-sm">Search:</span>
            <div className="flex w-40 h-9 px-2.25 py-0.25 items-center gap-2.5 border-rd-1.25 bg-[rgba(173,172,227,0.03)]">
              <span className="w-4 h-4 text-brand i-lucide-search"></span>
              <Input
                value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
                className="p-0 !border-none !shadow-[none] !outline-none rounded-none bg-transparent"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {pending ? (
          <div className="text-center text-brand" style={{ fontFamily: 'monospace' }}>
            Loading...
          </div>
        ) : table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div key={row.id} className="border rounded-md overflow-hidden">
              <div
                className={cn(
                  'flex justify-between items-center p-4 cursor-pointer',
                  expandedRows.has(row.id) ? 'bg-brand/10' : 'hover:bg-brand/5'
                )}
                onClick={() => toggleRow(row.id)}
              >
                {row
                  .getVisibleCells()
                  .slice(0, 2)
                  .map((cell) => {
                    return (
                      <div className="font-medium">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                    )
                  })}
                <span
                  className={cn('text-brand', 'transition-transform', expandedRows.has(row.id) ? 'rotate-180' : '')}
                >
                  ▼
                </span>
              </div>
              {expandedRows.has(row.id) && (
                <div className="p-4 bg-transparent animate-fade-in">
                  {row
                    .getVisibleCells()
                    .slice(1)
                    .map((cell) => (
                      <div key={cell.id} className="flex py-2">
                        <span className="font-medium mr-2">{cell.column.columnDef.header as React.ReactNode}:</span>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-4">No results.</div>
        )}
      </div>

      <div className="flex justify-between lt-sm:(flex-col gap-3)">
        <div className="flex text-brand gap-1">
          Showing <span>{pageIndex * pageSize + 1}</span> to {Math.min((pageIndex + 1) * pageSize, total)} of{' '}
          <span>{total}</span> entries
        </div>
        <div className="flex justify-end items-center">
          <Pagination
            page={pageIndex + 1}
            count={Math.ceil(total / pageSize)}
            onChange={(page) => {
              onPageChange(page - 1)
            }}
          ></Pagination>
        </div>
      </div>
    </div>
  )
}
