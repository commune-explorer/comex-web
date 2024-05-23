export const TokenProfile = () => {
  return (
    <div className="flex gap-10 py-5 items-center">
      <div className="w-12 h-12 rounded-full bg-secondary"></div>

      <div className="">
        <div className="flex items-center gap-2 text-brand text-sm">
          Bittensor price
          <Button variant="secondary" size="sm" className="px-2 py-1 h-auto text-xs">
            CMX
          </Button>
        </div>
        <div className="font-medium flex items-end gap-1">
          <span className="text-2xl">$407.00</span>
          <span className="text-green-400">12.02%</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12">
        {[
          {
            text: 'Market Cap',
            value: '$1.2B',
          },
          {
            text: '24h Volume',
            value: '$1.2B',
          },
          {
            text: 'Circulating Supply',
            value: '1.2B',
          },
          {
            text: 'Total Supply',
            value: '1.2B',
          },
          {
            text: 'Validating APR',
            value: '12.02%',
          },
          {
            text: 'Staking APR',
            value: '15.02%',
          },
        ].map((item, index) => (
          <div className="flex flex-col gap-1 col-span-2">
            <span className="text-sm text-brand">{item.text}</span>
            <span className="text-base text-primary">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
