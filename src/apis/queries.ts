export const profileKeys = {
  all: ['profile'] as const,
}

export const subnetKeys = {
  all: ['subnets'] as const,
  details: () => [...subnetKeys.all, 'detail'] as const,
  detail: (id: number | string) => [...subnetKeys.details(), id] as const,
}
