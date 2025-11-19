import { Text, Group, Box, Paper, useMantineTheme } from "@mantine/core";
import { ConnectionStatusProps } from "@/types/statusPanel";
import { appStore, useAppStore } from "@/store/appStore";
import classes from './ConnectionStatus.module.css';

export function ConnectionStatus({ status, message }: ConnectionStatusProps) {
  const theme = useMantineTheme();
  const peerRole = useAppStore((s) => s.peerRole);

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
    <Paper p="sm" radius="md" bg={theme.colors.dark[5]} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%', justifyContent: status === 'connected' ? 'flex-start' : 'center' }}>
      <Group justify="flex-start" gap="sm" mb={status === 'connected' ? 4 : 0} wrap="nowrap" align="flex-start">
        <Box
          className={classes[pulseClass]}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: statusColor === 'green' ? '#22c55e' : statusColor === 'yellow' ? '#eab308' : statusColor === 'orange' ? '#f97316' : '#ef4444',
            flexShrink: 0,
            marginTop: '4px'
          }}
        />
        <Text c="white" size="sm" style={{ flex: 1 }}>
          {message}
        </Text>
      </Group>

      {status === 'connected' && (
        <Group justify="flex-start">
          <Text size="sm" c="gray.4">
            Role:
          </Text>
          <Text size="sm" c="white">
            {peerRole}
          </Text>
        </Group>
      )}
    </Paper>
  )
}
