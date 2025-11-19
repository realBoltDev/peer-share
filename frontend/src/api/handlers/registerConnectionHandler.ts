import { Socket } from "socket.io-client";
import { appStore } from "@/store/appStore";
import { sleep } from "@/utils/common";

export function registerConnectionHandler(socket: Socket) {
  const {
    setPeerRole,
    setRemotePeerId,
    setRemoteNickname,
    setRemotePeerConnected,
    setConnStatus,
    setConnMessage,
    setConnectBtnLoading,
    initPeerConnection
  } = appStore.getState();

  //////////////// Receiver Events //////////////////

  socket.on('receiver:requestSent', (message) => {
    setConnStatus('waiting');
    setConnMessage(message);
  });

  socket.on('receiver:connectionFailed', async (data) => {
    console.error('[Connection] Connection failed:', data);
    setConnStatus('failed');
    setConnMessage(data.message);

    await sleep(2000);

    setConnStatus('idle');
    setConnMessage('Ready for connection');

    setConnectBtnLoading(false);
  });

  socket.on('receiver:requestAccepted', (sender) => {
    setPeerRole('Receiver');
    setRemotePeerId(sender.peerId);
    setRemoteNickname(sender.nickname);
    initPeerConnection();
  });

  socket.on('receiver:requestDeclined', async (sender) => {
    setRemotePeerId(sender.peerId);
    setRemoteNickname(sender.nickname);
    setRemotePeerConnected(false);
    setConnStatus('failed');
    setConnMessage(`Connection request declined by peer`);

    await sleep(2000);

    setConnStatus('idle');
    setConnMessage('Ready for connection');
    setConnectBtnLoading(false);
  });
}
