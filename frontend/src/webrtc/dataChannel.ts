import { appStore } from "@/store/appStore";
import { saveFileToDB } from "@/db/fileStore";

interface FileInfoProps {
  name: string;
  size: number;
  type: string;
}

export function setupReceiverChannel(channel: RTCDataChannel) {
  let chunks: Uint8Array[] = [];
  let fileInfo: FileInfoProps | null = null;
  let id = '';
  let received = 0;
  let startTime = 0;

  channel.onmessage = async (event) => {
    if (typeof event.data === 'string') {
      const message = JSON.parse(event.data);

      if (message.type === 'metadata') {
        id = message.id;
        fileInfo = message.fileInfo;
        chunks = [];
        received = 0;
        startTime = Date.now();

        appStore.getState().addTransfer({
          id: id,
          name: fileInfo!.name,
          size: fileInfo!.size,
          type: fileInfo!.type,
          progress: 0,
          speed: 0,
          status: 'Downloading'
        });

        return;
      }

      if (message.type === 'done') {
        const blob = new Blob(chunks as BlobPart[], { type: fileInfo!.type });
        const key = `${fileInfo!.name}-${Date.now()}`;

        await saveFileToDB(key, blob);

        appStore.getState().updateTransfer(id, {
          progress: 100,
          status: 'Completed',
          speed: 0,
          dbKey: key
        });

        return;
      }

      return;
    }

    chunks.push(event.data);
    received += event.data.byteLength;

    const elapsed = (Date.now() - startTime) / 1000;
    const speed = Math.max(0, Math.round(received / elapsed));

    appStore.getState().updateTransfer(id, {
      progress: Math.round((received / fileInfo!.size) * 100),
      speed
    });
  };
}
