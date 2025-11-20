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
