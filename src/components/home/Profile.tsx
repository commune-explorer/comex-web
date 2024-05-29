import { formatAmount } from '@did-network/dapp-sdk'
import { useQuery } from '@tanstack/react-query'

import { profileKeys } from '@/apis/queries'
import ComaiImg from '@/assets/images/comai.png'
import { formatNumber, get } from '@/utils'

interface IProfile {
  price: number
  priceChangePercentageIn24h: number
  volumeIn24h: number
  marketCap: number
  circulatingSupply: number
  totalSupply: number
  stakingApr: number
}

export const TokenProfile = () => {
  const { data: { data } = {} } = useQuery<{ data: IProfile }>({
    queryKey: profileKeys.all,
    queryFn: () => get('/api/info'),
  })
  if (!data) return null
  return (
    <div className="flex gap-10 py-5 items-center">
      <img src={ComaiImg} alt="" className="p-0.5 w-12 h-12 rounded-full bg-secondary" />

      <div className="">
        <div className="flex items-center gap-2 text-brand text-sm">$COMAI Price</div>
        <div className="font-medium flex items-end gap-1">
          <span className="text-2xl">${formatAmount(data.price, 0, 2)}</span>
          <span className={data.priceChangePercentageIn24h > 0 ? 'text-green-400' : 'text-red-400'}>
            {data.priceChangePercentageIn24h?.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12">
        {[
          {
            text: 'Market Cap',
            value: `$${formatNumber(data.marketCap ?? 0)}`,
          },
          {
            text: '24h Volume',
            value: `$${formatNumber(data.volumeIn24h ?? 0)}`,
          },
          {
            text: 'Circulating Supply',
            value: formatNumber(data.circulatingSupply ?? 0),
          },
          {
            text: 'Total Supply',
            value: formatNumber(data.totalSupply),
          },
          {
            text: 'Validating APR',
            value: `??%`, // TODO: replace
          },
          {
            text: 'Staking APR',
            value: `${data.stakingApr?.toFixed(2)}%`,
          },
        ].map((item, index) => (
          <div key={index} className="flex flex-col gap-1 col-span-2">
            <span className="text-sm text-brand">{item.text}</span>
            <span className="text-base text-primary">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
