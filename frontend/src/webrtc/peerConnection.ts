import { appStore } from "@/store/appStore";
import { ConnectState } from "@/store/slices/connectSlice";
import { setupReceiverChannel } from "./dataChannel";
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
      setConnMessage(`Connected to peer - ${remotePeerId}!`);
    }

    if (state === 'disconnected') {
      console.log('[WebRTC] Connection disconnected');
      await handlePCDisconnect('error', 'failed', 'Peer Connection disconnected');
    }

    if (state === 'failed') {
      console.log('[WebRTC] Connection failed');
      await handlePCDisconnect('error', 'failed', 'Peer Connection failed');
    }
  };

  pc.ondatachannel = (event) => {
    if (event.channel.label === 'fileTransfer') {
      console.log('[WebRTC] Data channel received:', event.channel.label);

      const dataChannel = event.channel;
      setupReceiverChannel(dataChannel);
      setDataChannel(dataChannel);
    }
  };

  return pc;
}
