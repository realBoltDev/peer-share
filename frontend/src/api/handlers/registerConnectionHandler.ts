import { Socket } from "socket.io-client";
import { useConnectionStore } from "@/store/connectionStore";
import { useConnectStore } from "@/store/connectStore";

export function registerConnectionHandler(socket: Socket) {
  const { setSendStatus, setReceiveStatus } = useConnectionStore.getState();
  const { setLoading } = useConnectStore.getState();

  socket.on('connection:failed', ({ message, mode }) => {
    if (mode === 'send') {
      setSendStatus('failed', message);
    } else {
      setReceiveStatus('failed', message);
      setLoading(false);
    }
  });

  socket.on('connection:requestSent', ({ message }) => {
    setReceiveStatus('waiting', message);
  });
}
