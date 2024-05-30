import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Area, Bar, ComposedChart, ResponsiveContainer, Tooltip, type TooltipProps, XAxis, YAxis } from 'recharts'

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
        <div className="rounded bg-muted/70">
          <div className="bg-muted p-2">{dayjs(label * 1000).format('D MMM YY')}</div>
          <div className="p-2 text-sm">
            <div className="flex justify-between gap-2">
              <span className="relative pl-4 before:content-[''] before:absolute before:h-3 before:w-3 before:rounded-full before:overflow-hidden before:bg-#adace3 before:left-0 before:top-1/2 before:-translate-y-1/2">
                Price:
              </span>
              <span>{`${price ? Number(price)?.toFixed(2) : '-'}`}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="relative pl-4 before:content-[''] before:absolute before:h-3 before:w-3 before:rounded-full before:overflow-hidden before:bg-#22EAAECC before:left-0 before:top-1/2 before:-translate-y-1/2">
                Vol:
              </span>
              <span>{`${volume ? formatNumber(Number(volume)) : '-'}`}</span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
  return (
    <div className="h-400px w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart width={500} height={400} data={recentRecords}>
          <XAxis
            stroke="#ADACE344"
            tick={{ fill: '#ADACE3' }}
            tickLine={{ stroke: '#ADACE344' }}
            className="text-xs"
            dataKey="timestamp"
            interval={Math.floor(recentRecords.length / 10)}
            tickFormatter={(val) => dayjs(val * 1000).format('MM-DD')}
          />
          <YAxis
            stroke="#ADACE344"
            tick={{ fill: '#ADACE3' }}
            tickLine={{ stroke: '#ADACE344' }}
            yAxisId="price"
            className="text-xs"
            domain={[0, maxPrice * 1.05]}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <YAxis
            stroke="#ADACE344"
            tick={{ fill: '#ADACE3' }}
            tickLine={{ stroke: '#ADACE344' }}
            yAxisId="volume"
            className="text-xs"
            orientation="right"
            domain={[0, maxVolume * 2]}
            tickFormatter={(value) => formatNumber(value)}
          />

          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#adace3" stopOpacity={0.6} />
              <stop offset="90%" stopColor="transparent" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          {recentRecords && (
            <>
              <Tooltip content={<CustomTooltip />} />
              <Area dataKey="price" stroke="#adace3" dot={false} fill="url(#colorUv)" yAxisId="price" />
              <Bar dataKey="volume" barSize={1} fill="#22EAAECC" yAxisId="volume" />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
