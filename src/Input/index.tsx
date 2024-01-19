import { SyntheticEvent, KeyboardEvent, useState, useContext } from 'react'
import { createMessage } from '../db/message'
import { storage } from '../db/storage'
import { UserContext } from '../types'

function Input() {
  const [message, setMessage] = useState('')
  const { id: userId } = useContext(UserContext)

  const handleEnterPress = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' && event.shiftKey === false && message.length > 0 && userId) {
      event.preventDefault()
      const newMessage = createMessage({ message, userId })
      window.dispatchEvent(storage.change(newMessage))
      setMessage('')
    }
  }

  const handleInputMessage = (event: SyntheticEvent): void => {
    const target = event.target as HTMLFormElement
    setMessage(target.value)
  }

  return (
    <section className="input">
      <button className="add add--file">+</button>
      <textarea
        className="text-field"
        name="textarea"
        onChange={handleInputMessage}
        onKeyDown={handleEnterPress}
        value={message}
      />
      <button className="add add--gif">GIF</button>
    </section>
  )
}

export default Input
