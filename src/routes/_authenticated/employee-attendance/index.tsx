import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/employee-attendance/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/employee-attendance/"!</div>
}
