import { SyntheticEvent, useContext, useEffect, useRef } from 'react'
import { useUser } from '../hooks/useUser'
import { AuthContext } from '../contexts/AuthContext'

function Login() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { auth, setAuth } = useContext(AuthContext)
  const { create, data: user } = useUser()

  const handleLogin = (event: SyntheticEvent): void => {
    event.preventDefault()
    const username = (event.target as HTMLFormElement).username.value
    create(username)
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (Object.values(user).length > 0 && Object.values(auth).length === 0) {
      setAuth(user.id)
    }
  }, [user, auth, setAuth])

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input type="text" name="username" ref={inputRef} autoFocus />
      </form>
    </div>
  )
}

export default Login
