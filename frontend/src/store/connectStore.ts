import { create } from "zustand";

interface ConnectState {
  loading: boolean | undefined;
  connected: boolean | undefined;
  setLoading: (state: boolean | undefined) => void;
  setConnected: (state: boolean | undefined) => void;
}

export const useConnectStore = create<ConnectState>((set, get) => ({
  loading: undefined,
  connected: undefined,

  setLoading: (state) => {
    set({ loading: state });
  },

  setConnected: (state) => {
    set({ connected: state });
  }
}));
