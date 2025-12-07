import type { FC } from 'react'
import type { Link } from '../../types/Link'
import { DataTable, type DataTableColumn } from 'mantine-datatable'
import dayjs from 'dayjs'
import {
  ActionIcon,
  Anchor,
  Avatar,
  Flex,
  Group,
  Pagination,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core'
import { IconInfoCircle, IconRefresh } from '@tabler/icons-react'
import type { Pagination as PaginationType } from '../../types/Pagination'
import { RowActions } from './RowActions'

interface LinksTableProps {
  links: Link[]
  isLoading?: boolean
  total: number
  pagination: PaginationType
  refetchData?: () => void
  onPaginationChange?: (data: PaginationType) => void
}

export const LinksTable: FC<LinksTableProps> = ({
  links,
  isLoading,
  pagination,
  refetchData,
  onPaginationChange,
}) => {
  const columns: DataTableColumn<Link>[] = [
    {
      title: '#',
      accessor: 'id',
      render: (_, idx) => idx + 1,
      width: 60,
      titleStyle: { color: 'grey' },
    },
    {
      titleStyle: { color: 'grey' },
      title: 'Псевдоним',
      accessor: 'alias',
      ellipsis: true,
      resizable: true,
      width: 200,
      render: (link) => (
        <Group>
          <Avatar
            size={20}
            src={`https://www.google.com/s2/favicons?domain=${
              link.originalUrl
            }&sz=${128}`}
          />

          <Anchor
            fz={14}
            href={link.shortUrl}
            target="_blank"
            underline="always"
          >
            {link.alias}
          </Anchor>
        </Group>
      ),
    },
    {
      titleStyle: { color: 'grey' },
      title: 'Исходный URL',
      accessor: 'originalUrl',
      ellipsis: true,
      resizable: true,
      width: '1fr',
      render: (link) => link.originalUrl.split('//')[1],
    },
    {
      titleStyle: { color: 'grey' },
      title: 'Создан в',
      accessor: 'createdAt',
      resizable: true,
      ellipsis: true,
      width: 250,
      render: (link) => dayjs(link.createdAt).format('DD.MM.YYYY'),
    },
    {
      titleStyle: { color: 'grey' },
      title: 'Обновлен в',
      accessor: 'updatedAt',
      ellipsis: true,
      resizable: true,
      width: 250,
      render: (link) => dayjs(link.updatedAt).fromNow(),
    },

    {
      titleStyle: { color: 'grey' },
      title: (
        <Group align="center" gap={10}>
          <Text h={18} fz={14} fw={600}>
            Переходы
          </Text>
          <Tooltip label="Общее количество переходов по ссылке">
            <IconInfoCircle size={18} />
          </Tooltip>
        </Group>
      ),
      accessor: 'visits',
      width: '1fr',
    },

    {
      accessor: 'actions',
      title: (
        <ActionIcon onClick={refetchData} variant="subtle">
          <IconRefresh size={20} />
        </ActionIcon>
      ),
      render: ({ id, alias, originalUrl }) => (
        <RowActions id={id} formValues={{ alias, url: originalUrl }} />
      ),
      width: 60,
    },
  ]

  return (
    <Stack>
      <Stack h="78vh">
        <DataTable
          striped
          records={links}
          columns={columns}
          fetching={isLoading}
          verticalSpacing={4}
          emptyState={<Title order={3}>Элементов нет</Title>}
        />
      </Stack>

      <Flex justify="center" mt={14}>
        <Pagination
          total={pagination?.total ?? 1}
          value={pagination?.page}
          onChange={(page) =>
            onPaginationChange?.({
              ...pagination,
              page,
            })
          }
        />
      </Flex>
    </Stack>
  )
}
