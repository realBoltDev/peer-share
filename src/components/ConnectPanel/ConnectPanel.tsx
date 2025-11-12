import { Text, TextInput, Button, Group } from "@mantine/core";
import { IconPlugConnected } from "@tabler/icons-react";

export function ConnectPanel() {
  return (
    <>
      <Text size='lg' fw={700} c='white' ta='left' mb='xs'>
        Connect to Peer
      </Text>

      <TextInput
        label='Peer ID'
        placeholder="Enter sender's Peer ID"
        required
        style={{ maxWidth: 500, width: '100%' }}
        mb='sm'
      />

      <Group justify='flex-start' mt='md'>
        <Button leftSection={<IconPlugConnected size={15} />} color='blue'>
          Connect
        </Button>
      </Group>
    </>
  )
}
