import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Church } from 'lucide-react'
import Home from './components/Home'
import Sermons from './components/Sermons'
import Chatroom from './components/Chatroom'
import Login from './components/Login'
import Register from './components/Register'
import AdminDashboard from './components/AdminDashboard'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

 

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Church size={24} />
              <span className="text-xl font-bold">Grace Church</span>
            </Link>
           
            <div className="space-x-4">
              <Link to="/" className="hover:text-blue-200">Home</Link>
              <Link to="/sermons" className="hover:text-blue-200">Sermons</Link>
              <Link to="/chatroom" className="hover:text-blue-200">Chatroom</Link>
              {user ? (
                <>
                  {!user.isAdmin && <Link to="/admin" className="hover:text-blue-200">Admin</Link>}
                  <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-blue-200">Login</Link>
                  <Link to="/register" className="hover:text-blue-200">Register</Link>
                </>
              )}
            </div>
          </div>
        </nav>
       

        <div className="container mx-auto mt-8 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sermons" element={<Sermons user={user} />} />
            <Route path="/chatroom" element={<Chatroom user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            {<Route path="/admin" element={<AdminDashboard />} />}
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App