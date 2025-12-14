import {
  useMutation,
  useQueryClient,
  type MutationOptions,
} from '@tanstack/react-query'
import type { LinkFormValues } from '../types/LinkFormValues'
import type { Link } from '../types/Link'
import { LINKS_URL } from '../constants/urls'
import { getLinksKey } from './useGetLinks'
import { notify } from '../utils/notify'

export const useCreateLink = (
  options?: MutationOptions<Link, Error, LinkFormValues>,
) => {
  const queryClient = useQueryClient()

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
    onSuccess: (...args) => {
      options?.onSuccess?.(...args)
      queryClient.invalidateQueries({ queryKey: [getLinksKey] })

      notify('success', 'Ссылка успешно создана', args[0].originalUrl)
    },

    onError: (...args) => {
      options?.onError?.(...args)
      notify('error', 'Произошла ошибка', args[0].message)
    },
  })
}
