import { Button, Flex, Stack, TextInput } from '@mantine/core'
import { isNotEmpty, matches, useForm } from '@mantine/form'
import type { FC } from 'react'
import type { LinkFormValues } from '../types/LinkFormValues'
import { HTTP_REGEXP } from '../constants/regexp'

interface LinkFormProps {
  buttonLabel: string
  initialValues?: LinkFormValues
  onSubmit: (payload: LinkFormValues) => void
}

export const LinkForm: FC<LinkFormProps> = ({
  initialValues,
  buttonLabel,
  onSubmit,
}) => {
  const form = useForm<LinkFormValues>({
    initialValues,
    validate: {
      url: (value) =>
        isNotEmpty('Заполните поле')(value) ||
        matches(HTTP_REGEXP, 'Неверный формат URL')(value),
    },
  })

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <TextInput
          autoComplete="off"
          radius={8}
          label="Введите URL"
          placeholder="http://example.com"
          {...form.getInputProps('url')}
        />
        <TextInput
          autoComplete="off"
          radius={8}
          label="Введите псевдоним"
          placeholder="slug"
          {...form.getInputProps('alias')}
        />

        <Flex justify="flex-end">
          <Button disabled={!form.isDirty()} type="submit" radius={8}>
            {buttonLabel}
          </Button>
        </Flex>
      </Stack>
    </form>
  )
}
