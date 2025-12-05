import { createTheme } from '@mantine/core'
import { ExtendedModal } from './ExtendedModal/ExtendedModal'

export const theme = createTheme({
  primaryColor: 'dark',
  defaultRadius: 8,
  components: {
    Modal: ExtendedModal,
  },
})
