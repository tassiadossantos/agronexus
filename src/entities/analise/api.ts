import type { NDVIResult, Recomendacao, HistoricoMapa } from './types';
import { mockNDVI, mockRecomendacoes, mockHistoricoMapas } from './mocks';

export const analiseApi = {
  async uploadImagem(_file: File): Promise<{ id: string; url: string }> {
    await new Promise((r) => setTimeout(r, 1500));
    return { id: `img${Date.now()}`, url: '/uploaded-image.png' };
  },

  async processarNDVI(imagemId: string): Promise<NDVIResult> {
    await new Promise((r) => setTimeout(r, 2000));
    return { ...mockNDVI, imagemId, id: `ndvi${Date.now()}` };
  },

  async getRecomendacoes(): Promise<Recomendacao[]> {
    await new Promise((r) => setTimeout(r, 400));
    return mockRecomendacoes;
  },

  async getHistorico(): Promise<HistoricoMapa[]> {
    await new Promise((r) => setTimeout(r, 300));
    return mockHistoricoMapas;
  },
};
