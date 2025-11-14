import { Socket } from 'socket.io-client';

export function registerInitHandler(socket: Socket): void {
  socket.on('connect', () => {
    console.log('Connected to socket');
    socket?.emit('register');
  });

  socket.on('disconnect', (reason) => {
    console.log('Disconnected from socket');
  });

  socket.on('error', (err) => {
    console.log(`Socket error: ${err}`);
  });
}
