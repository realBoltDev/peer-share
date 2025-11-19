import { Group, Text } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { Dropzone } from '@mantine/dropzone';
import { FileUploadProps } from '@/types';
import { useAppStore } from '@/store/appStore';
import classes from './FileUpload.module.css';

export function FileUpload({ onFilesAdd }: FileUploadProps) {
  const peerRole = useAppStore((s) => s.peerRole);
  const connStatus = useAppStore((s) => s.connStatus);

  return (
    <Dropzone
      className={`${classes.dropzone} ${(peerRole === 'Sender' && connStatus === 'connected') ? classes.enabled : classes.disabled}`}
      disabled={(peerRole === 'Sender' && connStatus === 'connected') ? false : true}
      onDrop={(files) => onFilesAdd(files)}
      style={{ marginTop: 'var(--mantine-spacing-md)' }}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload size={52} color="var(--mantine-color-green-5)" stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Idle>
          <IconUpload size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            {(peerRole === 'Sender' && connStatus === 'connected') ?
              'Drag files here or click to select files' :
              'Please connect to a peer first'
            }
          </Text>
          {(peerRole === 'Sender' && connStatus === 'connected') && (
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file will be sent to other peer
            </Text>
          )}
        </div>
      </Group>
    </Dropzone>
  );
}
