import type { Insumo } from '@/entities/insumo/types';
import { formatCurrency } from '@/shared/utils/currency';
import { getPrecoVariacao, getCategoriaLabel } from '@/entities/insumo/utils';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { FlaskConical, ShieldCheck, Sprout, Fuel, Wrench, Star } from 'lucide-react';

const categoriaIconMap: Record<string, React.ReactNode> = {
  fertilizante: <FlaskConical className="w-5 h-5 text-[#00f0ff]" strokeWidth={1.5} />,
  defensivo: <ShieldCheck className="w-5 h-5 text-[#22c55e]" strokeWidth={1.5} />,
  semente: <Sprout className="w-5 h-5 text-[#84cc16]" strokeWidth={1.5} />,
  combustivel: <Fuel className="w-5 h-5 text-[#f97316]" strokeWidth={1.5} />,
  equipamento: <Wrench className="w-5 h-5 text-[#94a3b8]" strokeWidth={1.5} />,
};

interface Props {
  insumo: Insumo;
  onSelect: (insumo: Insumo) => void;
}

export function CotacaoCard({ insumo, onSelect }: Props) {
  const variacao = getPrecoVariacao(insumo.precoAtual, insumo.precoAnterior);

  return (
    <Card variant="interactive" padding="md" onClick={() => onSelect(insumo)}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-xl bg-[rgba(0,240,255,0.08)] border border-[rgba(0,240,255,0.12)] flex items-center justify-center">
          {categoriaIconMap[insumo.categoria] || <Wrench className="w-5 h-5 text-[#94a3b8]" strokeWidth={1.5} />}
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[rgba(0,240,255,0.08)] text-[#00f0ff] border border-[rgba(0,240,255,0.12)]">
          {getCategoriaLabel(insumo.categoria)}
        </span>
      </div>

      <h4 className="font-bold text-white text-sm leading-tight">{insumo.nome}</h4>
      <p className="text-xs text-[#475569] mt-1 line-clamp-2">{insumo.description}</p>

      <div className="flex items-center gap-0.5 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${(insumo.avaliacao || 0) >= i + 1 ? 'text-[#eab308] fill-[#eab308]' : 'text-[rgba(255,255,255,0.08)]'}`}
            strokeWidth={0}
          />
        ))}
        <span className="text-[10px] text-[#475569] ml-1 font-mono">{insumo.avaliacao?.toFixed(1)}</span>
      </div>

      <div className="flex items-end justify-between mt-3 pt-3 border-t border-[rgba(255,255,255,0.04)]">
        <div>
          <div className="text-xl font-black text-white">{formatCurrency(insumo.precoAtual)}</div>
          <div className="text-[10px] text-[#475569] font-mono">por {insumo.unidade}</div>
        </div>
        {variacao && (
          <div className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-lg ${
            variacao.tipo === 'down' ? 'bg-[rgba(34,197,94,0.1)] text-[#22c55e] border border-[rgba(34,197,94,0.2)]'
              : variacao.tipo === 'up' ? 'bg-[rgba(239,68,68,0.1)] text-[#ef4444] border border-[rgba(239,68,68,0.2)]'
              : 'bg-[rgba(255,255,255,0.04)] text-[#64748b] border border-[rgba(255,255,255,0.06)]'
          }`}>
            {variacao.tipo === 'down' ? '↓' : variacao.tipo === 'up' ? '↑' : '→'} {variacao.valor.toFixed(1)}%
          </div>
        )}
      </div>

      <Button variant="arc" size="sm" fullWidth className="mt-3" onClick={(e) => { e.stopPropagation(); onSelect(insumo); }}>
        Cotar Agora
      </Button>
    </Card>
  );
}
