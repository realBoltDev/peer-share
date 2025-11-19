import { Socket, Server } from 'socket.io';
import { redisClient } from '../../redis/client.js';

export function registerConnectionHandler(socket: Socket, io: Server) {
  socket.on('server:connectionRequest', async (data) => {
    const targetPeer = await redisClient.hGetAll(`peer:${data.sender.peerId}`);

    if (Object.keys(targetPeer).length === 0) {
      socket.emit('receiver:connectionFailed', { message: 'Peer not found' });
      return;
    }

    const isConnected = targetPeer.connected;
    if (isConnected === 'true') {
      socket.emit('receiver:connectionFailed', { message: 'Peer is already connected' });
      return;
    }

    const socketId = targetPeer.socketId;
    if (socketId) {
      io.to(socketId).emit('sender:requestIncoming', data.receiver);
      socket.emit('receiver:requestSent', `Waiting for response from peer`);
    }
  });

  socket.on('server:requestAccept', async (data) => {
    const receiverPeer = await redisClient.hGetAll(`peer:${data.receiver.peerId}`);
    if (!receiverPeer.socketId) return;

    await redisClient.hSet(`peer:${data.sender.peerId}`, {
      connected: 'true',
      remotePeerId: data.receiver.peerId
    });

    await redisClient.hSet(`peer:${data.receiver.peerId}`, {
      connected: 'true',
      remotePeerId: data.sender.peerId
    });

    io.to(receiverPeer.socketId).emit('receiver:requestAccepted', data.sender);

    // Also update peer who accepted (sender.peerId) with the requester's info
    const senderSocketId = await redisClient.hGet(`peer:${data.sender.peerId}`, 'socketId');
    if (senderSocketId) {
      io.to(senderSocketId).emit('sender:connected', {
        peerId: data.receiver.peerId,
        nickname: receiverPeer.nickname
      });
    }
  });

  socket.on('server:requestDecline', async (data) => {
    const receiverPeer = await redisClient.hGetAll(`peer:${data.receiver.peerId}`);
    if (!receiverPeer.socketId) return;

    io.to(receiverPeer.socketId).emit('receiver:requestDeclined', data.sender);
  });

  socket.on('server:connectionDisconnect', async () => {
    const peerId = socket.data.peerId;
    if (peerId) {
      await redisClient.hSet(`peer:${peerId}`, {
        connected: 'false',
      });
    }
  });
}
