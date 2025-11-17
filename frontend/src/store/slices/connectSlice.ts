import { StateCreator } from 'zustand';

export interface ConnectSlice {
  connectBtnLoading: boolean | undefined;
  setConnectBtnLoading: (state: boolean | undefined) => void;
}

export const createConnectSlice: StateCreator<
  ConnectSlice,
  [],
  [],
  ConnectSlice> = (set) => ({
    connectBtnLoading: undefined,

    setConnectBtnLoading: (state) => {
      set({ connectBtnLoading: state });
    }
  });
