import { useEffect, useState } from 'react';
import { Paper, Text, useMantineTheme } from '@mantine/core';
import { StatusPanel } from '@/components/StatusPanel/StatusPanel';
import { FilesTable } from '@/components/FilesTable/FilesTable';
import { ConnectPanel } from '@/components/ConnectPanel/ConnectPanel';
import { getFileSizeText } from '@/utils/format';
import { usePeerStore } from '@/store/peerStore';
import { useConnectionStore } from '@/store/connectionStore';

export function ConnectPage() {
  const theme = useMantineTheme();

  const { initSocketConn, peerId, nickname, setNickname, remotePeerId, remoteNickname } = usePeerStore();
  const { receiveMessage, receiveStatus, setReceiveStatus, setMode } = useConnectionStore();

  useEffect(() => {
    initSocketConn();
    setMode('receive');
    setReceiveStatus('idle', 'Ready for connection');
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Paper shadow='xs' radius='sm' p='md' bg={theme.colors.dark[6]} m='md' style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <StatusPanel peerId={peerId} nickname={nickname} setNickname={setNickname} status={receiveStatus} message={receiveMessage} remotePeerId={remotePeerId} remoteNickname={remoteNickname} />
      </Paper>

      <Paper shadow='xs' radius='md' p='md' bg={theme.colors.dark[6]} ml='md' mr='md'>
        <ConnectPanel />
      </Paper>
    </div>
  );
}
