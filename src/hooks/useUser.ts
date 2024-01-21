import { useState } from 'react'
import { useUuid } from './useUuid'
import { useStorage } from './useStorage'
import { User } from '../types'

export const useUser = (): {
  data: User
  create: (username: string) => void
  setData: (user: User | object) => void
} => {
  const [data, setData] = useState<User | any>({})
  const { set } = useStorage()
  const { data: id } = useUuid()
  const key = `user:${id}`

  const create = (username: string) => {
    const createdAt = Date.now()
    const value: User = { username, id, createdAt }

    setData(value)
    set(key, value)
  }

  return { data, setData, create }
}
