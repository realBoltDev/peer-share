import { Text, Group, Box } from "@mantine/core";
import classes from './ConnectionStatus.module.css';

export function ConnectionStatus({ status, peerId, nickname }: { status: string, peerId: string, nickname: string }) {
  const statusColor = status === 'connected' ? 'green' : status === 'waiting' ? 'yellow' : 'red';
  const statusText = status === 'connected' ? `Connected to Peer: ${peerId} (${nickname})` : status === 'waiting' ? 'Waiting for connection' : 'Disconnected';
  const pulseClass = status === 'connected' ? 'pulse-dot-green' : status === 'waiting' ? 'pulse-dot-yellow' : '';

  return (
    <Group justify="center" gap="sm">
      <Box
        className={classes[pulseClass]}
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: statusColor === 'green' ? '#22c55e' : statusColor === 'yellow' ? '#eab308' : '#ef4444',
          flexShrink: 0
        }}
      />
      <Text c="white" size="md">
        {statusText}
      </Text>
    </Group>
  )
}
