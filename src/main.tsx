import { createRoot } from 'react-dom/client'
import { App } from './App'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import { RootProvider } from './provider/RootProvider'
import 'dayjs/locale/ru'
import '@mantine/core/styles.css'
import 'mantine-datatable/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/notifications/styles.css'

dayjs.locale('ru')
dayjs.extend(relativeTime)
dayjs.extend(quarterOfYear)

createRoot(document.getElementById('root')!).render(
  <RootProvider>
    <App />
  </RootProvider>,
)
