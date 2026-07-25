import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { creditoApi } from '@/entities/credito/api';
import type { CreditoSimulacao } from '@/entities/credito/types';

export function useCredito() {
  const [simulacao, setSimulacao] = useState<CreditoSimulacao | null>(null);

  const { data: scoreBreakdown = [] } = useQuery({
    queryKey: ['scoreBreakdown'],
    queryFn: () => creditoApi.getScoreBreakdown(),
  });

  const { data: propostas = [] } = useQuery({
    queryKey: ['propostas'],
    queryFn: () => creditoApi.getPropostas(),
  });

  const { data: pagamentos = [] } = useQuery({
    queryKey: ['pagamentos'],
    queryFn: () => creditoApi.getPagamentos('pr1'),
  });

  const simularMutation = useMutation({
    mutationFn: ({ valor, prazo, cultura }: { valor: number; prazo: number; cultura: string }) =>
      creditoApi.simular(valor, prazo, cultura),
    onSuccess: (data) => setSimulacao(data),
  });

  return {
    simulacao, simular: simularMutation.mutate, isSimulating: simularMutation.isPending,
    scoreBreakdown, propostas, pagamentos,
  };
}
