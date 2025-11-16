import { Server } from 'socket.io';
import { registerSignalingHandlers } from './signaling.handler.js';
import { registerConnectionHandler } from './connection.handler.js';
import { registerInitHandler } from './init.handler.js';

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
