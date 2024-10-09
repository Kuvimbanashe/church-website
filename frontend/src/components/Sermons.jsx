import React, { useState, useEffect } from 'react'
import { Video, Image, FileText, MessageSquare } from 'lucide-react'

const Sermons = ({ user }) => {
  const [sermons, setSermons] = useState([])
  const [comment, setComment] = useState('')
  const [selectedSermon, setSelectedSermon] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/sermons')
      .then(res => res.json())
      .then(data => setSermons(data))
      .catch(err => console.error(err))
  }, [])

  const handleCommentSubmit = (sermonId) => {
    if (!user) {
      alert('Please log in to comment')
      return
    }

    fetch(`http://localhost:5000/api/sermons/${sermonId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ text: comment })
    })
    .then(res => res.json())
    .then(data => {
      setSermons(sermons.map(sermon => 
        sermon._id === sermonId ? data : sermon
      ))
      setComment('')
    })
    .catch(err => console.error(err))
  }

  const renderSermonContent = (sermon) => {
    switch (sermon.type) {
      case 'video':
        return (
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <iframe src={sermon.content} allow="autoplay; encrypted-media" allowFullScreen className="w-full h-full"></iframe>
          </div>
        )
      case 'image':
        return <img src={sermon.content} alt={sermon.title} className="w-full mb-4 rounded" />
      case 'text':
      default:
        return <p className="text-gray-600 mb-4">{sermon.content}</p>
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Sermons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sermons.map((sermon) => (
          <div key={sermon._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{sermon.title}</h2>
            {renderSermonContent(sermon)}
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={() => setSelectedSermon(selectedSermon === sermon ? null : sermon)}
            >
              <MessageSquare className="inline mr-2" size={20} />
              {sermon.comments.length} Comments
            </button>
            {selectedSermon === sermon && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Comments</h3>
                {sermon.comments.map((comment, index) => (
                  <p key={index} className="text-sm text-gray-600 mb-1">{comment.text}</p>
                ))}
                {user && (
                  <div className="mt-2">
                    <textarea
                      className="w-full p-2 border rounded"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Your comment..."
                    ></textarea>
                    <button
                      className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={() => handleCommentSubmit(sermon._id)}
                    >
                      Submit Comment
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sermons