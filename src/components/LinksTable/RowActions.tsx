import { ActionIcon, Menu, Modal, Text } from '@mantine/core'
import {
  IconChartHistogram,
  IconDots,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react'
import type { FC } from 'react'
import { LinkForm } from '../LinkForm'
import { useDisclosure } from '@mantine/hooks'
import type { LinkFormValues } from '../../types/LinkFormValues'
import { useEditLink } from '../../hooks/useEditLink'
import { useDeleteLink } from '../../hooks/useDeleteLink'

interface RowActionsProps {
  id: string
  formValues: LinkFormValues
}

export const RowActions: FC<RowActionsProps> = ({ formValues, id }) => {
  const { mutate: editLink } = useEditLink(id)
  const { mutateAsync: deleteLink } = useDeleteLink(id)
  const [editModalOpened, { open: editModalOpen, close: editModalClose }] =
    useDisclosure(false)

  const handleSubmit = (payload: LinkFormValues) => {
    editLink(payload)
    editModalClose()
  }

  return (
    <Menu position="bottom-end" radius={12}>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <IconDots />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconChartHistogram size={14} color="grey" />}>
          <Text fz={14} h={16}>
            Analytics
          </Text>
        </Menu.Item>
        <Menu.Item
          my={6}
          leftSection={<IconEdit size={14} color="grey" />}
          onClick={editModalOpen}
        >
          <Text fz={14} h={18}>
            Edit
          </Text>
        </Menu.Item>
        <Menu.Item
          leftSection={<IconTrash size={14} color="grey" />}
          onClick={() => deleteLink()}
        >
          <Text fz={14} h={18}>
            Delete
          </Text>
        </Menu.Item>
      </Menu.Dropdown>

      <Modal
        opened={editModalOpened}
        onClose={editModalClose}
        withCloseButton={false}
      >
        <LinkForm
          initialValues={{ alias: formValues.alias, url: formValues.url }}
          buttonLabel="Редактировать"
          onSubmit={handleSubmit}
        />
      </Modal>
    </Menu>
  )
}
