import { useGestao } from '@/features/gestao/useGestao';
import { Card, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/shared/ui/Table';
import { formatCurrency } from '@/shared/utils/currency';
import { formatDate } from '@/shared/utils/date';
import { Package } from 'lucide-react';

export function EstoqueInsumos() {
  const { estoque, loadingEstoque } = useGestao();

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl hud-surface-elevated p-6 md:p-8 border-neon-animated">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=1200&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,9,15,0.95)] via-[rgba(6,9,15,0.85)] to-[rgba(6,9,15,0.7)]" />
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.2)] flex items-center justify-center">
            <Package className="w-5 h-5 text-[#00f0ff]" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Estoque de <span className="text-[#00f0ff]">Insumos</span>
            </h1>
            <p className="text-sm text-[#475569] mt-1">Controle de estoque com alertas de reposicao</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Itens Cadastrados', value: estoque.length, color: 'text-white' },
          { label: 'Abaixo do Minimo', value: estoque.filter((e) => e.quantidade < e.estoqueMinimo).length, color: 'text-[#ef4444]' },
          { label: 'Estoque OK', value: estoque.filter((e) => e.quantidade >= e.estoqueMinimo).length, color: 'text-[#22c55e]' },
          { label: 'Valor Total', value: formatCurrency(estoque.reduce((a, e) => a + e.quantidade * e.custoUnitario, 0)), color: 'text-[#00f0ff]' },
        ].map((item) => (
          <Card key={item.label} padding="md" className="text-center">
            <div className={`text-xl font-black ${item.color}`}>{item.value}</div>
            <div className="text-[10px] font-mono text-[#475569] mt-0.5 uppercase tracking-wider">{item.label}</div>
          </Card>
        ))}
      </div>

      <Card variant="hud">
        {loadingEstoque ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-14 rounded-xl animate-shimmer-dark" />)}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Insumo</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Qtd</TableHead>
                <TableHead>Min.</TableHead>
                <TableHead>Custo Unit.</TableHead>
                <TableHead>Ultimo Reabast.</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estoque.map((item) => {
                const abaixo = item.quantidade < item.estoqueMinimo;
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-semibold text-white">{item.insumo}</TableCell>
                    <TableCell>{item.categoria}</TableCell>
                    <TableCell className="font-mono text-xs">{item.quantidade.toLocaleString('pt-BR')} {item.unidade}</TableCell>
                    <TableCell className="font-mono text-xs">{item.estoqueMinimo.toLocaleString('pt-BR')} {item.unidade}</TableCell>
                    <TableCell>{formatCurrency(item.custoUnitario)}</TableCell>
                    <TableCell className="font-mono text-xs">{formatDate(item.ultimoReabastecimento)}</TableCell>
                    <TableCell>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${abaixo ? 'bg-[rgba(239,68,68,0.1)] text-[#ef4444] border border-[rgba(239,68,68,0.2)]' : 'bg-[rgba(34,197,94,0.1)] text-[#22c55e] border border-[rgba(34,197,94,0.2)]'}`}>
                        {abaixo ? 'Abaixo Min.' : 'OK'}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
