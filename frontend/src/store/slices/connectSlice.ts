import { StateCreator } from 'zustand';
import { AppState } from '../appStore';

export type ConnectState =
  | 'idle'
  | 'searching'
  | 'request_sent'
  | 'request_received'
  | 'connected'
  | 'error';

export interface ConnectSlice {
  connectBtnLoading: boolean | undefined;
  connectionState: ConnectState;

  setConnectBtnLoading: (state: boolean | undefined) => void;
  setConnectionState: (state: ConnectSlice["connectionState"]) => void;
}

export const createConnectSlice: StateCreator<
  AppState,
  [],
  [],
  ConnectSlice
> = (set) => ({
  connectBtnLoading: undefined,
  connectionState: 'idle',

  setConnectBtnLoading: (state) => {
    set({ connectBtnLoading: state });
  },

  setConnectionState: (state) => {
    set({ connectionState: state });
  }
});
