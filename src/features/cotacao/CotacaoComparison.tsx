import { Card } from '@/shared/ui/Card';
import type { Insumo } from '@/entities/insumo/types';
import { formatCurrency } from '@/shared/utils/currency';
import { getCategoriaLabel, getPrecoVariacao } from '@/entities/insumo/utils';
import { FlaskConical, ShieldCheck, Sprout, Fuel, Wrench } from 'lucide-react';

const categoriaIconMap: Record<string, React.ReactNode> = {
  fertilizante: <FlaskConical className="w-4 h-4 text-[#00f0ff]" strokeWidth={1.5} />,
  defensivo: <ShieldCheck className="w-4 h-4 text-[#22c55e]" strokeWidth={1.5} />,
  semente: <Sprout className="w-4 h-4 text-[#84cc16]" strokeWidth={1.5} />,
  combustivel: <Fuel className="w-4 h-4 text-[#f97316]" strokeWidth={1.5} />,
  equipamento: <Wrench className="w-4 h-4 text-[#94a3b8]" strokeWidth={1.5} />,
};

interface Props {
  items: Insumo[];
  onSelect: (insumo: Insumo) => void;
}

export function CotacaoComparison({ items, onSelect }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-[10px] font-mono font-bold text-[#475569] uppercase tracking-[0.2em] flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
        Comparação de Preços
      </h3>
      <div className="space-y-2">
        {items.map((item) => {
          const variacao = getPrecoVariacao(item.precoAtual, item.precoAnterior);
          return (
            <Card key={item.id} variant="interactive" padding="sm" onClick={() => onSelect(item)}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[rgba(0,240,255,0.06)] border border-[rgba(0,240,255,0.1)] flex items-center justify-center">
                  {categoriaIconMap[item.categoria] || <Wrench className="w-4 h-4 text-[#94a3b8]" strokeWidth={1.5} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm truncate">{item.nome}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-lg bg-[rgba(0,240,255,0.08)] text-[#00f0ff] border border-[rgba(0,240,255,0.12)]">
                      {getCategoriaLabel(item.categoria)}
                    </span>
                    <span className="text-[11px] text-[#475569] font-mono">{item.fornecedor.nome}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-white">{formatCurrency(item.precoAtual)}</div>
                  {variacao && (
                    <div className={`text-[11px] font-bold font-mono ${variacao.tipo === 'down' ? 'text-[#22c55e]' : variacao.tipo === 'up' ? 'text-[#ef4444]' : 'text-[#64748b]'}`}>
                      {variacao.tipo === 'down' ? '↓' : variacao.tipo === 'up' ? '↑' : '→'} {variacao.valor.toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
