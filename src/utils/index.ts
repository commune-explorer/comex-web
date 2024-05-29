export * from './request'

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const formatNumber = (value: number): string => {
  if (typeof value !== 'number' || isNaN(value as number) || value === null || value === undefined) {
    return '-'
  }

  try {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(1)}B`
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(2)}K`
    } else {
      return `${value}`
    }
  } catch (error) {
    console.error('An error occurred while formatting number:', error)
    return 'An error occurred'
  }
}
