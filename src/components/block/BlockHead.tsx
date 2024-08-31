import { useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

import { eventKeys } from '@/apis/queries'
import { Prompting } from '@/components/block/Prompting'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { IBlock } from '@/types'
import { get } from '@/utils'

export function BlockHead({ currentTab, height }: { currentTab: string; height: string }) {
  const { data, isPending, isFetching } = useQuery<{ data: { records: IBlock[]; totalCount: number } }>({
    queryKey: [
      'blocks',
      ...eventKeys.list({
        pageIndex: 0,
        pageSize: 1,
        filters: height,
      }),
    ],
    queryFn: () => {
      let params = {
        limit: 1,
        offset: 0,
        height: height,
      } as Record<PropertyKey, any>
      return get(`/api/block`, { params })
    },
    enabled: true,
  })
  if (isFetching) {
    return (
      <div className="container mx-auto mt-10">
        <div className="bg-brand/5 py-6 px-8 space-y-3">
          <Skeleton className="h-9 w-30" />
          <Skeleton className="h-8 w-40" />
          <div className="grid grid-cols-2 w-1/4">
            <Skeleton className="h-4 w-30" />
            <Skeleton className="h-4 w-50" />
          </div>
          <div className="grid grid-cols-2 w-1/4">
            <Skeleton className="h-4 w-30" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="grid grid-cols-2 w-1/4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-130" />
          </div>
          <div className="grid grid-cols-2 w-1/4">
            <Skeleton className="h-4 w-30" />
            <Skeleton className="h-4 w-130" />
          </div>
          <div className="grid grid-cols-2 w-1/4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>

        <div className="mt-20 flex-col-center">
          <span className="translate-x-10 w-5 h-5 animate-spin text-brand/60 i-mingcute:loading-fill"></span>
        </div>
      </div>
    )
  }
  const blockdata = data?.data.records[0]
  if (!blockdata) {
    return <div>Block not found!</div>
  }
  return (
    <div className="container mx-auto mt-10">
      <Prompting block={blockdata!} />
      <div className="justify-between flex">
        <div className="py-4 flex items-center gap-4">
          {['Extrinsics', 'Events'].map((tab) => (
            <NavLink
              key={tab}
              className={cn(
                'border-b-2',
                currentTab.toLowerCase() === tab.toLowerCase()
                  ? 'text-foreground border-brand'
                  : 'text-brand border-transparent'
              )}
              to={`/block/${height}/${tab.toLowerCase() !== 'extrinsics' ? tab.toLowerCase() : ''}`}
            >
              <div className="px-2 pb-2 h-full w-full font-medium cursor-pointer">{tab}</div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}
