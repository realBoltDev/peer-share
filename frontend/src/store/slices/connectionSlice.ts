import { StateCreator } from 'zustand';
import { AppState } from '../appStore';

export interface ConnectionSlice {
  connStatus: string | null;
  connMessage: string | null;
  setConnStatus: (status: string | null) => void;
  setConnMessage: (message: string | null) => void;
}

export const createConnectionSlice: StateCreator<
  AppState,
  [],
  [],
  ConnectionSlice
> = (set) => ({
  connStatus: 'idle',
  connMessage: 'Ready for connection',

  setConnStatus: (status) => {
    set({ connStatus: status });
  },

  setConnMessage: (message) => {
    set({ connMessage: message });
  },
});
