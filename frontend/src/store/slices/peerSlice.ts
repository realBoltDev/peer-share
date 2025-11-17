import { StateCreator } from 'zustand';

export interface PeerSlice {
  peerId: string | null;
  nickname: string | null;
  remotePeerId: string | null;
  remoteNickname: string | null;
  remotePeerConnected: boolean | null;
  setPeer: (peerId: string, nickname: string) => void;
  setNickname: (nickname: string | null) => void;
  setRemotePeerId: (remotePeerId: string | null) => void;
  setRemoteNickname: (remoteNickname: string | null) => void;
  setRemotePeerConnected: (state: boolean | null) => void;
}

export const createPeerSlice: StateCreator<
  PeerSlice,
  [],
  [],
  PeerSlice
> = (set, get) => ({
  peerId: null,
  nickname: null,
  remotePeerId: null,
  remoteNickname: null,
  remotePeerConnected: null,

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
