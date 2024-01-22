import { useEffect, useState } from 'react'
import { useUuid } from './useUuid'
import { useStorage } from './useStorage'
import { User } from '../types'

export const useUser = (): {
  data: User
  create: (username: string) => void
  setData: (user: User | object) => void
  findById: (id: number) => void
} => {
  const [data, setData] = useState<User | any>({})
  const { set, get, data: user } = useStorage()
  const { data: id } = useUuid()
  const key = `user:${id}`

  useEffect(() => {
    if (user.value) setData(user.value)
  }, [user])

  const create = (username: string) => {
    const createdAt = Date.now()
    const value: User = { username, id, createdAt }

    set(key, value)
  }

  const findById = (id: number) => {
    get(`user:${id}`)
  }

  return { data, setData, create, findById }
}
