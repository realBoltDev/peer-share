import { Paper, Text, useMantineTheme } from '@mantine/core';
import { StatusPanel } from '@/components/StatusPanel/StatusPanel';
import { FilesTable } from '@/components/FilesTable/FilesTable';
import { ConnectPanel } from '@/components/ConnectPanel/ConnectPanel';
import { useAppStore } from '@/store/appStore';

export function ConnectPage() {
  const theme = useMantineTheme();

  const peerId = useAppStore((s) => s.peerId);
  const remotePeerId = useAppStore((s) => s.remotePeerId);
  const remotePeerConnected = useAppStore((s) => s.remotePeerConnected);
  const nickname = useAppStore((s) => s.nickname);
  const remoteNickname = useAppStore((s) => s.remoteNickname);
  const connStatus = useAppStore((s) => s.connStatus);
  const connMessage = useAppStore((s) => s.connMessage);
  const setNickname = useAppStore((s) => s.setNickname);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Paper shadow='xs' radius='sm' p='md' bg={theme.colors.dark[6]} m='md' style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <StatusPanel peerId={peerId} nickname={nickname} setNickname={setNickname} status={connStatus} message={connMessage} remotePeerId={remotePeerId} remoteNickname={remoteNickname} />
      </Paper>

      <Paper shadow='xs' radius='md' p='md' bg={theme.colors.dark[6]} ml='md' mr='md'>
        {!remotePeerConnected ? (
          <ConnectPanel />
        ) : (
          <FilesTable />
        )}
      </Paper>
    </div>
  );
}
