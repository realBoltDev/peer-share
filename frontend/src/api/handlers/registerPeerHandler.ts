import { Socket } from 'socket.io-client';
import { appStore } from '@/store/appStore';

export function registerPeerHandler(socket: Socket) {
  const { setPeer, setRemoteNickname } = appStore.getState();

  socket.on('registered', ({ peerId, nickname }) => {
    setPeer(peerId, nickname);
  });

  socket.on('update:remoteNickname', ({ remoteNickname }) => {
    setRemoteNickname(remoteNickname);
  });
}
