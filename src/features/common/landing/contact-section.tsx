import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ContactSection() {
  return (
    <section className='bg-muted/50 py-24'>
      <div className='mx-auto mb-12 max-w-5xl text-center'>
        <h2 className='text-3xl font-bold'>Contact Us</h2>
        <p className='mt-2 text-muted-foreground'>
          We’re here to help you every step of the way!
        </p>
      </div>

      <Card className='mx-auto max-w-3xl rounded-2xl p-6 shadow-sm'>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Input placeholder='Your Name' />
          <Input type='email' placeholder='Your Email' />
          <Input placeholder='Phone Number' />
          <Textarea placeholder='Your Message' rows={5} />
          <Button className='w-full'>Submit</Button>
        </CardContent>
      </Card>
    </section>
  )
}
