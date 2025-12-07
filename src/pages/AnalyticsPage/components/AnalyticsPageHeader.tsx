import { ActionIcon, Anchor, Flex, Group, Text } from '@mantine/core'
import {
  IconArrowRight,
  IconChevronLeft,
  IconRefresh,
} from '@tabler/icons-react'
import type { FC } from 'react'
import { DatePickerInput } from '@mantine/dates'
import dayjs from 'dayjs'
import { useAnalyticsPeriodStorage } from '../../../hooks/useAnalyticsPeriodStorage'
import { useNavigate } from 'react-router'

interface AnalyticsPageHeaderProps {
  originalUrl: string
  shortUrl: string
  onRefetch?: () => void
}

export const AnalyticsPageHeader: FC<AnalyticsPageHeaderProps> = ({
  originalUrl,
  shortUrl,
  onRefetch,
}) => {
  const today = dayjs()
  const { period, setPeriod } = useAnalyticsPeriodStorage()
  const navigate = useNavigate()

  return (
    <Flex justify="space-between" align="center">
      <Group align="center" gap={12}>
        <ActionIcon
          variant="transparent"
          size={32}
          onClick={() => navigate('/')}
        >
          <IconChevronLeft size={42} />
        </ActionIcon>

        <Group>
          <Text maw={250} truncate fz={18}>
            {originalUrl}
          </Text>

          <IconArrowRight size={18} color="grey" />

          <Anchor
            href={shortUrl}
            maw={250}
            truncate
            fz={18}
            c="grey"
            target="_blank"
          >
            {shortUrl}
          </Anchor>
        </Group>
      </Group>

      <Group>
        <ActionIcon variant="transparent" onClick={onRefetch}>
          <IconRefresh />
        </ActionIcon>

        <DatePickerInput
          w={190}
          locale="RU"
          type="range"
          value={period}
          valueFormat="DD.MM.YYYY"
          onChange={setPeriod}
          firstDayOfWeek={1}
          placeholder="Выбрать диапазон дат"
          presets={[
            {
              value: [
                today.startOf('week').format('YYYY-MM-DD'),
                today.endOf('week').format('YYYY-MM-DD'),
              ],
              label: 'Неделя',
            },
            {
              value: [
                today.startOf('month').format('YYYY-MM-DD'),
                today.format('YYYY-MM-DD'),
              ],
              label: 'Месяц',
            },
            {
              value: [
                today.startOf('quarter').format('YYYY-MM-DD'),
                today.format('YYYY-MM-DD'),
              ],
              label: 'Квартал',
            },
          ]}
        />
      </Group>
    </Flex>
  )
}
