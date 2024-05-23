import { cn } from '@/lib/utils'

export const SubnetsPanel = () => {
  return (
    <div className="shrink-0">
      <div className="uppercase text-lg"> subnets</div>
      <div className="mt-4 grid grid-cols-8 gap-1">
        {Array(36)
          .fill(1)
          .map((item, index) => (
            <div className="w-8 h-8 text-primary bg-secondary flex-col-center">{index + 1}</div>
          ))}
      </div>

      <div className="mt-5 space-y-5">
        {Array(4)
          .fill(1)
          .map(() => (
            <div className="flex-center justify-between">
              <div className="flex flex-col gap-.5">
                <span className="text-brand text-sm">Active Keys</span>
                <span className="text-brand text-primary">
                  <span>1000</span>
                  <span>/1024</span>
                </span>
              </div>
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
            </div>
          ))}
      </div>
    </div>
  )
}
