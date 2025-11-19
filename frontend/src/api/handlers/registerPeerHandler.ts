import { Socket } from 'socket.io-client';
import { appStore } from '@/store/appStore';

export function registerPeerHandler(socket: Socket) {
  const {
    setPeerRole,
    setPeer,
    setRemotePeerId,
    setRemoteNickname,
    initPeerConnection,
    setRequestModalPeer,
    setRequestModalNickname,
    setRequestModalOpened,
    setDataChannel
  } = appStore.getState();

  socket.on('registered', (data) => {
    setPeer(data.peerId, data.nickname);
  });

  /////////////// Sender Events ////////////////

  socket.on('sender:nicknameUpdated', (data) => {
    setRemoteNickname(data.nickname);
  });

  socket.on('sender:requestIncoming', (receiver) => {
    setRequestModalPeer(receiver.peerId);
    setRequestModalNickname(receiver.nickname);
    setRequestModalOpened(true);
  });

  socket.on('sender:connected', async (data) => {
    setPeerRole('Sender');
    setRemotePeerId(data.peerId);
    setRemoteNickname(data.nickname);
    initPeerConnection();

    const pc = appStore.getState().pc!;
    const dataChannel = pc.createDataChannel('fileTransfer', { ordered: true });
    setupSenderDCHandlers(dataChannel, setDataChannel);

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


function setupSenderDCHandlers(dataChannel: RTCDataChannel, setDataChannel: (dataChannel: RTCDataChannel) => void) {
  dataChannel.onopen = () => {
    console.log('[DataChannel] Data channel opened (offerer)');
  };

  dataChannel.onclose = () => {
    console.log('[DataChannel] Data channel closed');
  };

  dataChannel.onerror = (error) => {
    console.error('[DataChannel] Error:', error);
  };

  setDataChannel(dataChannel);
}
