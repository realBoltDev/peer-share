export interface IncomingRequestModalProps {
  opened: boolean;
  onAccept: () => void;
  onDecline: () => void;
  peerId: string;
  nickname: string;
}
