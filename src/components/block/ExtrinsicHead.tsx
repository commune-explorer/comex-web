import { shorten } from '@did-network/dapp-sdk'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

import { accountKeys, blockKeys, eventKeys, extrinsicKeys } from '@/apis/queries'
import { ExpandableJSONContainer } from '@/components/block/ExpandableJSONContainer'
import { JSONObjectContainer } from '@/components/block/JSONObjectContainer'
import { Prompting } from '@/components/block/Prompting'
import { CopyButton } from '@/components/blockchain/CopyButton'
import { ExtrinsicInfo } from '@/components/extrinsic/ExtrinsicInfo'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { IAccountInfo, IBlock, IEvent, IExtrinsic } from '@/types'
import { get } from '@/utils'
import { formatTimestampToAgo } from '@/utils/formatSecondsToAgo'

export function ExtrinsicHead({ id, events }: { id: string; events: IEvent[] }) {
  const { data, isPending, isFetching } = useQuery<{ data: { records: IExtrinsic[]; totalCount: number } }>({
    queryKey: [
      'extrinsic',
      ...extrinsicKeys.list({
        pageIndex: 0,
        pageSize: 1,
        filters: id,
      }),
    ],
    queryFn: () => {
      let params = {
        limit: 1,
        offset: 0,
        id: id,
      } as Record<PropertyKey, any>
      return get(`/api/extrinsic`, { params })
    },
    enabled: true,
  })

  const { data: blockdata, isFetching: isFetchingBlock } = useQuery<{
    data: { records: IBlock[]; totalCount: number }
  }>({
    queryKey: [
      'block',
      ...blockKeys.list({
        pageIndex: 0,
        pageSize: 1,
        filters: id.split('-')[0],
      }),
    ],
    queryFn: () => {
      let params = {
        limit: 1,
        offset: 0,
        height: id.split('-')[0],
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

  const extrinsic = data?.data.records[0]
  if (!extrinsic) {
    return <div>Extrinsic not found!</div>
  }
  const block = blockdata?.data.records[0]
  return (
    <div className="container mx-auto mt-10">
      <div className="bg-brand/5 py-6 px-8 lt-sm:(py-3 px-4)">
        <div className="flex items-center gap-1 font-[Orbitron] text-brand text-2xl">Extrinsic</div>
        <div className="flex items-center gap-1 font-[Orbitron] text-xl">
          #{extrinsic.id}
          <CopyButton value={extrinsic.id} />
        </div>
        <div className="my-4 space-y-2">
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">Timestamp</span>
            {isFetchingBlock ? (
              <span className="translate-x-10 w-5 h-5 animate-spin text-brand/60 i-mingcute:loading-fill"></span>
            ) : (
              dayjs(block?.timestamp).format('MMM D, YYYY h:mm:ss A (UTC)')
            )}
          </div>
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">Block</span>
            <div className="flex items-center gap-1">
              <a href={`/block/${extrinsic.blockNumber}`} className="hover:(underline)">
                {extrinsic.blockNumber}
              </a>
              <CopyButton value={extrinsic.blockNumber} />
            </div>
          </div>
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">Block time</span>
            {isFetchingBlock ? (
              <span className="translate-x-10 w-5 h-5 animate-spin text-brand/60 i-mingcute:loading-fill"></span>
            ) : (
              formatTimestampToAgo(block?.timestamp ?? '')
            )}
          </div>
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">Signer</span>
            <div className="flex items-center gap-1">
              <span>
                <a href={`/account/${extrinsic.signer}`} className="hover:(underline)">
                  {extrinsic.signer}
                </a>
              </span>
              <CopyButton value={extrinsic.signer} />
            </div>
          </div>
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">hash</span>
            {extrinsic.hash}
          </div>
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">Version</span>
            {extrinsic.version}
          </div>
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">Success</span>
            {extrinsic.success ? <div className="text-$green">✔</div> : <div className="text-$red">✗</div>}
          </div>
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">Action</span>
            <code className="bg-black/50 text-green-400 px-2 py-1 font-mono">
              {extrinsic.module}::{extrinsic.method}
            </code>
          </div>
          <ExtrinsicInfo
            module={extrinsic.module}
            method={extrinsic.method}
            data={extrinsic.args}
            signer={extrinsic.signer}
            events={events}
          />
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">Arguments</span>

            <div className="relative">
              <code className="bg-black/50 text-green-400 px-2 py-1 font-mono block max-h-[350px] overflow-y-auto">
                <JSONObjectContainer data={JSON.parse(extrinsic.args)} />
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
