import { createContext } from 'react'
import { AuthStore } from '../types'

export const AuthContext = createContext<AuthStore>({
  auth: {},
  setAuth: () => {},
})
