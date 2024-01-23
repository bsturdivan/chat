import { useEffect, useState } from 'react'
import { useUuid } from './useUuid'
import { useStorage } from './useStorage'
import { User } from '../types'
import { random } from 'lodash'

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
  const colors = ['base', 'contrast', 'pink', 'yellow', 'mauve', 'blue', 'green']
  const getAvatar = (colors: string[]) => {
    const deg = random(127, 300)
    const perc = [random(20, 80), random(20, 80)]
    return `linear-gradient(${deg}deg, var(--${colors[0]}) ${perc[0]}%, var(--${colors[1]}) ${perc[1]}%, var(--${colors[2]}) ${perc[0]}%)`
  }

  useEffect(() => {
    if (user.value) setData(user.value)
  }, [user])

  const create = (username: string) => {
    const createdAt = Date.now()
    const color = [
      colors[random(0, colors.length - 1)],
      colors[random(0, colors.length - 1)],
      colors[random(0, colors.length - 1)],
    ]
    const value: User = {
      username,
      id,
      createdAt,
      avatar: getAvatar(color),
      color: color[0],
    }

    set(key, value)
  }

  const findById = (id: number) => {
    get(`user:${id}`)
  }

  return { data, setData, create, findById }
}
