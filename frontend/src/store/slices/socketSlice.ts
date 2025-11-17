import { StateCreator } from 'zustand';
import { initSocket } from '@/api';

export interface SocketSlice {
  socket: ReturnType<typeof initSocket> | null;
  initSocketConn: () => void;
}

export const createSocketSlice: StateCreator<
  SocketSlice,
  [],
  [],
  SocketSlice
> = (set) => ({
  socket: null,

  initSocketConn: () => {
    const socket = initSocket()
    set({ socket })
  }
});

