import { StateCreator } from 'zustand';

export interface RequestModalSlice {
  requestModalOpened: boolean | null;
  requestModalPeer: string | null;
  requestModalNickname: string | null;
  setRequestModalOpened: (state: boolean | null) => void;
  setRequestModalPeer: (peerId: string | null) => void;
  setRequestModalNickname: (remoteNickname: string | null) => void;
}

export const createRequestModalSlice: StateCreator<
  RequestModalSlice,
  [],
  [],
  RequestModalSlice> = (set) => ({
    requestModalOpened: null,
    requestModalPeer: null,
    requestModalNickname: null,

    setRequestModalOpened: (state) => {
      set({ requestModalOpened: state });
    },

    setRequestModalPeer: (peerId) => {
      set({ requestModalPeer: peerId });
    },

    setRequestModalNickname: (remoteNickname) => {
      set({ requestModalNickname: remoteNickname });
    }
  });
