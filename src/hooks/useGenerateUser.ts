import { useEffect, useRef, useState } from 'react'
import { useUser } from '../hooks/useUser'
import { random } from 'lodash'
import { autoUsers } from '../constants/user'
import { User } from '../types'

export const useGenerateUser = ({ auth }: { auth: User }) => {
  const { create, data } = useUser()
  const [aggregateUsers, setAggregateUsers] = useState<User[]>([])
  const indexRef = useRef<number[]>([])
  const userLength = autoUsers.length - 1
  const randomTime = (): number => random(3000, 120000)

  useEffect(() => {
    let time = 1000

    const timer = setTimeout(() => {
      const randomIndex: number = random(0, userLength)

      if (!indexRef.current.includes(randomIndex) && indexRef.current.length !== userLength) {
        indexRef.current = [...indexRef.current, randomIndex]
        create(autoUsers[randomIndex])
      }

      time = randomTime()
    }, time)

    if (indexRef.current.length === userLength) {
      clearTimeout(timer)
    }

    if (auth?.id !== data?.id) {
      setAggregateUsers([...aggregateUsers, data])
    }

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return { aggregateUsers }
}
