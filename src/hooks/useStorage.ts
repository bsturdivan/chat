import { useState } from 'react'
import { Message, User, StorageObject, StorageDb } from '../types'

export const useStorage = (session?: boolean): StorageDb => {
  const [data, setData] = useState<StorageObject | any>({})
  const storage = session ? window.sessionStorage : window.localStorage

  const getStoredValue = (key: string): Message | User | {} => {
    const storageValue = storage.getItem(key)
    if (!storageValue) return {}

    return JSON.parse(storageValue)
  }

  const set = (key: string, value: object) => {
    const jsonValue = JSON.stringify(value)
    storage.setItem(key, jsonValue)

    setData({ key, value })
  }

  const get = (key: string) => {
    const value = getStoredValue(key)
    setData({ key, value })
  }

  const findByIndex = (index: number) => {
    const key = storage.key(index)
    if (key) get(key)
  }

  return { data, set, get, findByIndex }
}

export const StorageChangeEvent = (value: Message | User): StorageEvent => {
  return new StorageEvent('storage', {
    newValue: JSON.stringify(value),
  })
}
