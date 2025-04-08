import { useAuth } from '@/components/AuthContext'
import { BiLogOut } from 'react-icons/bi'
import { CiHome, CiSquareInfo } from 'react-icons/ci'
import { GoTools } from 'react-icons/go'
import { MdOutlineContactPage } from 'react-icons/md'
import { Link } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { logout } from '@/api/user'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const Header = () => {
  const user = useAuth()

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem('token')
      window.location.href = '/login'
    },
  })

  return (
    <header className="font-space bg-white text-black dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* logo */}
        <div className="text-lg">
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="hover:dark:text-gray-300 hover:text-gray-400"
            >
              SoundFocus
            </Link>
            <Link to="/" className="flex items-center">
              <CiHome />
              Home
            </Link>
            <Link to="/about" className="flex items-center">
              <CiSquareInfo />
              About
            </Link>
            <Link to="/services" className="flex items-center">
              <GoTools />
              Services
            </Link>
            <Link to="/contact" className="flex items-center">
              <MdOutlineContactPage />
              Contact
            </Link>
          </nav>
        </div>
        {/* Navigation */}
        {/* Logout session */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 p-2"
            onClick={() => {
              mutation.mutate()
            }}
          >
            Log Out
            <BiLogOut />
          </Button>
          <span>{(user && user.user?.name.split(' ')[0]) || ''}</span>
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
