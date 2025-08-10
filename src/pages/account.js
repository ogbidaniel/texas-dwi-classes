import { useState } from 'react';
import Link from 'next/link';

export default function Account() {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data - replace with actual data from your backend
  const upcomingCourses = [
    {
      id: 'dwi-e-123',
      name: 'DWI-E',
      date: '2025-08-15',
      time: '9:00 AM',
      status: 'Scheduled',
      joinUrl: '/class/dwi-e-123' // Updated URL format
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold">My Account</h1>
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'upcoming'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Upcoming Classes
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'completed'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Completed Classes
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'upcoming' && (
              <div className="space-y-6">
                {upcomingCourses.map(course => (
                  <div key={course.id} className="border rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{course.name}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(course.date).toLocaleDateString()} at {course.time}
                      </p>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {course.status}
                      </span>
                    </div>
                    {new Date(course.date) <= new Date() ? (
                      <Link
                        href={course.joinUrl}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Join Class
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-500">
                        Available on {new Date(course.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'completed' && (
              <div className="text-center py-8 text-gray-500">
                No completed classes yet
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}