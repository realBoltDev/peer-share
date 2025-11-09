import { Paper, Text, useMantineTheme } from "@mantine/core";
import { ConnectionStatus } from "@/components/ConnectionStatus/ConnectionStatus";
import classes from './Home.module.css';

export function HomePage() {
  const theme = useMantineTheme();

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    }}>
      <Paper
        shadow="xs"
        radius="sm"
        p="md"
        bg={theme.colors.dark[6]}
        mt="md"
        ml="md"
        mr="md"
      >
        <Text size="25px" c="white" ta="center">Fast, Private, Peer-to-Peer file sharing.</Text>
      </Paper>

      <Paper
        shadow="xs"
        radius="sm"
        p="md"
        bg={theme.colors.dark[6]}
        m="md"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'md' }}
      >
        <Paper
          shadow="xs"
          radius="sm"
          p="md"
          mb="md"
          bg={theme.colors.dark[5]}
        >
          <ConnectionStatus status="waiting" peerId="ABC123" nickname="BOLT"></ConnectionStatus>
        </Paper>

        <Paper
          shadow="xs"
          radius="sm"
          p="md"
          bg={theme.colors.dark[5]}
          style={{ flex: 1 }}
        >
          <Text c="white">File dropdown will go here</Text>
        </Paper>
      </Paper>
    </div>
  );
}
