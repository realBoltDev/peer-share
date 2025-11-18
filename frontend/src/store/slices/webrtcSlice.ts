import { StateCreator } from "zustand";
import { AppState } from "../appStore";

export interface WebRTCSlice {
  pc: RTCPeerConnection | null;
  dataChannel: RTCDataChannel | null;
  webrtcState: RTCPeerConnectionState;

  setPeerConnection: (pc: RTCPeerConnection | null) => void;
  setDataChannel: (dc: RTCDataChannel | null) => void;
  setWebRTCState: (state: RTCPeerConnectionState) => void;
}

export const createWebRTCSlice: StateCreator<
  AppState,
  [],
  [],
  WebRTCSlice
> = (set, get) => ({
  pc: null,
  dataChannel: null,
  webrtcState: 'new',

  setPeerConnection: (pc) => {
    set({ pc });
  },

  setDataChannel: (dc) => {
    set({ dataChannel: dc });
  },

  setWebRTCState: (state) => {
    set({ webrtcState: state });
  }
});
