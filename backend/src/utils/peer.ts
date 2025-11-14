import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

export function generatePeerId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id;
}

export function generateNickname(): string {
  const nickname = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: '',
    style: 'capital'
  })
  return nickname;
}
