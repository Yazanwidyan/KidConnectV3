import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/student-leaves/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/student-leaves/"!</div>
}
