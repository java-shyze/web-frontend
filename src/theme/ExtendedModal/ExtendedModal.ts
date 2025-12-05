import { Modal } from '@mantine/core'
import classes from './ExtendedModal.module.css'

export const ExtendedModal = Modal.extend({
  classNames: { content: classes.content },
})
