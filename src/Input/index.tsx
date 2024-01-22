import { KeyboardEvent, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { MessageContext } from '../contexts/MessageContext'

function Input() {
  const { auth } = useContext(AuthContext)
  const { setMessage } = useContext(MessageContext)

  const handleEnterPress = (event: KeyboardEvent): void => {
    const target = event.target as HTMLFormElement
    if (event.key === 'Enter' && event.shiftKey === false && target.value) {
      event.preventDefault()
      setMessage({ message: target.value, userId: auth.id })
      target.value = ''
    }
  }

  return (
    <section className="input">
      <button className="add add--file">+</button>
      <textarea className="text-field" name="textarea" onKeyDown={handleEnterPress} />
      <button className="add add--gif">GIF</button>
    </section>
  )
}

export default Input
