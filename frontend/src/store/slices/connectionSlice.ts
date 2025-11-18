import { StateCreator } from 'zustand';
import { AppState } from '../appStore';

export interface ConnectionSlice {
  mode: string | null;
  sendStatus: string | null;
  sendMessage: string | null;
  receiveStatus: string | null;
  receiveMessage: string | null;
  setMode: (mode: string | null) => void;
  setSendStatus: (status: string | null) => void;
  setReceiveStatus: (status: string | null) => void;
  setSendMessage: (message: string | null) => void;
  setReceiveMessage: (message: string | null) => void;
}

export const createConnectionSlice: StateCreator<
  AppState,
  [],
  [],
  ConnectionSlice
> = (set) => ({
  mode: null,

  sendStatus: null,
  sendMessage: null,

  receiveStatus: null,
  receiveMessage: null,

  setMode: (mode) => {
    set({ mode })
  },

  setSendStatus: (status) => {
    set({ sendStatus: status });
  },

  setReceiveStatus: (status) => {
    set({ receiveStatus: status });
  },

  setSendMessage: (message) => {
    set({ sendMessage: message });
  },

  setReceiveMessage: (message) => {
    set({ receiveMessage: message });
  }
});
