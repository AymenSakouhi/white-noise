import { auth } from '@/firebase'
import { useAuth } from '../AuthContext'
import { signOut } from 'firebase/auth'
import { BiLogOut } from 'react-icons/bi'
import { MdDarkMode } from 'react-icons/md'

const Header = () => {
  const currentUser = useAuth()

  return (
    <header className="bg-gray-900 text-gray-100">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* logo */}
        <div className="text-lg font-bold">
          <a href="#" className="hover:text-gray-300">
            mylogo
          </a>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="text-gray-300">
          Home
        </a>
        <a href="#" className="text-gray-300">
          About
        </a>
        <a href="#" className="text-gray-300">
          Services
        </a>
        <a href="#" className="text-gray-300">
          Contact
        </a>
      </nav>
      {/* Logout session */}
      <button
        className="bg-gray-800 text-gray-400 p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        onClick={() => {
          signOut(auth)
        }}
      >
        {currentUser ? 'Log Out' : 'Log In'}
        <BiLogOut />
      </button>
      <button
        className="bg-gray-800 text-gray-400 p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        aria-label="Toggle-Dark-Mode"
      >
        <MdDarkMode />
      </button>
    </header>
  )
}

export default Header
