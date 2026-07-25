import Dexie, { type Table } from 'dexie';

export interface OfflineQueueItem {
  id?: number;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  endpoint: string;
  payload: unknown;
  timestamp: number;
  retryCount: number;
}

export interface CacheEntry {
  key: string;
  data: unknown;
  expiry: number;
}

interface SyncEntry {
  key: string;
  lastSync: number;
}

class AgroNexusDB extends Dexie {
  queue!: Table<OfflineQueueItem>;
  cache!: Table<CacheEntry>;
  sync!: Table<SyncEntry>;

  constructor() {
    super('AgroNexusDB');
    this.version(1).stores({
      queue: '++id, timestamp',
      cache: 'key, expiry',
      sync: 'key, lastSync',
    });
  }
}

const db = new AgroNexusDB();

class OfflineManager {
  async enqueue(item: Omit<OfflineQueueItem, 'id' | 'timestamp' | 'retryCount'>): Promise<void> {
    await db.queue.add({ ...item, timestamp: Date.now(), retryCount: 0 });
  }

  async processQueue(): Promise<void> {
    const items = await db.queue.orderBy('timestamp').toArray();
    for (const item of items) {
      try {
        await fetch(item.endpoint, {
          method: item.operation === 'CREATE' ? 'POST' : item.operation === 'UPDATE' ? 'PUT' : 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.payload),
        });
        await db.queue.delete(item.id!);
      } catch {
        await db.queue.where('id').equals(item.id!).modify({ retryCount: item.retryCount + 1 });
      }
    }
  }

  async getQueueSize(): Promise<number> {
    return db.queue.count();
  }

  async setCache(key: string, data: unknown, ttlMs: number): Promise<void> {
    await db.cache.put({ key, data, expiry: Date.now() + ttlMs });
  }

  async getCache(key: string): Promise<unknown | null> {
    const entry = await db.cache.get(key);
    if (!entry || entry.expiry < Date.now()) {
      if (entry) await db.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  async clearExpiredCache(): Promise<void> {
    await db.cache.where('expiry').below(Date.now()).delete();
  }
}

export const offlineManager = new OfflineManager();
export { db };
