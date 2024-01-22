import { useEffect, useState } from 'react'
import { Message } from '../types'
import { useUser } from '../hooks/useUser'

function MessageBody({
  data,
  index,
  previousUserId,
}: {
  data: Message
  index: number
  previousUserId: number
}) {
  const [showUsername, setShowUsername] = useState(true)
  const { data: user, findById } = useUser()

  useEffect(() => {
    findById(data.userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setShowUsername(previousUserId !== user.id)
  }, [previousUserId, user.id])

  return (
    <figure className="message">
      {showUsername && <div className="avatar" />}

      <figcaption className="body">
        {showUsername && (
          <h3 className="username" style={{ fontWeight: 'bold' }}>
            {user.username}
          </h3>
        )}

        <p className="message-body">{data.message}</p>
      </figcaption>
    </figure>
  )
}

export default MessageBody
