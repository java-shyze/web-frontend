import { Button, Flex, Modal, TextInput } from '@mantine/core'
import { useDebouncedState, useDisclosure } from '@mantine/hooks'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import { type FC } from 'react'
import { LinkForm } from './LinkForm'
import { useCreateLink } from '../hooks/useCreateLink'
import type { LinkFormValues } from '../types/LinkFormValues'

export const Header: FC = () => {
  const [opened, { close, open }] = useDisclosure(false)
  const [search, setSearch] = useDebouncedState('', 500)

  const { mutate: createLink } = useCreateLink()

  const handleSubmit = (payload: LinkFormValues) => {
    createLink(payload)
    close()
  }

  return (
    <Flex justify="space-between" align="center">
      <TextInput
        w={360}
        leftSection={<IconSearch size={18} />}
        placeholder="Поиск"
        defaultValue={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <Button h={40} leftSection={<IconPlus size={18} />} onClick={open}>
        Добавить ссылку
      </Button>

      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <LinkForm buttonLabel="Добавить" onSubmit={handleSubmit} />
      </Modal>
    </Flex>
  )
}
