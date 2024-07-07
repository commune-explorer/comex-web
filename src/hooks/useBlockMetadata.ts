import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { post } from '@/utils'

export function useBlockMetadata() {
  const { data } = useQuery({
    queryKey: ['block-metadata'],
    queryFn: async () => {
      return (
        await post<{ data: { _metadata: { lastProcessedHeight: number } } }>(
          `https://api.subquery.network/sq/CommuneExplorer/commune-indexer`,
          { query: '{ _metadata { lastProcessedHeight } }' }
        )
      ).data._metadata
    },
    placeholderData: keepPreviousData,
  })

  return {
    lastProcessedHeight: data?.lastProcessedHeight,
  }
}
