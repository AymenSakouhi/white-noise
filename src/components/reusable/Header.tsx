import { auth } from '@/firebase'
import { useAuth } from '../AuthContext'
import { signOut } from 'firebase/auth'
import { BiLogOut } from 'react-icons/bi'
import { Link } from '@tanstack/react-router'

const Header = () => {
  const currentUser = useAuth()

  return (
    <header className="bg-gray-900 text-gray-100">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* logo */}
        <div className="text-lg font-bold">
          <a href="#" className="hover:text-gray-300">
            study with me
          </a>
        </div>
        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-300">
            Home
          </Link>
          <Link to="/about" className="text-gray-300">
            About
          </Link>
          <Link to="/services" className="text-gray-300">
            Services
          </Link>
          <Link to="/contact" className="text-gray-300">
            Contact
          </Link>
        </nav>
        {/* Logout session */}
        <button
          className="flex items-center justify-center gap-1 bg-gray-800 text-gray-400 p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          onClick={() => {
            signOut(auth)
          }}
        >
          {currentUser ? 'Log Out' : 'Log In'}
          <BiLogOut />
        </button>
      </div>
    </header>
  )
}

export default Header
