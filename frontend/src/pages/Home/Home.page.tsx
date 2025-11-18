import { useState, useEffect } from "react";
import { Paper, Text, useMantineTheme } from "@mantine/core";
import { StatusPanel } from "@/components/StatusPanel/StatusPanel";
import { FileUpload } from "@/components/FileUpload/FileUpload";
import { FilesTable } from "@/components/FilesTable/FilesTable";
import { IncomingRequestModal } from "@/components/IncomingRequestModal/IncomingRequestModal";
import { getFileSizeText } from "@/utils/format";
import { FileProps } from "@/types";
import { useAppStore } from "@/store/appStore";

export function HomePage() {
  const theme = useMantineTheme();

  const socket = useAppStore((s) => s.socket);
  const peerId = useAppStore((s) => s.peerId);
  const remotePeerId = useAppStore((s) => s.remotePeerId);
  const nickname = useAppStore((s) => s.nickname);
  const remoteNickname = useAppStore((s) => s.remoteNickname);
  const sendStatus = useAppStore((s) => s.sendStatus);
  const sendMessage = useAppStore((s) => s.sendMessage);
  const requestModalOpened = useAppStore((s) => s.requestModalOpened);
  const requestModalPeer = useAppStore((s) => s.requestModalPeer);
  const requestModalNickname = useAppStore((s) => s.requestModalNickname);
  const initSocketConn = useAppStore((s) => s.initSocketConn);
  const setMode = useAppStore((s) => s.setMode);
  const setNickname = useAppStore((s) => s.setNickname);
  const setSendStatus = useAppStore((s) => s.setSendStatus);
  const setSendMessage = useAppStore((s) => s.setSendMessage);
  const setRequestModalOpened = useAppStore((s) => s.setRequestModalOpened);

  const [dropDisabled, setDropDisabled] = useState(false);
  const [fileData, setFileData] = useState<FileProps>([]);

  function handleFilesAdd(files: File[]) {
    const newFiles = files.map(file => ({
      filename: file.name,
      size: getFileSizeText(file.size),
      speed: '—',
      progress: 0,
      status: 'Pending'
    }));
    setFileData(prev => [...newFiles, ...prev]);
  }

  const handleRequestAccept = (remotePeerId: string | null) => {
    setRequestModalOpened(false);
    socket?.emit('connection:accept', { sender: { peerId: peerId, nickname: nickname }, receiver: { peerId: remotePeerId }});
  };

  const handleRequestDecline = (remotePeerId: string | null) => {
    setRequestModalOpened(false);
    socket?.emit('connection:decline', { sender: { peerId: peerId, nickname: nickname }, receiver: { peerId: remotePeerId }});
  };

  useEffect(() => {
    initSocketConn();
    setMode('send');
    setSendStatus('idle');
    setSendMessage('Not connected');
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Paper shadow="xs" radius="sm" p="md" bg={theme.colors.dark[6]} m="md" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <StatusPanel peerId={peerId} nickname={nickname} setNickname={setNickname} status={sendStatus} message={sendMessage} remotePeerId={remotePeerId} remoteNickname={remoteNickname} />

        <FileUpload onFilesAdd={handleFilesAdd} dropDisabled={dropDisabled} />

        <FilesTable data={fileData} />
      </Paper>

      <IncomingRequestModal
        opened={requestModalOpened ?? false}
        onAccept={() => handleRequestAccept(requestModalPeer)}
        onDecline={() => handleRequestDecline(requestModalPeer)}
        peerId={requestModalPeer ?? ''}
        nickname={requestModalNickname ?? ''}
      />
    </div>
  );
}
