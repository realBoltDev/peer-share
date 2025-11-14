import { Text, Group, Box, Paper, useMantineTheme } from "@mantine/core";
import { ConnectionStatusProps } from "@/types/statusPanel";
import classes from './ConnectionStatus.module.css';

export function ConnectionStatus({ status, remotePeerId, remoteNickname }: ConnectionStatusProps) {
  const theme = useMantineTheme();

  const statusColor = status === 'connected' ? 'green' :
    (status === 'waiting' || status === 'connecting') ? 'yellow'
      : 'red';

  const statusText = status === 'connected' ? `Connected to Peer: ${remotePeerId} (${remoteNickname})` :
    status === 'waiting' ? 'Waiting for connection' :
      status === 'connecting' ? `Connecting to Peer: ${remotePeerId} (${remoteNickname})` :
        status === 'failed' ? 'Failed to connect to peer' :
          'Disconnected';

  const pulseClass = status === 'connected' ? 'pulse-dot-green' :
    (status === 'waiting' || status === 'connecting') ? 'pulse-dot-yellow' :
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
