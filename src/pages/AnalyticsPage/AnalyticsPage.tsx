import type { FC } from 'react'
import { AnalyticsPageHeader } from './components/AnalyticsPageHeader'
import { useGetAnalytics } from '../../hooks/useGetAnalytics'
import { useAnalyticsPeriodStorage } from '../../hooks/useAnalyticsPeriodStorage'
import { useParams } from 'react-router'
import { useGetLinkById } from '../../hooks/useGetLinkById'
import dayjs from 'dayjs'
import {
  Card,
  Center,
  Flex,
  Loader,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core'
import { BarChart, LineChart } from '@mantine/charts'
import { IconInfoCircle } from '@tabler/icons-react'

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

  const browserData = (analytics?.browserStats ?? []).map((stat) => ({
    browser: stat.name,
    clicks: stat.count,
    percent: stat.percent,
  }))

  const deviceData = (analytics?.deviceStats ?? []).map((stat) => ({
    device: stat.name,
    clicks: stat.count,
    percent: stat.percent,
  }))

  const referrerData = (analytics?.topReferrers ?? [])
    .slice(0, 10)
    .map((r) => ({ source: r.name || 'Прямой переход', clicks: r.count }))

  const timeSeriesData = (analytics?.globalStats?.data ?? []).map((item) => ({
    date: item.date,
    clicks: item.count,
  }))

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
          <Flex gap={32}>
            <Card
              withBorder
              bd="1px solid #00000049"
              maw={360}
              w="100%"
              p={28}
              radius={16}
            >
              <Flex justify="space-between">
                <Title c="gray" order={2}>
                  Переходы
                </Title>
                <Tooltip
                  maw={180}
                  ta="center"
                  multiline
                  label="Число уникальных переходов по ссылке"
                  variant="transparent"
                >
                  <IconInfoCircle />
                </Tooltip>
              </Flex>

              <Text mt={10} h={80} fz={72}>
                {analytics?.uniqueClicks}
              </Text>
            </Card>

            <Card
              withBorder
              bd="1px solid #00000049"
              maw={360}
              w="100%"
              p={28}
              radius={16}
            >
              <Flex justify="space-between">
                <Title c="gray" order={2}>
                  Все переходы
                </Title>
                <Tooltip
                  maw={180}
                  ta="center"
                  multiline
                  label="Число переходов по ссылке за все время"
                  variant="transparent"
                >
                  <IconInfoCircle />
                </Tooltip>
              </Flex>

              <Text mt={10} h={80} fz={72}>
                {analytics?.totalClicks}
              </Text>
            </Card>

            <BarChart
              bd="1px solid #00000049"
              p={20}
              style={{ borderRadius: 16 }}
              h={200}
              data={browserData}
              dataKey="browser"
              orientation="vertical"
              series={[{ name: 'percent', color: 'black', label: 'Переходы' }]}
              yAxisProps={{ width: 80 }}
              withTooltip={false}
              withLegend
            />
          </Flex>

          <LineChart
            h={360}
            bd="1px solid #00000049"
            p={20}
            style={{ borderRadius: 16 }}
            data={timeSeriesData}
            dataKey="date"
            series={[{ name: 'clicks', color: 'teal.6' }]}
            withTooltip
            curveType="linear"
            tickLine="none"
            gridAxis="y"
          />

          <Flex gap={32}>
            <BarChart
              bd="1px solid #00000049"
              p={20}
              style={{ borderRadius: 16 }}
              h={360}
              data={deviceData}
              dataKey="device"
              series={[{ name: 'percent', color: 'black', label: 'Переходы' }]}
              yAxisProps={{ width: 80 }}
              withTooltip={false}
              withLegend
            />

            <BarChart
              h={360}
              bd="1px solid #00000049"
              p={20}
              style={{ borderRadius: 16 }}
              data={referrerData}
              dataKey="source"
              orientation="horizontal"
              series={[{ name: 'clicks', color: 'teal.6' }]}
              yAxisProps={{ width: 160 }}
              withTooltip
            />
          </Flex>
        </Stack>
      )}
    </div>
  )
}
