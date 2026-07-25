import { Card } from '@/shared/ui/Card';
import { getNivelLabel } from '@/entities/analise/ndvi';
import type { NDVIResult } from '@/entities/analise/types';

interface Props {
  result: NDVIResult;
}

export function MapaInterativo({ result }: Props) {
  return (
    <Card variant="hud" padding="none" className="overflow-hidden">
      <div className="relative aspect-[4/3] bg-[#06090f]">
        <div className="absolute inset-0 opacity-20 grid-overlay" />

        {result.areasCriticas.map((area, idx) => {
          const cores = { critico: '#ef4444', atencao: '#eab308', bom: '#22c55e' };
          const posicoes = [
            { x: '25%', y: '30%' },
            { x: '55%', y: '45%' },
            { x: '75%', y: '65%' },
          ];
          const pos = posicoes[idx] || posicoes[0];
          const estilo = getNivelLabel(area.nivel);

          return (
            <div key={area.id} className="absolute group" style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}>
              <div className="w-5 h-5 rounded-full border-2 animate-pulse" style={{ borderColor: cores[area.nivel], boxShadow: `0 0 12px ${cores[area.nivel]}40` }}>
                <div className="w-full h-full rounded-full opacity-60" style={{ background: cores[area.nivel] }} />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="hud-surface-elevated rounded-xl p-3 w-48 text-left shadow-xl">
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${estilo.bg} ${estilo.cor} mb-1.5 inline-block`}>{estilo.label}</div>
                  <p className="text-xs text-[#cbd5e1] font-medium">{area.descricao}</p>
                  <p className="text-[11px] text-[#64748b] mt-1">{area.recomendacao}</p>
                </div>
              </div>
            </div>
          );
        })}

        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-[rgba(15,23,42,0.9)] backdrop-blur-sm border border-[rgba(255,255,255,0.06)] text-xs text-[#94a3b8] font-mono">
          NDVI — {new Date(result.dataProcessamento).toLocaleDateString('pt-BR')}
        </div>
      </div>
    </Card>
  );
}
