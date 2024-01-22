import { useEffect, useState } from 'react'
import { useStorage } from './useStorage'
import { useUuid } from './useUuid'

export const useAuth = (): {
  data: any
  create: (id: number) => void
  setData: (user: any) => void
} => {
  const [data, setData] = useState<any>({})
  const { set, findByIndex, data: authedUser } = useStorage(true)
  const { data: id } = useUuid()
  const key = `auth:${id}`

  useEffect(() => {
    const { value } = authedUser

    if (value?.id) {
      if (Object.values(data).length === 0) {
        setData(value)
      }
    } else {
      findByIndex(1)
    }
  }, [authedUser, data, findByIndex])

  const create = (id: number) => {
    const timestamp = Date.now()
    const value = { id, timestamp }

    set(key, value)
  }

  return { data, setData, create }
}
