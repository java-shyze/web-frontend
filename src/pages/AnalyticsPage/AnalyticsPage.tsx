import type { FC } from 'react'
import { AnalyticsPageHeader } from './components/AnalyticsPageHeader'
import { useGetAnalytics } from '../../hooks/useGetAnalytics'
import { useAnalyticsPeriodStorage } from '../../hooks/useAnalyticsPeriodStorage'
import { useParams } from 'react-router'
import { useGetLinkById } from '../../hooks/useGetLinkById'
import dayjs from 'dayjs'
import { Card, Center, Flex, Loader, Stack, Text, Title } from '@mantine/core'

export const AnalyticsPage: FC = () => {
  const { id } = useParams()
  const { data: link } = useGetLinkById(id ?? '')

  const { period } = useAnalyticsPeriodStorage()

  const {
    data: analytics,
    refetch,
    isLoading,
  } = useGetAnalytics(link?.alias ?? '', {
    start: new Date(
      period[0] ?? dayjs().startOf('week').format('YYYY-MM-DD'),
    ).toISOString(),
    end: new Date(
      period[1] ?? dayjs().endOf('week').format('YYYY-MM-DD'),
    ).toISOString(),
  })

  return (
    <div>
      <AnalyticsPageHeader
        originalUrl={link?.originalUrl ?? 'Unknown'}
        shortUrl={link?.shortUrl ?? 'Unknown'}
        onRefetch={() => refetch()}
      />

      {isLoading ? (
        <Center h="60vh">
          <Loader />
        </Center>
      ) : (
        <Stack mt={64} mx={44}>
          <Flex gap={24}>
            <Card withBorder bd="1px solid #00000049" miw={320} p={28}>
              <Title c="gray">Переходы</Title>
              <Text mt={10} h={80} fz={72}>
                {analytics?.uniqueClicks}
              </Text>
            </Card>

            <Card withBorder bd="1px solid #00000049" miw={320} p={28}>
              <Title c="gray">Все переходы</Title>
              <Text mt={10} h={80} fz={72}>
                {analytics?.totalClicks}
              </Text>
            </Card>
          </Flex>
        </Stack>
      )}
    </div>
  )
}
