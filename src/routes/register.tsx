import { createFileRoute } from '@tanstack/react-router'
import Layout from '@/components/reusable/Layout'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Layout>
      <div className="p-2">Hello world</div>
    </Layout>
  )
}
