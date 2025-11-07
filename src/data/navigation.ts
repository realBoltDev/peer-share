import type { NavigationSection } from '@/types/index'
import { HomeIcon, ShareIcon, Link2Icon, InfoIcon } from 'lucide-react'

export const navigationData: NavigationSection[] = [
  {
    title: 'Home',
    href: '/',
    icon: HomeIcon
  },
  {
    title: 'Share',
    href: '/share',
    icon: ShareIcon
  },
  {
    title: 'Connect',
    href: '/share',
    icon: Link2Icon
  },
  {
    title: 'About',
    href: '/share',
    icon: InfoIcon
  }
]