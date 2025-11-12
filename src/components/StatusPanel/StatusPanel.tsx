import { Grid } from '@mantine/core';
import { ClientInfo } from '@/components/ClientInfo/ClientInfo';
import { ConnectionStatus } from '@/components/ConnectionStatus/ConnectionStatus';
import { StatusPanelProps } from '@/types';

export function StatusPanel({ status, peerId, nickname, setNickname }: StatusPanelProps) {
  return (
    <Grid gutter="md">
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <ClientInfo peerId={peerId} nickname={nickname} setNickname={setNickname} />
      </Grid.Col>

      <Grid.Col span={{ base: 12, sm: 6 }}>
        <ConnectionStatus status={status} peerId={peerId} nickname={nickname} />
      </Grid.Col>
    </Grid>
  )
}
