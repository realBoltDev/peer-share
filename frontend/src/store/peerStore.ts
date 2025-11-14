import { create } from 'zustand';
import { initSocket } from '@/api';

interface PeerState {
  socket: ReturnType<typeof initSocket> | null;
  peerId: string | null;
  nickname: string | null;
  connected: boolean;
  remotePeerId: string | null;
  remoteNickname: string | null;
  initSocketConn: () => void;
  setPeer: (peerId: string, nickname: string) => void;
  setNickname: (nickname: string | null) => void;
  setRemoteNickname: (remoteNickname: string | null) => void;
}

export const usePeerStore = create<PeerState>((set, get) => ({
  socket: null,
  peerId: null,
  nickname: null,
  connected: false,
  remotePeerId: null,
  remoteNickname: null,

  initSocketConn: () => {
    const socket = initSocket()
    set({ socket })
  },

  setPeer: (peerId, nickname) => {
    set({ peerId, nickname });
  },

  setNickname: (nickname) => {
    set({ nickname });
  },

  setRemoteNickname: (remoteNickname) => {
    set({ remoteNickname });
  }
}));
