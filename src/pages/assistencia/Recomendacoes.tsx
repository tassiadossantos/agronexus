import { Card } from '@/shared/ui/Card';
import type { Recomendacao } from '@/entities/analise/types';

interface Props {
  recomendacoes: Recomendacao[];
}

const tipoConfig: Record<string, { icon: string; color: string }> = {
  irrigacao: { icon: '💧', color: '#00f0ff' },
  adubacao: { icon: '🧪', color: '#22c55e' },
  defensivo: { icon: '🛡', color: '#ef4444' },
  colheita: { icon: '🌾', color: '#eab308' },
};

const prioridadeConfig: Record<string, { label: string; classes: string }> = {
  alta: { label: 'Alta', classes: 'bg-[rgba(239,68,68,0.1)] text-[#ef4444] border border-[rgba(239,68,68,0.2)]' },
  media: { label: 'Media', classes: 'bg-[rgba(234,179,8,0.1)] text-[#eab308] border border-[rgba(234,179,8,0.2)]' },
  baixa: { label: 'Baixa', classes: 'bg-[rgba(34,197,94,0.1)] text-[#22c55e] border border-[rgba(34,197,94,0.2)]' },
};

export function Recomendacoes({ recomendacoes }: Props) {
  return (
    <Card variant="hud" padding="lg">
      <h3 className="text-[10px] font-mono font-bold text-[#475569] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
        Recomendações IA
      </h3>
      <div className="space-y-3 stagger-children">
        {recomendacoes.map((rec) => {
          const tipo = tipoConfig[rec.tipo] || tipoConfig.adubacao;
          const prio = prioridadeConfig[rec.prioridade] || prioridadeConfig.media;

          return (
            <div key={rec.id} className="p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(0,240,255,0.15)] transition-all">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm shrink-0" style={{ background: `${tipo.color}15`, border: `1px solid ${tipo.color}30` }}>
                  {tipo.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white text-sm">{rec.titulo}</h4>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-lg ${prio.classes}`}>{prio.label}</span>
                  </div>
                  <p className="text-xs text-[#64748b] mt-1">{rec.descricao}</p>
                  {rec.area && <p className="text-[11px] text-[#475569] mt-1.5 font-mono">📍 {rec.area}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
