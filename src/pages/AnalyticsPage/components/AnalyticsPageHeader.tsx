import { ActionIcon, Anchor, Flex, Group, Text } from '@mantine/core'
import {
  IconArrowRight,
  IconChevronLeft,
  IconRefresh,
} from '@tabler/icons-react'
import type { FC } from 'react'
import { useGetLinkById } from '../../../hooks/useGetLinkById'
import { useParams } from 'react-router'
import { DatePickerInput } from '@mantine/dates'
import dayjs from 'dayjs'
import { useAnalyticsPeriodStorage } from '../../../hooks/useAnalyticsPeriodStorage'

export const AnalyticsPageHeader: FC = () => {
  const today = dayjs()
  const { id } = useParams()
  const { period, setPeriod } = useAnalyticsPeriodStorage()

  const { data: link, refetch } = useGetLinkById(id ?? '')

  return (
    <Flex justify="space-between" align="center">
      <Group align="center" gap={12}>
        <ActionIcon variant="transparent" size={32}>
          <IconChevronLeft size={42} />
        </ActionIcon>

        <Group>
          <Text maw={250} truncate fz={18}>
            {link?.originalUrl}
          </Text>

          <IconArrowRight size={18} color="grey" />

          <Anchor
            href={link?.shortUrl}
            maw={250}
            truncate
            fz={18}
            c="grey"
            target="_blank"
          >
            {link?.shortUrl}
          </Anchor>
        </Group>
      </Group>

      <Group>
        <ActionIcon variant="transparent" onClick={() => refetch()}>
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
