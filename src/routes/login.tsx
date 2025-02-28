import { createFileRoute, redirect } from '@tanstack/react-router'
import LoginForm from '@/components/reusable/LoginForm'
import { queryOpts } from '@/lib/reactQuery'
import { z } from 'zod'

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: async ({ context, search }) => {
    const userData = await context.queryClient.fetchQuery(queryOpts.userData())
    const isAuthenticated = !!userData.user
    if (isAuthenticated) {
      console.log('redirection happnening')
      throw redirect({ to: search.redirect || '/' })
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
