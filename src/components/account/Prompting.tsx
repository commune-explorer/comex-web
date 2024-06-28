import { formatAmount } from '@did-network/dapp-sdk'
import { useQuery } from '@tanstack/react-query'

import { accountKeys } from '@/apis/queries'
import { AccountTag } from '@/components/account/AccountTag'
import { CopyButton } from '@/components/blockchain/CopyButton'
import type { IAccountInfo } from '@/types'
import { get } from '@/utils'

export const Prompting = ({ account }: { account?: IAccountInfo }) => {
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
  return (
    <div className="bg-brand/5 py-6 px-8 lt-sm:(py-3 px-4)">
      <div className="flex items-center gap-1 font-[Orbitron] text-brand text-2xl">Account</div>
      <div className="flex items-center gap-1 font-[Orbitron] text-xl">
        {account?.address ?? 'Not found'}
        {account?.address ? <CopyButton value={account?.address ?? ''} /> : ''}
      </div>
      <div className="my-4 space-y-2">
        {account?.tag && (
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">Belongs to</span>
            {account.tag.text}
          </div>
        )}
        {totalCount && (
          <div className="flex items-center">
            <span className="w-30 shrink-0 text-brand">Rank</span>
            {totalCount.data.totalCount}
          </div>
        )}
        <div className="flex items-center">
          <span className="w-30 shrink-0 text-brand">Updated at</span>
          {account?.updatedAt}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 lt-sm:(grid-cols-2)">
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
            <span className="text-brand">{item.title}</span>
            <span className="text-lg text-primary">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
