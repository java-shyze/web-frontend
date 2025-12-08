import { useQuery, type QueryOptions } from '@tanstack/react-query'
import { LINKS_URL } from '../constants/urls'
import type { Link } from '../types/Link'

export const getLinkByIdKey = 'get-link-by-id'

export const useGetLinkById = (id: string, options?: QueryOptions<Link>) => {
  return useQuery({
    queryKey: [getLinkByIdKey],
    queryFn: async () => {
      const resp = await fetch(`${LINKS_URL}/${id}`)
      return resp.json()
    },

    ...options,
  })
}
