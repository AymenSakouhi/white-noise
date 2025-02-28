//TODO DELETE THIS ASAAAAAAAAP
import { useContext, createContext, ReactNode, FC } from 'react'

import { useQuery } from '@tanstack/react-query'
import { User } from '@/types'
import { queryOpts } from '@/lib/reactQuery'

const AuthContext = createContext<User | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { data, isLoading } = useQuery(queryOpts.userData())

  return (
    <AuthContext.Provider value={data}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
