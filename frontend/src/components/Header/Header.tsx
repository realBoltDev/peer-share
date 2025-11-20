import { Burger, Group } from '@mantine/core';
import classes from './Header.module.css';
import { HeaderProps } from '@/types';

export function Header({ opened, toggle }: HeaderProps) {
  return (
    <>
      <header className={classes.header}>
        <Group h="100%" justify="space-between" align="center">
          <Group gap="8px" align="center">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg width="40" height="40" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path stroke="#fff" strokeWidth="12" strokeLinecap="round" d="m60 140 80-80" />
                <circle cx="60" cy="140" r="28" fill="none" stroke="#fff" strokeWidth="12" />
                <circle cx="140" cy="60" r="34" fill="#fff" />
              </svg>
            </div>

            <div style={{ fontSize: '2rem', fontWeight: 500, fontStyle: "normal", lineHeight: 1, marginTop: '2px' }}>
              <span style={{ color: 'white' }}>Peer</span>
              <span style={{ color: '#339AF0' }}>Share</span>
            </div>
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" aria-label="Toggle navigation" />
        </Group>
      </header>
    </>
  );
}
