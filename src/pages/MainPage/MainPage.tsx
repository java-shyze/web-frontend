import { useState, type FC } from 'react'
import type { Pagination } from '../../types/Pagination'
import { useDebouncedState } from '@mantine/hooks'
import { useGetLinks } from '../../hooks/useGetLinks'
import { LinksTable } from './components/LinksTable'
import { MainPageHeader } from './components/MainPageHeader'

export const MainPage: FC = () => {
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 5,
  })
  const [search, setSearch] = useDebouncedState('', 500)
  const { data, isLoading, refetch } = useGetLinks({
    search,
    page: pagination.page,
    size: pagination.perPage,
  })

  return (
    <>
      <MainPageHeader search={search} onSearch={setSearch} />
      <LinksTable
        links={data?.content ?? []}
        isLoading={isLoading}
        total={data?.totalElements ?? 0}
        pagination={{ ...pagination, total: data?.totalPages }}
        refetchData={() => refetch()}
        onPaginationChange={setPagination}
      />
    </>
  )
}
