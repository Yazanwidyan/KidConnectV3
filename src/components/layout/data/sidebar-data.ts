import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  BarChart3,
  ClipboardList,
  MessagesSquare,
  UserCheck,
  Bell,
  CreditCard,
  LogIn,
  Settings,
  UserCog,
  Wrench,
  Palette,
  Monitor,
  HelpCircle,
  CalendarCheck,
  Command,
} from 'lucide-react'

import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Yazan Widyan',
    email: 'yazanwidyan@gmail.com',
    avatar: '/avatars/shadcn.png',
  },

  teams: [
    {
      name: 'KidConnect',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
  ],

  navGroups: [
    {
      title: 'General',
      items: [
        { title: 'Dashboard', url: '/', icon: LayoutDashboard },
        { title: 'Groups', url: '/groups', icon: ClipboardList },
        { title: 'Students', url: '/students', icon: GraduationCap },
        { title: 'Employees', url: '/employees', icon: Briefcase },
        { title: 'Reports', url: '/reports', icon: BarChart3 },
        {
          title: 'Communication',
          icon: MessagesSquare,
          badge: '3',
          items: [
            { title: 'Messages', url: '/chats' },
            { title: 'Notifications', url: '/notifications' },
            { title: 'Announcements', url: '/announcements' },
          ],
        },
        { title: 'Admissions', url: '/admissions', icon: UserCheck },
        {
          title: 'Attendance & Leaves',
          icon: CalendarCheck,
          items: [
            { title: 'Student Attendance', url: '/student-attendance' },
            { title: 'Employee Attendance', url: '/employee-attendance' },
            { title: 'Student Leaves', url: '/student-leaves' },
            { title: 'Employee Leaves', url: '/employee-leaves' },
          ],
        },
        {
          title: 'Finance',
          icon: CreditCard,
          items: [
            { title: 'Invoices', url: '/invoices' },
            { title: 'Products & Services', url: '/products' },
            { title: 'Payment Requests', url: '/payment-requests' },
            { title: 'Payments', url: '/payments' },
          ],
        },

        {
          title: 'Auth',
          icon: LogIn,
          items: [
            { title: 'Sign In', url: '/sign-in' },
            { title: 'Sign In (2 Col)', url: '/sign-in-2' },
            { title: 'Sign Up', url: '/sign-up' },
            { title: 'Forgot Password', url: '/forgot-password' },
            { title: 'OTP', url: '/otp' },
          ],
        },

        {
          title: 'Settings',
          icon: Settings,
          items: [
            { title: 'Profile', url: '/settings', icon: UserCog },
            { title: 'Account', url: '/settings/account', icon: Wrench },
            { title: 'Appearance', url: '/settings/appearance', icon: Palette },
            { title: 'Notifications', url: '/settings/notifications', icon: Bell },
            { title: 'Display', url: '/settings/display', icon: Monitor },
          ],
        },

        {
          title: 'Help Center',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}

