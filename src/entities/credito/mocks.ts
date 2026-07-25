import type { CreditoProposta, Pagamento, ScoreBreakdown } from './types';

export const mockScoreBreakdown: ScoreBreakdown[] = [
  { fator: 'Historico de Safra', valor: 85, peso: 0.30, contribuicao: 25.5, icone: '🌾' },
  { fator: 'Condicoes Climaticas', valor: 72, peso: 0.20, contribuicao: 14.4, icone: '🌤' },
  { fator: 'Area Cultivada', valor: 90, peso: 0.25, contribuicao: 22.5, icone: '🗺' },
  { fator: 'Score Financeiro', valor: 65, peso: 0.15, contribuicao: 9.75, icone: '💰' },
  { fator: 'Dados Satelitais', valor: 78, peso: 0.10, contribuicao: 7.8, icone: '🛰' },
];

export const mockPropostas: CreditoProposta[] = [
  {
    id: 'pr1', simulacaoId: 's1', produtorId: '1', status: 'aprovada',
    condicoes: {
      valorAprovado: 250000, taxaJuros: 1.89, prazoMeses: 12, parcelaMensal: 23145.67,
      garantia: 'Cessao de Safra (Soja 2025/26)', dataVencimento: '2027-03-15',
      cuidados: ['Manter seguro da safra ativo', 'Aplicar insumos no prazo recomendado'],
    },
    dataExpiracao: '2026-08-15', dataCriacao: '2026-07-20',
  },
];

export const mockPagamentos: Pagamento[] = [
  { id: 'pg1', propostaId: 'pr1', numeroParcela: 1, valor: 23145.67, dataVencimento: '2026-08-15', dataPagamento: '2026-08-14', status: 'pago' },
  { id: 'pg2', propostaId: 'pr1', numeroParcela: 2, valor: 23145.67, dataVencimento: '2026-09-15', status: 'pendente' },
  { id: 'pg3', propostaId: 'pr1', numeroParcela: 3, valor: 23145.67, dataVencimento: '2026-10-15', status: 'pendente' },
  { id: 'pg4', propostaId: 'pr1', numeroParcela: 4, valor: 23145.67, dataVencimento: '2026-11-15', status: 'pendente' },
];
