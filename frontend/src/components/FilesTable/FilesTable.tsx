import { Paper, Group, Progress, Table, Text, Tooltip, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconUpload, IconDownload, IconCheck, IconX, IconLoader2 } from '@tabler/icons-react';
import { useAppStore } from '@/store/appStore';
import { getFile } from '@/db/fileStore';
import { triggerDownload } from '@/utils/download';
import { getFileSizeText } from '@/utils/format';
import { TransferItem } from '@/store/slices/transferSlice';
import { uploadFile } from '@/webrtc/fileTransfer';
import classes from './FilesTable.module.css';

export function FilesTable() {
  const theme = useMantineTheme();
  const peerRole = useAppStore((s) => s.peerRole);
  const transfers = useAppStore((s) => s.transfers);
  const dataChannel = useAppStore((s) => s.dataChannel);

  const handleUpload = async (t: TransferItem) => {
    if (!dataChannel) {
      alert("No peer connected.");
      return;
    }

    if (!t.fileObject) {
      alert("No file object available.");
      return;
    }

    await uploadFile(t.id, t.fileObject, dataChannel);
  }

  const handleDownload = async (t: TransferItem) => {
    const blob = await getFile(t.dbKey!);
    if (blob) triggerDownload(blob, t.name);
  }


  const rows = transfers.map((t) => {
    return (
      <Table.Tr key={t.name}>
        <Table.Td c="blue">
          <Tooltip label={t.name} withArrow>
            <Text size="sm" lineClamp={1}
              style={{
                maxWidth: 180,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {t.name}
            </Text>
          </Tooltip>
        </Table.Td>

        <Table.Td>
          {getFileSizeText(t.size)}
        </Table.Td>

        <Table.Td style={{ width: 120, minWidth: 120 }}>
          <Text style={{ fontVariantNumeric: 'tabular-nums' }}>
            {t.speed > 0 ? `${getFileSizeText(t.speed)}/s` : "-"}
          </Text>
        </Table.Td>

        <Table.Td>
          <Group justify="flex-start">
            <Text fz="xs" c="blue" fw={700}>
              {t.progress}%
            </Text>
          </Group>
          <Progress value={t.progress} animated={t.status === 'Uploading' ? true : false} />
        </Table.Td>

        <Table.Td>
          {t.status}
        </Table.Td>

        <Table.Td>
          {t.status === 'Pending' ?
            (peerRole === 'Sender' ? (
              <ActionIcon
                color="blue"
                onClick={() => handleUpload(t)}
              >
                <IconUpload size={15} stroke={1.8} />
              </ActionIcon>
            ) : null)
            :
            (t.status === 'Uploading' || t.status === 'Downloading') ?
              <ActionIcon color='blue' style={{ pointerEvents: 'none' }}>
                <IconLoader2 className={classes.spin} size={15} stroke={1.8} />
              </ActionIcon>
              :
              t.status === 'Completed' ?
                (peerRole === 'Sender' ? (
                  <ActionIcon
                    color="green"
                    style={{ pointerEvents: 'none' }}
                  >
                    <IconCheck size={15} stroke={1.8} />
                  </ActionIcon>
                )
                  : (
                    <ActionIcon
                      color="green"
                      onClick={() => handleDownload(t)}
                    >
                      <IconDownload size={15} stroke={1.8} />
                    </ActionIcon>
                  )
                )
                :
                <ActionIcon color='red' style={{ pointerEvents: 'none' }}>
                  <IconX size={15} stroke={1.8} />
                </ActionIcon>}
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Paper shadow="xs" radius="sm" p="md" bg={theme.colors.dark[5]} mt="md" style={{ flex: 1 }}>
      <Table.ScrollContainer minWidth={800}>
        <Table striped verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>File</Table.Th>
              <Table.Th>Size</Table.Th>
              <Table.Th style={{ width: 120, minWidth: 120 }}>Speed</Table.Th>
              <Table.Th>Progress</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  );
}
