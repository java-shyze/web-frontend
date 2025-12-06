import { useState, type FC } from 'react'
import classes from './App.module.css'
import { Header } from './components/Header'
import { useDebouncedState } from '@mantine/hooks'
import { LinksTable } from './components/LinksTable'
import { useGetLinks } from './hooks/useGetLinks'
import type { Pagination } from './types/Pagination'

export const App: FC = () => {
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
    <div className={classes.container}>
      <Header search={search} onSearch={setSearch} />
      <LinksTable
        links={data?.content ?? []}
        isLoading={isLoading}
        total={data?.totalElements ?? 0}
        pagination={{ ...pagination, total: data?.totalPages }}
        refetchData={() => refetch()}
        onPaginationChange={setPagination}
      />
    </div>
  )
}
