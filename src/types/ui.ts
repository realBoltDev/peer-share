import type { LucideIcon } from 'lucide-react'

export type NavigationSection = {
  title: string
  href: string
  icon?: LucideIcon
}

export type HeaderProps = {
  navigationData: NavigationSection[]
  className?: string
}