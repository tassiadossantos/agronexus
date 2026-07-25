import { Card } from '@/shared/ui/Card';
import { getNivelLabel } from '@/entities/analise/ndvi';
import { RealMap } from '@/shared/ui/RealMap';

interface Props {
  areasCriticas: {
    id: string;
    lat: number;
    lng: number;
    nivel: 'critico' | 'atencao' | 'bom';
    descricao: string;
  }[];
}

export function MapaNDVI({ areasCriticas }: Props) {
  const markers = areasCriticas.map((a) => ({
    lat: a.lat,
    lng: a.lng,
    label: a.descricao,
    color: a.nivel === 'critico' ? '#ef4444' : a.nivel === 'atencao' ? '#eab308' : '#22c55e',
    popup: `<div style="padding:8px;min-width:140px;background:#0f172a;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:white;font-family:Inter,sans-serif"><strong style="color:${a.nivel === 'critico' ? '#ef4444' : a.nivel === 'atencao' ? '#eab308' : '#22c55e'}">${a.nivel.toUpperCase()}</strong><br/><small style="color:#94a3b8">${a.descricao}</small></div>`,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Mapa <span className="text-[#22c55e]">NDVI</span></h1>
        <p className="text-sm text-[#475569] mt-1">Visualizacao interativa de areas criticas</p>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] hud-surface">
        <RealMap center={[-18.9186, -48.2772]} zoom={12} markers={markers} height="450px" />
        <div className="absolute bottom-3 left-3 z-[1000] flex gap-2">
          {[
            { cor: '#ef4444', label: 'Critico' },
            { cor: '#eab308', label: 'Atencao' },
            { cor: '#22c55e', label: 'Bom' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(15,23,42,0.9)] backdrop-blur-sm border border-[rgba(255,255,255,0.08)] text-[11px] font-semibold text-[#cbd5e1]">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.cor, boxShadow: `0 0 8px ${item.cor}40` }} />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 stagger-children">
        {areasCriticas.map((area) => {
          const estilo = getNivelLabel(area.nivel);
          return (
            <Card key={area.id} padding="md" variant="hud">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2.5 h-2.5 rounded-full ${area.nivel === 'critico' ? 'bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.5)]' : area.nivel === 'atencao' ? 'bg-[#eab308] shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.5)]'} animate-pulse`} />
                <span className={`text-xs font-bold ${estilo.cor}`}>{estilo.label}</span>
              </div>
              <p className="text-xs text-[#94a3b8]">{area.descricao}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
