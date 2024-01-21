import { useState, useEffect } from 'react'
import { useUuid } from './useUuid'
import { useStorage, StorageChangeEvent } from './useStorage'
import { Message, StorageObject, ValueStore } from '../types'

export const useMessage = (): {
  data: StorageObject | {}
  aggregateData: ValueStore
  create: ({ userId, message }: { userId: number; message: string }) => void
} => {
  const [aggregateData, setAggregateData] = useState<ValueStore>([])
  const { set, data } = useStorage()
  const { data: id } = useUuid()
  const key = `message:${id}`

  useEffect(() => {
    window.addEventListener('storage', event => {
      if (event.newValue) {
        setAggregateData([...aggregateData, JSON.parse(event.newValue)])
      }
    })
  })

  const create = ({ userId, message }: { userId: number; message: string }) => {
    const timestamp = Date.now()
    const value: Message = { userId, id, timestamp, message }

    set(key, value)

    window.dispatchEvent(StorageChangeEvent(value))
  }

  return { data, aggregateData, create }
}
