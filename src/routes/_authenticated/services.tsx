import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/services')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/services"!</div>
}
