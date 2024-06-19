import { formatAmount } from '@did-network/dapp-sdk'
import { useQuery } from '@tanstack/react-query'

import { profileKeys } from '@/apis/queries'
import ComaiImg from '@/assets/images/comai.png'
import { formatNumber, get } from '@/utils'

interface InfoTooltipProps {
  text: string
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ text }) => {
  return (
    <div className="relative group">
      <svg
        className="w-4 h-4 ml-1 text-brand cursor-pointer"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-60">
        {text}
      </div>
    </div>
  )
}

interface IProfile {
  price: number
  priceChangePercentageIn24h: number
  volumeIn24h: number
  marketCap: number
  circulatingSupply: number
  totalSupply: number
  validatingApr: number
  dailyEmission: number
}

export const TokenProfile = () => {
  const { data: { data } = {}, isPending } = useQuery<{ data: IProfile }>({
    queryKey: profileKeys.all,
    queryFn: () => get('/api/info'),
  })
  if (isPending || !data)
    return (
      <div className="flex gap-10 py-4 items-center h-21">
        <Skeleton className="w-12 h-12 rounded-full" />
        {Array(5)
          .fill(1)
          .map((i) => (
            <div key={'skeleton_col' + i} className="space-y-2">
              <Skeleton className="h-4 w-30" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
      </div>
    )

  return (
    <div className="flex gap-10 py-4 items-center">
      <img src={ComaiImg} alt="" className="p-0.5 w-12 h-12 rounded-full" style={{ backgroundColor: 'transparent' }} />

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
            text: 'Daily Emission',
            value: formatNumber(data.dailyEmission),
          },
          // This is actually the staking apr, although it's called validating, this is because it counts in the floor fee
          {
            text: (
              <div className="flex items-center">
                Staking APR
                <InfoTooltip
                  text="This value does not include compound interest. 
It's calculation follows the formula: 
yearly rewards - floor fee / total stake * 100"
                />
              </div>
            ),
            value: `${data.validatingApr}%`,
          },
          // {
          //   text: 'Staking APR',
          //   value: `${data.validatingApr?.toFixed(2)}%`,
          // },
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
