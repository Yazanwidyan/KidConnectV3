import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/employee-leaves/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/employee-leaves/"!</div>
}
