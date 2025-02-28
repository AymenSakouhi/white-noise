import { createFileRoute, redirect } from '@tanstack/react-router'
import LoginForm from '@/components/reusable/LoginForm'
import { getProfile } from '@/api/user'

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    const userData = await context.queryclient.fetchQuery({
      queryFn: getProfile,
      queryKey: ['user'],
      staleTime: 24 * 60 * 60 * 1000,
    })
    if (userData) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
