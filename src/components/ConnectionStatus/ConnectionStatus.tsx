import { Text, Group, Box, Paper, useMantineTheme } from "@mantine/core";
import classes from './ConnectionStatus.module.css';

export function ConnectionStatus({ status, peerId, nickname }: { status: string, peerId: string, nickname: string }) {
  const theme = useMantineTheme();
  const statusColor = status === 'connected' ? 'green' : status === 'waiting' ? 'yellow' : 'red';
  const statusText = status === 'connected' ? `Connected to Peer: ${peerId} (${nickname})` : status === 'waiting' ? 'Waiting for connection' : 'Disconnected';
  const pulseClass = status === 'connected' ? 'pulse-dot-green' : status === 'waiting' ? 'pulse-dot-yellow' : '';

  return (
    <Paper p="sm" radius="md" bg={theme.colors.dark[5]} h="100%" style={{ display: 'flex', alignItems: 'center' }}>
      <Group justify="flex-start" gap="sm">
        <Box
          className={classes[pulseClass]}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: statusColor === 'green' ? '#22c55e' : statusColor === 'yellow' ? '#eab308' : '#ef4444',
          }}
        />
        <Text c="white" size="sm">
          {statusText}
        </Text>
      </Group>
    </Paper>
  )
}
