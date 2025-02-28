import { useAuth } from '@/components/AuthContext'
import { BiLogOut } from 'react-icons/bi'
import { Link } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { logout } from '@/api/user'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { User } from '@/types'

const Header = () => {
  const currentUser = useAuth()

  const mutation = useMutation({
    mutationFn: logout,
  })

  return (
    <header className="bg-gray-900 text-gray-100">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* logo */}
        <div className="text-lg font-bold">
          <Link to="/" className="hover:text-gray-300">
            Study With Me
          </Link>
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
        <div className="flex items-center justify-center gap-3">
          <button
            className="flex items-center justify-center gap-2 bg-gray-800 text-gray-400 p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            onClick={() => {
              // signOut(auth)
              mutation.mutate()
            }}
          >
            {currentUser ? 'Log Out' : 'Log In'}
            <BiLogOut />
          </button>
          <span>{(currentUser && currentUser?.name) || ''}</span>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

export default Header
