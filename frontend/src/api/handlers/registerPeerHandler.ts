import { Socket } from 'socket.io-client';
import { appStore } from '@/store/appStore';

export function registerPeerHandler(socket: Socket) {
  const {
    remotePeerId,
    setPeer,
    setRemotePeerId,
    setRemoteNickname,
    setRemotePeerConnected,
    setSendStatus,
    setSendMessage,
    initPeerConnection
  } = appStore.getState();

  socket.on('registered', (data) => {
    setPeer(data.peerId, data.nickname);
  });

  socket.on('peer:nicknameUpdated', (data) => {
    setRemoteNickname(data.nickname);
  });

  socket.on('peer:connected', async (data) => {
    setRemotePeerId(data.peerId);
    setRemoteNickname(data.nickname);
    setRemotePeerConnected(true);
    setSendStatus('connected');
    setSendMessage(`Connected to peer - ${data.peerId}`);

    initPeerConnection();

    const pc = appStore.getState().pc!;

    const dataChannel = pc.createDataChannel('fileTransfer', {
      ordered: true,
    });

    dataChannel.onopen = () => {
      console.log('[DataChannel] Data channel opened (offerer)');
    };

    dataChannel.onclose = () => {
      console.log('[DataChannel] Data channel closed');
    };

    dataChannel.onerror = (error) => {
      console.error('[DataChannel] Error:', error);
    };

    appStore.getState().setDataChannel(dataChannel);

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit('offer', { receiver: { peerId: data.peerId }, offer: offer });
  });

  socket.on('offer', async (data) => {
    appStore.getState().processOffer(data.offer, data.sender.peerId);
  });

  socket.on('answer', async (data) => {
    appStore.getState().processAnswer(data.answer);
  });

  socket.on('ice-candidate', async (data) => {
    appStore.getState().processCandidate(data.candidate);
  });
}
