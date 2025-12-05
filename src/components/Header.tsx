import { Button, Flex, TextInput } from '@mantine/core'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import type { FC } from 'react'

export const Header: FC = () => {
  return (
    <Flex justify="space-between" align="center">
      <TextInput
        w={360}
        radius={8}
        leftSection={<IconSearch size={18} />}
        placeholder="Поиск"
      />
      <Button
        h={40}
        radius={8}
        color="dark"
        leftSection={<IconPlus size={18} />}
      >
        Добавить ссылку
      </Button>
    </Flex>
  )
}
