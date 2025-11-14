export interface ClientInfoProps {
  peerId: string | null;
  nickname: string | null;
  setNickname: (value: string | null) => void;
}

export interface ConnectionStatusProps {
  status: string;
  remotePeerId: string | null;
  remoteNickname: string | null;
}

export interface StatusPanelProps {
  peerId: string | null;
  nickname: string | null;
  status: string;
  remotePeerId: string | null;
  remoteNickname: string | null;
  setNickname: (value: string | null) => void;
}
