import { useDroneAnalysis } from '@/features/drone/useDroneAnalysis';
import { ImageUploader } from '@/features/drone/ImageUploader';
import { NDVIViewer } from '@/features/drone/NDVIViewer';
import { Recomendacoes } from './Recomendacoes';
import { HistoricoMapas } from './HistoricoMapas';
import { MapaPropriedade } from '@/widgets/MapaPropriedade';
import { Card, CardHeader, CardTitle } from '@/shared/ui/Card';
import { AlertasInteligentes } from '@/widgets/AlertasInteligentes';
import { Satellite } from 'lucide-react';

export function UploadAnalise() {
  const { ndviResult, analisarImagem, isAnalyzing, recomendacoes } = useDroneAnalysis();

  const areasCriticas = ndviResult?.areasCriticas.map((a) => ({
    id: a.id,
    lat: a.latitude,
    lng: a.longitude,
    nivel: a.nivel,
    descricao: a.descricao,
  })) || [];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl hud-surface-elevated p-6 md:p-8 border-neon-animated">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,9,15,0.95)] via-[rgba(6,9,15,0.8)] to-[rgba(6,9,15,0.6)]" />
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] flex items-center justify-center">
            <Satellite className="w-5 h-5 text-[#22c55e]" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Assistência <span className="text-[#22c55e]">Técnica</span> Remota
            </h1>
            <p className="text-sm text-[#475569] mt-1">Análise NDVI por drone e satélite com IA</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card variant="hud" padding="lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#00f0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Upload de Imagem
              </CardTitle>
              <p className="text-sm text-[#475569]">Envie imagens de drone ou satélite para análise NDVI</p>
            </CardHeader>
            <ImageUploader onUpload={analisarImagem} isAnalyzing={isAnalyzing} />
          </Card>

          {ndviResult && (
            <Card variant="hud" padding="lg" glow="arc">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  Resultado da Análise NDVI
                </CardTitle>
              </CardHeader>
              <NDVIViewer result={ndviResult} />
            </Card>
          )}

          {areasCriticas.length > 0 && (
            <Card variant="hud" padding="lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#eab308]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  Mapa de Areas Criticas
                </CardTitle>
              </CardHeader>
              <MapaPropriedade areasCriticas={areasCriticas} />
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Recomendacoes recomendacoes={recomendacoes} />
          <AlertasInteligentes />
        </div>
      </div>
    </div>
  );
}
