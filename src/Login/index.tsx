import { SyntheticEvent, useContext, useEffect, useRef } from 'react'
import { useUser } from '../hooks/useUser'
import { AuthContext } from '../contexts/AuthContext'
import './styles.css'

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
    if (Object.values(auth).length === 0 && !!user?.id) {
      setAuth(user.id)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, auth])

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h2 className="headline">
          Hi there!
          <br />
          What can we call you?
        </h2>
        <input type="text" name="username" className="login-username" ref={inputRef} autoFocus />
      </form>
    </div>
  )
}

export default Login
