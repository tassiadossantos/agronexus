import type { NDVIResult, Recomendacao, HistoricoMapa, AreaCritica } from './types';

const mockAreasCriticas: AreaCritica[] = [
  { id: 'a1', latitude: -18.92, longitude: -48.28, nivel: 'critico', descricao: 'Estresse hidrico severo na parcela Norte', recomendacao: 'Aplicar irrigacao emergencial imediata' },
  { id: 'a2', latitude: -18.915, longitude: -48.275, nivel: 'atencao', descricao: 'Deficiencia de nitrogenio detectada', recomendacao: 'Adubacao foliar com ureia a 2%' },
  { id: 'a3', latitude: -18.925, longitude: -48.285, nivel: 'bom', descricao: 'Area com vegetacao saudavel', recomendacao: 'Manter manejo atual' },
];

export const mockNDVI: NDVIResult = {
  id: 'ndvi1', imagemId: 'img1', ndviMedio: 0.72, ndviMinimo: 0.15, ndviMaximo: 0.91,
  areasCriticas: mockAreasCriticas, mapaUrl: '/mock-ndvi-map.png', dataProcessamento: '2026-07-22T14:30:00Z',
};

export const mockRecomendacoes: Recomendacao[] = [
  {
    id: 'r1', tipo: 'irrigacao', titulo: 'Irrigacao Emergencial - Parcela Norte',
    descricao: 'NDVI identificou estresse hidrico severo. Aplicar 15mm de agua nos proximos 3 dias.',
    prioridade: 'alta', area: 'Parcela Norte (12 ha)', dataSugerida: '2026-07-23',
  },
  {
    id: 'r2', tipo: 'adubacao', titulo: 'Correcao de Nitrogenio - Lote Central',
    descricao: 'Aplicar ureia foliar a 2% via pulverizacao terrestre.',
    prioridade: 'media', area: 'Lote Central (25 ha)', dataSugerida: '2026-07-25',
  },
  {
    id: 'r3', tipo: 'defensivo', titulo: 'Monitoramento de Pragas',
    descricao: 'Nenhum foco ativo detectado. Manter vigilancia semanal.',
    prioridade: 'baixa',
  },
];

export const mockHistoricoMapas: HistoricoMapa[] = [
  { id: 'h1', data: '2026-07-22', ndviMedio: 0.72, thumbnailUrl: '/thumb1.png', resumo: 'NDVI medio: 0.72 - Estresse localizado detectado' },
  { id: 'h2', data: '2026-07-15', ndviMedio: 0.78, thumbnailUrl: '/thumb2.png', resumo: 'NDVI medio: 0.78 - Condicoes normais' },
  { id: 'h3', data: '2026-07-08', ndviMedio: 0.69, thumbnailUrl: '/thumb3.png', resumo: 'NDVI medio: 0.69 - Recuperacao pos-chuva' },
  { id: 'h4', data: '2026-07-01', ndviMedio: 0.81, thumbnailUrl: '/thumb4.png', resumo: 'NDVI medio: 0.81 - Excelente condicao vegetal' },
  { id: 'h5', data: '2026-06-24', ndviMedio: 0.75, thumbnailUrl: '/thumb5.png', resumo: 'NDVI medio: 0.75 - Periodo de crescimento' },
];
