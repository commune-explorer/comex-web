'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'

import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

import { Pagination } from './pagination'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  loading?: boolean
}

export function DataTable<TData, TValue>({ columns, data, searchKey, loading = false }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
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
              table.setPageSize(Number(value))
              table.setPageIndex(0)
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
          {table.getRowModel().rows?.length ? (
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
                {loading ? 'loading...' : 'No results.'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {table.getFilteredRowModel().rows.length > 0 && (
        <div className="flex justify-between">
          <div className="flex text-brand gap-1">
            Showing <span>{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of <span>{table.getFilteredRowModel().rows.length}</span> entries
          </div>
          <div className="flex justify-end">
            <Pagination
              page={table.getState().pagination.pageIndex + 1}
              count={table.getPageCount()}
              onChange={(page) => {
                table.setPageIndex(page - 1)
              }}
            ></Pagination>
          </div>
        </div>
      )}
    </div>
  )
}
