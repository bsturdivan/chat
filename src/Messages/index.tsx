import { useState } from 'react'
// import { storage } from '../db/storage'
import { Message } from '../types'

function Messages() {
  const [newMessages, setNewMessages] = useState<Message[]>([])

  window.addEventListener('storage', event => {
    if (event.newValue) {
      setNewMessages([...newMessages, JSON.parse(event.newValue)])
    }
  })

  return (
    <section>
      {newMessages.map(message => (
        <div>{message.message}</div>
      ))}
    </section>
  )
}

export default Messages
