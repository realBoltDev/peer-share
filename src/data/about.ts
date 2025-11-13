import { IconBolt, IconShieldLock, IconCookieOff } from '@tabler/icons-react';
import { AboutCardProps } from '@/types/card';

export const gridData: AboutCardProps[] = [
  {
    title: 'Fast Transfers',
    description:
      'Experience quick file sharing with direct peer connections. Your data moves straight from sender to receiver with minimal latency.',
    icon: IconBolt,
  },
  {
    title: 'Privacy Focused',
    description:
      'Your files never touch external servers. Each session is encrypted and only the intended peer can access the data you share.',
    icon: IconShieldLock,
  },
  {
    title: 'No Third Parties',
    description:
      'Every transfer happens between peers only. Server is used only to initiate connection. None of your activities are logged.',
    icon: IconCookieOff,
  },
];
