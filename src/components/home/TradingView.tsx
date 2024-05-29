import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Area, Bar, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts'

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

  return (
    <div className="h-400px w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart width={500} height={400} data={recentRecords}>
          <XAxis className="text-xs" dataKey="timestamp" tickFormatter={(val) => dayjs(val * 1000).format("MMM YY'")} />
          <YAxis
            yAxisId="price"
            className="text-xs"
            domain={[0, maxPrice * 1.2]}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <YAxis
            yAxisId="volume"
            className="text-xs"
            orientation="right"
            domain={[0, maxVolume * 2]}
            tickFormatter={(value) => formatNumber(value)}
          />

          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#adace3" stopOpacity={0.5} />
              <stop offset="70%" stopColor="transparent" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          {recentRecords && (
            <>
              {/* <Line type="monotone" dataKey="close" dot={false} stroke="#adace3" /> */}
              <Area dataKey="price" stroke="#adace3" dot={false} fill="url(#colorUv)" yAxisId="price" />
              <Bar dataKey="volume" barSize={1} fill="rgba(20, 222, 194, 0.5)" yAxisId="volume" />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
