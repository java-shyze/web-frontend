import type { DatesRangeValue, DateValue } from '@mantine/dates'
import { useSessionStorage } from '@mantine/hooks'
import dayjs from 'dayjs'

export const useAnalyticsPeriodStorage = () => {
  const [period, setPeriod, clearPeriod] = useSessionStorage<
    DatesRangeValue<DateValue>
  >({
    key: 'ANALYTICS_PERIOD',
    defaultValue: [
      dayjs().startOf('week').format('YYYY-MM-DD'),
      dayjs().endOf('week').format('YYYY-MM-DD'),
    ],
  })

  if (period[0] === null && period[1] === null) {
    setPeriod([
      dayjs().startOf('week').format('YYYY-MM-DD'),
      dayjs().endOf('week').format('YYYY-MM-DD'),
    ])
  }

  return {
    period,
    setPeriod,
    clearPeriod,
  }
}
