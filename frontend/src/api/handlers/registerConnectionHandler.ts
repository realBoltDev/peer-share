import { Socket } from "socket.io-client";
import { appStore } from "@/store/appStore";

export function registerConnectionHandler(socket: Socket) {
  const {
    remotePeerId,
    setRemotePeerId,
    setRemoteNickname,
    setRemotePeerConnected,
    setSendStatus,
    setReceiveStatus,
    setConnectBtnLoading,
    setRequestModalOpened,
    setRequestModalPeer,
    setRequestModalNickname
  } = appStore.getState();

  socket.on('connection:requestSent', ({ message }) => {
    setReceiveStatus('waiting', message);
  });

  socket.on('connection:failed', ({ message, mode }) => {
    if (mode === 'send') {
      setSendStatus('failed', message);
    } else {
      setReceiveStatus('failed', message);
      setConnectBtnLoading(false);
    }
  });

  socket.on('connection:incoming', ({ from }) => {
    setRequestModalPeer(from.peerId);
    setRequestModalNickname(from.nickname);
    setRequestModalOpened(true);
  });

  socket.on('connection:accepted', ({ from }) => {
    setRemotePeerId(from.peerId);
    setRemoteNickname(from.nickname);
    setRemotePeerConnected(true);

    setReceiveStatus('connected', `Connected to peer - ${from.peerId}`);
  });
}
