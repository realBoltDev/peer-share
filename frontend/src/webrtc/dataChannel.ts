import { appStore } from "@/store/appStore";
import { saveChunk, assembleFile } from "@/db/fileStore";

interface FileInfoProps {
  name: string;
  size: number;
  type: string;
}

interface TransferState {
  chunkIndex: number;
  fileInfo: FileInfoProps;
  received: number;
  startTime: number;
  lastUpdate: number;
  lastReceived: number;
  pendingChunks: Map<number, Uint8Array>;
  saveQueue: Promise<void>;
}

export function setupReceiverChannel(channel: RTCDataChannel) {
  const transfers = new Map<string, TransferState>();

  channel.binaryType = 'arraybuffer';

  channel.onerror = (error) => {
    console.error('[DataChannel] Error:', error);
  };

  channel.onclose = () => {
    console.log('[DataChannel] Closed');
  };

  channel.onopen = () => {
    console.log('[Receiver] Data channel opened');
  };

  channel.onmessage = async (event) => {
    if (typeof event.data === 'string') {
      const message = JSON.parse(event.data);

      if (message.type === 'metadata') {
        const id = message.id;
        const fileInfo = message.fileInfo;

        transfers.set(id, {
          chunkIndex: 0,
          fileInfo: fileInfo,
          received: 0,
          startTime: Date.now(),
          lastUpdate: Date.now(),
          lastReceived: 0,
          pendingChunks: new Map(),
          saveQueue: Promise.resolve()
        });

        appStore.getState().addTransfer({
          id: id,
          name: fileInfo.name,
          size: fileInfo.size,
          type: fileInfo.type,
          progress: 0,
          speed: 0,
          status: 'Downloading'
        });

        return;
      }

      if (message.type === 'done') {
        const id = message.id;
        const transfer = transfers.get(id);

        if (!transfer) {
          console.error('[Receiver] Transfer not found for done message:', id);
          return;
        }

        if (transfer.pendingChunks.size > 0) {
          console.log('[Receiver] Flushing', transfer.pendingChunks.size, 'pending chunks');
          for (const [idx, chunk] of transfer.pendingChunks) {
            await saveChunk(id, idx, chunk);
          }
          transfer.pendingChunks.clear();
        }

        await transfer.saveQueue;

        const key = await assembleFile(id, transfer.chunkIndex, transfer.fileInfo.type);

        appStore.getState().updateTransfer(id, {
          progress: 100,
          status: 'Completed',
          speed: 0,
          dbKey: key
        });

        transfers.delete(id);
        return;
      }

      return;
    }

    const data = new Uint8Array(event.data);

    if (data[0] === 0xFF) {
      const idLength = data[1];
      const idBytes = data.slice(2, 2 + idLength);
      const id = new TextDecoder().decode(idBytes);
      const chunkData = data.slice(2 + idLength);

      const transfer = transfers.get(id);

        if (!transfer) {
          console.error('[Receiver] Transfer not found for chunk:', id);
          return;
        }

        if (transfer.received >= transfer.fileInfo.size) {
          console.warn('[Receiver] Received extra chunk for completed transfer', id);
          return;
        }

      transfer.pendingChunks.set(transfer.chunkIndex, chunkData);
      transfer.chunkIndex++;
      transfer.received += chunkData.byteLength;

      // Flush to IndexedDB every 10 chunks (it is non-blocking)
      if (transfer.pendingChunks.size >= 10) {
        const chunksToSave = new Map(transfer.pendingChunks);
        transfer.pendingChunks.clear();

        transfer.saveQueue = transfer.saveQueue.then(async () => {
          for (const [idx, chunk] of chunksToSave) {
            await saveChunk(id, idx, chunk);
          }
        });
      }

      const now = Date.now();
      const timeSinceLastUpdate = now - transfer.lastUpdate;
      const progress = Math.round((transfer.received / transfer.fileInfo.size) * 100);

      if (timeSinceLastUpdate >= 1000) {
        const bytesSinceLastUpdate = transfer.received - transfer.lastReceived;
        const speed = Math.round((bytesSinceLastUpdate / timeSinceLastUpdate) * 1000);

        appStore.getState().updateTransfer(id, {
          progress,
          speed: Math.max(0, speed)
        });

        transfer.lastUpdate = now;
        transfer.lastReceived = transfer.received;
      } else {
        appStore.getState().updateTransfer(id, {
          progress
        });
      }
    }
  };
}
