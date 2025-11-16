import { Text, Group, Box, Paper, useMantineTheme } from "@mantine/core";
import { ConnectionStatusProps } from "@/types/statusPanel";
import classes from './ConnectionStatus.module.css';

export function ConnectionStatus({ status, message }: ConnectionStatusProps) {
  const theme = useMantineTheme();

  // idle
  // waiting
  // connecting
  // connected
  // failed
  // disconnected

  const statusColor = status === 'idle' ? 'yellow' :
    (status === 'waiting' || status === 'connecting') ? 'orange' :
      status === 'connected' ? 'green' :
        'red';

  const pulseClass = status === 'idle' ? 'pulse-dot-yellow' :
    (status === 'waiting' || status === 'connecting') ? 'pulse-dot-orange' :
      status === 'connected' ? 'pulse-dot-green' :
        '';

  return (
    <Paper p="sm" radius="md" bg={theme.colors.dark[5]} h="100%" style={{ display: 'flex', alignItems: 'center' }}>
      <Group justify="flex-start" gap="sm">
        <Box
          className={classes[pulseClass]}
          style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: statusColor === 'green' ? '#22c55e' : statusColor === 'yellow' ? '#eab308' : statusColor === 'orange' ? '#f97316' : '#ef4444',
          }}
        />
        <Text c="white" size="sm">
          {message}
        </Text>
      </Group>
    </Paper>
  )
}
