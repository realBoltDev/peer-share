import { Socket } from 'socket.io-client';
import { usePeerStore } from '@/store/peerStore';

export function registerPeerHandler(socket: Socket) {
  const { setPeer, setRemoteNickname } = usePeerStore.getState();

  socket.on('registered', ({ peerId, nickname }) => {
    setPeer(peerId, nickname);
  });

  socket.on('update:remoteNickname', ({ remoteNickname }) => {
    setRemoteNickname(remoteNickname);
  });
}
