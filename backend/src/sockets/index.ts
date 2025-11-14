import { Server } from 'socket.io';
import { registerSignalingHandlers } from './signaling.handler.js';

export function initSockets(io: Server) {
  io.on('connection', (socket) => {
    console.log(`[INFO] Peer connected: ${socket.id}`);

    registerSignalingHandlers(socket, io);
  });

  io.on('connect_error', (error) => {
    console.log(`[INFO] Peer connected: ${error}`);
  });
}
