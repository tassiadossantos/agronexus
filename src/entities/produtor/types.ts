export interface Produtor {
  id: string;
  nome: string;
  cpf: string;
  cnpj?: string;
  email: string;
  telefone: string;
  endereco: Endereco;
  propriedades: Propriedade[];
  scoreCredito: number;
  dataCadastro: string;
  avatar?: string;
}

export interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  latitude?: number;
  longitude?: number;
}

export interface Propriedade {
  id: string;
  nome: string;
  area: number;
  culturaPrincipal: string;
  safraAtual: string;
  latitude?: number;
  longitude?: number;
}

export interface ProdutorSummary {
  id: string;
  nome: string;
  propriedades: number;
  areaTotal: number;
  scoreCredito: number;
}
