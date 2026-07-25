export function calcularScoreMedio(breakdown: { valor: number; peso: number }[]): number {
  return breakdown.reduce((acc, b) => acc + b.valor * b.peso, 0);
}

export function getScoreLabel(score: number): { label: string; cor: string } {
  if (score >= 80) return { label: 'Excelente', cor: 'text-success-500' };
  if (score >= 65) return { label: 'Bom', cor: 'text-primary-600' };
  if (score >= 50) return { label: 'Regular', cor: 'text-secondary-600' };
  return { label: 'Atencao', cor: 'text-danger-500' };
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#22c55e';
  if (score >= 65) return '#16a34a';
  if (score >= 50) return '#f97316';
  return '#ef4444';
}
