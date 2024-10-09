import React, { useState, useEffect } from 'react'
import { Send } from 'lucide-react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

const Chatroom = ({ user }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg])
    })

    return () => {
      socket.off('chat message')
    }
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim() && user) {
      const message = {
        user: user.name,
        content: newMessage.trim(),
      }
      socket.emit('chat message', message)
      setNewMessage('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Chatroom</h1>
      <div className="bg-white rounded-lg shadow-md p-4 h-96 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            <span className="font-semibold">{message.user}: </span>
            <span>{message.content}</span>
          </div>
        ))}
      </div>
      {user ? (
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow p-2 border rounded-l"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
          >
            <Send size={20} />
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-600">Please log in to participate in the chat.</p>
      )}
    </div>
  )
}

export default Chatroom