import { useCotacao } from '@/features/cotacao/useCotacao';
import { Card } from '@/shared/ui/Card';
import { formatDate } from '@/shared/utils/date';

export function RastreioEntrega() {
  const { pedidos } = useCotacao();
  const pedidosEnviados = pedidos.filter((p) => p.status === 'enviado' || p.status === 'confirmado');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Rastreio de <span className="text-[#00f0ff]">Entregas</span></h1>
        <p className="text-sm text-[#475569] mt-1">Acompanhe suas entregas em tempo real</p>
      </div>

      {pedidosEnviados.length === 0 ? (
        <Card padding="xl" className="text-center">
          <div className="text-4xl mb-3 opacity-30">📦</div>
          <p className="text-[#475569] font-medium">Nenhuma entrega em andamento</p>
        </Card>
      ) : (
        <div className="space-y-4 stagger-children">
          {pedidosEnviados.map((pedido) => (
            <Card key={pedido.id} variant="elevated" padding="lg" glow="neon">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.2)] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#00f0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-white">Pedido {pedido.id.toUpperCase()}</h3>
                  <p className="text-xs text-[#475569] font-mono">{formatDate(pedido.dataCriacao)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-[rgba(0,240,255,0.05)] border border-[rgba(0,240,255,0.1)]">
                <svg className="w-4 h-4 text-[#00f0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                <span className="text-sm font-mono font-semibold text-[#00f0ff]">{pedido.trackingCode || 'AGN20260720001'}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="flex-1 h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#22c55e] relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
                  </div>
                </div>
                <span className="text-[#475569] font-mono text-xs">Previsao: {formatDate(pedido.dataPrevisaoEntrega || '')}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
