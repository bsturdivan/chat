import { useState, useEffect } from 'react'
import { useStorage } from './useStorage'
import { useUuid } from './useUuid'

export const useAuth = (): {
  data: any
  create: (id: number) => void
  setData: (user: any) => void
} => {
  const [data, setData] = useState<any>({})
  const { set, storage } = useStorage(true)
  const { data: id } = useUuid()
  const key = `auth:${id}`

  useEffect(() => {
    const sessionKey = Object.keys(storage).find(item => item.startsWith('auth'))
    const session = sessionKey ? JSON.parse(storage[sessionKey]) : null

    if (session?.id && Object.values(data).length === 0) setData(session)
  }, [data])

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  const create = (id: number) => {
    const timestamp = Date.now()
    const value = { id, timestamp }
    storage.clear()

    set(key, value)
    setData(value)
  }

  return { data, setData, create }
}
