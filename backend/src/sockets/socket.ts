import { Server } from 'socket.io';
import { registerSignalingHandlers } from './handlers/signalingHandler.js';
import { registerConnectionHandler } from './handlers/connectionHandler.js';
import { registerInitHandler } from './handlers/initHandler.js';

export function initSockets(io: Server) {
  io.on('connection', (socket) => {
    console.log(`[INFO] Peer connected: ${socket.id}`);

    registerInitHandler(socket);
    registerSignalingHandlers(socket, io);
    registerConnectionHandler(socket, io);
  });

  io.on('connect_error', (error) => {
    console.log(`[INFO] Peer connected: ${error}`);
  });
}
