import { useState } from "react";
import { Group, Text, TextInput, ActionIcon, Paper, useMantineTheme } from '@mantine/core';
import { IconEdit, IconCheck } from "@tabler/icons-react";
import { ClientInfoProps } from "@/types/statusPanel";
import { useAppStore } from "@/store/appStore";

export function ClientInfo({ peerId, nickname, setNickname }: ClientInfoProps) {
  const theme = useMantineTheme();
  const socket = useAppStore((s) => s.socket);

  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(nickname);

  const handleEdit = () => {
    setTempName(nickname);
    setEditing(true);
  };

  const handleSave = () => {
    const newNickname = tempName?.trim() || nickname;

    setNickname(newNickname);
    setEditing(false);

    socket?.emit('update:nickname', newNickname);
  };

  return (
    <Paper p="sm" radius="md" bg={theme.colors.dark[5]} style={{ height: '100%' }}>
      <Group justify="flex-start" mb={4}>
        <Text size="sm" c="gray.4">
          Your Peer ID:
        </Text>
        <Text size="sm" c="white">
          {peerId}
        </Text>
      </Group>

      <Group gap="xs">
        <Text size="sm" c="gray.4">
          Nickname:
        </Text>
        {editing ? (
          <>
            <TextInput size="xs" value={tempName ?? ''} autoFocus
              onChange={(e) => setTempName(e.currentTarget.value)}
              styles={{
                input: { backgroundColor: "#2a2a2a", color: "white", borderColor: "#444" },
              }}
            />
            <ActionIcon size="sm" color="green" variant="light" onClick={handleSave}>
              <IconCheck size={14} />
            </ActionIcon>
          </>
        ) : (
          <>
            <Text size="sm" fw={500} c="white">
              {nickname}
            </Text>
            <ActionIcon size="sm" variant="subtle" color="gray"
              onClick={handleEdit}
            >
              <IconEdit size={14} />
            </ActionIcon>
          </>
        )}
      </Group>
    </Paper>
  )
}
