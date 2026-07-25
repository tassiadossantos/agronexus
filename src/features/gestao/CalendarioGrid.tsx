import { Card } from '@/shared/ui/Card';

interface Atividade {
  id: string;
  titulo: string;
  data: string;
  tipo: string;
  status: string;
  propriedade: string;
}

interface Props {
  atividades: Atividade[];
}

const tipoConfig: Record<string, { icon: string; color: string }> = {
  plantio: { icon: '🌱', color: '#22c55e' },
  adubacao: { icon: '🧪', color: '#00f0ff' },
  colheita: { icon: '🌾', color: '#eab308' },
  defensivo: { icon: '🛡', color: '#ef4444' },
  irrigacao: { icon: '💧', color: '#3b82f6' },
  manejo: { icon: '📋', color: '#64748b' },
};

const statusConfig: Record<string, { label: string; classes: string }> = {
  concluido: { label: 'Concluido', classes: 'bg-[rgba(34,197,94,0.1)] text-[#22c55e] border border-[rgba(34,197,94,0.2)]' },
  em_andamento: { label: 'Em andamento', classes: 'bg-[rgba(0,240,255,0.1)] text-[#00f0ff] border border-[rgba(0,240,255,0.2)]' },
  pendente: { label: 'Pendente', classes: 'bg-[rgba(255,255,255,0.04)] text-[#64748b] border border-[rgba(255,255,255,0.06)]' },
  atrasado: { label: 'Atrasado', classes: 'bg-[rgba(239,68,68,0.1)] text-[#ef4444] border border-[rgba(239,68,68,0.2)]' },
};

export function CalendarioGrid({ atividades }: Props) {
  return (
    <div className="space-y-2 stagger-children">
      {atividades.map((atividade) => {
        const tipo = tipoConfig[atividade.tipo] || tipoConfig.manejo;
        const status = statusConfig[atividade.status] || statusConfig.pendente;
        const data = new Date(atividade.data);
        const dia = data.getDate();
        const mes = data.toLocaleDateString('pt-BR', { month: 'short' });

        return (
          <Card key={atividade.id} variant="interactive" padding="sm">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 border" style={{ background: `${tipo.color}10`, borderColor: `${tipo.color}20` }}>
                <div className="text-lg leading-none font-black" style={{ color: tipo.color }}>{dia}</div>
                <div className="text-[9px] font-mono font-medium uppercase opacity-60" style={{ color: tipo.color }}>{mes}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-sm">{atividade.titulo}</div>
                <div className="text-xs text-[#475569] font-mono mt-0.5">{atividade.propriedade}</div>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${status.classes}`}>
                {status.label}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
