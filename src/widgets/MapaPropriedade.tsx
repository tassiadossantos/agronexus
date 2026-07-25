import { RealMap } from '@/shared/ui/RealMap';
import { Card } from '@/shared/ui/Card';

interface Props {
  areasCriticas?: {
    id: string;
    lat: number;
    lng: number;
    nivel: 'critico' | 'atencao' | 'bom';
    descricao: string;
  }[];
  center?: [number, number];
}

export function MapaPropriedade({ areasCriticas = [], center = [-18.9186, -48.2772] }: Props) {
  const markers = areasCriticas.map((a) => ({
    lat: a.lat,
    lng: a.lng,
    label: a.descricao,
    color: a.nivel === 'critico' ? '#ef4444' : a.nivel === 'atencao' ? '#eab308' : '#22c55e',
    popup: `<div style="padding:4px"><b>${a.nivel.toUpperCase()}</b><br/>${a.descricao}</div>`,
  }));

  return (
    <Card variant="default" padding="none" className="overflow-hidden">
      <RealMap center={center} zoom={11} markers={markers} height="350px" />
    </Card>
  );
}
