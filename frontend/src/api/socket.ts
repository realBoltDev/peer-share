import { io, Socket } from 'socket.io-client';
import { registerInitHandler } from './handlers/registerInitHandler';
import { registerPeerHandler } from './handlers/registerPeerHandler';

let socket: Socket | null = null;

export function initSocket() {
  if (socket) return;

  socket = io('http://127.0.0.1:3000', {
    transports: ['websocket']
  });

  registerInitHandler(socket);
  registerPeerHandler(socket);

  return socket;
}

export function getSocket() {
  if (!socket) throw new Error('Socket not initialized')
  return socket
}
