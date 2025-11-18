import { Grid } from '@mantine/core';
import { ClientInfo } from '@/components/ClientInfo/ClientInfo';
import { ConnectionStatus } from '@/components/ConnectionStatus/ConnectionStatus';
import { StatusPanelProps } from '@/types';

export function StatusPanel({ peerId, nickname, setNickname, status, message, remotePeerId, remoteNickname }: StatusPanelProps) {
  const displayMessage = status === 'connected' && remoteNickname
    ? `${message} (${remoteNickname})`
    : message;

  return (
    <Grid gutter="md">
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <ClientInfo peerId={peerId} nickname={nickname} setNickname={setNickname} />
      </Grid.Col>

      <Grid.Col span={{ base: 12, sm: 6 }}>
        <ConnectionStatus status={status} message={displayMessage} remotePeerId={remotePeerId} remoteNickname={remoteNickname} />
      </Grid.Col>
    </Grid>
  )
}
