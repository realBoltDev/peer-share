import { useState, useEffect } from "react";
import { Text, TextInput, Button, Group } from "@mantine/core";
import { IconPlugConnected } from "@tabler/icons-react";
import { useAppStore } from "@/store/appStore";
import { sleep } from "@/utils/common";

export function ConnectPanel() {
  const [inputPeerId, setInputPeerId] = useState('');

  const socket = useAppStore((s) => s.socket);
  const peerId = useAppStore((s) => s.peerId);
  const nickname = useAppStore((s) => s.nickname);
  const connectBtnLoading = useAppStore((s) => s.connectBtnLoading);
  const setConnectBtnLoading = useAppStore((s) => s.setConnectBtnLoading);
  const setRemotePeerConnected = useAppStore((s) => s.setRemotePeerConnected);
  const setConnStatus = useAppStore((s) => s.setConnStatus);
  const setConnMessage = useAppStore((s) => s.setConnMessage);

  const handleConnect = async () => {
    setConnectBtnLoading(true);
    setConnStatus('waiting');

    const targetPeerId = inputPeerId.trim().toUpperCase();
    setConnMessage(`Sending connection request to peer`);

    await sleep(1500);
    socket?.emit('server:connectionRequest', { sender: { peerId: targetPeerId }, receiver: { peerId: peerId, nickname: nickname } });
  };

  useEffect(() => {
    setConnectBtnLoading(false);
    setRemotePeerConnected(false);
  }, []);

  return (
    <>
      <Text size='lg' fw={700} c='white' ta='left' mb='xs'>
        Connect to Peer
      </Text>

      <TextInput
        disabled={connectBtnLoading}
        value={inputPeerId}
        onChange={(e) => setInputPeerId(e.currentTarget.value.toUpperCase())}
        label='Peer ID'
        placeholder="Enter sender's Peer ID"
        style={{ maxWidth: 500, width: '100%', textTransform: 'uppercase' }}
        mb='sm'
      />

      <Group justify='flex-start' mt='md'>
        <Button onClick={handleConnect} loading={connectBtnLoading} loaderProps={{ type: 'dots' }} disabled={!inputPeerId.trim()} leftSection={<IconPlugConnected size={15} />} color='blue'>
          Connect
        </Button>
      </Group>
    </>
  );
}
