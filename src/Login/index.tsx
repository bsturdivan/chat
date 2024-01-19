import { SyntheticEvent } from 'react'
import createUser from '../db/user'
import { User } from '../types'

function Login({ setUser }: { setUser: Function }) {
  const handleLogin = (event: SyntheticEvent): void => {
    event.preventDefault()
    const username = (event.target as HTMLFormElement).username.value
    const createdUser: User = createUser(username)
    setUser(createdUser)
  }

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input type="text" name="username" />
      </form>
    </div>
  )
}

export default Login
