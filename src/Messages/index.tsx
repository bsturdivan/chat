import { useContext, useRef } from 'react'
import { MessageContext } from '../contexts/MessageContext'
import { Message } from '../types'
import MessageBody from './MessageBody'

function Messages() {
  const { messages } = useContext(MessageContext)

  return (
    <section>
      {messages?.map((item: Message, index: number) => (
        <MessageBody
          key={item.timestamp}
          data={item}
          index={index}
          previousUserId={messages[index - 1]?.userId}
        />
      ))}
    </section>
  )
}

export default Messages
