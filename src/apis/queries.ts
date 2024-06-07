export const profileKeys = {
  all: ['profile'] as const,
}

export const priceHistoryKeys = {
  all: ['price_history'] as const,
  lists: () => [...priceHistoryKeys.all, 'list'] as const,
  list: (filters: any) => [...priceHistoryKeys.lists(), { filters }] as const,
}

export const subnetKeys = {
  all: ['subnets'] as const,
  details: () => [...subnetKeys.all, 'detail'] as const,
  detail: (id: number | string) => [...subnetKeys.details(), id] as const,
  detailModules: (id: number | string) => [...subnetKeys.detail(id), 'modules'] as const,
  detailLeaderboard: (id: number | string) => [...subnetKeys.detail(id), 'leaderboard'] as const,
}

export const accountKeys = {
  all: ['blockchain'] as const,
  lists: () => [...accountKeys.all, 'list'] as const,
  list: (query: any) => [...accountKeys.lists(), { query }] as const,
}

export const delegationKeys = {
  all: ['blockchain'] as const,
  lists: () => [...delegationKeys.all, 'list'] as const,
  list: (query: any) => [...delegationKeys.lists(), { query }] as const,
}

export const transferKeys = {
  all: ['blockchain'] as const,
  lists: () => [...transferKeys.all, 'list'] as const,
  list: (query: any) => [...transferKeys.lists(), { query }] as const,
}
