import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { insumoApi } from '@/entities/insumo/api';
import type { InsumoFiltro, Insumo } from '@/entities/insumo/types';

export function useCotacao() {
  const queryClient = useQueryClient();
  const [filtro, setFiltro] = useState<InsumoFiltro>({ ordenarPor: 'preco', ordem: 'asc' });

  const { data: insumos = [], isLoading } = useQuery({
    queryKey: ['insumos', filtro],
    queryFn: () => insumoApi.listar(filtro),
  });

  const { data: pedidos = [] } = useQuery({
    queryKey: ['pedidos'],
    queryFn: () => insumoApi.getPedidos(),
  });

  const { data: cotacoes = [] } = useQuery({
    queryKey: ['cotacoes'],
    queryFn: () => insumoApi.getCotacoes('i1'),
  });

  const criarPedido = useMutation({
    mutationFn: (items: { insumoId: string; quantidade: number }[]) => insumoApi.criarPedido(items),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pedidos'] }),
  });

  const atualizarFiltro = useCallback((novoFiltro: Partial<InsumoFiltro>) => {
    setFiltro((prev) => ({ ...prev, ...novoFiltro }));
  }, []);

  const [carrinho, setCarrinho] = useState<{ insumo: Insumo; quantidade: number }[]>([]);

  const adicionarAoCarrinho = useCallback((insumo: Insumo, quantidade: number) => {
    setCarrinho((prev) => {
      const existente = prev.find((i) => i.insumo.id === insumo.id);
      if (existente) return prev.map((i) => i.insumo.id === insumo.id ? { ...i, quantidade: i.quantidade + quantidade } : i);
      return [...prev, { insumo, quantidade }];
    });
  }, []);

  const removerDoCarrinho = useCallback((insumoId: string) => {
    setCarrinho((prev) => prev.filter((i) => i.insumo.id !== insumoId));
  }, []);

  const totalCarrinho = carrinho.reduce((acc, item) => acc + item.insumo.precoAtual * item.quantidade, 0);

  return {
    insumos, isLoading, filtro, atualizarFiltro,
    carrinho, adicionarAoCarrinho, removerDoCarrinho, totalCarrinho,
    pedidos, cotacoes,
    criarPedido,
  };
}
