import { storage } from './storage'
import { uuid } from './uuid'
import { User } from '../types'

export default function createUser(username: string): User {
  const createdAt = Date.now()
  const id = uuid(createdAt)
  const key = `user:${id}`
  const value: User = { username, id, createdAt }
  storage.set(key, value)

  return value
}
