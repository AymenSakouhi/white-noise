import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase'

const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      // eslint-disable-next-line
      console.log('user info', user)
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error during google sign in', error)
    }
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        <span
          onClick={handleGoogleSignIn}
          className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
        >
          Sign in with google
        </span>
      </button>
    </div>
  )
}

export default GoogleSignIn
