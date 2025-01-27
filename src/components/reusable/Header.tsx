import { auth } from '@/firebase'
import { useAuth } from '../AuthContext'
import { signOut } from 'firebase/auth'

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
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </nav>

      <div>
        {/* Logout session */}

        <a
          onClick={() => {
            signOut(auth)
          }}
          className="cursor-pointer text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
        >
          {currentUser ? 'Log Out' : 'Log In'}
        </a>
      </div>
    </header>
  )
}

export default Header
