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
}
