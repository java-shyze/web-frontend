import { useQuery, type QueryOptions } from '@tanstack/react-query'
import type { Link } from '../types/Link'
import type { RequestParams } from '../types/RequestParams'
import { LINKS_URL } from '../constants/urls'

const getLinksKey = 'get-links'

export const useGetLinks = (
  params?: RequestParams,
  options?: QueryOptions<Link[]>,
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
    ...options,
  })
}
