import type { Produtor } from './types';

export const mockProdutor: Produtor = {
  id: '1',
  nome: 'Carlos Eduardo Silva',
  cpf: '123.456.789-00',
  cnpj: '12.345.678/0001-90',
  email: 'carlos@fazendasilva.com.br',
  telefone: '(34) 99876-5432',
  endereco: {
    rua: 'Rua da Fazenda',
    numero: 'S/N',
    bairro: 'Zona Rural',
    cidade: 'Uberlândia',
    estado: 'MG',
    cep: '38400-000',
    latitude: -18.9186,
    longitude: -48.2772,
  },
  propriedades: [
    {
      id: 'p1',
      nome: 'Fazenda São Jorge',
      area: 850,
      culturaPrincipal: 'Soja',
      safraAtual: '2025/26',
      latitude: -18.92,
      longitude: -48.28,
    },
    {
      id: 'p2',
      nome: 'Fazenda Santa Maria',
      area: 420,
      culturaPrincipal: 'Milho',
      safraAtual: '2025/26',
      latitude: -18.95,
      longitude: -48.30,
    },
  ],
  scoreCredito: 78,
  dataCadastro: '2024-03-15',
  avatar: undefined,
};
