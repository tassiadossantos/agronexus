import { cn } from '@/shared/utils/cn';
import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus';

export function OfflineIndicator() {
  const { isOnline, wasOffline } = useOnlineStatus();

  if (isOnline && !wasOffline) return null;

  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 z-50 px-4 py-2.5 text-center text-sm font-semibold transition-all duration-500 border-t',
      isOnline
        ? 'bg-[rgba(34,197,94,0.15)] text-[#22c55e] border-[rgba(34,197,94,0.3)] animate-fade-in-up'
        : 'bg-[rgba(239,68,68,0.1)] text-[#ef4444] border-[rgba(239,68,68,0.3)]',
    )}>
      {isOnline ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          Conexao restaurada. Sincronizando dados...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
          Voce esta offline. Dados serao sincronizados quando a conexao retornar.
        </span>
      )}
    </div>
  );
}
