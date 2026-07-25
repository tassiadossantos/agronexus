import type { CreditoSimulacao } from '@/entities/credito/types';
import { formatCurrency } from '@/shared/utils/currency';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { getScoreLabel } from '@/entities/credito/score';

interface Props {
  simulacao: CreditoSimulacao;
  onContratar: () => void;
}

export function ContratoDigital({ simulacao, onContratar }: Props) {
  const scoreInfo = getScoreLabel(simulacao.scoreBase);

  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)]">
          <span className="text-[#22c55e] font-bold">✓</span>
          <span className="text-sm font-semibold text-[#22c55e]">Crédito Aprovado</span>
        </div>
      </div>

      <Card variant="hud" padding="lg" glow="arc">
        <div className="text-center space-y-3">
          <div className="text-3xl font-black text-white">{formatCurrency(simulacao.valorSolicitado)}</div>
          <div className="text-sm text-[#64748b]">Valor aprovado</div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          {[
            { label: 'Taxa de juros', value: `${simulacao.taxaJuros}% a.m.` },
            { label: 'Prazo', value: `${simulacao.prazoMeses} meses` },
            { label: 'Parcela mensal', value: formatCurrency(simulacao.parcelaMensal), color: 'text-[#00f0ff]' },
            { label: 'Score', value: `${simulacao.scoreBase}`, color: scoreInfo.cor },
          ].map((item) => (
            <div key={item.label} className="text-center p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)]">
              <div className={`text-base font-bold ${item.color || 'text-white'}`}>{item.value}</div>
              <div className="text-[10px] font-mono text-[#475569] mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-2">
        <h4 className="font-semibold text-white text-sm">Termos e Condicoes</h4>
        <ul className="text-xs text-[#64748b] space-y-1.5">
          {[
            `Crédito atrelado à previsão de colheita de ${simulacao.culturaReferencia}`,
            'Parcelas com vencimento mensal a partir da proxima colheita',
            'Seguro obrigatorio da safra durante o periodo',
            'Assinatura via OTP SMS enviada ao telefone cadastrado',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="w-4 h-4 rounded bg-[rgba(0,240,255,0.1)] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[8px] font-bold text-[#00f0ff]">{i + 1}</span>
              </div>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Button variant="arc" fullWidth size="lg" onClick={onContratar}>
        Assinar Contrato via OTP
      </Button>
    </div>
  );
}
