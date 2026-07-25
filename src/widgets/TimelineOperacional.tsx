import { Card } from '@/shared/ui/Card';
import { formatRelativeTime } from '@/shared/utils/date';

interface TimelineItem {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  tipo: string;
  status: string;
  propriedade: string;
}

interface Props {
  items: TimelineItem[];
}

const tipoIcon: Record<string, { icon: string; color: string }> = {
  plantio: { icon: '🌱', color: '#22c55e' },
  adubacao: { icon: '🧪', color: '#00f0ff' },
  colheita: { icon: '🌾', color: '#eab308' },
  defensivo: { icon: '🛡', color: '#ef4444' },
  irrigacao: { icon: '💧', color: '#3b82f6' },
  manejo: { icon: '📋', color: '#64748b' },
};

const statusDot: Record<string, string> = {
  concluido: '#22c55e',
  em_andamento: '#00f0ff',
  pendente: '#475569',
  atrasado: '#ef4444',
};

export function TimelineOperacional({ items }: Props) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gradient-to-b from-[rgba(0,240,255,0.2)] via-[rgba(255,255,255,0.06)] to-transparent" />

      <div className="space-y-6 stagger-children">
        {items.map((item) => {
          const tipo = tipoIcon[item.tipo] || tipoIcon.manejo;
          const dot = statusDot[item.status] || statusDot.pendente;

          return (
            <div key={item.id} className="relative">
              <div className="absolute -left-[1.375rem] w-7 h-7 rounded-xl bg-[#0a0f1a] border flex items-center justify-center text-sm z-10" style={{ borderColor: `${tipo.color}30`, boxShadow: `0 0 10px ${tipo.color}20` }}>
                {tipo.icon}
              </div>
              <Card variant="interactive" padding="sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white text-sm">{item.titulo}</h4>
                      <div className="w-2 h-2 rounded-full" style={{ background: dot, boxShadow: `0 0 6px ${dot}60` }} />
                    </div>
                    <p className="text-xs text-[#64748b] mt-0.5">{item.descricao}</p>
                    <p className="text-[11px] text-[#475569] mt-1 font-mono">{item.propriedade}</p>
                  </div>
                  <span className="text-[11px] text-[#475569] shrink-0 font-mono">{formatRelativeTime(item.data)}</span>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
