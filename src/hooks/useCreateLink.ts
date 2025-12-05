import { useMutation, type MutationOptions } from '@tanstack/react-query'
import type { LinkFormValues } from '../types/LinkFormValues'
import type { Link } from '../types/Link'
import { LINKS_URL } from '../constants/urls'

export const useCreateLink = (
  options?: MutationOptions<Link, Error, LinkFormValues>,
) => {
  return useMutation({
    mutationFn: async (payload) => {
      const resp = await fetch(LINKS_URL, {
        method: 'POST',
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
  })
}
