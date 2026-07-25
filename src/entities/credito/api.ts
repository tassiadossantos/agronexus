import type { CreditoSimulacao, CreditoProposta, Pagamento, ScoreBreakdown } from './types';
import { mockPropostas, mockPagamentos, mockScoreBreakdown } from './mocks';

export const creditoApi = {
  async simular(valor: number, prazo: number, cultura: string): Promise<CreditoSimulacao> {
    await new Promise((r) => setTimeout(r, 800));
    const taxaBase = 1.89 + (Math.random() * 0.5 - 0.25);
    const parcela = (valor * (taxaBase / 100) * Math.pow(1 + taxaBase / 100, prazo)) / (Math.pow(1 + taxaBase / 100, prazo) - 1);
    return {
      id: `sim${Date.now()}`, valorSolicitado: valor, prazoMeses: prazo,
      taxaJuros: Math.round(taxaBase * 100) / 100,
      parcelaMensal: Math.round(parcela * 100) / 100,
      valorTotal: Math.round(parcela * prazo * 100) / 100,
      scoreBase: 78, culturaReferencia: cultura, previsaoColheita: '2027-03',
    };
  },

  async getScoreBreakdown(): Promise<ScoreBreakdown[]> {
    await new Promise((r) => setTimeout(r, 400));
    return mockScoreBreakdown;
  },

  async getPropostas(): Promise<CreditoProposta[]> {
    await new Promise((r) => setTimeout(r, 300));
    return mockPropostas;
  },

  async getPagamentos(propostaId: string): Promise<Pagamento[]> {
    await new Promise((r) => setTimeout(r, 300));
    return mockPagamentos.filter((p) => p.propostaId === propostaId);
  },
};
