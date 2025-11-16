import { Socket } from "socket.io";
import { redisClient } from "../redis/client.js";

export function registerInitHandler(socket: Socket) {
  socket.on('disconnect', async (reason) => {
    console.log(`[INFO] Peer diconnected: ${socket.id}`);

    const peerId = socket.data.peerId;
    if (peerId) {
      await redisClient.del(`peer:${peerId}`);
    }
  });

  socket.on('error', (err) => {
    console.log(`Socket error: ${err}`);
  });
}
