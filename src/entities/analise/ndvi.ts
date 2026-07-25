export function processarNDVI(_imagemData: ImageData): { media: number; minimo: number; maximo: number } {
  return { media: 0.72, minimo: 0.15, maximo: 0.91 };
}

export function getNDVICor(value: number): string {
  if (value >= 0.7) return '#22c55e';
  if (value >= 0.5) return '#86efac';
  if (value >= 0.3) return '#eab308';
  if (value >= 0.1) return '#f97316';
  return '#ef4444';
}

export function getNDVILabel(value: number): string {
  if (value >= 0.7) return 'Vegetacao densa e saudavel';
  if (value >= 0.5) return 'Vegetacao moderada';
  if (value >= 0.3) return 'Vegetacao esparsa ou estresse';
  if (value >= 0.1) return 'Solo exposto ou estresse severo';
  return 'Sem vegetacao';
}

export function getNivelLabel(nivel: string): { label: string; cor: string; bg: string } {
  switch (nivel) {
    case 'critico': return { label: 'Critico', cor: 'text-danger-500', bg: 'bg-danger-50 border-danger-200' };
    case 'atencao': return { label: 'Atencao', cor: 'text-warning-500', bg: 'bg-warning-50 border-warning-200' };
    default: return { label: 'Bom', cor: 'text-success-500', bg: 'bg-success-50 border-success-100' };
  }
}
