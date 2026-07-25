export interface CreditoSimulacao {
  id: string;
  valorSolicitado: number;
  prazoMeses: number;
  taxaJuros: number;
  parcelaMensal: number;
  valorTotal: number;
  scoreBase: number;
  culturaReferencia: string;
  previsaoColheita: string;
}

export interface CreditoProposta {
  id: string;
  simulacaoId: string;
  produtorId: string;
  status: 'pendente' | 'aprovada' | 'reprovada' | 'contratada';
  condicoes: CondicoesCredito;
  dataExpiracao: string;
  dataCriacao: string;
}

export interface CondicoesCredito {
  valorAprovado: number;
  taxaJuros: number;
  prazoMeses: number;
  parcelaMensal: number;
  garantia: string;
  dataVencimento: string;
  cuidados: string[];
}

export interface Pagamento {
  id: string;
  propostaId: string;
  numeroParcela: number;
  valor: number;
  dataVencimento: string;
  dataPagamento?: string;
  status: 'pendente' | 'pago' | 'atrasado' | 'isento';
}

export interface ScoreBreakdown {
  fator: string;
  valor: number;
  peso: number;
  contribuicao: number;
  icone: string;
}
