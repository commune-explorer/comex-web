import dayjs from 'dayjs'

import type { ISubnet } from '@/types'

export const Prompting = ({ subnet }: { subnet: ISubnet }) => {
  return (
    <div className="bg-brand/5 py-6 px-8">
      <div className="text-brand text-4xl font-[Orbitron]">{subnet.name ?? '??'}</div>
      <div className="my-4 space-y-2">
        <div className="flex items-center">
          <span className="w-30 text-brand">Subnet repo</span>
          <a
            href={subnet.githubUrl}
            target="_blank"
            className="text-muted-foreground hover:text-foreground hover:underline underline-1"
          >
            {subnet.githubUrl}
          </a>
        </div>
        <div className="flex items-center">
          <span className="w-30 text-brand">Registered to</span>
          <span className="text-#FEC464 font-400">{subnet.registeredBy}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          {
            title: 'Emissions',
            value: `${subnet.emissionPercentage.toFixed(2)}%`,
          },
          {
            title: 'Active Validators',
            value: `${subnet.activeValidators}/${subnet.totalValidators}`,
          },
          {
            title: 'Active Miners',
            value: `${subnet.activeMiners}/${subnet.totalMiners}`,
          },
          {
            title: 'Registration Cost',
            value: `${subnet.registerCost.toFixed(2)}`,
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
