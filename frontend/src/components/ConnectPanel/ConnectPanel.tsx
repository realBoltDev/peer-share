import { useState, useEffect } from "react";
import { Text, TextInput, Button, Group } from "@mantine/core";
import { IconPlugConnected } from "@tabler/icons-react";
import { FilesTable } from "../FilesTable/FilesTable";
import { FileProps } from "@/types";
import { usePeerStore } from "@/store/peerStore";
import { useConnectionStore } from "@/store/connectionStore";
import { useConnectStore } from "@/store/connectStore";
import { sleep } from "@/utils/common";

export function ConnectPanel() {
  const [inputPeerId, setInputPeerId] = useState('');
  const [fileData, setFileData] = useState<FileProps>([]);

  const { peerId, nickname, socket } = usePeerStore();
  const { setReceiveStatus } = useConnectionStore();
  const { loading, setLoading, connected, setConnected } = useConnectStore();

  const handleConnect = async () => {
    setLoading(true);
    setReceiveStatus('waiting', `Sending connection request to peer - ${inputPeerId.trim().toUpperCase()}`);
    await sleep(1500);
    socket?.emit('connection:request', { from: { peerId: peerId, nickname: nickname }, to: inputPeerId });
  };

  useEffect(() => {
    setLoading(false);
    setConnected(false);
  }, []);

  return (
    <>
      {!connected ? (
        <>
          <Text size='lg' fw={700} c='white' ta='left' mb='xs'>
            Connect to Peer
          </Text>

          <TextInput
            disabled={loading}
            onChange={(e) => setInputPeerId(e.currentTarget.value)}
            label='Peer ID'
            placeholder="Enter sender's Peer ID"
            style={{ maxWidth: 500, width: '100%' }}
            mb='sm'
          />

          <Group justify='flex-start' mt='md'>
            <Button onClick={handleConnect} loading={loading} loaderProps={{ type: 'dots' }} disabled={!inputPeerId.trim()} leftSection={<IconPlugConnected size={15} />} color='blue'>
              Connect
            </Button>
          </Group>
        </>
      ) : (
        <FilesTable data={fileData} />
      )}
    </>
  );
}
