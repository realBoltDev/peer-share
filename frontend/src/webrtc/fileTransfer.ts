import { appStore } from "@/store/appStore";

const CHUNK = 16 * 1024;

export async function uploadFile(id: string, file: File, channel: RTCDataChannel) {
  const startTime = Date.now();

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

  const reader = file.stream().getReader();

  let sent = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    channel.bufferedAmountLowThreshold = CHUNK * 2;

    while (channel.bufferedAmount > CHUNK * 4) {
      await new Promise<void>((resolve) => {
        const handler = () => {
          channel.removeEventListener("bufferedamountlow", handler);
          resolve();
        };
        channel.addEventListener("bufferedamountlow", handler);
      });
    }

    channel.send(value);
    sent += value.byteLength;

    const elapsed = (Date.now() - startTime) / 1000;
    const speed = Math.max(0, Math.round(sent / elapsed));

    appStore.getState().updateTransfer(id, {
      progress: Math.round((sent / file.size) * 100),
      speed: speed
    });
  }

  channel.send(JSON.stringify({ type: 'done', id: id }));

  appStore.getState().updateTransfer(id, {
    progress: 100,
    status: 'Completed',
    speed: 0
  });
}
