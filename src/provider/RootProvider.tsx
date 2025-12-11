import { MantineProvider } from '@mantine/core'
import type { FC, ReactNode } from 'react'
import { theme } from '../theme'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'

interface RootProviderProps {
  children: ReactNode
}

const queryClient = new QueryClient()

export const RootProvider: FC<RootProviderProps> = ({ children }) => (
  <MantineProvider theme={theme}>
    <Notifications />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  </MantineProvider>
)
