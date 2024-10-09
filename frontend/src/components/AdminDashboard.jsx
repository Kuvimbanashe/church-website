import React, { useState } from 'react'
import { Video, Image, FileText } from 'lucide-react'

const AdminDashboard = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [type, setType] = useState('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:5000/api/sermons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title, content, type }),
    })
    .then(res => res.json())
    .then((data) => {
      if (data._id) {
        alert('Sermon posted successfully')
        setTitle('')
        setContent('')
        setType('text')
      } else if (data.error) {
        alert(`Failed to post sermon: ${data.error}`)
      } else {
       // alert('Failed to post sermon: Unknown error')

       alert(`Failed to post sermon: ${data.error}`)
      }
    })
    .catch(err => console.error(err))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Admin Dashboard</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Post New Sermon</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Type</label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
          {type === 'text' ? (
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded"
              rows={6}
              required
            ></textarea>
          ) : (
            <input
              type="url"
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder={`Enter ${type} URL`}
              required
            />
          )}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Post Sermon
        </button>
      </form>
    </div>
  )
}

export default AdminDashboard