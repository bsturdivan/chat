import { Message, User, StorageObject, StorageDb } from '../types'

function getStoredValue(key: string): Message | User {
  const storageValue = window.localStorage.getItem(key) || ''
  return JSON.parse(storageValue)
}

export const storage: StorageDb = {
  set: (key: string, value: object): StorageObject => {
    const jsonValue = JSON.stringify(value)
    window.localStorage.setItem(key, jsonValue)

    return { key, value }
  },

  get: (key: string): StorageObject => {
    return { key, value: getStoredValue(key) }
  },

  getAll: (keyPrefix: string): (Message | User)[] => {
    return Object.keys(window.localStorage)
      .filter(keyMatch => keyMatch.startsWith(keyPrefix))
      .map(key => getStoredValue(key))
  },

  change: function (value: Message | User): StorageEvent {
    return new StorageEvent('storage', {
      newValue: JSON.stringify(value),
    })
  },
}
