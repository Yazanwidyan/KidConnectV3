type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='container grid h-svh max-w-none items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          <img
            src={'/images/logo2.png'}
            alt={'KidConnect'}
            className='me-2 h-8 w-8 object-cover'
          />
          <h1 className='text-xl font-medium'>KidConnect</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
