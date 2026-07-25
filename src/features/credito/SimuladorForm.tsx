import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';
import { Card } from '@/shared/ui/Card';
import { formatCurrency } from '@/shared/utils/currency';
import { useState } from 'react';

interface Props {
  onSimular: (params: { valor: number; prazo: number; cultura: string }) => void;
  isLoading: boolean;
}

const culturaOptions = [
  { value: 'soja', label: 'Soja' },
  { value: 'milho', label: 'Milho' },
  { value: 'algodao', label: 'Algodao' },
  { value: 'cana', label: 'Cana-de-acucar' },
  { value: 'cafe', label: 'Cafe' },
];

const prazoOptions = [
  { value: '6', label: '6 meses' },
  { value: '12', label: '12 meses' },
  { value: '18', label: '18 meses' },
  { value: '24', label: '24 meses' },
];

export function SimuladorForm({ onSimular, isLoading }: Props) {
  const [valor, setValor] = useState(250000);
  const [prazo, setPrazo] = useState('12');
  const [cultura, setCultura] = useState('soja');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSimular({ valor, prazo: Number(prazo), cultura });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="p-4 rounded-xl bg-[rgba(168,85,247,0.05)] border border-[rgba(168,85,247,0.15)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[rgba(168,85,247,0.15)] border border-[rgba(168,85,247,0.25)] flex items-center justify-center text-[#a855f7]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Simulador de Crédito</h4>
            <p className="text-xs text-[#475569]">Crédito baseado em previsão de colheita</p>
          </div>
        </div>
      </div>

      <Input
        label="Valor solicitado (R$)"
        type="number"
        value={valor}
        onChange={(e) => setValor(Number(e.target.value))}
        min={10000}
        step={10000}
      />

      <Select label="Prazo" options={prazoOptions} value={prazo} onChange={(e) => setPrazo(e.target.value)} />
      <Select label="Cultura de referencia" options={culturaOptions} value={cultura} onChange={(e) => setCultura(e.target.value)} />

      <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
        <div className="flex justify-between text-sm">
          <span className="text-[#64748b]">Valor estimado da safra</span>
          <span className="font-medium text-white">{formatCurrency(valor * 2.2)}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-[#64748b]">Risco estimado</span>
          <span className="font-medium text-[#22c55e]">Baixo</span>
        </div>
      </div>

      <Button type="submit" fullWidth size="lg" loading={isLoading} variant="arc">
        Simular Crédito
      </Button>
    </form>
  );
}
