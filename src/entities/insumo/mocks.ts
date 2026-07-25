import type { Insumo, Cotacao, Pedido } from './types';

export const mockFornecedores = [
  { id: 'f1', nome: 'AgroTop Insumos', rating: 4.8, entregaDias: 3, regiao: 'Sudeste' },
  { id: 'f2', nome: 'Casa do Adubo', rating: 4.5, entregaDias: 5, regiao: 'Centro-Oeste' },
  { id: 'f3', nome: 'Campo Forte Agronegócios', rating: 4.9, entregaDias: 2, regiao: 'Sul' },
  { id: 'f4', nome: 'Nutrien Soluções', rating: 4.3, entregaDias: 4, regiao: 'Nordeste' },
];

export const mockInsumos: Insumo[] = [
  {
    id: 'i1', nome: 'Uréia 45-00-00', categoria: 'fertilizante', unidade: 'kg',
    precoAtual: 2.85, precoAnterior: 3.10, fornecedor: mockFornecedores[0],
    estoque: 50000, imagem: undefined, description: 'Fertilizante nitrogenado de alta concentracao', avaliacao: 4.7,
  },
  {
    id: 'i2', nome: 'KCl 00-00-60', categoria: 'fertilizante', unidade: 'kg',
    precoAtual: 3.45, fornecedor: mockFornecedores[1], estoque: 30000,
    imagem: undefined, description: 'Cloreto de potassio para suplementacao de potassio', avaliacao: 4.5,
  },
  {
    id: 'i3', nome: 'Glifosato 480 SL', categoria: 'defensivo', unidade: 'l',
    precoAtual: 45.90, precoAnterior: 48.50, fornecedor: mockFornecedores[2],
    estoque: 8000, imagem: undefined, description: 'Herbicida non-seletivo para controle de plantas daninhas', avaliacao: 4.8,
  },
  {
    id: 'i4', nome: 'Soja TMG 7062 IPRO', categoria: 'semente', unidade: 'sc',
    precoAtual: 380.00, fornecedor: mockFornecedores[0], estoque: 1200,
    imagem: undefined, description: 'Semente de soja biotecnologia IPRO ciclo medio', avaliacao: 4.9,
  },
  {
    id: 'i5', nome: 'Fosfato Monoamônico (MAP)', categoria: 'fertilizante', unidade: 'kg',
    precoAtual: 3.20, precoAnterior: 3.55, fornecedor: mockFornecedores[3],
    estoque: 25000, imagem: undefined, description: 'Fonte de nitrogenio e fosforo de alta solubilidade', avaliacao: 4.6,
  },
  {
    id: 'i6', nome: 'Inseticida Bifentrina 100 EC', categoria: 'defensivo', unidade: 'l',
    precoAtual: 125.00, fornecedor: mockFornecedores[2], estoque: 3500,
    imagem: undefined, description: 'Inseticida piretroide para controle de percevejos e lagartas', avaliacao: 4.4,
  },
  {
    id: 'i7', nome: 'Diesel S10', categoria: 'combustivel', unidade: 'l',
    precoAtual: 6.29, fornecedor: mockFornecedores[1], estoque: undefined,
    imagem: undefined, description: 'Combustivel para maquinas agricolas', avaliacao: 4.2,
  },
  {
    id: 'i8', nome: 'Adubo Foliar Nanofertil', categoria: 'fertilizante', unidade: 'l',
    precoAtual: 89.90, precoAnterior: 95.00, fornecedor: mockFornecedores[3],
    estoque: 2000, imagem: undefined, description: 'Fertilizante foliar com microelementos em nanoemulsao', avaliacao: 4.3,
  },
];

export const mockCotacoes: Cotacao[] = [
  {
    id: 'c1', insumoId: 'i1', insumoNome: 'Uréia 45-00-00', fornecedor: mockFornecedores[0],
    preco: 2.78, quantidade: 10000, total: 27800, dataValidade: '2026-08-15',
    observacao: 'Preco promocional para compras acima de 5t',
  },
  {
    id: 'c2', insumoId: 'i1', insumoNome: 'Uréia 45-00-00', fornecedor: mockFornecedores[1],
    preco: 2.92, quantidade: 10000, total: 29200, dataValidade: '2026-08-20',
  },
  {
    id: 'c3', insumoId: 'i3', insumoNome: 'Glifosato 480 SL', fornecedor: mockFornecedores[2],
    preco: 43.50, quantidade: 200, total: 8700, dataValidade: '2026-09-01',
  },
];

export const mockPedidos: Pedido[] = [
  {
    id: 'ped1', status: 'enviado', valorTotal: 27800, dataCriacao: '2026-07-20',
    dataPrevisaoEntrega: '2026-07-28', trackingCode: 'AGN20260720001',
    items: [
      { insumo: mockInsumos[0], quantidade: 10000, precoUnitario: 2.78, subtotal: 27800 },
    ],
  },
  {
    id: 'ped2', status: 'entregue', valorTotal: 8700, dataCriacao: '2026-07-10',
    items: [
      { insumo: mockInsumos[2], quantidade: 200, precoUnitario: 43.50, subtotal: 8700 },
    ],
  },
];
