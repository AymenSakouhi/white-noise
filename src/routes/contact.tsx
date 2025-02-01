import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Contact,
})

function Contact() {
  return <div className="p-2">Hi there, this is contact page</div>
}
