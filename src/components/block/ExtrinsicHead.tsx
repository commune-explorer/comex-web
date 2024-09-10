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
        <div className="bg-brand/5 py-6 px-8 lt-sm:(py-4 px-4) space-y-4">
          <Skeleton className="h-9 w-30 lt-sm:(h-7 w-24)" />
          <Skeleton className="h-8 w-40 lt-sm:(h-6 w-full)" />
          <div className="space-y-3 lt-sm:space-y-4">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="flex lt-sm:flex-col">
                <Skeleton className="h-4 w-30 lt-sm:w-full" />
                <Skeleton className="h-4 w-50 ml-4 lt-sm:(ml-0 mt-1 w-3/4)" />
              </div>
            ))}
          </div>
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
      <div className="bg-brand/5 py-6 px-8 lt-sm:(py-4 px-4)">
        <div className="flex items-center gap-1 font-[Orbitron] text-brand text-2xl lt-sm:text-xl">Extrinsic</div>
        <div className="flex items-center gap-1 font-[Orbitron] text-xl lt-sm:text-lg break-all">
          #{extrinsic.id}
          <CopyButton value={extrinsic.id} />
        </div>
        <div className="my-4 space-y-3 lt-sm:space-y-4">
          <div className="flex lt-sm:flex-col lt-sm:items-start">
            <span className="w-30 shrink-0 text-brand lt-sm:w-full">Timestamp</span>
            <span className="lt-sm:mt-1">
              {isFetchingBlock ? (
                <span className="translate-x-10 w-5 h-5 animate-spin text-brand/60 i-mingcute:loading-fill lt-sm:translate-x-0"></span>
              ) : (
                dayjs(block?.timestamp).format('MMM D, YYYY h:mm:ss A (UTC)')
              )}
            </span>
          </div>
          <div className="flex lt-sm:flex-col lt-sm:items-start">
            <span className="w-30 shrink-0 text-brand lt-sm:w-full">Block</span>
            <div className="flex items-center gap-1 lt-sm:mt-1">
              <a href={`/block/${extrinsic.blockNumber}`} className="hover:(underline)">
                {extrinsic.blockNumber}
              </a>
              <CopyButton value={extrinsic.blockNumber} />
            </div>
          </div>
          <div className="flex lt-sm:flex-col lt-sm:items-start">
            <span className="w-30 shrink-0 text-brand lt-sm:w-full">Block time</span>
            <span className="lt-sm:mt-1">
              {isFetchingBlock ? (
                <span className="translate-x-10 w-5 h-5 animate-spin text-brand/60 i-mingcute:loading-fill lt-sm:translate-x-0"></span>
              ) : (
                formatTimestampToAgo(block?.timestamp ?? '')
              )}
            </span>
          </div>
          <div className="flex lt-sm:flex-col lt-sm:items-start">
            <span className="w-30 shrink-0 text-brand lt-sm:w-full">Signer</span>
            <div className="flex items-center gap-1 lt-sm:mt-1">
              <span className="break-all">
                <a href={`/account/${extrinsic.signer}`} className="hover:(underline)">
                  {extrinsic.signer}
                </a>
              </span>
              <CopyButton value={extrinsic.signer} />
            </div>
          </div>
          <div className="flex lt-sm:flex-col lt-sm:items-start">
            <span className="w-30 shrink-0 text-brand lt-sm:w-full">hash</span>
            <span className="lt-sm:mt-1 break-all">{extrinsic.hash}</span>
          </div>
          <div className="flex lt-sm:flex-col lt-sm:items-start">
            <span className="w-30 shrink-0 text-brand lt-sm:w-full">Version</span>
            <span className="lt-sm:mt-1">{extrinsic.version}</span>
          </div>
          <div className="flex lt-sm:flex-col lt-sm:items-start">
            <span className="w-30 shrink-0 text-brand lt-sm:w-full">Success</span>
            <span className="lt-sm:mt-1">
              {extrinsic.success ? <div className="text-$green">✔</div> : <div className="text-$red">✗</div>}
            </span>
          </div>
          <div className="flex lt-sm:flex-col lt-sm:items-start">
            <span className="w-30 shrink-0 text-brand lt-sm:w-full">Action</span>
            <code className="bg-black/50 text-green-400 px-2 py-1 font-mono lt-sm:mt-1">
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
          <div className="flex lt-sm:flex-col lt-sm:items-start">
            <span className="w-30 shrink-0 text-brand lt-sm:w-full">Arguments</span>
            <div className="relative lt-sm:mt-1 lt-sm:w-full">
              <code className="bg-black/50 text-green-400 px-2 py-1 font-mono block max-h-[350px] overflow-y-auto lt-sm:w-full">
                <JSONObjectContainer data={JSON.parse(extrinsic.args)} />
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
