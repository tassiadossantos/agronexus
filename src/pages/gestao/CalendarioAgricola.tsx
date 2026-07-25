import { useGestao } from '@/features/gestao/useGestao';
import { CalendarioGrid } from '@/features/gestao/CalendarioGrid';
import { Card, CardHeader, CardTitle } from '@/shared/ui/Card';
import { MapaPropriedade } from '@/widgets/MapaPropriedade';
import { AlertasInteligentes } from '@/widgets/AlertasInteligentes';
import { Button } from '@/shared/ui/Button';
import { Calendar } from 'lucide-react';

export function CalendarioAgricola() {
  const { atividades, loadingAtividades } = useGestao();

  const atividadesMapa = [
    { id: '1', lat: -18.92, lng: -48.28, nivel: 'bom' as const, descricao: 'Fazenda São Jorge - Atividade em andamento' },
    { id: '2', lat: -18.95, lng: -48.30, nivel: 'atencao' as const, descricao: 'Fazenda Santa Maria - Atenção necessária' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl hud-surface-elevated p-6 md:p-8 border-neon-animated">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,9,15,0.95)] via-[rgba(6,9,15,0.85)] to-[rgba(6,9,15,0.7)]" />
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.2)] flex items-center justify-center">
            <Calendar className="w-5 h-5 text-[#00f0ff]" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Calendário <span className="text-[#00f0ff]">Agrícola</span>
            </h1>
            <p className="text-sm text-[#475569] mt-1">Planejamento de safra com alertas inteligentes</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card variant="hud" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#00f0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Atividades
              </CardTitle>
              <Button size="sm" variant="neon">+ Nova</Button>
            </div>
            {loadingAtividades ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 rounded-xl animate-shimmer-dark" />)}
              </div>
            ) : (
              <CalendarioGrid atividades={atividades} />
            )}
          </Card>

          <Card variant="hud" padding="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                Mapa da Propriedade
              </CardTitle>
            </CardHeader>
            <MapaPropriedade areasCriticas={atividadesMapa} center={[-18.93, -48.29]} />
          </Card>
        </div>

        <div className="space-y-6">
          <AlertasInteligentes />

          <Card variant="hud" padding="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#eab308]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                Resumo do Mes
              </CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Concluidas', value: atividades.filter((a) => a.status === 'concluido').length, color: 'text-[#22c55e]', bg: 'bg-[rgba(34,197,94,0.1)]', border: 'border-[rgba(34,197,94,0.2)]' },
                { label: 'Em Andamento', value: atividades.filter((a) => a.status === 'em_andamento').length, color: 'text-[#00f0ff]', bg: 'bg-[rgba(0,240,255,0.1)]', border: 'border-[rgba(0,240,255,0.2)]' },
                { label: 'Pendentes', value: atividades.filter((a) => a.status === 'pendente').length, color: 'text-[#64748b]', bg: 'bg-[rgba(255,255,255,0.04)]', border: 'border-[rgba(255,255,255,0.06)]' },
                { label: 'Atrasadas', value: atividades.filter((a) => a.status === 'atrasado').length, color: 'text-[#ef4444]', bg: 'bg-[rgba(239,68,68,0.1)]', border: 'border-[rgba(239,68,68,0.2)]' },
              ].map((item) => (
                <div key={item.label} className={`text-center p-3 rounded-xl ${item.bg} border ${item.border}`}>
                  <div className={`text-2xl font-black ${item.color}`}>{item.value}</div>
                  <div className="text-[10px] font-mono text-[#475569] uppercase tracking-wider">{item.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
