import { useGestao } from '@/features/gestao/useGestao';
import { RelatorioChart } from '@/features/gestao/RelatorioChart';
import { Card, CardHeader, CardTitle } from '@/shared/ui/Card';
import { MapaPropriedade } from '@/widgets/MapaPropriedade';
import { BarChart3 } from 'lucide-react';

export function RelatorioProdutividade() {
  const { relatorio } = useGestao();

  const mapaDados = [
    { id: '1', lat: -18.92, lng: -48.28, nivel: 'bom' as const, descricao: 'Fazenda São Jorge - 58 sc/ha' },
    { id: '2', lat: -18.95, lng: -48.30, nivel: 'atencao' as const, descricao: 'Fazenda Santa Maria - 48 sc/ha' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl hud-surface-elevated p-6 md:p-8 border-neon-animated">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,9,15,0.95)] via-[rgba(6,9,15,0.85)] to-[rgba(6,9,15,0.7)]" />
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[rgba(234,179,8,0.1)] border border-[rgba(234,179,8,0.2)] flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-[#eab308]" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Relatórios de <span className="text-[#eab308]">Produtividade</span>
            </h1>
            <p className="text-sm text-[#475569] mt-1">Analytics comparativos regionais</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="hud" padding="lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#eab308]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              Desempenho por Periodo
            </CardTitle>
          </CardHeader>
          <RelatorioChart periodos={relatorio.periodos} comparativo={relatorio.comparativoRegiao} />
        </Card>

        <div className="space-y-6">
          <Card variant="hud" padding="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                Mapa de Produtividade
              </CardTitle>
            </CardHeader>
            <MapaPropriedade areasCriticas={mapaDados} center={[-18.93, -48.29]} />
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card padding="md" className="text-center" glow="neon">
              <div className="text-3xl font-black text-[#00f0ff]">{relatorio.comparativoRegiao.fazenda}</div>
              <div className="text-[10px] font-mono text-[#475569] mt-0.5 uppercase tracking-wider">Sua Fazenda</div>
              <div className="text-[10px] font-bold text-[#22c55e] mt-1.5">+7% acima da media</div>
            </Card>
            <Card padding="md" className="text-center">
              <div className="text-3xl font-black text-[#64748b]">{relatorio.comparativoRegiao.regiao}</div>
              <div className="text-[10px] font-mono text-[#475569] mt-0.5 uppercase tracking-wider">Media Regional</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
