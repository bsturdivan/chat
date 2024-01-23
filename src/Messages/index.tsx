import { useContext, useRef, useEffect, useState } from 'react'
import { MessageContext } from '../contexts/MessageContext'
import { autoMessages } from '../constants/messages'
import { Message, User } from '../types'
import MessageBody from './MessageBody'
import { AuthContext } from '../contexts/AuthContext'
import { useGenerateUser } from '../hooks/useGenerateUser'
import { random } from 'lodash'
import { useDebounce } from '../hooks/useDebounce'
import './styles.css'

function Messages() {
  const [typing, setTyping] = useState<string>()
  const { messages, setMessage } = useContext(MessageContext)
  const { auth } = useContext(AuthContext)
  const { aggregateUsers } = useGenerateUser(auth)
  const indexRef = useRef<number[]>([])
  const messageCountRef = useRef<number>(0)
  const containerRef = useRef<HTMLParagraphElement | null>(null)
  const messageLength = autoMessages.length - 1
  const randomTime = (): number => random(3000, 90000)
  const randomUser = (): User => aggregateUsers[random(0, aggregateUsers.length - 1)]
  const debouncedMessage = useDebounce(messages, 300)

  useEffect(() => {
    let time = 2000
    const timer = setTimeout(() => {
      setTyping('')
      const randomIndex: number = random(0, messageLength)

      if (indexRef.current.includes(randomIndex)) {
        return
      }

      indexRef.current = [...indexRef.current, randomIndex]

      const user = randomUser()
      setMessage({ userId: user.id, message: autoMessages[randomIndex] })

      if (messages?.length) {
        messageCountRef!.current = messages?.length
      }
      time = randomTime()
      setTyping(user?.username)
    }, time)

    if (indexRef.current.length === messageLength) {
      clearTimeout(timer)
    }

    return () => clearTimeout(timer)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMessage, aggregateUsers])

  useEffect(() => {
    containerRef?.current?.scrollIntoView({ block: 'end', inline: 'end' })
  }, [debouncedMessage])

  return (
    <section className="messages">
      {debouncedMessage?.map((item: Message, index: number) => (
        <MessageBody
          key={item.timestamp}
          data={item}
          previousUserId={debouncedMessage[index - 1]?.userId}
        />
      ))}

      <div ref={containerRef} />

      <div className="typing-container">
        {typing && <p className="typing">{typing} is typing</p>}
      </div>
    </section>
  )
}

export default Messages
