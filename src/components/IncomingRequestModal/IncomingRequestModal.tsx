import { Modal, Text, Group, Button } from '@mantine/core';
import { IncomingRequestModalProps } from '@/types/request';

export function IncomingRequestModal({ opened, onAccept, onDecline, peerId, nickname }: IncomingRequestModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={() => { }}
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 2
      }}
      centered
      radius="md"
      size="sm"
      padding="lg"
    >
      <Text size="lg" fw={600} ta="center" mb="sm">
        Incoming Connection Request
      </Text>

      <Text ta="center" mb="md" c="dimmed">
        Peer <b>{peerId}</b> ({nickname}) wants to connect with you.
      </Text>

      <Group justify="center" mt="md">
        <Button color="green" onClick={onAccept}>
          Accept
        </Button>
        <Button color="red" onClick={onDecline}>
          Decline
        </Button>
      </Group>
    </Modal>
  );
}
