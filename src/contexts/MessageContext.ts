import { createContext } from 'react'
import { MessageStore } from '../types'

export const MessageContext = createContext<MessageStore>({
  messages: [],
  setMessage: ({}) => {},
})
