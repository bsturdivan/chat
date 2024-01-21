import { useEffect } from 'react'
import { useMessage } from '../hooks/useMessage'
import { Message } from '../types'

function Messages() {
  const { aggregateData } = useMessage()

  useEffect(() => {
    console.log(aggregateData)
  }, [aggregateData])

  return (
    <section>
      {aggregateData.map((item: Message) => (
        <p>{item.message}</p>
      ))}
    </section>
  )
}

export default Messages
