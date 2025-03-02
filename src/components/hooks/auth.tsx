import { useState, useEffect, createContext, useContext } from 'react'
import { User } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/api/user'

export interface AuthContext {
  isAuthenticated: boolean
  user: User | undefined
}

const AuthContext = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { data, isLoading } = useQuery({
    queryFn: getProfile,
    queryKey: ['user'],
    staleTime: 24 * 60 * 60 * 1000,
  })

  useEffect(() => {
    if (data?.user) {
      setUser(data.user)
      setIsAuthenticated(!!user)
    }
  }, [data?.user, user])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
