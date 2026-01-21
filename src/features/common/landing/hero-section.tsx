import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className='relative flex h-screen items-center justify-center overflow-hidden bg-primary text-white'>
      {/* Left Device Mockup */}
      <motion.img
        src='/mockup-left.png' // Replace with your screenshot
        alt='Desktop Dashboard'
        className='absolute top-1/2 left-0 hidden w-1/3 -translate-y-1/2 transform lg:block'
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Right Device Mockup */}
      <motion.img
        src='/mockup-right.png' // Replace with your screenshot
        alt='Mobile App'
        className='absolute top-1/2 right-0 hidden w-1/4 -translate-y-1/2 transform lg:block'
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Center Content */}
      <div className='relative z-10 max-w-md px-6 text-center'>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className='mb-8 text-4xl font-bold md:text-5xl'
        >
          More time with children.{' '}
          <span className='underline decoration-yellow-400'>
            Less time on admin.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className='mb-8 text-lg'
        >
          First, tell us about yourself.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className='flex flex-col gap-4'
        >
          <Button size='lg' className='w-full' variant='secondary'>
            I’m an <strong>admin or director</strong>
          </Button>
          <Button size='lg' className='w-full' variant='secondary'>
            I’m a <strong>staff member</strong>
          </Button>
          <Button size='lg' className='w-full' variant='secondary'>
            I’m a <strong>parent or guardian</strong>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className='mt-6 text-sm'
        >
          Already use KidConnect?{' '}
          <a href='#' className='font-medium underline'>
            Join your school
          </a>
        </motion.p>
      </div>
    </section>
  )
}
