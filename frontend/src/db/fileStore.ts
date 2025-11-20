import { openDB } from "idb";

const DB_NAME = 'PeerShareDB';
const STORE = 'files';

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    }
  });
}

export async function saveFileToDB(key: string, blob: Blob) {
  const db = await getDB();
  await db.put(STORE, blob, key);
}

export async function getFile(key: string) {
  const db = await getDB();
  return db.get(STORE, key);
}

export async function getAllFiles() {
  const db = await getDB();
  return db.getAllKeys(STORE);
}

export async function deleteFile(key: string) {
  const db = await getDB();
  return db.delete(STORE, key);
}

export async function saveChunk(transferId: string, chunkIndex: number, chunk: Uint8Array) {
  const db = await getDB();
  const key = `${transferId}-chunk-${chunkIndex}`;
  await db.put(STORE, chunk, key);
}

export async function assembleFile(transferId: string, totalChunks: number, fileType: string): Promise<string> {
  const db = await getDB();
  const chunks: Uint8Array[] = [];

  for (let i = 0; i < totalChunks; i++) {
    const key = `${transferId}-chunk-${i}`;
    const chunk = await db.get(STORE, key);
    if (chunk) {
      const uint8Chunk = chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk);
      chunks.push(uint8Chunk);
    } else {
      console.error(`Missing chunk ${i} for transfer ${transferId}`);
    }
  }

  console.log(`Assembling ${chunks.length} chunks`);

  const blob = new Blob(chunks as BlobPart[], { type: fileType });
  const finalKey = `${transferId}-${Date.now()}`;
  await db.put(STORE, blob, finalKey);

  for (let i = 0; i < totalChunks; i++) {
    const key = `${transferId}-chunk-${i}`;
    await db.delete(STORE, key);
  }

  return finalKey;
}
