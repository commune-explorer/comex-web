import { formatAmount, shorten } from '@did-network/dapp-sdk'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import * as React from 'react'
import { Tooltip } from 'react-tooltip'

import { CopyButton } from '@/components/blockchain/CopyButton'
import { IEvent } from '@/types'
import { formatSecondsToAgo } from '@/utils/formatSecondsToAgo'

dayjs.extend(utc)

export function ExtrinsicInfo({
  module,
  method,
  data,
  signer,
  events,
}: {
  module: string
  method: string
  data: string
  signer: string
  events: IEvent[]
}) {
  if (events) {
    let fee = <></>
    const mapped = events.map((event) => {
      const parsedArgs = JSON.parse(event.data)
      if (
        event.module === 'transactionPayment' &&
        event.eventName === 'TransactionFeePaid' &&
        parseInt(parsedArgs[1]) > 0
      ) {
        const amount = formatAmount(parsedArgs[1], 9, 2)
        return (
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">Transaction fee</span>
            <div className="flex items-center gap-1 bg-black/50 text-green-400 px-2 py-1">
              <div className="py-1 pr-2 font-bold">{amount} COMAI</div>
              <div className="py-1 pr-2">paid by</div>
              <div className="py-1 pr-2 font-bold">
                <a href={`/account/${parsedArgs[0]}`} className="hover:(underline)">
                  {shorten(parsedArgs[0], 10, 10)}
                </a>
              </div>
            </div>
          </div>
        )
      }
      if (event.module === 'balances' && event.eventName === 'Transfer') {
        const sender = parsedArgs[0]
        const receiver = parsedArgs[1]
        const amount = formatAmount(parsedArgs[2], 9, 2)

        return (
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">Transfer</span>
            <div className="flex items-center gap-1 bg-black/50 text-green-400 px-2 py-1">
              <div className="py-1 pr-2 font-bold">{amount} COMAI</div>
              <div className="py-1 pr-2">from</div>
              <div className="py-1 pr-2 font-bold">
                <a href={`/account/${sender}`} className="hover:(underline)">
                  {shorten(sender, 10, 10)}
                </a>
              </div>
              <div className="py-1 pr-2">to</div>
              <div className="py-1 pr-2 font-bold">
                <a href={`/account/${receiver}`} className="hover:(underline)">
                  {shorten(receiver, 10, 10)}
                </a>
              </div>
            </div>
          </div>
        )
      }
      if (event.module === 'subspaceModule' && event.eventName === 'StakeAdded') {
        const delegator = parsedArgs[0]
        const delegatedTo = parsedArgs[1]
        const amount = formatAmount(parsedArgs[2], 9, 2)

        return (
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">Added stake</span>
            <div className="flex items-center gap-1 bg-black/50 text-green-400 px-2 py-1">
              <div className="py-1 pr-2  font-bold">
                <a href={`/account/${delegator}`} className="hover:(underline)">
                  {shorten(delegator, 10, 10)}
                </a>
              </div>
              <div className="py-1 pr-2">added</div>
              <div className="py-1 pr-2 font-bold">{amount} COMAI</div>
              <div className="py-1 pr-2">stake to</div>
              <div className="py-1 pr-2 font-bold">
                <a href={`/account/${delegatedTo}`} className="hover:(underline)">
                  {shorten(delegatedTo, 10, 10)}
                </a>
              </div>
            </div>
          </div>
        )
      }
      if (event.module === 'subspaceModule' && event.eventName === 'StakeRemoved') {
        const delegator = parsedArgs[0]
        const delegatedTo = parsedArgs[1]
        const amount = formatAmount(parsedArgs[2], 9, 2)

        return (
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">Removed stake</span>
            <div className="flex items-center gap-1 bg-black/50 text-green-400 px-2 py-1">
              <div className="py-1 pr-2  font-bold">
                <a href={`/account/${delegator}`} className="hover:(underline)">
                  {shorten(delegator, 10, 10)}
                </a>
              </div>
              <div className="py-1 pr-2">removed</div>
              <div className="py-1 pr-2 font-bold">{amount} COMAI</div>
              <div className="py-1 pr-2">stake from</div>
              <div className="py-1 pr-2 font-bold">
                <a href={`/account/${delegatedTo}`} className="hover:(underline)">
                  {shorten(delegatedTo, 10, 10)}
                </a>
              </div>
            </div>
          </div>
        )
      }

      if (event.module === 'subspaceModule' && event.eventName === 'ModuleRegistered') {
        const subnet = parsedArgs[0]
        const uid = parsedArgs[1]
        const account = parsedArgs[2]

        const extrinsicArgs = JSON.parse(data)
        const snname = decodeURIComponent(extrinsicArgs[0].replace(/^0x/, '').replace(/[0-9a-f]{2}/g, '%$&'))
        const modulename = decodeURIComponent(extrinsicArgs[1].replace(/^0x/, '').replace(/[0-9a-f]{2}/g, '%$&'))

        return (
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">Module registered</span>
            <div className="flex items-center gap-1 bg-black/50 text-green-400 px-2 py-1">
              <div className="py-1 pr-2 font-bold">
                <a href={`/account/${account}`} className="hover:(underline)">
                  {shorten(account, 10, 10)}
                </a>
              </div>
              <div className="py-1 pr-2">registered as</div>
              <div className="py-1 pr-2 font-bold">
                <a href={`/account/${account}`} className="hover:(underline)">
                  {modulename}
                </a>
              </div>
              <div className="py-1 pr-2">on subnet</div>
              <div className="py-1 pr-2 font-bold">
                <a href={`/subnets/${subnet}`} className="hover:(underline)">
                  {subnet}: {snname}
                </a>
              </div>
            </div>
          </div>
        )
      }
    })

    return <div>{mapped}</div>
  }
  return <div className="translate-x-10 w-5 h-5 animate-spin text-brand/60 i-mingcute:loading-fill"></div>

  // return (
  //   <div className="flex items-center">
  //     <span className="w-30 shrink-0 text-brand">Signer</span>
  //     <div className="flex items-center gap-1">
  //       <span>
  //         <a href={`/account/${extrinsic.signer}`} className="hover:(underline)">
  //           {extrinsic.signer}
  //         </a>
  //       </span>
  //       <CopyButton value={extrinsic.signer} />
  //     </div>
  //   </div>
  // )
}
