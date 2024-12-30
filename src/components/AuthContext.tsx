import {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
  FC,
} from 'react'

import { onAuthStateChanged, User } from 'firebase/auth'

import { auth } from '@/firebase'

const AuthContext = createContext<User | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<null | User>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={currentUser}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
