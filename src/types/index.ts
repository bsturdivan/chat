import { createContext } from 'react'

export interface User {
  id: number
  username: string
  createdAt: number
}

export interface Message {
  id: number
  userId: number
  timestamp: number
  message: string
}

export interface StorageObject {
  key: string
  value: object
}

export interface StorageDb {
  set: (key: string, value: object) => StorageObject
  get: (key: string) => StorageObject
  getAll: (keyPrefix: string) => (Message | User)[]
  change: (value: Message | User) => StorageEvent
}

export const UserContext = createContext<Partial<User>>({})
