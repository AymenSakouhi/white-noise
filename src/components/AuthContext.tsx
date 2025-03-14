//TODO DELETE THIS ASAAAAAAAAP
import { useContext, createContext, ReactNode, FC } from 'react'

import { useQuery } from '@tanstack/react-query'
import { SafeUser } from '@/types'
import { queryOpts } from '@/lib/reactQuery'

const AuthContext = createContext<SafeUser | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { data, isLoading } = useQuery(queryOpts.userData())

  return (
    <AuthContext.Provider value={data?.user}>
      {data && !isLoading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const auth = useContext(AuthContext)
  if (auth === null) {
    throw new Error('Context is null')
  }
  return auth
}
