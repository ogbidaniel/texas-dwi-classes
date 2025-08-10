import { COURSES, COMPANY_INFO } from '../utils/constants';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Nav */}
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-blue-600">
              {COMPANY_INFO.name}
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/courses" className="text-gray-600 hover:text-gray-900">Courses</Link>
            <Link href="/account" className="text-gray-600 hover:text-gray-900">My Account</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Court-Ordered Education Programs</h1>
          <p className="text-xl mb-8">
            TDLR-Licensed courses available online for all Texas counties
          </p>
          <div className="inline-flex items-center space-x-4">
            <Link 
              href="/courses" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              View Available Courses
            </Link>
            <Link 
              href={`tel:${COMPANY_INFO.phone}`} 
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Call {COMPANY_INFO.phone}
            </Link>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
              <p className="text-gray-600 mb-2">{course.duration}</p>
              <p className="text-lg font-medium text-blue-600 mb-4">
                ${course.price.min} – ${course.price.max}
              </p>
              <Link
                href={`/courses/${course.id}`}
                className="w-full block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Register Now
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>{COMPANY_INFO.address}</p>
              <p>{COMPANY_INFO.city}, {COMPANY_INFO.state} {COMPANY_INFO.zip}</p>
              <p>Room {COMPANY_INFO.room}</p>
              <p className="mt-2">{COMPANY_INFO.phone}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Licenses</h3>
              <p>TDLR DWI: #{COMPANY_INFO.licenses.dwi.number}</p>
              <p>TDLR DOEP: #{COMPANY_INFO.licenses.doep.number}</p>
              <p>TDLR DWI-I: #{COMPANY_INFO.licenses.dwiI.number}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/courses" className="hover:text-blue-400">All Courses</Link></li>
                <li><Link href="/faq" className="hover:text-blue-400">FAQ</Link></li>
                <li><Link href="/reschedule" className="hover:text-blue-400">Reschedule</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
