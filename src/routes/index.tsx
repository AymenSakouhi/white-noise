import { createFileRoute } from '@tanstack/react-router'
import App from '@/App'
import { AuthProvider } from '@/components/AuthContext'

export const Route = createFileRoute('/')({
  component: Index,
})

export default function Index() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}
