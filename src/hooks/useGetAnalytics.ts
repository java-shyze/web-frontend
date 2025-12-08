import { useQuery, type QueryOptions } from '@tanstack/react-query'
import { ANALYTICS_URL } from '../constants/urls'
import type { Analytics, AnalyticsPeriod } from '../types/Analytics'

export const getAnalytics = 'get-analytics'

export const useGetAnalytics = (
  alias: string,
  params: AnalyticsPeriod,
  options?: QueryOptions<Analytics>,
) => {
  return useQuery({
    queryKey: [getAnalytics, params],
    queryFn: async () => {
      const url = new URL(`${ANALYTICS_URL}/${alias}`)

      if (params) {
        url.searchParams.set('start', params?.start)
        url.searchParams.set('end', params?.end)
      }

      const resp = await fetch(url)
      return resp.json()
    },

    ...options,
    refetchInterval: 3 * 1000 * 60,
  })
}
