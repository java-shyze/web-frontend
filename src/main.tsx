import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import 'mantine-datatable/styles.css'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { theme } from './theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ru'

const queryClient = new QueryClient()

dayjs.locale('ru')
dayjs.extend(relativeTime)

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </MantineProvider>,
)
