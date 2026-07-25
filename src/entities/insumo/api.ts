import type { Insumo, Cotacao, Pedido, InsumoFiltro } from './types';
import { mockInsumos, mockCotacoes, mockPedidos } from './mocks';

function filtrarInsumos(insumos: Insumo[], filtro: InsumoFiltro): Insumo[] {
  let result = [...insumos];
  if (filtro.busca) {
    const q = filtro.busca.toLowerCase();
    result = result.filter((i) => i.nome.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q));
  }
  if (filtro.categoria) result = result.filter((i) => i.categoria === filtro.categoria);
  if (filtro.ordenarPor) {
    const key = filtro.ordenarPor;
    const order = filtro.ordem === 'desc' ? -1 : 1;
    result.sort((a, b) => {
      if (key === 'preco') return (a.precoAtual - b.precoAtual) * order;
      if (key === 'avaliacao') return ((a.avaliacao || 0) - (b.avaliacao || 0)) * order;
      return a.nome.localeCompare(b.nome) * order;
    });
  }
  return result;
}

export const insumoApi = {
  async listar(filtro: InsumoFiltro = {}): Promise<Insumo[]> {
    await new Promise((r) => setTimeout(r, 400));
    return filtrarInsumos(mockInsumos, filtro);
  },

  async buscarPorId(id: string): Promise<Insumo | undefined> {
    await new Promise((r) => setTimeout(r, 200));
    return mockInsumos.find((i) => i.id === id);
  },

  async getCotacoes(insumoId: string): Promise<Cotacao[]> {
    await new Promise((r) => setTimeout(r, 300));
    return mockCotacoes.filter((c) => c.insumoId === insumoId);
  },

  async getPedidos(): Promise<Pedido[]> {
    await new Promise((r) => setTimeout(r, 400));
    return mockPedidos;
  },

  async criarPedido(items: { insumoId: string; quantidade: number }[]): Promise<Pedido> {
    await new Promise((r) => setTimeout(r, 600));
    const itemsPed = items.map((item) => {
      const insumo = mockInsumos.find((i) => i.id === item.insumoId)!;
      return { insumo, quantidade: item.quantidade, precoUnitario: insumo.precoAtual, subtotal: item.quantidade * insumo.precoAtual };
    });
    return {
      id: `ped${Date.now()}`,
      status: 'pendente',
      valorTotal: itemsPed.reduce((acc, i) => acc + i.subtotal, 0),
      dataCriacao: new Date().toISOString(),
      items: itemsPed,
    };
  },
};
