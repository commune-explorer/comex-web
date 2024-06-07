import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/utils'

export function BlockchainTabs({ currentTab }: { currentTab: string }) {
  return (
    <div className="py-4 flex items-center gap-4">
      {['Accounts', 'Delegations', 'Transfers'].map((tab) => (
        <NavLink
          key={tab}
          className={cn(
            'border-b-2',
            currentTab.toLowerCase() === tab.toLowerCase()
              ? 'text-foreground border-brand'
              : 'text-brand border-transparent'
          )}
          to={`/blockchain/${tab.toLowerCase()}`}
        >
          <div className="px-2 pb-2 h-full w-full font-medium cursor-pointer">{tab}</div>
        </NavLink>
      ))}
    </div>
  )
}
