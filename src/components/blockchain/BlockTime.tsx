import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Tooltip } from 'react-tooltip'

import { formatSecondsToAgo } from '@/utils/formatSecondsToAgo'

dayjs.extend(utc)

export function BlockTime({ blockNumber, latestBlockHeight }: { blockNumber: number; latestBlockHeight?: number }) {
  let timeAgo = '-'
  let approxDate = '-'
  if (latestBlockHeight) {
    const secondsAgo = (latestBlockHeight - blockNumber) * 8
    const now = dayjs().utc()
    approxDate = now.subtract(secondsAgo, 'second').format('MMM D, YYYY h:mm:ss A (UTC)')
    timeAgo = formatSecondsToAgo(secondsAgo)
  }
  return (
    <div className="cursor-default">
      <Tooltip id={`${blockNumber}`} />
      <span data-tooltip-content={approxDate} data-tooltip-id={`${blockNumber}`} data-tooltip-place="top">
        {timeAgo}
      </span>
    </div>
  )
}
