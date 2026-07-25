export interface AnaliseImage {
  id: string;
  url: string;
  tipo: 'drone' | 'satelite';
  dataCaptura: string;
  resolucao: string;
  tamanho: number;
}

export interface NDVIResult {
  id: string;
  imagemId: string;
  ndviMedio: number;
  ndviMinimo: number;
  ndviMaximo: number;
  areasCriticas: AreaCritica[];
  mapaUrl: string;
  dataProcessamento: string;
}

export interface AreaCritica {
  id: string;
  latitude: number;
  longitude: number;
  nivel: 'critico' | 'atencao' | 'bom';
  descricao: string;
  recomendacao: string;
}

export interface Recomendacao {
  id: string;
  tipo: 'irrigacao' | 'adubacao' | 'defensivo' | 'colheita';
  titulo: string;
  descricao: string;
  prioridade: 'alta' | 'media' | 'baixa';
  area?: string;
  dataSugerida?: string;
}

export interface HistoricoMapa {
  id: string;
  data: string;
  ndviMedio: number;
  thumbnailUrl: string;
  resumo: string;
}
