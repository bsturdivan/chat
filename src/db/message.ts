import { storage } from './storage'
import { uuid } from './uuid'
import { Message } from '../types'

export function createMessage({ userId, message }: { userId: number; message: string }): Message {
  const timestamp = Date.now()
  const id = uuid(timestamp)
  const key = `messages:${id}`
  const value: Message = { userId, id, timestamp, message }
  storage.set(key, value)

  return value
}

export function getMessages(): Message[] {
  return storage.getAll('messages') as Message[]
}
