import { formatAmount } from '@did-network/dapp-sdk'
import dayjs from 'dayjs'
import * as React from 'react'

import { BlockTime } from '@/components/blockchain/BlockTime'
import { CopyButton } from '@/components/blockchain/CopyButton'
import type { IBlock } from '@/types'
import { formatTimestampToAgo } from '@/utils/formatSecondsToAgo'

export const Prompting = ({ block }: { block: IBlock }) => {
  return (
    <div className="bg-brand/5 py-6 px-8 lt-sm:(py-4 px-4)">
      <div className="flex items-center gap-1 font-[Orbitron] text-brand text-2xl lt-sm:text-xl">Block</div>
      <div className="flex items-center gap-1 font-[Orbitron] text-xl lt-sm:text-lg">
        #{block.height}
        <CopyButton value={block.height} />
      </div>
      <div className="my-4 space-y-3 lt-sm:space-y-4">
        <div className="flex lt-sm:flex-col lt-sm:items-start">
          <span className="w-30 shrink-0 text-brand lt-sm:w-full">Timestamp</span>
          <span className="lt-sm:mt-1 break-all">{dayjs(block.timestamp).format('MMM D, YYYY h:mm:ss A (UTC)')}</span>
        </div>
        <div className="flex lt-sm:flex-col lt-sm:items-start">
          <span className="w-30 shrink-0 text-brand lt-sm:w-full">Block time</span>
          <span className="lt-sm:mt-1">{formatTimestampToAgo(block.timestamp)}</span>
        </div>
        <div className="flex lt-sm:flex-col lt-sm:items-start">
          <span className="w-30 shrink-0 text-brand lt-sm:w-full">Block height</span>
          <span className="lt-sm:mt-1">{block.height}</span>
        </div>
        <div className="flex lt-sm:flex-col lt-sm:items-start">
          <span className="w-30 shrink-0 text-brand lt-sm:w-full">Hash</span>
          <span className="lt-sm:mt-1 break-all">{block.hash}</span>
        </div>
        <div className="flex lt-sm:flex-col lt-sm:items-start">
          <span className="w-30 shrink-0 text-brand lt-sm:w-full">Parent hash</span>
          <span className="lt-sm:mt-1 break-all">{block.parentHash}</span>
        </div>
        <div className="flex lt-sm:flex-col lt-sm:items-start">
          <span className="w-30 shrink-0 text-brand lt-sm:w-full">Spec version</span>
          <span className="lt-sm:mt-1">{block.specVersion}</span>
        </div>
      </div>
    </div>
  )
}
