//TODO DELETE THIS ASAAAAAAAAP

import {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
  FC,
} from 'react'

import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/api/user'

const AuthContext = createContext(null)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const { data, isLoading } = useQuery({
    queryFn: getProfile,
    queryKey: ['user'],
    staleTime: 24 * 60 * 60 * 1000,
  })

  useEffect(() => {
    if (data?.user) {
      setCurrentUser(data.user)
    }
  }, [data])

  return (
    <AuthContext.Provider value={currentUser}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
