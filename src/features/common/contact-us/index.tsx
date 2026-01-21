import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { LandingLayout } from '../landing-layout'

export default function ContactUs() {
  return (
    <LandingLayout>
      <div className='mx-auto max-w-5xl'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-12 text-center'
        >
          <h1 className='text-4xl font-bold tracking-tight'>Contact Us</h1>
          <p className='mt-3 text-muted-foreground'>
            Have a question or want to work with us? We’d love to hear from you.
          </p>
        </motion.div>

        <div className='grid gap-8 md:grid-cols-2'>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className='rounded-2xl shadow-sm'>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Input placeholder='Your name' />
                <Input type='email' placeholder='Your email' />
                <Textarea placeholder='Your message' rows={5} />
                <Button className='w-full'>Submit</Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='space-y-6'
          >
            <Card className='rounded-2xl shadow-sm'>
              <CardHeader>
                <CardTitle>Get in touch</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4 text-sm text-muted-foreground'>
                <div className='flex items-center gap-3'>
                  <Mail className='h-5 w-5' />
                  <span>contact@example.com</span>
                </div>
                <div className='flex items-center gap-3'>
                  <Phone className='h-5 w-5' />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className='flex items-center gap-3'>
                  <MapPin className='h-5 w-5' />
                  <span>123 Main Street, City, Country</span>
                </div>
              </CardContent>
            </Card>

            <Card className='rounded-2xl shadow-sm'>
              <CardHeader>
                <CardTitle>Office hours</CardTitle>
              </CardHeader>
              <CardContent className='text-sm text-muted-foreground'>
                <p>Monday – Friday</p>
                <p>9:00 AM – 5:00 PM</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </LandingLayout>
  )
}
