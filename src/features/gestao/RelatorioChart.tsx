interface Periodo {
  mes: string;
  produtividade: number;
  area: number;
}

interface Props {
  periodos: Periodo[];
  comparativo: { fazenda: number; regiao: number; estado: number };
}

export function RelatorioChart({ periodos, comparativo }: Props) {
  const maxProd = Math.max(...periodos.map((p) => p.produtividade), 1);

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-[10px] font-mono font-bold text-[#475569] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#eab308]" />
          Produtividade Mensal (sc/ha)
        </h4>
        <div className="flex items-end gap-2 h-44">
          {periodos.map((p) => (
            <div key={p.mes} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="text-[10px] font-bold font-mono text-[#94a3b8]">{p.produtividade || '-'}</div>
              <div className="w-full rounded-t-lg transition-all duration-700 relative" style={{
                height: `${(p.produtividade / maxProd) * 100}%`,
                background: p.produtividade > 0
                  ? `linear-gradient(to top, rgba(0,240,255,0.3), rgba(34,197,94,0.6))`
                  : 'rgba(255,255,255,0.03)',
                boxShadow: p.produtividade > 0 ? '0 0 10px rgba(0,240,255,0.1)' : 'none',
              }} />
              <div className="text-[10px] font-mono text-[#475569]">{p.mes}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-mono font-bold text-[#475569] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
          Comparativo Regional
        </h4>
        <div className="space-y-4">
          {[
            { label: 'Sua Fazenda', value: comparativo.fazenda, color: '#00f0ff' },
            { label: 'Media Regional', value: comparativo.regiao, color: '#eab308' },
            { label: 'Media Estadual', value: comparativo.estado, color: '#475569' },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[#94a3b8] font-medium">{item.label}</span>
                <span className="font-bold text-white font-mono">{item.value} sc/ha</span>
              </div>
              <div className="h-2 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${(item.value / 70) * 100}%`, background: `linear-gradient(to right, ${item.color}40, ${item.color})`, boxShadow: `0 0 8px ${item.color}30` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
