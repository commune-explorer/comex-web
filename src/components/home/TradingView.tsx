import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Area, Bar, ComposedChart, ResponsiveContainer, Tooltip, type TooltipProps, XAxis, YAxis } from 'recharts'
import { useMediaQuery } from 'usehooks-ts'

import { priceHistoryKeys } from '@/apis/queries'
import type { ITrading } from '@/types'
import { formatNumber, get } from '@/utils'

export const TradingView = () => {
  const [filters, setFilters] = useState({})
  const { data: { data: { records = [] } = {} } = {} } = useQuery<{ data: { records: ITrading[] } }>({
    queryKey: priceHistoryKeys.list(filters),
    queryFn: () => get('/api/price-history', { params: filters }),
  })

  const recentRecords = useMemo(() => {
    const now = dayjs()
    const oneYearAgo = now.subtract(1, 'year')

    return records.filter((record) => {
      const recordDate = dayjs(Number(record.timestamp) * 1000)
      return recordDate.isAfter(oneYearAgo)
    })
  }, [records])

  const maxPrice = useMemo(() => {
    return recentRecords.reduce((max, item) => Math.max(max, item.price), 0)
  }, [recentRecords])

  const maxVolume = useMemo(() => {
    return recentRecords.reduce((max, item) => Math.max(max, item.volume), 0)
  }, [recentRecords])

  const CustomTooltip = ({ active, payload, label }: TooltipProps<string, string>) => {
    if (active && payload && payload.length) {
      const price = payload.find((p) => p.name === 'price')?.value
      const volume = payload.find((p) => p.name === 'volume')?.value
      return (
        <div className="w-36 text-sm overflow-hidden bg-[#060606] border border-white/6 border-2">
          <div className="bg-white/6 text-center py-1">{dayjs(label * 1000).format('DD MMM YYYY')}</div>
          <div className="px-3 py-2 bg-black/5 space-y-2">
            <div className="flex justify-between gap-2">
              <span className="relative pl-4 before:content-[''] before:absolute before:h-3 before:w-3 before:rounded-full before:overflow-hidden before:bg-#FFFFFF before:left-0 before:top-1/2 before:-translate-y-1/2">
                Price:
              </span>
              <span className="font-medium">{`$${price ? Number(price)?.toFixed(2) : '-'}`}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="relative pl-4 before:content-[''] before:absolute before:h-3 before:w-3 before:rounded-full before:overflow-hidden before:bg-#22EAAECC before:left-0 before:top-1/2 before:-translate-y-1/2">
                Vol:
              </span>
              <span className="font-medium">{`${volume ? formatNumber(Number(volume)) : '-'}`}</span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  const matches = useMediaQuery('(min-width: 640px)')

  return records.length <= 0 ? (
    <div className="h-60vh w-full flex-col-center">
      <span className="translate-x-10 w-5 h-5 animate-spin text-brand/60 i-mingcute:loading-fill"></span>
    </div>
  ) : (
    <div className="h-60vh w-full lt-sm:(px-4)">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart width={500} height={400} data={recentRecords}>
          <XAxis
            stroke="#ADACE344"
            tick={{ fill: '#FFFFFF' }}
            tickLine={{ stroke: '#ADACE344' }}
            className="text-xs"
            dataKey="timestamp"
            interval={Math.floor(recentRecords.length / 10)}
            tickFormatter={(val) => dayjs(val * 1000).format('MM-DD')}
          />
          {matches && (
            <>
              <YAxis
                stroke="#ADACE344"
                tick={{ fill: '#FFFFFF' }}
                tickLine={{ stroke: '#ADACE344' }}
                yAxisId="price"
                className="text-xs"
                domain={[0, maxPrice * 1.05]}
                tickFormatter={(value) => value.toFixed(2)}
              />
              <YAxis
                stroke="#ADACE344"
                tick={{ fill: '#FFFFFF' }}
                tickLine={{ stroke: '#ADACE344' }}
                yAxisId="volume"
                className="text-xs"
                orientation="right"
                domain={[0, maxVolume * 2]}
                tickFormatter={(value) => formatNumber(value)}
              />
            </>
          )}

          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.6} />
              <stop offset="90%" stopColor="transparent" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          {recentRecords && (
            <>
              <Tooltip content={<CustomTooltip />} />
              <Area
                isAnimationActive={false}
                dataKey="price"
                stroke="#ffffff"
                dot={false}
                fill="url(#colorUv)"
                yAxisId="price"
              />
              <Bar isAnimationActive={false} dataKey="volume" barSize={1} fill="#22EAAECC" yAxisId="volume" />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
