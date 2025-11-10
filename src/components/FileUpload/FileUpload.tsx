import { Group, Text } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import classes from './FileUpload.module.css';

export function FileUpload({ dropDisabled }: { dropDisabled: boolean }) {
  return (
    <Dropzone
      className={`${classes.dropzone} ${dropDisabled ? classes.disabled : classes.enabled}`}
      disabled={dropDisabled}
      onDrop={(files) => console.log('accepted files', files)}
      accept={IMAGE_MIME_TYPE}
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
            {dropDisabled ?
              'Please connect to a peer first' :
              'Drag files here or click to select files'
            }
          </Text>
          {!dropDisabled && (
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file will be sent to other peer
            </Text>
          )}
        </div>
      </Group>
    </Dropzone>
  );
}
