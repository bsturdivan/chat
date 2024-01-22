import { KeyboardEvent, useContext, useRef, useEffect, SyntheticEvent, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { MessageContext } from '../contexts/MessageContext'
import './styles.css'
import { Carousel } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'

function Input() {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { auth } = useContext(AuthContext)
  const { setMessage } = useContext(MessageContext)
  const [showGiphy, setShowGiphy] = useState(false)

  const giphy = new GiphyFetch('UUfQX6Sn04ye5TSO8CtIfcrrZuFrJIml')
  const fetchGifs = (offset: number) => giphy.trending({ offset, limit: 10 })

  const handleEnterPress = (event: KeyboardEvent): void => {
    const target = event.target as HTMLFormElement
    if (event.key === 'Enter' && event.shiftKey === false && target.value) {
      event.preventDefault()
      setMessage({ message: target.value, userId: auth.id })
      target.value = ''
    }
  }

  const handleEscPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && showGiphy) {
      setShowGiphy(false)
    }
  }

  const handleAddGif = (event: SyntheticEvent): void => {
    setShowGiphy(true)
  }

  const onGifClick = (gif: any, event: SyntheticEvent) => {
    event.preventDefault()
    setMessage({ message: gif.embed_url, userId: auth.id })
    setShowGiphy(false)
  }

  const handleClose = (event: SyntheticEvent) => {
    setShowGiphy(false)
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <section className="input" onKeyDown={handleEscPress}>
      <textarea
        className="text-field"
        name="textarea"
        onKeyDown={handleEnterPress}
        autoFocus
        ref={inputRef}
      />
      <button className="add add--gif" onClick={handleAddGif}>
        GIF
      </button>

      {showGiphy && (
        <div className="giphy">
          <button className="close" onClick={handleClose}>
            ×
          </button>
          <Carousel onGifClick={onGifClick} fetchGifs={fetchGifs} gifHeight={100} gutter={8} />
        </div>
      )}
    </section>
  )
}

export default Input
