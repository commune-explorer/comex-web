import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export const TradingView = () => {
  const { data } = useQuery({
    queryKey: ['trading-view'],
    queryFn: async () => {
      const { Data } = await (
        await fetch('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=50&aggregate=3&e=Kraken')
      ).json()

      return Data
    },
  })
  return (
    <div className="h-400px w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart width={500} height={400} data={data}>
          <XAxis className="text-xs" dataKey="time" tickFormatter={(val) => dayjs(val * 1000).format("MMM YY'")} />
          <YAxis className="text-xs" />

          {/* <Bar dataKey="close" barSize={2} fill="rgba(252, 185, 0, 0.5)" /> */}

          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#adace3" stopOpacity={0.5} />
              <stop offset="95%" stopColor="transparent" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          {data && (
            <>
              <Line type="monotone" dataKey="close" dot={false} stroke="#adace3" />
              <Area dataKey="close" stroke="transparent" dot={false} fill="url(#colorUv)" />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
