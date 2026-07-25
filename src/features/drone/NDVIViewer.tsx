import type { NDVIResult } from '@/entities/analise/types';
import { Card } from '@/shared/ui/Card';
import { getNDVICor, getNDVILabel } from '@/entities/analise/ndvi';
import { formatRelativeTime } from '@/shared/utils/date';

interface Props {
  result: NDVIResult;
}

export function NDVIViewer({ result }: Props) {
  return (
    <div className="space-y-4">
      <div className="relative rounded-2xl overflow-hidden bg-[#06090f] aspect-video border border-[rgba(255,255,255,0.06)]">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-3 text-[#22c55e] opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
            <p className="text-sm font-mono text-[#475569]">Mapa NDVI Interativo</p>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex gap-2">
          {[
            { cor: '#ef4444', label: '< 0.3' },
            { cor: '#eab308', label: '0.3-0.5' },
            { cor: '#86efac', label: '0.5-0.7' },
            { cor: '#22c55e', label: '> 0.7' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[rgba(15,23,42,0.9)] backdrop-blur-sm border border-[rgba(255,255,255,0.06)] text-[10px] text-[#94a3b8] font-mono">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: item.cor, boxShadow: `0 0 6px ${item.cor}40` }} />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card padding="sm" className="text-center">
          <div className="text-2xl font-black text-[#22c55e]" style={{ textShadow: '0 0 20px rgba(34,197,94,0.3)' }}>{result.ndviMedio.toFixed(2)}</div>
          <div className="text-[10px] font-mono text-[#475569] mt-0.5 uppercase tracking-wider">NDVI Medio</div>
        </Card>
        <Card padding="sm" className="text-center">
          <div className="text-2xl font-black text-[#ef4444]" style={{ textShadow: '0 0 20px rgba(239,68,68,0.3)' }}>{result.ndviMinimo.toFixed(2)}</div>
          <div className="text-[10px] font-mono text-[#475569] mt-0.5 uppercase tracking-wider">Minimo</div>
        </Card>
        <Card padding="sm" className="text-center">
          <div className="text-2xl font-black text-[#00f0ff]" style={{ textShadow: '0 0 20px rgba(0,240,255,0.3)' }}>{result.ndviMaximo.toFixed(2)}</div>
          <div className="text-[10px] font-mono text-[#475569] mt-0.5 uppercase tracking-wider">Maximo</div>
        </Card>
      </div>

      <div className="text-[11px] text-[#475569] text-center font-mono">
        Processado {formatRelativeTime(result.dataProcessamento)}
      </div>
    </div>
  );
}
