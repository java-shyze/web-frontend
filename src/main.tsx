import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import 'mantine-datatable/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/charts/styles.css'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { theme } from './theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import 'dayjs/locale/ru'
import { BrowserRouter } from 'react-router'

const queryClient = new QueryClient()

dayjs.locale('ru')
dayjs.extend(relativeTime)
dayjs.extend(quarterOfYear)

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </MantineProvider>,
)
