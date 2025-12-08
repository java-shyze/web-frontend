import { useQuery, type QueryOptions } from '@tanstack/react-query'
import { LINKS_URL } from '../constants/urls'
import type { Response } from '../types/Response'
import type { LinksRequestParams } from '../types/LinkRequestParams'

export const getLinksKey = 'get-links'

export const useGetLinks = (
  params?: LinksRequestParams,
  options?: QueryOptions<Response>,
) => {
  return useQuery({
    queryKey: [getLinksKey, params],
    queryFn: async () => {
      const url = new URL(LINKS_URL)

      if (params) {
        url.searchParams.set('search', params?.search ?? '')
        url.searchParams.set('page', params?.page.toString())
        url.searchParams.set('size', params?.size.toString())
      }

      const resp = await fetch(url)

      return resp.json()
    },
    staleTime: 5 * 1000 * 60,
    ...options,
  })
}
