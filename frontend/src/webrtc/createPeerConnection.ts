import { appStore } from "@/store/appStore";
import { ConnectState } from "@/store/slices/connectSlice";
import { sleep } from "@/utils/common";

export function createPeerConnection() {
  const {
    socket, remotePeerId, dataChannel, setWebRTCState, setConnectionState,
    setRemotePeerConnected, setDataChannel, setConnStatus, setConnMessage,
    setPeerConnection, setConnectBtnLoading
  } = appStore.getState();

  async function handlePCDisconnect(connectionState: ConnectState, connStatus: string, connMessage: string) {
    setConnectionState(connectionState);
    setRemotePeerConnected(false);
    setConnStatus(connStatus);
    setConnMessage(connMessage);
    await sleep(2000);

    setConnStatus('idle');
    setConnMessage('Ready for connection');
    setConnectBtnLoading(false);

    if (dataChannel) {
      dataChannel.close();
      setDataChannel(null);
    }
    pc.close();
    setPeerConnection(null);

    socket?.emit('server:connectionDisconnect');
  }

  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun.cloudflare.com:3478' },
      { urls: 'stun:stun.cloudflare.com:53' }
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

  pc.onconnectionstatechange = async () => {
    const state = pc.connectionState;
    setWebRTCState(state);

    if (state === 'connected') {
      console.log('[WebRTC] Peer Connection Established!');
      setConnectionState('connected');
      setRemotePeerConnected(true);
      setConnStatus('connected');
      setConnMessage(`Connected to peer - ${remotePeerId}`);
    }

    if (state === 'disconnected') {
      console.log('[WebRTC] Connection disconnected');
      await handlePCDisconnect('error', 'failed', 'RTC Peer Connection disconnected');
    }

    if (state === 'failed') {
      console.log('[WebRTC] Connection failed');
      await handlePCDisconnect('error', 'failed', 'RTC Peer Connection failed');
    }
  };

  pc.ondatachannel = (event) => {
    console.log('[WebRTC] Data channel received:', event.channel.label);
    const dataChannel = event.channel;
    setupReceiverDCHandlers(dataChannel);
    setDataChannel(dataChannel);
  };

  return pc;
}

function setupReceiverDCHandlers(dataChannel: RTCDataChannel) {
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
