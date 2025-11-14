import { Burger, Group } from '@mantine/core';
import classes from './Header.module.css';
import { HeaderProps } from '@/types';

export function Header({ opened, toggle }: HeaderProps) {
  return (
    <>
      <header className={classes.header}>
        <Group h="100%" justify="space-between" align="center">
          <Group gap="xs" align="center">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path fillRule="evenodd" clipRule="evenodd" d="M7.289.797a.5.5 0 0 1 .422 0l6 2.8A.5.5 0 0 1 14 4.05v6.9a.5.5 0 0 1-.289.453l-6 2.8a.5.5 0 0 1-.422 0l-6-2.8A.5.5 0 0 1 1 10.95v-6.9a.5.5 0 0 1 .289-.453zM2 4.806 7 6.93v6.034l-5-2.333zm6 8.159 5-2.333V4.806L8 6.93zm-.5-6.908 4.772-2.028L7.5 1.802 2.728 4.029z" fill="#C9C9C9" />
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
