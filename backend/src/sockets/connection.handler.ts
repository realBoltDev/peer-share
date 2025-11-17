import { Socket, Server } from 'socket.io';
import { redisClient } from '../redis/client.js';

export function registerConnectionHandler(socket: Socket, io: Server) {
  socket.on('connection:request', async ({ from, to }) => {
    const targetPeer = await redisClient.hGetAll(`peer:${to}`);
    if (Object.keys(targetPeer).length === 0) {
      socket.emit('connection:failed', { message: 'Peer not found' });
      return;
    }

    const isConnected = targetPeer.connected;
    if (isConnected === 'true') {
      socket.emit('connection:failed', { message: 'Peer is already connected' });
      return;
    }

    const socketId = targetPeer.socketId;
    if (socketId) {
      io.to(socketId).emit('connection:incoming', { from });
      socket.emit('connection:requestSent', { message: `Waiting for response from peer - ${to}` });
    }
  });

  socket.on('connection:accept', async ({ from, to }) => {
    const socketId = await redisClient.hGet(`peer:${to}`, 'socketId');
    if (!socketId) return;

    io.to(socketId).emit('connection:accepted', { from });
  });

  socket.on('connection:decline', async ({ from, to }) => {
    const socketId = await redisClient.hGet(`peer:${to}`, 'socketId');
    if (!socketId) return;

    io.to(socketId).emit('connection:declined', { from });
  });
}
