import { useCredito } from '@/features/credito/useCredito';
import { ScoreGauge } from '@/widgets/ScoreGauge';
import { Card } from '@/shared/ui/Card';
import { Zap } from 'lucide-react';

export function ScoreProdutor() {
  const { scoreBreakdown } = useCredito();
  const score = scoreBreakdown.length > 0 ? Math.round(scoreBreakdown.reduce((a, b) => a + b.valor * b.peso, 0)) : 78;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Meu Score de <span className="text-[#00f0ff]">Crédito</span></h1>
        <p className="text-sm text-[#475569] mt-1">Baseado em dados de safra, clima, área e histórico</p>
      </div>

      <Card variant="hud" padding="xl" glow="neon" className="max-w-lg mx-auto">
        <ScoreGauge score={score} breakdown={scoreBreakdown} />
      </Card>

      <Card variant="hud" padding="lg">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#00f0ff]" strokeWidth={2} />
          Como melhorar seu score
        </h3>
        <ul className="space-y-3 text-sm text-[#94a3b8]">
          {[
            'Mantenha histórico de safra consistente e documentado',
            'Mantenha seguro da safra ativo durante o ciclo',
            'Use o sistema de gestão para registrar atividades',
            'Realize análises NDVI regulares para demonstrar manejo',
            'Pague parcelas no prazo para histórico positivo',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-lg bg-[rgba(0,240,255,0.1)] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-[#00f0ff]">{i + 1}</span>
              </div>
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
