import { createStore, useStore } from 'zustand';

import { SocketSlice, createSocketSlice } from './slices/socketSlice';
import { PeerSlice, createPeerSlice } from './slices/peerSlice';
import { ConnectSlice, createConnectSlice } from './slices/connectSlice';
import { ConnectionSlice, createConnectionSlice } from './slices/connectionSlice';
import { RequestModalSlice, createRequestModalSlice } from './slices/requestModalSlice';

export type AppState =
  SocketSlice &
  PeerSlice &
  ConnectSlice &
  ConnectionSlice &
  RequestModalSlice;

export const appStore = createStore<AppState>()((...a) => ({
  ...createSocketSlice(...a),
  ...createPeerSlice(...a),
  ...createConnectSlice(...a),
  ...createConnectionSlice(...a),
  ...createRequestModalSlice(...a)
}));

export const useAppStore = <T,>(selector: (s: AppState) => T) =>
  useStore(appStore, selector);
