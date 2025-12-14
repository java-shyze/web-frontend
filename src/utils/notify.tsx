import { Anchor, Group, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconExternalLink, IconX } from '@tabler/icons-react'

type NotificationType = 'success' | 'error'

export const notify = (
  type: NotificationType,
  title: string,
  message?: string,
  externalLink?: string,
) => {
  notifications.show({
    title: (
      <Group align="center" gap={12} mt={8}>
        <Text fz={16} fw={600}>
          {title}
        </Text>

        {type === 'success' && externalLink && (
          <Anchor mt={4} variant="transparent" href={externalLink}>
            <IconExternalLink size={16} color="grey" />
          </Anchor>
        )}
      </Group>
    ),
    message: message,
    position: 'top-right',
    icon: type === 'success' ? <IconCheck size={16} /> : <IconX size={16} />,
    color: type === 'success' ? 'teal' : 'red',
  })
}
