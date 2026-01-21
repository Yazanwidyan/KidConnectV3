import { Link } from '@tanstack/react-router'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function AppTitle() {
  const { setOpenMobile } = useSidebar()
  return (
    <div>
      {/* <Link
        to='/'
        onClick={() => setOpenMobile(false)}
        className='grid flex-1 px-1 py-2 text-start text-sm leading-tight'
      >
        <div className='flex items-center gap-3'>
          <img
            src={'/images/logo2.png'}
            alt={'KidConnect'}
            className='h-8 w-8 rounded object-cover'
          />
          <div>
            <div className='truncate font-bold'>KidConnect</div>
            <div className='truncate text-xs'>X kindergarten</div>
          </div>
        </div>
      </Link> */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size='lg'
            className='gap-0 px-1 py-0 hover:bg-transparent active:bg-transparent'
            asChild
          >
            <div>
              <Link
                to='/'
                onClick={() => setOpenMobile(false)}
                className='grid flex-1 text-start text-sm leading-tight'
              >
                <div className='flex items-center gap-3'>
                  <img
                    src={'/images/logo2.png'}
                    alt={'KidConnect'}
                    className='h-8 w-8 object-cover'
                  />
                  <div>
                    <div className='truncate font-bold'>KidConnect</div>
                    <div className='truncate text-xs'>X kindergarten</div>
                  </div>
                </div>
              </Link>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  )
}
