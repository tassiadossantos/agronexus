import { useState } from 'react';
import type { Insumo } from '@/entities/insumo/types';
import { formatCurrency } from '@/shared/utils/currency';
import { getCategoriaLabel } from '@/entities/insumo/utils';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { FlaskConical, ShieldCheck, Sprout, Fuel, Wrench } from 'lucide-react';

const categoriaIconMap: Record<string, React.ReactNode> = {
  fertilizante: <FlaskConical className="w-5 h-5 text-[#00f0ff]" strokeWidth={1.5} />,
  defensivo: <ShieldCheck className="w-5 h-5 text-[#22c55e]" strokeWidth={1.5} />,
  semente: <Sprout className="w-5 h-5 text-[#84cc16]" strokeWidth={1.5} />,
  combustivel: <Fuel className="w-5 h-5 text-[#f97316]" strokeWidth={1.5} />,
  equipamento: <Wrench className="w-5 h-5 text-[#94a3b8]" strokeWidth={1.5} />,
};

interface CotacaoFormProps {
  insumo: Insumo;
  onConfirm: (quantidade: number) => void;
  onCancel: () => void;
}

export function CotacaoForm({ insumo, onConfirm, onCancel }: CotacaoFormProps) {
  const [quantidade, setQuantidade] = useState(100);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(0,240,255,0.05)] border border-[rgba(0,240,255,0.1)]">
        <div className="w-12 h-12 rounded-xl bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.15)] flex items-center justify-center">
          {categoriaIconMap[insumo.categoria] || <Wrench className="w-5 h-5 text-[#94a3b8]" strokeWidth={1.5} />}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-white text-sm">{insumo.nome}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[rgba(0,240,255,0.08)] text-[#00f0ff] border border-[rgba(0,240,255,0.12)]">
              {getCategoriaLabel(insumo.categoria)}
            </span>
            <span className="text-[10px] text-[#475569] font-mono">•</span>
            <span className="text-[11px] text-[#64748b]">{insumo.fornecedor.nome}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-black text-[#00f0ff]">{formatCurrency(insumo.precoAtual)}</div>
          <div className="text-[10px] text-[#475569] font-mono">por {insumo.unidade}</div>
        </div>
      </div>

      <Input
        label={`Quantidade (${insumo.unidade})`}
        type="number"
        value={quantidade}
        onChange={(e) => setQuantidade(Number(e.target.value))}
        min={1}
      />

      <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
        <div className="flex justify-between text-sm">
          <span className="text-[#64748b]">Preço unitário</span>
          <span className="font-medium text-white font-mono">{formatCurrency(insumo.precoAtual)}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-[#64748b]">Quantidade</span>
          <span className="font-medium text-white font-mono">{quantidade} {insumo.unidade}</span>
        </div>
        <div className="border-t border-[rgba(255,255,255,0.06)] mt-3 pt-3 flex justify-between">
          <span className="font-semibold text-white">Total estimado</span>
          <span className="text-lg font-black text-[#00f0ff]">{formatCurrency(insumo.precoAtual * quantidade)}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" fullWidth onClick={onCancel}>Cancelar</Button>
        <Button variant="arc" fullWidth onClick={() => onConfirm(quantidade)}>Adicionar ao Carrinho</Button>
      </div>
    </div>
  );
}
