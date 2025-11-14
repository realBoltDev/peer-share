import { createClient } from 'redis';

export const redisClient = createClient({
  url: 'redis://localhost:6379'
});

redisClient.on('connect', () => {
  console.log('[INFO] Redis client connected');
})

redisClient.on('error', (err) => {
  console.error(`[ERROR] Redis error: ${err}`);
})

await redisClient.connect();
