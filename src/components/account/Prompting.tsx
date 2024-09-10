import { formatAmount } from '@did-network/dapp-sdk'
import { useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { useCookies } from 'react-cookie'

import { BlockTime } from '@/components/blockchain/BlockTime'
import { CopyButton } from '@/components/blockchain/CopyButton'
import { useBlockMetadata } from '@/hooks/useBlockMetadata'
import type { IAccountInfo } from '@/types'
import { get } from '@/utils'

export const Prompting = ({ account }: { account?: IAccountInfo }) => {
  const { lastProcessedHeight } = useBlockMetadata()

  const [cookies] = useCookies(['admin'])
  const isAdmin = cookies.admin && cookies.admin === 'ee352538125f3980d13fef8315a576c5'

  const { data: totalCount } = useQuery<{ data: { totalCount: number } }>({
    queryKey: [
      'rank',
      {
        balance: account?.balanceTotal,
      },
    ],
    queryFn: () => {
      let params = {
        balance: account?.balanceTotal,
      } as Record<PropertyKey, any>

      return account?.address ? get(`/api/accounts/rank`, { params }) : { data: { totalCount: 0 } }
    },
    enabled: true,
  })

  const {
    data: total_deposited,
    isPending,
    isFetching,
  } = useQuery<{ data: { total_deposited: object } }>({
    queryKey: [
      'total_deposited',
      {
        account: account?.address,
      },
    ],

    queryFn: () => {
      let params = {
        account: account?.address,
      } as Record<PropertyKey, any>
      if (isAdmin) {
        return account?.address ? get(`/api/accounts/deposits`, { params }) : { data: { total_deposited: {} } }
      }
      return { data: { total_deposited: {} } }
    },
    enabled: true,
  })

  return (
    <div className="bg-brand/5 py-6 px-8 lt-sm:(py-4 px-4)">
      <div className="flex items-center gap-1 font-[Orbitron] text-brand text-2xl lt-sm:text-xl">Account</div>
      <div className="flex items-center gap-1 font-[Orbitron] text-xl lt-sm:text-lg break-all">
        {account?.address ?? 'Not found'}
        {account?.address ? <CopyButton value={account?.address ?? ''} /> : ''}
      </div>
      <div className="my-4 space-y-2">
        {account?.tag && (
          <div className="flex items-center lt-sm:flex-col lt-sm:items-start">
            <span className="w-30 shrink-0 text-brand lt-sm:w-full">Belongs to</span>
            <span className="lt-sm:mt-1">{account.tag.text}</span>
          </div>
        )}
        {totalCount && (
          <div className="flex items-center lt-sm:flex-col lt-sm:items-start">
            <span className="w-30 shrink-0 text-brand lt-sm:w-full">Rank</span>
            <span className="lt-sm:mt-1">{totalCount.data.totalCount}</span>
          </div>
        )}
        {isAdmin && (
          <div className="flex items-center lt-sm:flex-col lt-sm:items-start">
            <span className="w-30 shrink-0 text-brand lt-sm:w-full">Total deposited</span>
            <div className="lt-sm:mt-1">
              {isFetching && (
                <span className="translate-x-10 w-5 h-5 animate-spin text-brand/60 i-mingcute:loading-fill lt-sm:translate-x-0"></span>
              )}
              {!isFetching && total_deposited && Object.values(total_deposited.data.total_deposited).length === 0 && (
                <span>none</span>
              )}
              {total_deposited && Object.values(total_deposited.data.total_deposited).length > 0 && (
                <div className="flex items-end">
                  <ul className="lt-sm:pl-0">
                    {Object.entries(total_deposited.data.total_deposited).map((value) => (
                      <li key={value[0]}>
                        <b>{value[0]}</b>: {formatAmount(value[1], 9, 2)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center lt-sm:flex-col lt-sm:items-start">
          <span className="w-30 shrink-0 text-brand lt-sm:w-full">Last update</span>
          <span className="lt-sm:mt-1">
            <BlockTime blockNumber={parseInt(account?.updatedAt ?? '0')} latestBlockHeight={lastProcessedHeight} />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 lt-sm:(grid-cols-2 gap-y-4)">
        {[
          {
            title: 'Total balance',
            value: `${formatAmount(account?.balanceTotal, 9, 2)}`,
          },
          {
            title: 'Free balance',
            value: `${formatAmount(account?.balanceFree, 9, 2)}`,
          },
          {
            title: 'Delegated',
            value: `${formatAmount(account?.balanceStaked, 9, 2)}`,
          },
        ].map((item, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-brand lt-sm:text-sm">{item.title}</span>
            <span className="text-lg text-primary lt-sm:text-base">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
