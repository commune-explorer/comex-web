import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(duration)
dayjs.extend(relativeTime)

export function formatSecondsToAgo(seconds: number) {
  return dayjs.duration(-seconds, 'seconds').humanize(true)
}

export function formatTimestampToAgo(timestamp: string) {
  const now = dayjs()
  const then = dayjs(timestamp).utc(true)
  const diffInSeconds = now.diff(then, 'second')

  if (diffInSeconds <= 1) {
    return ''
  }
  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} days${days > 1 ? 's' : ''} ago`
  }
}
