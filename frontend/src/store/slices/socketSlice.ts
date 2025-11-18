import { StateCreator } from 'zustand';
import { initSocket } from '@/api';
import { AppState } from '../appStore';
import { Socket } from 'socket.io-client';

export interface SocketSlice {
  socket: Socket | null;
  initSocketConn: () => void;
}

export const createSocketSlice: StateCreator<
  AppState,
  [],
  [],
  SocketSlice
> = (set, get) => ({
  socket: null,

  initSocketConn: () => {
    const socket = initSocket();
    set({ socket });
  }
});

