import { Paper, Text, useMantineTheme } from "@mantine/core";
import { StatusPanel } from "@/components/StatusPanel/StatusPanel";
import { FileUpload } from "@/components/FileUpload/FileUpload";
import { FilesTable } from "@/components/FilesTable/FilesTable";
import { IncomingRequestModal } from "@/components/IncomingRequestModal/IncomingRequestModal";
import { useAppStore } from "@/store/appStore";

export function HomePage() {
  const theme = useMantineTheme();

  const socket = useAppStore((s) => s.socket);
  const peerId = useAppStore((s) => s.peerId);
  const remotePeerId = useAppStore((s) => s.remotePeerId);
  const nickname = useAppStore((s) => s.nickname);
  const remoteNickname = useAppStore((s) => s.remoteNickname);
  const connStatus = useAppStore((s) => s.connStatus);
  const connMessage = useAppStore((s) => s.connMessage);
  const requestModalOpened = useAppStore((s) => s.requestModalOpened);
  const requestModalPeer = useAppStore((s) => s.requestModalPeer);
  const requestModalNickname = useAppStore((s) => s.requestModalNickname);
  const setNickname = useAppStore((s) => s.setNickname);
  const setRequestModalOpened = useAppStore((s) => s.setRequestModalOpened);
  const addTransfer = useAppStore((s) => s.addTransfer);

  function handleFilesAdd(files: File[]) {
    files.forEach((file) => {
      const id = crypto.randomUUID();

      addTransfer({
        id: id,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        speed: 0,
        status: "Pending",
        fileObject: file
      });
    });
  }

  const handleRequestAccept = (remotePeerId: string | null) => {
    setRequestModalOpened(false);
    socket?.emit('server:requestAccept', { sender: { peerId: peerId, nickname: nickname }, receiver: { peerId: remotePeerId } });
  };

  const handleRequestDecline = (remotePeerId: string | null) => {
    setRequestModalOpened(false);
    socket?.emit('server:requestDecline', { sender: { peerId: peerId, nickname: nickname }, receiver: { peerId: remotePeerId } });
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Paper shadow="xs" radius="sm" p="md" bg={theme.colors.dark[6]} m="md" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <StatusPanel peerId={peerId} nickname={nickname} setNickname={setNickname} status={connStatus} message={connMessage} remotePeerId={remotePeerId} remoteNickname={remoteNickname} />

        <FileUpload onFilesAdd={handleFilesAdd} />

        <FilesTable />
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
