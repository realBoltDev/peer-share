import { createStore, useStore } from 'zustand';

import { SocketSlice, createSocketSlice } from './slices/socketSlice';
import { PeerSlice, createPeerSlice } from './slices/peerSlice';
import { ConnectSlice, createConnectSlice } from './slices/connectSlice';
import { ConnectionSlice, createConnectionSlice } from './slices/connectionSlice';
import { RequestModalSlice, createRequestModalSlice } from './slices/requestModalSlice';
import { SignalingSlice, createSignalingSlice } from './slices/signalingSlice';
import { WebRTCSlice, createWebRTCSlice } from './slices/webrtcSlice';
import { TransferSlice,createTransferSlice } from './slices/transferSlice';

export type AppState =
  SocketSlice &
  PeerSlice &
  ConnectSlice &
  ConnectionSlice &
  RequestModalSlice &
  SignalingSlice &
  WebRTCSlice &
  TransferSlice;

export const appStore = createStore<AppState>()((...a) => ({
  ...createSocketSlice(...a),
  ...createPeerSlice(...a),
  ...createConnectSlice(...a),
  ...createConnectionSlice(...a),
  ...createRequestModalSlice(...a),
  ...createSignalingSlice(...a),
  ...createWebRTCSlice(...a),
  ...createTransferSlice(...a)
}));

export const useAppStore = <T,>(selector: (s: AppState) => T) =>
  useStore(appStore, selector);
