import { useState, useEffect } from "react";
import { Paper, Text, useMantineTheme } from "@mantine/core";
import { StatusPanel } from "@/components/StatusPanel/StatusPanel";
import { FileUpload } from "@/components/FileUpload/FileUpload";
import { FilesTable } from "@/components/FilesTable/FilesTable";
import { IncomingRequestModal } from "@/components/IncomingRequestModal/IncomingRequestModal";
import { getFileSizeText } from "@/utils/format";
import { FileProps } from "@/types";
import { usePeerStore } from "@/store/peerStore";

export function HomePage() {
  const theme = useMantineTheme();

  const { initSocketConn, peerId, nickname, setNickname, remotePeerId, remoteNickname } = usePeerStore();
  const [status, setStatus] = useState('waiting');
  const [dropDisabled, setDropDisabled] = useState(false);
  const [fileData, setFileData] = useState<FileProps>([]);
  const [requestModalOpened, setRequestModalOpened] = useState(false);

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

  const handleRequestAccept = () => {
    setRequestModalOpened(false);
  };

  const handleRequestDecline = () => {
    setRequestModalOpened(false);
  };

  useEffect(() => {
    initSocketConn();
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Paper shadow="xs" radius="sm" p="md" bg={theme.colors.dark[6]} m="md" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <StatusPanel status={status} peerId={peerId} nickname={nickname} setNickname={setNickname} remotePeerId={remotePeerId} remoteNickname={remoteNickname} />

        <FileUpload onFilesAdd={handleFilesAdd} dropDisabled={dropDisabled} />

        <FilesTable data={fileData} />
      </Paper>

      <IncomingRequestModal
        opened={requestModalOpened}
        onAccept={handleRequestAccept}
        onDecline={handleRequestDecline}
        peerId="XYZ123"
        nickname="NitrO"
      />
    </div>
  );
}
