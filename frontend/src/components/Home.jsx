import React from 'react'
import { Calendar, Users, Book } from 'lucide-react'

const Home = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-blue-600">Welcome to Grace Church</h1>
      <p className="text-xl text-center text-gray-600">A place of worship, community, and spiritual growth</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Calendar className="mx-auto text-blue-600 mb-4" size={48} />
          <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
          <p className="text-gray-600">Join us for our weekly services and special events</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Users className="mx-auto text-blue-600 mb-4" size={48} />
          <h2 className="text-xl font-semibold mb-2">Community</h2>
          <p className="text-gray-600">Connect with fellow believers and grow together</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Book className="mx-auto text-blue-600 mb-4" size={48} />
          <h2 className="text-xl font-semibold mb-2">Resources</h2>
          <p className="text-gray-600">Access sermons, Bible studies, and spiritual guidance</p>
        </div>
      </div>
    </div>
  )
}

export default Home