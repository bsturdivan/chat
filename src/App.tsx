import Input from './Input'
import Login from './Login'
import Messages from './Messages'
import { AuthContext } from './contexts/AuthContext'
import { MessageContext } from './contexts/MessageContext'
import { useAuth } from './hooks/useAuth'
import { useMessage } from './hooks/useMessage'
import './App.css'

function App() {
  const { data: auth, create: setAuth } = useAuth()
  const { data: messageData, create: setMessage } = useMessage()

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {!auth.id && <Login />}

      {auth.id && (
        <MessageContext.Provider value={{ messages: messageData, setMessage }}>
          <Messages />
          <Input />
        </MessageContext.Provider>
      )}
    </AuthContext.Provider>
  )
}

export default App
