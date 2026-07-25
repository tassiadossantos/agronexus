export function calcularQuantidade(areaHa: number, dosagemKgHa: number, unidade: string): number {
  if (unidade === 'l') return areaHa * dosagemKgHa;
  return areaHa * dosagemKgHa;
}

export function calcularFrete(peso: number, distanciaKm: number, taxaPorKm = 0.15): number {
  return peso * distanciaKm * taxaPorKm;
}

export function getPrecoVariacao(precoAtual: number, precoAnterior?: number): { valor: number; tipo: 'up' | 'down' | 'neutral' } | null {
  if (!precoAnterior || precoAnterior === 0) return null;
  const diff = ((precoAtual - precoAnterior) / precoAnterior) * 100;
  return {
    valor: Math.abs(diff),
    tipo: diff > 0 ? 'up' : diff < 0 ? 'down' : 'neutral',
  };
}

export function getCategoriaLabel(cat: string): string {
  const labels: Record<string, string> = {
    fertilizante: 'Fertilizante',
    defensivo: 'Defensivo',
    semente: 'Semente',
    equipamento: 'Equipamento',
    combustivel: 'Combustivel',
  };
  return labels[cat] || cat;
}

export function getCategoriaCor(cat: string): string {
  const cores: Record<string, string> = {
    fertilizante: 'bg-primary-100 text-primary-700',
    defensivo: 'bg-danger-100 text-danger-600',
    semente: 'bg-secondary-100 text-secondary-700',
    equipamento: 'bg-info-100 text-info-500',
    combustivel: 'bg-surface-200 text-surface-700',
  };
  return cores[cat] || 'bg-surface-100 text-surface-600';
}
