import { Server, Socket } from 'socket.io';
import { redisClient } from '../redis/client.js';
import { generatePeerId, generateNickname } from '../utils/peer.js';

export function registerSignalingHandlers(socket: Socket, io: Server): void {
  socket.on('register', async () => {
    let peerId = generatePeerId();

    while (await redisClient.exists(`peer:${peerId}`)) {
      peerId = generatePeerId();
    }

    const nickname = generateNickname();
    await redisClient.hSet(`peer:${peerId}`, { connected: 'false', nickname: nickname, remotePeerId: '', remoteNickname: '', socketId: socket.id });

    socket.data.peerId = peerId;

    socket.emit('registered', { peerId: peerId, nickname: nickname });
    console.log(`[INFO] Registered | Peer ID: ${peerId} | Nickname: ${nickname}`);
  });

  socket.on('update:nickname', async ({ nickname }) => {
    const peerId = socket.data.peerId;
    if (!peerId) return;

    await redisClient.hSet(`peer:${peerId}`, { nickname });

    const allKeys = await redisClient.keys('peer:*');
    for (const key of allKeys) {
      const peerData = await redisClient.hGetAll(key);

      if (Object.keys(peerData).length === 0) {
        return;
      }

      if (peerData.remotePeerId === peerId && peerData.socketId) {
        io.to(peerData.socketId).emit('update:remoteNickname', { nickname });
        break;
      }
    }
  });
}
