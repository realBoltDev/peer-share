import { Socket, Server } from 'socket.io';
import { redisClient } from '../../redis/client.js';

export function registerConnectionHandler(socket: Socket, io: Server) {
  socket.on('connection:request', async (data) => {
    const targetPeer = await redisClient.hGetAll(`peer:${data.sender.peerId}`);

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
      io.to(socketId).emit('connection:incoming', data.receiver);
      socket.emit('connection:requestSent', `Waiting for response from peer - ${data.sender.peerId}`);
    }
  });

  socket.on('connection:accept', async (data) => {
    const receiverPeerData = await redisClient.hGetAll(`peer:${data.receiver.peerId}`);
    if (!receiverPeerData.socketId) return;

    await redisClient.hSet(`peer:${data.sender.peerId}`, {
      connected: 'true',
      remotePeerId: data.receiver.peerId
    });

    await redisClient.hSet(`peer:${data.receiver.peerId}`, {
      connected: 'true',
      remotePeerId: data.sender.peerId
    });

    io.to(receiverPeerData.socketId).emit('connection:accepted', data.sender);

    // Also update peer who accepted (sender.peerId) with the requester's info
    const senderSocketId = await redisClient.hGet(`peer:${data.sender.peerId}`, 'socketId');
    if (senderSocketId) {
      io.to(senderSocketId).emit('peer:connected', {
        peerId: data.receiver.peerId,
        nickname: receiverPeerData.nickname
      });
    }
  });

  socket.on('connection:decline', async (data) => {
    const socketId = await redisClient.hGet(`peer:${data.receiver.peerId}`, 'socketId');
    if (!socketId) return;

    io.to(socketId).emit('connection:declined', data.sender);
  });
}
