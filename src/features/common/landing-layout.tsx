import { Link } from '@tanstack/react-router'

type LayoutProps = { children: React.ReactNode }

export function LandingLayout({ children }: LayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* Navbar */}
      <header className='bg-white shadow-md'>
        <nav className='mx-auto flex max-w-7xl items-center justify-between p-4'>
          <Link to='/' className='text-2xl font-bold'>
            KidConnect
          </Link>
          <div className='flex gap-6'>
            <Link to='/'>Home</Link>
            <Link to='/features'>Features</Link>
            <Link to='/contact'>Contact Us</Link>
            <Link to='/blog'>Blog</Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className='flex-1'>{children}</main>

      {/* Footer */}
      <footer className='border-t bg-white py-6 text-center text-sm text-muted-foreground'>
        <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row'>
          <p>
            &copy; {new Date().getFullYear()} KidConnect. All rights reserved.
          </p>
          <div className='flex gap-4'>
            <Link to='/privacy'>Privacy Policy</Link>
            <Link to='/terms'>Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
