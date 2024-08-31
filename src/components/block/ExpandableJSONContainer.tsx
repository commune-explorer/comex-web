import { Cross1Icon, EyeOpenIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'

import { JSONObjectContainer } from '@/components/block/JSONObjectContainer'
import { CopyButton } from '@/components/blockchain/CopyButton'

export const ExpandableJSONContainer: React.FC<{ data: any; scrollable?: boolean }> = ({ data, scrollable }) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <div>
      {!expanded ? (
        <EyeOpenIcon
          onClick={() => setExpanded(true)}
          className="text-muted-foreground hover:text-foreground cursor-pointer flex items-center justify-end mb-2"
        />
      ) : (
        ''
      )}

      {expanded ? (
        <div className="font-mono text-green-500 bg-black/80 pb-2 pr-2 pl-2 rounded-md overflow-x-auto border border-gray-500/50 absolute right-0 z-10">
          <div className="text-muted-foreground hover:text-foreground cursor-pointer flex items-center justify-end mb-2 border-b h-5">
            <CopyButton value={JSON.stringify(data)} />
            <Cross1Icon className="ml-2" onClick={() => setExpanded(false)} />
          </div>
          <pre className="mt-2 max-w-[200px] max-h-[100px] overflow-auto">
            <JSONObjectContainer data={data} />
          </pre>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
