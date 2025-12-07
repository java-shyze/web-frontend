import {
  useMutation,
  useQueryClient,
  type MutationOptions,
} from '@tanstack/react-query'
import type { Link } from '../types/Link'
import type { LinkFormValues } from '../types/LinkFormValues'
import { LINKS_URL } from '../constants/urls'
import { getLinksKey } from './useGetLinks'

export const useEditLink = (
  id: string,
  options?: MutationOptions<Link, Error, LinkFormValues>,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload) => {
      const resp = await fetch(`${LINKS_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await resp.json()

      if (!resp.ok) {
        throw new Error(
          `HTTP ${resp.status}: ${data.message || resp.statusText}`,
        )
      }

      return data
    },

    ...options,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args)
      queryClient.invalidateQueries({ queryKey: [getLinksKey] })
    },
  })
}
