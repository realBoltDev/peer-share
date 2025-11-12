export interface ClientInfoProps {
  peerId: string;
  nickname: string;
  setNickname: (value: string) => void
}

export interface ConnectionStatusProps {
  status: string;
  peerId: string;
  nickname: string
}

export interface StatusPanelProps {
  status: string;
  peerId: string;
  nickname: string;
  setNickname: (value: string) => void
}
