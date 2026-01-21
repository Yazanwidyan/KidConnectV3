import { BookOpen, CalendarCheck, ShieldCheck, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function FeaturesSection() {
  const features = [
    {
      icon: <Users />,
      title: 'Student Management',
      description: 'Manage student profiles, guardians, and enrollment easily.',
    },
    {
      icon: <CalendarCheck />,
      title: 'Attendance Tracking',
      description: 'Track attendance daily with automated reporting.',
    },
    {
      icon: <BookOpen />,
      title: 'Class & Curriculum',
      description: 'Organize classes, schedules, and learning plans.',
    },
    {
      icon: <ShieldCheck />,
      title: 'Secure & Reliable',
      description: 'Role-based access to keep student data secure.',
    },
  ]

  return (
    <section className='bg-muted/50 py-24'>
      <div className='mx-auto mb-12 max-w-6xl text-center'>
        <h2 className='text-3xl font-bold'>Why Choose KidConnect?</h2>
        <p className='mt-2 text-muted-foreground'>
          KidConnect simplifies childcare management by combining communication,
          learning tools, and administration into one platform.
        </p>
      </div>

      <div className='mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {features.map((f, i) => (
          <Card key={i} className='rounded-2xl p-4 shadow-sm'>
            <CardHeader className='flex items-center gap-3'>
              <div className='rounded-xl bg-primary/10 p-2 text-primary'>
                {f.icon}
              </div>
              <CardTitle>{f.title}</CardTitle>
            </CardHeader>
            <CardContent className='text-sm text-muted-foreground'>
              {f.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
