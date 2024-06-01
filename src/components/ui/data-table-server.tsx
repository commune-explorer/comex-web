import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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

export function DataTableServer<TData, TValue>({
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
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
            {fetching && <Loader2 className="h-4 w-4 animate-spin mr-2" />}

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
      <Table className="bg-#ADACE311">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="h-10 text-brand uppercase">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {pending ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="border-none">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      'h-12 bg-transparent first:pl-4',
                      index % 2 !== 0 ? 'bg-transparent' : 'bg-[rgba(173,172,227,0.06)]'
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {'No results.'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between">
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
