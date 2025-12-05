import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { theme } from './theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </MantineProvider>,
)
