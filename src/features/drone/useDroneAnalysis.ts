import { useState, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { analiseApi } from '@/entities/analise/api';
import { compressImage } from '@/shared/utils/compression';
import type { NDVIResult } from '@/entities/analise/types';

export function useDroneAnalysis() {
  const [ndviResult, setNdviResult] = useState<NDVIResult | null>(null);

  const { data: recomendacoes = [] } = useQuery({
    queryKey: ['recomendacoes'],
    queryFn: () => analiseApi.getRecomendacoes(),
  });

  const { data: historico = [] } = useQuery({
    queryKey: ['historicoMapas'],
    queryFn: () => analiseApi.getHistorico(),
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const compressed = await compressImage(file, { maxWidth: 1200, quality: 0.7 });
      const result = await analiseApi.uploadImagem(compressed as File);
      return result;
    },
  });

  const analisarMutation = useMutation({
    mutationFn: async (file: File) => {
      const compressed = await compressImage(file, { maxWidth: 1200, quality: 0.7 });
      const uploaded = await analiseApi.uploadImagem(compressed as File);
      const result = await analiseApi.processarNDVI(uploaded.id);
      return result;
    },
    onSuccess: (data) => setNdviResult(data),
  });

  const analisarImagem = useCallback((file: File) => {
    analisarMutation.mutate(file);
  }, [analisarMutation]);

  return {
    ndviResult, setNdviResult, analisarImagem,
    isUploading: uploadMutation.isPending,
    isAnalyzing: analisarMutation.isPending,
    recomendacoes, historico,
  };
}
