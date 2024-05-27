import { cn } from '@/lib/utils'

export const SubnetsPanel = () => {
  return (
    <div className="shrink-0">
      <div className="uppercase text-lg">Subnets</div>
      <div className="mt-4 grid grid-cols-8 gap-1">
        {Array(36)
          .fill(1)
          .map((item, index) => (
            <div
              className={cn(
                'w-8 h-8 text-primary bg-[rgba(173,172,227,0.08)] hover:btn-brand-bg-bold cursor-pointer flex-col-center',
                index <= 0 ? 'btn-brand-bg-bold' : ''
              )}
            >
              {index + 1}
            </div>
          ))}
      </div>

      <div className="mt-5 space-y-5">
        {[
          { key: 'Active Keys', value: '256/256', totalValue: '256' },
          { key: 'Active Validators', value: '256/256', totalValue: '256' },
          { key: 'Active Miners', value: '256/256', totalValue: '256' },
          { key: 'Registration Cost', value: '0.6' },
        ].map((item) => (
          <div className="flex-center justify-between">
            <div className="flex flex-col gap-.5">
              <span className="text-brand text-sm">{item.key}</span>
              <span className="text-brand text-primary">
                <span>{item.totalValue ? `${item.value}/${item.totalValue}` : item.value}</span>
              </span>
            </div>
            {item.totalValue && (
              <div className="flex gap-1">
                {Array(10)
                  .fill(1)
                  .map((item, index) => (
                    <span
                      className={cn(
                        'w-1 h-5 bg-muted rounded-sm',
                        index < 4 ? ' bg-#adace3 shadow shadow-[#adace3]' : ''
                      )}
                    />
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
