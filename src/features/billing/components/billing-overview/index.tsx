import { CheckCircle, CreditCard, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function BillingOverview() {
  return (
    <div className='space-y-6'>
      {/* ===== Easy Setup ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Easy Setup</CardTitle>
          <p className='text-sm text-muted-foreground'>
            Quickly set up billing with these simple steps.
          </p>
        </CardHeader>

        <CardContent className='grid gap-4 md:grid-cols-3'>
          <SetupStep
            step={1}
            title='Create billing plans'
            description='Create billing plans for your students.'
            icon={<FileText className='h-5 w-5' />}
          />
          <SetupStep
            step={2}
            title='Assign billing plans'
            description='Assign billing plans to generate automatic invoices.'
            icon={<CheckCircle className='h-5 w-5' />}
          />
          <SetupStep
            step={3}
            title='Enable payments'
            description='Set up your school to accept online payments.'
            icon={<CreditCard className='h-5 w-5' />}
          />
        </CardContent>
      </Card>

      {/* ===== Invoices Header ===== */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <Tabs defaultValue='invoices'>
          <TabsList>
            <TabsTrigger value='invoices'>Invoices</TabsTrigger>
            <TabsTrigger value='payments'>Payments</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className='flex flex-wrap items-center gap-2'>
          <Input type='date' className='w-[150px]' />
          <span className='text-sm text-muted-foreground'>to</span>
          <Input type='date' className='w-[150px]' />

          <Button>Add Invoice</Button>
          <Button variant='outline'>Print</Button>
        </div>
      </div>

      {/* ===== Summary ===== */}
      <p className='text-sm text-muted-foreground'>
        Open invoices as of today:{' '}
        <span className='font-medium'>210.00 USD</span>
      </p>

      {/* ===== Invoice Status Cards ===== */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
        <StatusCard
          title='All Invoices'
          count='14 invoices'
          amount='373.60 USD'
          description='All invoices'
        />

        <StatusCard
          title='Past Due'
          count='7 invoices'
          amount='172.00 USD'
          description='Invoices with due date passed'
          variant='destructive'
        />

        <StatusCard
          title='Paid'
          count='5 invoices'
          amount='153.60 USD'
          description='Invoices that have been paid'
          variant='success'
        />

        <StatusCard
          title='Processing'
          count='0 invoices'
          amount='0.00 USD'
          description='Payments submitted but not cleared'
          variant='warning'
        />

        <StatusCard
          title='Upcoming'
          count='2 invoices'
          amount='48.00 USD'
          description='Invoices due in the future'
          variant='info'
        />
      </div>
    </div>
  )
}

/* ===================== */
/* ===== Components ==== */
/* ===================== */

function SetupStep({
  step,
  title,
  description,
  icon,
}: {
  step: number
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className='flex items-start gap-3 rounded-lg border p-4'>
      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground'>
        {step}
      </div>
      <div className='space-y-1'>
        <div className='flex items-center gap-2 font-medium'>
          {icon}
          {title}
        </div>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
    </div>
  )
}

function StatusCard({
  title,
  count,
  amount,
  description,
  variant,
}: {
  title: string
  count: string
  amount: string
  description: string
  variant?: 'destructive' | 'success' | 'warning' | 'info'
}) {
  const variants: Record<string, string> = {
    destructive: 'bg-red-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white',
  }

  return (
    <Card className={variant ? variants[variant] : ''}>
      <CardContent className='space-y-2 p-4'>
        <div className='flex items-center justify-between'>
          <p className='text-sm font-medium'>{title}</p>
        </div>
        <p className='text-lg font-semibold'>{count}</p>
        <p className='text-sm'>{amount}</p>
        <p className='text-xs opacity-80'>{description}</p>
      </CardContent>
    </Card>
  )
}
