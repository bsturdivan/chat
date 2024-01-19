import { useState } from 'react'
import Input from './Input'
import Login from './Login'
import Messages from './Messages'
import { UserContext } from './types'
import './App.css'

function App() {
  const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={user}>
      <div className="chat">
        {Object.values(user).length === 0 && <Login setUser={setUser} />}

        {Object.values(user).length > 0 && (
          <div>
            <Messages />
            <Input />
          </div>
        )}
      </div>
    </UserContext.Provider>
  )
}

export default App
