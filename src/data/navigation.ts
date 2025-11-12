import { NavigationSection } from "@/types";
import {
  IconHome,
  IconInfoCircle,
  IconPlugConnected,
} from '@tabler/icons-react';

export const navigationData: NavigationSection[] = [
  { link: '/', label: 'Home', icon: IconHome },
  { link: '/connect', label: 'Connect', icon: IconPlugConnected },
  { link: '/about', label: 'About', icon: IconInfoCircle }
];
