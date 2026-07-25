import { useCredito } from '@/features/credito/useCredito';
import { Card } from '@/shared/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/shared/ui/Table';
import { formatCurrency } from '@/shared/utils/currency';
import { formatDate } from '@/shared/utils/date';

const statusPag: Record<string, { label: string; classes: string }> = {
  pago: { label: 'Pago', classes: 'bg-[rgba(34,197,94,0.1)] text-[#22c55e] border border-[rgba(34,197,94,0.2)]' },
  pendente: { label: 'Pendente', classes: 'bg-[rgba(255,255,255,0.04)] text-[#64748b] border border-[rgba(255,255,255,0.06)]' },
  atrasado: { label: 'Atrasado', classes: 'bg-[rgba(239,68,68,0.1)] text-[#ef4444] border border-[rgba(239,68,68,0.2)]' },
};

export function Pagamentos() {
  const { pagamentos, propostas } = useCredito();
  const proposta = propostas[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Pagamentos</h1>
        <p className="text-sm text-[#475569] mt-1">Acompanhe suas parcelas do crédito</p>
      </div>

      {proposta && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Valor Aprovado', value: formatCurrency(proposta.condicoes.valorAprovado), color: 'text-[#00f0ff]' },
            { label: 'Parcela Mensal', value: formatCurrency(proposta.condicoes.parcelaMensal), color: 'text-white' },
            { label: 'Meses Restantes', value: `${proposta.condicoes.prazoMeses}`, color: 'text-white' },
            { label: 'Parcelas Pagas', value: `${pagamentos.filter((p) => p.status === 'pago').length}`, color: 'text-[#22c55e]' },
          ].map((item) => (
            <Card key={item.label} padding="md" className="text-center">
              <div className={`text-2xl font-black ${item.color}`}>{item.value}</div>
              <div className="text-[10px] font-mono text-[#475569] mt-0.5 uppercase tracking-wider">{item.label}</div>
            </Card>
          ))}
        </div>
      )}

      <Card variant="hud">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parcela</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagamentos.map((pg) => {
              const st = statusPag[pg.status] || statusPag.pendente;
              return (
                <TableRow key={pg.id}>
                  <TableCell className="font-bold text-white">{pg.numeroParcela}ª</TableCell>
                  <TableCell>{formatCurrency(pg.valor)}</TableCell>
                  <TableCell className="font-mono text-xs">{formatDate(pg.dataVencimento)}</TableCell>
                  <TableCell className="font-mono text-xs">{pg.dataPagamento ? formatDate(pg.dataPagamento) : '—'}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${st.classes}`}>{st.label}</span>
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
