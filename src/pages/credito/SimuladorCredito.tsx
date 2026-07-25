import { useCredito } from '@/features/credito/useCredito';
import { SimuladorForm } from '@/features/credito/SimuladorForm';
import { ScoreGauge } from '@/widgets/ScoreGauge';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { formatCurrency } from '@/shared/utils/currency';
import { DollarSign } from 'lucide-react';

export function SimuladorCredito() {
  const { simulacao, simular, isSimulating, scoreBreakdown, propostas } = useCredito();

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl hud-surface-elevated p-6 md:p-8 border-neon-animated">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,9,15,0.95)] via-[rgba(6,9,15,0.85)] to-[rgba(6,9,15,0.7)]" />
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[rgba(168,85,247,0.1)] border border-[rgba(168,85,247,0.2)] flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-[#a855f7]" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Crédito <span className="text-[#a855f7]">Agrícola</span>
            </h1>
            <p className="text-sm text-[#475569] mt-1">Baseado em previsão de colheita — não em taxa fixa</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="hud" padding="lg">
          <h3 className="text-[10px] font-mono font-bold text-[#475569] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
            Seu Score
          </h3>
          <ScoreGauge score={scoreBreakdown.length > 0 ? Math.round(scoreBreakdown.reduce((a, b) => a + b.valor * b.peso, 0)) : 78} breakdown={scoreBreakdown} />
        </Card>

        <div className="lg:col-span-2">
          {simulacao ? (
            <Card variant="hud" padding="lg" glow="neon">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] mb-4">
                  <span className="text-[#22c55e] font-bold">✓</span>
                  <span className="text-sm font-semibold text-[#22c55e]">Simulacao Calculada</span>
                </div>
                <div className="text-4xl font-black text-white">{formatCurrency(simulacao.valorSolicitado)}</div>
                <p className="text-sm text-[#475569] mt-1 font-mono">Cultura: {simulacao.culturaReferencia}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Taxa a.m.', value: `${simulacao.taxaJuros}%`, color: 'text-white' },
                  { label: 'Prazo', value: `${simulacao.prazoMeses}m`, color: 'text-white' },
                  { label: 'Parcela', value: formatCurrency(simulacao.parcelaMensal), color: 'text-[#00f0ff]' },
                  { label: 'Total', value: formatCurrency(simulacao.valorTotal), color: 'text-white' },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
                    <div className={`text-base font-bold ${item.color}`}>{item.value}</div>
                    <div className="text-[10px] font-mono text-[#475569] mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
              <Button fullWidth size="lg" variant="arc">Solicitar Proposta</Button>
            </Card>
          ) : (
            <Card variant="hud" padding="lg">
              <SimuladorForm onSimular={simular} isLoading={isSimulating} />
            </Card>
          )}
        </div>
      </div>

      {propostas.length > 0 && (
        <div>
          <h3 className="text-[10px] font-mono font-bold text-[#475569] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            Propostas Ativas
          </h3>
          <div className="space-y-3">
            {propostas.map((proposta) => (
              <Card key={proposta.id} variant="interactive" padding="md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black text-[#00f0ff]">{formatCurrency(proposta.condicoes.valorAprovado)}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[rgba(34,197,94,0.1)] text-[#22c55e] border border-[rgba(34,197,94,0.2)]">Aprovada</span>
                    </div>
                    <p className="text-xs text-[#475569] mt-1 font-mono">{proposta.condicoes.garantia}</p>
                  </div>
                  <Button size="sm" variant="outline">Ver Detalhes</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
