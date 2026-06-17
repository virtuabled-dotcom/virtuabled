/**
 * mediaStore — IndexedDB helper for large candidate media blobs (intro videos,
 * full-res photos) that are too big for localStorage. Keyed by an opaque id that
 * is stored alongside the ApplicationRecord. This mirrors the shape we'll use
 * with Supabase Storage later: swap putBlob/getBlobURL for an upload/signed-URL
 * call and the rest of the app is unchanged.
 */

const DB_NAME = "virtuabled-media";
const STORE = "blobs";
const VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB unavailable"));
      return;
    }
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/** Persist a blob and return its key (generates one if not provided). */
export async function putBlob(blob: Blob, key?: string): Promise<string> {
  const id = key ?? `media-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(blob, id);
    tx.oncomplete = () => {
      db.close();
      resolve(id);
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

/** Retrieve a blob by key, or null if missing. */
export async function getBlob(key: string): Promise<Blob | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(key);
    req.onsuccess = () => {
      db.close();
      resolve((req.result as Blob) ?? null);
    };
    req.onerror = () => {
      db.close();
      reject(req.error);
    };
  });
}

/** Get an object URL for a stored blob (remember to revokeObjectURL when done). */
export async function getBlobURL(key: string): Promise<string | null> {
  const blob = await getBlob(key);
  return blob ? URL.createObjectURL(blob) : null;
}

/** Delete a stored blob (best-effort). */
export async function deleteBlob(key: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).delete(key);
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        resolve();
      };
    });
  } catch {
    /* ignore */
  }
}
