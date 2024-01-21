import React from 'react'
import ReactDOM from 'react-dom/client'
import './globals'
import App from './App'

const chat = document.createElement('div')
chat.setAttribute('id', 'chat')

document.body.appendChild(chat)

const root = ReactDOM.createRoot(document.getElementById('chat') as HTMLElement)

root.render(<App />)
