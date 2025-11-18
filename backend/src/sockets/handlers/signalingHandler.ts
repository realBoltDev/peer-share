import { Server, Socket } from 'socket.io';
import { redisClient } from '../../redis/client.js';
import { generatePeerId, generateNickname } from '../../utils/peer.js';

export function registerSignalingHandlers(socket: Socket, io: Server): void {
  socket.on('register', async () => {
    let peerId = generatePeerId();

    while (await redisClient.exists(`peer:${peerId}`)) {
      peerId = generatePeerId();
    }

    const nickname = generateNickname();
    await redisClient.hSet(`peer:${peerId}`, { connected: 'false', nickname: nickname, remotePeerId: '', socketId: socket.id });

    socket.data.peerId = peerId;

    socket.emit('registered', { peerId: peerId, nickname: nickname });
    console.log(`[INFO] Registered | Peer ID: ${peerId} | Nickname: ${nickname}`);
  });

  socket.on('update:nickname', async (newNickname) => {
    const peerId = socket.data.peerId;
    if (!peerId) return;

    await redisClient.hSet(`peer:${peerId}`, { nickname: newNickname });

    const peerData = await redisClient.hGetAll(`peer:${peerId}`);
    const remotePeerId = peerData.remotePeerId;

    if (remotePeerId) {
      const remotePeerData = await redisClient.hGetAll(`peer:${remotePeerId}`);
      if (remotePeerData.socketId) {
        io.to(remotePeerData.socketId).emit('peer:nicknameUpdated', { peerId: peerData, nickname: newNickname });
      }
    }
  });

  socket.on('offer', async (data) => {
    const targetSocketId = await redisClient.hGet(`peer:${data.receiver.peerId}`, 'socketId');
    if (targetSocketId) {
      io.to(targetSocketId).emit('offer', {
        sender: { peerId: socket.data.peerId },
        offer: data.offer
      });
    }
  });

  socket.on('answer', async (data) => {
    const targetSocketId = await redisClient.hGet(`peer:${data.sender.peerId}`, 'socketId');
    if (targetSocketId) {
      io.to(targetSocketId).emit('answer', {
        receiver: { peerId: socket.data.peerId },
        answer: data.answer
      });
    }
  });

  socket.on('ice-candidate', async (data) => {
    const targetSocketId = await redisClient.hGet(`peer:${data.peer.peerId}`, 'socketId');
    if (targetSocketId) {
      io.to(targetSocketId).emit('ice-candidate', {
        sender: { peerId: socket.data.peerId },
        candidate: data.candidate
      });
    }
  });
}
