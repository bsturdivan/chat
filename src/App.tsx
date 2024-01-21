import Input from './Input'
import Login from './Login'
import Messages from './Messages'
import { AuthContext } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'
import './App.css'

function App() {
  const { data: auth, create: setAuth } = useAuth()

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {!auth.id && <Login />}

      {auth.id && (
        <div>
          <Input />
          <Messages />
        </div>
      )}
    </AuthContext.Provider>
  )
}

export default App
