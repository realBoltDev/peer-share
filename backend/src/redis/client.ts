import { createClient } from 'redis';
import { config } from '../config.js';

export const redisClient = createClient({
  username: config.redis.username,
  password: config.redis.password,
    socket: {
        host: config.redis.host,
        port: config.redis.port
    }
});

redisClient.on('connect', () => {
  console.log('[INFO] Redis client connected');
})

redisClient.on('error', (err) => {
  console.error(`[ERROR] Redis error: ${err}`);
})

export async function connectRedis() {
  await redisClient.connect();
}
