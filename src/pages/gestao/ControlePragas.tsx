import { useGestao } from '@/features/gestao/useGestao';
import { Card, CardHeader, CardTitle } from '@/shared/ui/Card';
import { AlertTriangle } from 'lucide-react';

const riscoConfig: Record<string, { label: string; classes: string }> = {
  alto: { label: 'Alto', classes: 'bg-[rgba(239,68,68,0.1)] text-[#ef4444] border border-[rgba(239,68,68,0.2)]' },
  medio: { label: 'Medio', classes: 'bg-[rgba(234,179,8,0.1)] text-[#eab308] border border-[rgba(234,179,8,0.2)]' },
  baixo: { label: 'Baixo', classes: 'bg-[rgba(34,197,94,0.1)] text-[#22c55e] border border-[rgba(34,197,94,0.2)]' },
};

export function ControlePragas() {
  const { pragas, loadingPragas } = useGestao();

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl hud-surface-elevated p-6 md:p-8 border-neon-animated">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,9,15,0.95)] via-[rgba(6,9,15,0.85)] to-[rgba(6,9,15,0.7)]" />
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-[#ef4444]" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Controle de <span className="text-[#ef4444]">Pragas</span>
            </h1>
            <p className="text-sm text-[#475569] mt-1">Monitoramento e recomendações de manejo integrado</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card variant="hud" padding="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                Pragas Monitoradas
              </CardTitle>
            </CardHeader>
            {loadingPragas ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-28 rounded-xl animate-shimmer-dark" />)}
              </div>
            ) : (
              <div className="space-y-3 stagger-children">
                {pragas.map((praga) => {
                  const risco = riscoConfig[praga.nivelRisco] || riscoConfig.medio;
                  return (
                    <div key={praga.id} className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(239,68,68,0.15)] transition-all">
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] flex items-center justify-center text-lg shrink-0">
                          🦟
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-white text-sm">{praga.nome}</h4>
                            <span className="text-[10px] text-[#475569] italic font-mono">{praga.nomeCientifico}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${risco.classes}`}>
                              Risco {risco.label}
                            </span>
                          </div>
                          <p className="text-xs text-[#64748b] mt-1.5">{praga.descricao}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {praga.manejo.map((m, i) => (
                              <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-[rgba(0,240,255,0.05)] text-[#00f0ff] border border-[rgba(0,240,255,0.1)]">
                                {m}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 mt-2.5 text-[11px] text-[#475569] font-mono">
                            <span>🌾 {praga.cultura}</span>
                            <span className="text-[rgba(255,255,255,0.1)]">|</span>
                            <span>📍 {praga.regiao}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card variant="hud" padding="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#eab308]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                Estatisticas
              </CardTitle>
            </CardHeader>
            <div className="space-y-3">
              {[
                { label: 'Risco Alto', count: pragas.filter((p) => p.nivelRisco === 'alto').length, color: '#ef4444', bg: 'bg-[rgba(239,68,68,0.1)]', border: 'border-[rgba(239,68,68,0.2)]' },
                { label: 'Risco Medio', count: pragas.filter((p) => p.nivelRisco === 'medio').length, color: '#eab308', bg: 'bg-[rgba(234,179,8,0.1)]', border: 'border-[rgba(234,179,8,0.2)]' },
                { label: 'Risco Baixo', count: pragas.filter((p) => p.nivelRisco === 'baixo').length, color: '#22c55e', bg: 'bg-[rgba(34,197,94,0.1)]', border: 'border-[rgba(34,197,94,0.2)]' },
              ].map((item) => (
                <div key={item.label} className={`flex items-center justify-between p-3 rounded-xl ${item.bg} border ${item.border}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}40` }} />
                    <span className="text-sm font-medium text-[#cbd5e1]">{item.label}</span>
                  </div>
                  <span className="text-lg font-black" style={{ color: item.color }}>{item.count}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="hud" padding="lg" className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80"
              alt="Manejo integrado"
              className="w-full h-40 object-cover rounded-xl mb-4 border border-[rgba(255,255,255,0.06)]"
            />
            <h4 className="font-bold text-white text-sm">Manejo Integrado de Pragas</h4>
            <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">Monitoramento regular, controles biologicos e quimicos estrategicos para manejo eficiente.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
