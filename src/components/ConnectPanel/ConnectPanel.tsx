import { useState } from "react";
import { Text, TextInput, Button, Group } from "@mantine/core";
import { IconPlugConnected } from "@tabler/icons-react";
import { FilesTable } from "../FilesTable/FilesTable";
import { FileProps } from "@/types";

export function ConnectPanel() {
  const [peerId, setPeerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [fileData, setFileData] = useState<FileProps>([]);

  return (
    <>
      {!connected ? (
        <>
          <Text size='lg' fw={700} c='white' ta='left' mb='xs'>
            Connect to Peer
          </Text>

          <TextInput
            disabled={loading}
            onChange={(e) => setPeerId(e.currentTarget.value)}
            label='Peer ID'
            placeholder="Enter sender's Peer ID"
            style={{ maxWidth: 500, width: '100%' }}
            mb='sm'
          />

          <Group justify='flex-start' mt='md'>
            <Button loading={loading} loaderProps={{ type: 'dots' }} disabled={!peerId.trim()} leftSection={<IconPlugConnected size={15} />} color='blue'>
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
