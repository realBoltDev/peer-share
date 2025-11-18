import { StateCreator } from "zustand";
import { createPeerConnection } from "@/webrtc/createPeerConnection";
import { AppState } from "../appStore";

export interface SignalingSlice {
  initPeerConnection: () => void;
  processOffer: (offer: RTCSessionDescriptionInit, senderPeerId: string) => void;
  processAnswer: (answer: RTCSessionDescriptionInit) => void;
  processCandidate: (candidate: RTCIceCandidateInit) => void;
}

export const createSignalingSlice: StateCreator<
  AppState,
  [],
  [],
  SignalingSlice
> = (set, get) => ({
  pc: null,

  initPeerConnection: () => {
    if (get().pc) return;

    const pc = createPeerConnection();
    get().setPeerConnection(pc);
  },

  processOffer: async (offer, senderPeerId) => {
    let pc = get().pc;

    if (!pc) {
      get().initPeerConnection();
      pc = get().pc!;
    }

    get().setRemotePeerId(senderPeerId);

    await pc.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    const socket = get().socket;
    socket?.emit('answer', { sender: { peerId: senderPeerId }, answer: answer });
  },

  processAnswer: async (answer) => {
    const pc = get().pc!;
    await pc.setRemoteDescription(new RTCSessionDescription(answer));
  },

  processCandidate: async (candidate) => {
    const pc = get().pc!;
    await pc.addIceCandidate(candidate);
  }
});
