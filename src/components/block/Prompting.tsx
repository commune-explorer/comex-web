import { formatAmount } from '@did-network/dapp-sdk'
import dayjs from 'dayjs'
import * as React from 'react'

import { BlockTime } from '@/components/blockchain/BlockTime'
import { CopyButton } from '@/components/blockchain/CopyButton'
import type { IBlock } from '@/types'
import { formatTimestampToAgo } from '@/utils/formatSecondsToAgo'

export const Prompting = ({ block }: { block: IBlock }) => {
  return (
    <div className="bg-brand/5 py-6 px-8 lt-sm:(py-3 px-4)">
      <div className="flex items-center gap-1 font-[Orbitron] text-brand text-2xl">Block</div>
      <div className="flex items-center gap-1 font-[Orbitron] text-xl">
        #{block.height}
        <CopyButton value={block.height} />
      </div>
      <div className="my-4 space-y-2">
        <div className="flex items-center">
          <span className="w-30 shrink-0 text-brand">Timestamp</span>
          {dayjs(block.timestamp).format('MMM D, YYYY h:mm:ss A (UTC)')}
        </div>
        <div className="flex items-center">
          <span className="w-30 shrink-0 text-brand">Block time</span>
          {formatTimestampToAgo(block.timestamp)}
        </div>

        <div className="flex items-center">
          <span className="w-30 shrink-0 text-brand">Block height</span>
          {block.height}
        </div>
        <div className="flex items-center">
          <span className="w-30 shrink-0 text-brand">Hash</span>
          {block.hash}
        </div>
        <div className="flex items-center">
          <span className="w-30 shrink-0 text-brand">Parent hash</span>
          {block.parentHash}
        </div>
        <div className="flex items-center">
          <span className="w-30 shrink-0 text-brand">Spec version</span>
          {block.specVersion}
        </div>
      </div>
    </div>
  )
}
