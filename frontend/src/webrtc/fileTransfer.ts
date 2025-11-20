import { appStore } from "@/store/appStore";

const CHUNK_SIZE = 32768; // 32KB

export async function uploadFile(id: string, file: File, channel: RTCDataChannel) {
  if (channel.readyState !== 'open') {
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Channel did not open in time'));
      }, 5000);

      channel.onopen = () => {
        clearTimeout(timeout);
        resolve();
      };

      channel.onerror = (error) => {
        clearTimeout(timeout);
        reject(error);
      };
    });
  }

  let lastUpdate = Date.now();
  let lastSent = 0;

  appStore.getState().updateTransfer(id, {
    status: 'Uploading'
  });

  channel.send(JSON.stringify({
    type: 'metadata',
    id: id,
    fileInfo: {
      name: file.name,
      size: file.size,
      type: file.type
    }
  }));

  let sent = 0;
  let offset = 0;
  const maxBufferSize = 2 * 1024 * 1024; // 2MB
  const lowThreshold = 512 * 1024; // 512KB

  channel.bufferedAmountLowThreshold = lowThreshold;

  while (offset < file.size) {
    if (channel.readyState !== 'open') {
      appStore.getState().updateTransfer(id, {
        status: 'Failed',
        speed: 0
      });
      return;
    }

    while (channel.bufferedAmount > maxBufferSize) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    const chunk = file.slice(offset, Math.min(offset + CHUNK_SIZE, file.size));
    const arrayBuffer = await chunk.arrayBuffer();

    // Message with ID prefix for binary chunk
    // Format: [byte: 0xFF][id length: 1 byte][id string][chunk data]
    const idBytes = new TextEncoder().encode(id);
    const message = new Uint8Array(2 + idBytes.length + arrayBuffer.byteLength);
    message[0] = 0xFF;
    message[1] = idBytes.length;
    message.set(idBytes, 2);
    message.set(new Uint8Array(arrayBuffer), 2 + idBytes.length);

    channel.send(message.buffer);

    sent += arrayBuffer.byteLength;
    offset += arrayBuffer.byteLength;

    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdate;
    const progress = Math.round((sent / file.size) * 100);

    if (timeSinceLastUpdate >= 1000) {
      const bytesSinceLastUpdate = sent - lastSent;
      const speed = Math.round((bytesSinceLastUpdate / timeSinceLastUpdate) * 1000);

      appStore.getState().updateTransfer(id, {
        progress,
        speed: Math.max(0, speed)
      });

      lastUpdate = now;
      lastSent = sent;
    } else {
      appStore.getState().updateTransfer(id, {
        progress
      });
    }
  }

  channel.send(JSON.stringify({ type: 'done', id: id }));

  appStore.getState().updateTransfer(id, {
    progress: 100,
    status: 'Completed',
    speed: 0
  });
}
