export interface User {
  id: number
  username: string
  createdAt: number
}

export interface AuthStore {
  auth: { id: string; timestamp: number } | any
  setAuth: (id: number) => void
}

export interface Message {
  id: number
  userId: number
  timestamp: number
  message: string
}

export interface MessageStore {
  message: StorageObject | null
  setMessage: (message: Message | null) => void
}

export type ValueStore = (Message | User) | (Message | User)[] | any

export interface StorageObject {
  key: string
  value: ValueStore
}

export interface StorageDb {
  set: (key: string, value: object) => void
  get: (key: string) => void
  findByIndex: (index: number) => void
  data: { key: string; value: ValueStore } | any
}
