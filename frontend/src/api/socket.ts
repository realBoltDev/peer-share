import { io, Socket } from 'socket.io-client';
import { registerInitHandler } from './handlers/registerInitHandler';
import { registerPeerHandler } from './handlers/registerPeerHandler';
import { registerConnectionHandler } from './handlers/registerConnectionHandler';

let socket: Socket | null = null;

export function initSocket() {
  if (socket) {
    return socket;
  }

  socket = io('http://127.0.0.1:3000', {
    transports: ['websocket'],
    reconnection: true
  });

  registerInitHandler(socket);
  registerPeerHandler(socket);
  registerConnectionHandler(socket);

  return socket;
}

export function getSocket() {
  if (!socket) throw new Error('Socket not initialized')
  return socket
}
