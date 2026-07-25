export interface Insumo {
  id: string;
  nome: string;
  categoria: 'fertilizante' | 'defensivo' | 'semente' | 'equipamento' | 'combustivel';
  unidade: 'kg' | 'l' | 'un' | 'sc';
  precoAtual: number;
  precoAnterior?: number;
  fornecedor: Fornecedor;
  estoque?: number;
  imagem?: string;
  description?: string;
  avaliacao?: number;
}

export interface Fornecedor {
  id: string;
  nome: string;
  rating: number;
  entregaDias: number;
  regiao: string;
}

export interface Cotacao {
  id: string;
  insumoId: string;
  insumoNome: string;
  fornecedor: Fornecedor;
  preco: number;
  quantidade: number;
  total: number;
  dataValidade: string;
  observacao?: string;
}

export interface Pedido {
  id: string;
  items: PedidoItem[];
  status: 'pendente' | 'confirmado' | 'enviado' | 'entregue' | 'cancelado';
  valorTotal: number;
  dataCriacao: string;
  dataPrevisaoEntrega?: string;
  trackingCode?: string;
}

export interface PedidoItem {
  insumo: Insumo;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface InsumoFiltro {
  busca?: string;
  categoria?: string;
  ordenarPor?: 'preco' | 'nome' | 'avaliacao';
  ordem?: 'asc' | 'desc';
}
