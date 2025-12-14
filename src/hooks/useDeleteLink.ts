import {
  useMutation,
  useQueryClient,
  type MutationOptions,
} from '@tanstack/react-query'
import { LINKS_URL } from '../constants/urls'
import { getLinksKey } from './useGetLinks'
import { notify } from '../utils/notify'

export const useDeleteLink = (id: string, options?: MutationOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await fetch(`${LINKS_URL}/${id}`, { method: 'DELETE' })
    },

    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: [getLinksKey] })
      options?.onSuccess?.(...args)
      notify('success', 'Ссылка успешно удалена')
    },
  })
}
