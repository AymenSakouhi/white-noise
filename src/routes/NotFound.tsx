import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/NotFound')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>NOT FOUND PAGE</div>
}
