import { useDroneAnalysis } from '@/features/drone/useDroneAnalysis';
import { Card } from '@/shared/ui/Card';
import { getNDVICor } from '@/entities/analise/ndvi';
import { formatDate } from '@/shared/utils/date';

export function HistoricoMapas() {
  const { historico } = useDroneAnalysis();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Histórico de <span className="text-[#22c55e]">Análises</span></h1>
        <p className="text-sm text-[#475569] mt-1">Timeline de análises NDVI realizadas</p>
      </div>

      <Card variant="hud" padding="lg">
        <div className="space-y-3 stagger-children">
          {historico.map((mapa) => (
            <div key={mapa.id} className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(0,240,255,0.15)] transition-all cursor-pointer group">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[rgba(255,255,255,0.06)]">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=200&q=60"
                  alt="Mapa NDVI"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,9,15,0.8)] to-transparent" />
                <div className="absolute bottom-1 left-1 w-2.5 h-2.5 rounded-full" style={{ background: getNDVICor(mapa.ndviMedio), boxShadow: `0 0 6px ${getNDVICor(mapa.ndviMedio)}60` }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">NDVI: {mapa.ndviMedio.toFixed(2)}</span>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: getNDVICor(mapa.ndviMedio) }} />
                </div>
                <p className="text-xs text-[#64748b] mt-0.5 truncate">{mapa.resumo}</p>
                <p className="text-[11px] text-[#475569] mt-1 font-mono">{formatDate(mapa.data)}</p>
              </div>
              <svg className="w-4 h-4 text-[#475569] group-hover:text-[#00f0ff] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
