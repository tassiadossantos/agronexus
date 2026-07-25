import { Card } from '@/shared/ui/Card';

interface Alerta {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'critico' | 'aviso' | 'info';
  timestamp: string;
  lido: boolean;
}

const mockAlertas: Alerta[] = [
  { id: 'al1', titulo: 'Estresse Hidrico Detectado', mensagem: 'NDVI identificou estresse na parcela Norte.', tipo: 'critico', timestamp: '2026-07-22T14:30:00Z', lido: false },
  { id: 'al2', titulo: 'Entrega Agendada', mensagem: 'Pedido chega em 3 dias.', tipo: 'info', timestamp: '2026-07-22T10:00:00Z', lido: false },
  { id: 'al3', titulo: 'Parcela Proxima do Vencimento', mensagem: 'Parcela 2 vence em 24 dias.', tipo: 'aviso', timestamp: '2026-07-21T09:00:00Z', lido: true },
];

const tipoConfig: Record<string, { icon: string; classes: string; dot: string }> = {
  critico: { icon: '🔴', classes: 'bg-[rgba(239,68,68,0.06)] border-[rgba(239,68,68,0.15)]', dot: 'bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.5)]' },
  aviso: { icon: '🟡', classes: 'bg-[rgba(234,179,8,0.06)] border-[rgba(234,179,8,0.15)]', dot: 'bg-[#eab308] shadow-[0_0_8px_rgba(234,179,8,0.5)]' },
  info: { icon: '🔵', classes: 'bg-[rgba(0,240,255,0.06)] border-[rgba(0,240,255,0.15)]', dot: 'bg-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.5)]' },
};

export function AlertasInteligentes() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-mono font-bold text-[#475569] uppercase tracking-[0.2em] flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse" />
          Alertas
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[rgba(239,68,68,0.1)] text-[#ef4444] border border-[rgba(239,68,68,0.2)]">
          {mockAlertas.filter((a) => !a.lido).length} novos
        </span>
      </div>

      <div className="space-y-2 stagger-children">
        {mockAlertas.map((alerta) => {
          const cfg = tipoConfig[alerta.tipo];
          return (
            <Card key={alerta.id} padding="sm" className={`border ${cfg.classes} ${!alerta.lido ? 'border-[rgba(0,240,255,0.15)]' : 'opacity-60'}`}>
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${cfg.dot}`} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white text-sm">{alerta.titulo}</h4>
                  <p className="text-xs text-[#64748b] mt-0.5">{alerta.mensagem}</p>
                  <p className="text-[10px] text-[#475569] mt-1 font-mono">
                    {new Date(alerta.timestamp).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
