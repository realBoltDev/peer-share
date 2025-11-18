import { appStore } from "@/store/appStore";

export function createPeerConnection() {
  const { socket, remotePeerId, setWebRTCState, setConnectionState, setRemotePeerConnected, setDataChannel } = appStore.getState();

  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
    ]
  });

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket?.emit('ice-candidate', {
        peer: { peerId: remotePeerId },
        candidate: event.candidate
      });
    }
  };

  pc.onconnectionstatechange = () => {
    const state = pc.connectionState;
    setWebRTCState(state);

    if (state === 'connected') {
      console.log('[WebRTC] PEER CONNECTION ESTABLISHED!');
      setConnectionState('connected');
      setRemotePeerConnected(true);
    }

    if (state === 'failed' || state === 'disconnected') {
      console.log('[WebRTC] Connection failed or disconnected');
      setConnectionState('error');
      setRemotePeerConnected(false);
    }
  };

  pc.ondatachannel = (event) => {
    console.log('[WebRTC] Data channel received:', event.channel.label);
    const dataChannel = event.channel;
    setupDataChannelHandlers(dataChannel);
    setDataChannel(dataChannel);
  };

  return pc;
}

function setupDataChannelHandlers(dataChannel: RTCDataChannel) {
  dataChannel.onopen = () => {
    console.log('[DataChannel] Data channel opened:', dataChannel.label);
  };

  dataChannel.onclose = () => {
    console.log('[DataChannel] Data channel closed');
  };

  dataChannel.onerror = (error) => {
    console.error('[DataChannel] Data channel error:', error);
  };

  dataChannel.onmessage = (event) => {
    // Add file receive logic here
  };
}
