import type { Link } from './Link'

export interface Response {
  content: Link[]
  totalElements: number
  totalPages: number
}
