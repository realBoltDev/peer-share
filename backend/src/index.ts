import { config } from './config.js';
import http from 'http';
import { Server } from 'socket.io';
import { initSockets } from './sockets/socket.js';
import { app } from './app.js';
import { connectRedis } from './redis/client.js';

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

initSockets(io);

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'PeerShare Server active' });
});

await connectRedis();

server.listen(config.express.port, () => {
  console.log(`[INFO] Server running on port ${config.express.port}`);
})
