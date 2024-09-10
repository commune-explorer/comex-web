import { useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

import { accountKeys } from '@/apis/queries'
import { Prompting } from '@/components/account/Prompting'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { IAccountInfo } from '@/types'
import { get } from '@/utils'

export function AccountHead({ currentTab, account }: { currentTab: string; account: string }) {
  const { data, isPending, isFetching } = useQuery<{ data: { records: IAccountInfo[]; totalCount: number } }>({
    queryKey: [
      'accounts',
      ...accountKeys.list({
        pageIndex: 0,
        pageSize: 1,
        filters: account,
      }),
    ],
    queryFn: () => {
      let params = {
        limit: 1,
        offset: 0,
        account: account,
      } as Record<PropertyKey, any>
      return get(`/api/accounts`, { params })
    },
    enabled: true,
  })
  if (isFetching) {
    return (
      <div className="container mx-auto mt-10">
        <div className="bg-brand/5 py-6 px-8 lt-sm:(py-4 px-4) space-y-4">
          <Skeleton className="h-9 w-30 lt-sm:h-7 lt-sm:w-24" />
          <Skeleton className="h-8 w-150 lt-sm:h-6 lt-sm:w-full" />
          <div className="space-y-3 lt-sm:space-y-4">
            <div className="flex lt-sm:flex-col">
              <Skeleton className="h-4 w-30 lt-sm:w-full" />
              <Skeleton className="h-4 w-30 ml-4 lt-sm:(ml-0 mt-1 w-3/4)" />
            </div>
            <div className="flex lt-sm:flex-col">
              <Skeleton className="h-4 w-30 lt-sm:w-full" />
              <Skeleton className="h-4 w-30 ml-4 lt-sm:(ml-0 mt-1 w-3/4)" />
            </div>
            <div className="flex lt-sm:flex-col">
              <Skeleton className="h-4 w-30 lt-sm:w-full" />
              <Skeleton className="h-4 w-30 ml-4 lt-sm:(ml-0 mt-1 w-3/4)" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 lt-sm:(grid-cols-2 gap-y-4)">
            {Array(3)
              .fill(1)
              .map((i) => (
                <div key={'skeleton_col' + i} className="space-y-2">
                  <Skeleton className="h-4 w-30 lt-sm:w-full" />
                  <Skeleton className="h-4 w-20 lt-sm:w-3/4" />
                </div>
              ))}
          </div>
        </div>

        <div className="mt-20 flex-col-center">
          <span className="translate-x-10 w-5 h-5 animate-spin text-brand/60 i-mingcute:loading-fill"></span>
        </div>
      </div>
    )
  }
  return (
    <div className="container mx-auto mt-10">
      <Prompting account={data?.data.records[0]} />
      <div className="justify-between flex">
        <div className="py-4 flex items-center gap-4">
          {['Transfers', 'Delegations', 'Extrinsics'].map((tab) => (
            <NavLink
              key={tab}
              className={cn(
                'border-b-2',
                currentTab.toLowerCase() === tab.toLowerCase()
                  ? 'text-foreground border-brand'
                  : 'text-brand border-transparent'
              )}
              to={`/account/${account}/${tab.toLowerCase() !== 'transfers' ? tab.toLowerCase() : ''}`}
            >
              <div className="px-2 pb-2 h-full w-full font-medium cursor-pointer">{tab}</div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}
