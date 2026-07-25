import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus';
import { offlineManager } from '@/shared/api/offline';

interface OfflineContextType {
  isOnline: boolean;
  queueSize: number;
  syncPending: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextType>({
  isOnline: true,
  queueSize: 0,
  syncPending: async () => {},
});

export function useOffline() { return useContext(OfflineContext); }

export function OfflineProvider({ children }: { children: ReactNode }) {
  const { isOnline } = useOnlineStatus();
  const [queueSize, setQueueSize] = useState(0);

  useEffect(() => {
    offlineManager.getQueueSize().then(setQueueSize);
  }, []);

  useEffect(() => {
    if (isOnline) syncPending();
  }, [isOnline]);

  const syncPending = async () => {
    await offlineManager.processQueue();
    const size = await offlineManager.getQueueSize();
    setQueueSize(size);
  };

  return (
    <OfflineContext.Provider value={{ isOnline, queueSize, syncPending }}>
      {children}
    </OfflineContext.Provider>
  );
}
