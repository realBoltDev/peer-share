import { Socket } from "socket.io-client";
import { appStore } from "@/store/appStore";

export function registerConnectionHandler(socket: Socket) {
  const {
    setRemotePeerId,
    setRemoteNickname,
    setRemotePeerConnected,
    setSendStatus,
    setReceiveStatus,
    setSendMessage,
    setReceiveMessage,
    setConnectBtnLoading,
    setRequestModalOpened,
    setRequestModalPeer,
    setRequestModalNickname,
    initPeerConnection
  } = appStore.getState();

  socket.on('connection:requestSent', (message) => {
    setReceiveStatus('waiting');
    setReceiveMessage(message);
  });

  socket.on('connection:failed', (data) => {
    console.error('[Connection] Connection failed:', data);
    setReceiveStatus('failed');
    setReceiveMessage(data.message);
    setConnectBtnLoading(false);
  });

  socket.on('connection:incoming', (receiver) => {
    setRequestModalPeer(receiver.peerId);
    setRequestModalNickname(receiver.nickname);
    setRequestModalOpened(true);
  });

  socket.on('connection:accepted', (sender) => {
    setRemotePeerId(sender.peerId);
    setRemoteNickname(sender.nickname);
    setRemotePeerConnected(true);
    setReceiveStatus('connected');
    setReceiveMessage(`Connected to peer - ${sender.peerId}`);

    initPeerConnection();
  });
}
