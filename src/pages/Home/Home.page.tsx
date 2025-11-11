import { useState } from "react";
import { Paper, Text, useMantineTheme } from "@mantine/core";
import { StatusPanel } from "@/components/StatusPanel/StatusPanel";
import { FileUpload } from "@/components/FileUpload/FileUpload";
import { FilesTable } from "@/components/FilesTable/FilesTable";
import { getFileSizeText } from "@/utils/format";
import { FileProps } from "@/types";
import classes from './Home.module.css';

export function HomePage() {
  const theme = useMantineTheme();

  const [nickname, setNickname] = useState("BOLT");
  const [peerId, setPeerId] = useState('ABC123');
  const [status, setStatus] = useState('waiting');
  const [dropDisabled, setDropDisabled] = useState(false);
  const [fileData, setFileData] = useState<FileProps>([]);

  function handleFilesAdd(files: File[]) {
    const newFiles = files.map(file => ({
      filename: file.name,
      size: getFileSizeText(file.size),
      speed: '—',
      progress: 0,
      status: 'Pending'
    }));
    setFileData(prev => [...newFiles, ...prev]);
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Paper shadow="xs" radius="sm" p="md" bg={theme.colors.dark[6]} mt="md" ml="md" mr="md">
        <Text size="25px" c="white" ta="center">
          Fast, Private, Peer-to-Peer file sharing.
        </Text>
      </Paper>

      <Paper shadow="xs" radius="sm" p="md" bg={theme.colors.dark[6]} m="md" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <StatusPanel status={status} peerId={peerId} nickname={nickname} setNickname={setNickname} />

        <FileUpload onFilesAdd={handleFilesAdd} dropDisabled={dropDisabled} />

        <Paper shadow="xs" radius="sm" p="md" bg={theme.colors.dark[5]} mt="md" style={{ flex: 1 }}>
          <FilesTable data={fileData} />
        </Paper>
      </Paper>
    </div>
  );
}
