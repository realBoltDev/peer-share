import { Paper, Group, Progress, Table, Text, Tooltip, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconUpload, IconCheck, IconX, IconLoader2 } from '@tabler/icons-react';
import { FileProps } from '@/types';
import classes from './FilesTable.module.css';

export function FilesTable({ data }: { data: FileProps }) {
  const theme = useMantineTheme();

  const rows = data.map((row) => {
    return (
      <Table.Tr key={row.filename}>
        <Table.Td c="blue">
          <Tooltip label={row.filename} withArrow>
            <Text size="sm" lineClamp={1}
              style={{
                maxWidth: 180,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {row.filename}
            </Text>
          </Tooltip>
        </Table.Td>

        <Table.Td>{row.size}</Table.Td>

        <Table.Td>
          {row.speed}
        </Table.Td>

        <Table.Td>
          <Group justify="flex-start">
            <Text fz="xs" c="blue" fw={700}>
              {row.progress}%
            </Text>
          </Group>
          <Progress value={row.progress} animated={row.status === 'Uploading' ? true : false} />
        </Table.Td>

        <Table.Td>
          {row.status}
        </Table.Td>
        <Table.Td>
          {row.status === 'Pending' ?
            <ActionIcon color='blue'>
              <IconUpload size={15} stroke={1.8} />
            </ActionIcon>
            :
            row.status === 'Uploading' ?
              <ActionIcon color='blue' style={{ pointerEvents: 'none' }}>
                <IconLoader2 className={classes.spin} size={15} stroke={1.8} />
              </ActionIcon>
              :
              row.status === 'Completed' ?
                <ActionIcon color='green' style={{ pointerEvents: 'none' }}>
                  <IconCheck size={15} stroke={1.8} />
                </ActionIcon>
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
              <Table.Th>Filename</Table.Th>
              <Table.Th>Size</Table.Th>
              <Table.Th>Speed</Table.Th>
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
