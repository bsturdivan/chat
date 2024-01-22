import { useState, useEffect } from 'react'
import { useUuid } from './useUuid'
import { useStorage, StorageChangeEvent } from './useStorage'
import { Message, StorageObject, ValueStore } from '../types'
import groupBy from 'lodash.groupby'

export const useMessage = (): {
  data: Message[]
  create: ({ userId, message }: { userId: number; message: string }) => void
} => {
  const [aggregateData, setAggregateData] = useState<ValueStore>([])
  const { set, data, getAll, dataAggregate } = useStorage()
  const { data: id } = useUuid()
  const key = `message:${id}`

  const sortedValues = (items: Message[]) =>
    items.sort((first, next) => first.timestamp - next.timestamp)

  useEffect(() => {
    getAll('message')

    window.addEventListener('storage', event => {
      if (event.newValue) {
        setAggregateData([...aggregateData, JSON.parse(event.newValue)])
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data.value && Object.values(data.value).length > 0) {
      setAggregateData(sortedValues([...aggregateData, data.value]))
      // window.dispatchEvent(StorageChangeEvent(data.value))
    }
  }, [data])

  useEffect(() => {
    if (dataAggregate.length > 0) {
      const values: Message[] = sortedValues(dataAggregate)
      setAggregateData(values)
    }
  }, [dataAggregate])

  const create = ({ userId, message }: { userId: number; message: string }) => {
    const timestamp = Date.now()
    const value: Message = { userId, id, timestamp, message }

    set(key, value)
  }

  return { data: aggregateData, create }
}
