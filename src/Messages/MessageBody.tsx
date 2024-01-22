import { useEffect, useState } from 'react'
import { Message } from '../types'
import { useUser } from '../hooks/useUser'
import classNames from 'classnames'
import { Gif } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import './styles.css'

function MessageBody({ data, previousUserId }: { data: Message; previousUserId: number }) {
  const [showUsername, setShowUsername] = useState(true)
  const [gif, setGif] = useState<any>(null)
  const { data: user, findById } = useUser()
  const giphy = new GiphyFetch('UUfQX6Sn04ye5TSO8CtIfcrrZuFrJIml')

  useEffect(() => {
    const giphyPrefix = 'https://giphy.com/embed/'
    findById(data.userId)

    const getGif = async () => {
      const gifId = data.message.split(giphyPrefix)[1]
      const { data: fetchedGif } = await giphy.gif(gifId)
      setGif(fetchedGif)
    }

    if (data.message.includes(giphyPrefix)) {
      getGif()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setShowUsername(previousUserId !== user.id)
  }, [previousUserId, user.id])

  const containerClass = classNames('message', { 'message--user-block': showUsername })

  return (
    <figure className={containerClass}>
      <div className="avatar-container">{showUsername && <div className="avatar" />}</div>

      <figcaption className="body">
        {showUsername && <h3 className="username">{user.username}</h3>}

        <p className="message-body">
          {!gif && data.message}
          {gif && <Gif gif={gif} width={200} />}
        </p>
      </figcaption>
    </figure>
  )
}

export default MessageBody
