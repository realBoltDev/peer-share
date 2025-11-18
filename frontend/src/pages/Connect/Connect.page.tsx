import { useEffect, useState } from 'react';
import { Paper, Text, useMantineTheme } from '@mantine/core';
import { StatusPanel } from '@/components/StatusPanel/StatusPanel';
import { FilesTable } from '@/components/FilesTable/FilesTable';
import { FileProps } from '@/types';
import { ConnectPanel } from '@/components/ConnectPanel/ConnectPanel';
import { getFileSizeText } from '@/utils/format';
import { useAppStore } from '@/store/appStore';

export function ConnectPage() {
  const theme = useMantineTheme();

  const [fileData, setFileData] = useState<FileProps>([]);

  const peerId = useAppStore((s) => s.peerId);
  const remotePeerId = useAppStore((s) => s.remotePeerId);
  const remotePeerConnected = useAppStore((s) => s.remotePeerConnected);
  const nickname = useAppStore((s) => s.nickname);
  const remoteNickname = useAppStore((s) => s.remoteNickname);
  const receiveStatus = useAppStore((s) => s.receiveStatus);
  const receiveMessage = useAppStore((s) => s.receiveMessage);
  const initSocketConn = useAppStore((s) => s.initSocketConn);
  const setMode = useAppStore((s) => s.setMode);
  const setNickname = useAppStore((s) => s.setNickname);
  const setReceiveStatus = useAppStore((s) => s.setReceiveStatus);
  const setReceiveMessage = useAppStore((s) => s.setReceiveMessage);

  useEffect(() => {
    initSocketConn();
    setMode('receive');
    setReceiveStatus('idle');
    setReceiveMessage('Ready for connection');
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Paper shadow='xs' radius='sm' p='md' bg={theme.colors.dark[6]} m='md' style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <StatusPanel peerId={peerId} nickname={nickname} setNickname={setNickname} status={receiveStatus} message={receiveMessage} remotePeerId={remotePeerId} remoteNickname={remoteNickname} />
      </Paper>

      <Paper shadow='xs' radius='md' p='md' bg={theme.colors.dark[6]} ml='md' mr='md'>
        {!remotePeerConnected ? (
          <ConnectPanel />
        ) : (
          <FilesTable data={fileData} />
        )}
      </Paper>
    </div>
  );
}
