import { Icon } from '@tabler/icons-react';

export interface NavigationSection {
  link: string;
  label: string;
  icon: Icon;
}

export interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}
