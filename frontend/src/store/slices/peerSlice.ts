import { StateCreator } from 'zustand';
import { AppState } from '../appStore';

export interface PeerSlice {
  peerRole: string | null;
  peerId: string | null;
  nickname: string | null;
  remotePeerId: string | null;
  remoteNickname: string | null;
  remotePeerConnected: boolean | null;
  setPeerRole: (role: string) => void;
  setPeer: (peerId: string, nickname: string) => void;
  setNickname: (nickname: string | null) => void;
  setRemotePeerId: (remotePeerId: string | null) => void;
  setRemoteNickname: (remoteNickname: string | null) => void;
  setRemotePeerConnected: (state: boolean | null) => void;
}

export const createPeerSlice: StateCreator<
  AppState,
  [],
  [],
  PeerSlice
> = (set, get) => ({
  peerRole: null,
  peerId: null,
  nickname: null,
  remotePeerId: null,
  remoteNickname: null,
  remotePeerConnected: null,

  setPeerRole: (role) => {
    set({ peerRole: role });
  },

  setPeer: (peerId, nickname) => {
    set({ peerId, nickname });
  },

  setNickname: (nickname) => {
    set({ nickname });
  },

  setRemotePeerId: (remotePeerId) => {
    set({ remotePeerId });
  },

  setRemoteNickname: (remoteNickname) => {
    set({ remoteNickname });
  },

  setRemotePeerConnected: (state) => {
    set({ remotePeerConnected: state });
  },
});
