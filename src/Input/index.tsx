import { KeyboardEvent, useContext, useEffect } from 'react'
import { useMessage } from '../hooks/useMessage'
import { AuthContext } from '../contexts/AuthContext'

function Input() {
  const { auth } = useContext(AuthContext)
  const { create, data } = useMessage()

  const handleEnterPress = (event: KeyboardEvent): void => {
    const target = event.target as HTMLFormElement
    if (event.key === 'Enter' && event.shiftKey === false && target.value) {
      event.preventDefault()
      create({ message: target.value, userId: auth.id })
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
