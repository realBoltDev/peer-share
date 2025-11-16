import { create } from "zustand";

interface ConnectionState {
  mode: string | null;
  sendStatus: string | null;
  sendMessage: string | null;
  receiveStatus: string | null;
  receiveMessage: string | null;
  setMode: (mode: string | null) => void;
  setSendStatus: (status: string | null, message: string | null) => void;
  setReceiveStatus: (status: string | null, message: string | null) => void;
}

export const useConnectionStore = create<ConnectionState>((set, get) => ({
  mode: null,

  sendStatus: null,
  sendMessage: null,

  receiveStatus: null,
  receiveMessage: null,

  setMode: (mode) => {
    set({ mode })
  },

  setSendStatus: (status, message) => {
    set({ sendStatus: status, sendMessage: message });
  },

  setReceiveStatus: (status, message) => {
    set({ receiveStatus: status, receiveMessage: message });
  }
}));
