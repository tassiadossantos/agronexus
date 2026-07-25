import { useCotacao } from '@/features/cotacao/useCotacao';
import { Card, CardHeader, CardTitle } from '@/shared/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/shared/ui/Table';
import { formatCurrency } from '@/shared/utils/currency';
import { formatDate } from '@/shared/utils/date';

const statusConfig: Record<string, { label: string; classes: string }> = {
  pendente: { label: 'Pendente', classes: 'bg-[rgba(234,179,8,0.1)] text-[#eab308] border border-[rgba(234,179,8,0.2)]' },
  confirmado: { label: 'Confirmado', classes: 'bg-[rgba(0,240,255,0.1)] text-[#00f0ff] border border-[rgba(0,240,255,0.2)]' },
  enviado: { label: 'Enviado', classes: 'bg-[rgba(34,197,94,0.1)] text-[#22c55e] border border-[rgba(34,197,94,0.2)]' },
  entregue: { label: 'Entregue', classes: 'bg-[rgba(34,197,94,0.15)] text-[#22c55e] border border-[rgba(34,197,94,0.3)]' },
  cancelado: { label: 'Cancelado', classes: 'bg-[rgba(239,68,68,0.1)] text-[#ef4444] border border-[rgba(239,68,68,0.2)]' },
};

export function CatalogoInsumos() {
  const { pedidos } = useCotacao();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Meus <span className="text-[#00f0ff]">Pedidos</span></h1>
        <p className="text-sm text-[#475569] mt-1">Acompanhe seus pedidos de insumos</p>
      </div>

      <Card variant="hud">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Itens</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pedidos.map((pedido) => {
              const status = statusConfig[pedido.status] || statusConfig.pendente;
              return (
                <TableRow key={pedido.id}>
                  <TableCell className="font-mono text-xs text-[#00f0ff]">{pedido.id.toUpperCase()}</TableCell>
                  <TableCell>{pedido.items.length} {pedido.items.length === 1 ? 'item' : 'itens'}</TableCell>
                  <TableCell className="font-bold text-white">{formatCurrency(pedido.valorTotal)}</TableCell>
                  <TableCell>{formatDate(pedido.dataCriacao)}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${status.classes}`}>
                      {status.label}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
