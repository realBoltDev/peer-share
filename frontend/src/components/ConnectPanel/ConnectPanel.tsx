import { useState } from "react";
import { Text, TextInput, Button, Group } from "@mantine/core";
import { IconPlugConnected } from "@tabler/icons-react";
import { FilesTable } from "../FilesTable/FilesTable";
import { FileProps } from "@/types";

export function ConnectPanel() {
  const [inputPeerId, setInputPeerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [fileData, setFileData] = useState<FileProps>([]);

  const handleConnect = () => {
    setLoading(true);
    console.log('connect clicked');
  };

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
