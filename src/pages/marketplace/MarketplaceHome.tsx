import { useState } from 'react';
import { useCotacao } from '@/features/cotacao/useCotacao';
import { CotacaoCard } from '@/widgets/CotacaoCard';
import { CotacaoForm } from '@/features/cotacao/CotacaoForm';
import { CotacaoComparison } from '@/features/cotacao/CotacaoComparison';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Card } from '@/shared/ui/Card';
import { Modal } from '@/shared/ui/Modal';
import { SkeletonCard } from '@/shared/ui/Skeleton';
import type { Insumo } from '@/entities/insumo/types';
import { formatCurrency } from '@/shared/utils/currency';
import { getCategoriaLabel } from '@/entities/insumo/utils';
import { ShoppingCart, Search } from 'lucide-react';

export function MarketplaceHome() {
  const { insumos, isLoading, filtro, atualizarFiltro, carrinho, adicionarAoCarrinho, totalCarrinho } = useCotacao();
  const [selectedInsumo, setSelectedInsumo] = useState<Insumo | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('');

  const categorias = ['fertilizante', 'defensivo', 'semente', 'combustivel', 'equipamento'];

  const filteredInsumos = activeCategory
    ? insumos.filter((i) => i.categoria === activeCategory)
    : insumos;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl hud-surface-elevated p-6 md:p-8 border-neon-animated">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1625244724120-1fd1f3c339f7?w=1200&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,9,15,0.95)] via-[rgba(6,9,15,0.8)] to-[rgba(6,9,15,0.6)]" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.2)] flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-[#00f0ff]" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Marketplace de <span className="text-[#00f0ff]">Insumos</span>
              </h1>
            </div>
          </div>
          <p className="text-sm text-[#64748b] max-w-lg mb-5">
            Cote, compare e compre insumos agricolas com os melhores precos do mercado. IA recomenda a quantidade ideal para sua safra.
          </p>
          <div className="flex gap-3">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Buscar insumos..."
                leftIcon={<Search className="w-4 h-4" strokeWidth={2} />}
                value={filtro.busca || ''}
                onChange={(e) => atualizarFiltro({ busca: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Carrinho Flutuante */}
      {carrinho.length > 0 && (
        <div className="sticky top-4 z-30">
          <Card variant="hud" padding="sm" className="flex items-center gap-4 border-[rgba(0,240,255,0.2)] hud-glow animate-fade-in-up">
            <div className="w-10 h-10 rounded-xl bg-[rgba(0,240,255,0.1)] flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-[#00f0ff]" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <span className="text-sm font-bold text-white">{carrinho.length} {carrinho.length === 1 ? 'item' : 'itens'}</span>
              <span className="text-xs text-[#475569] ml-2">no carrinho</span>
            </div>
            <div className="text-lg font-black text-[#00f0ff]">{formatCurrency(totalCarrinho)}</div>
            <Button size="sm">Finalizar Pedido</Button>
          </Card>
        </div>
      )}

      {/* Categorias */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        <button
          onClick={() => setActiveCategory('')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
            !activeCategory
              ? 'bg-[rgba(0,240,255,0.15)] text-[#00f0ff] border border-[rgba(0,240,255,0.3)] shadow-[0_0_15px_rgba(0,240,255,0.1)]'
              : 'bg-[rgba(255,255,255,0.04)] text-[#64748b] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.08)] hover:text-[#cbd5e1]'
          }`}
        >
          Todos
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(activeCategory === cat ? '' : cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-[rgba(0,240,255,0.15)] text-[#00f0ff] border border-[rgba(0,240,255,0.3)] shadow-[0_0_15px_rgba(0,240,255,0.1)]'
                : 'bg-[rgba(255,255,255,0.04)] text-[#64748b] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.08)] hover:text-[#cbd5e1]'
            }`}
          >
            {getCategoriaLabel(cat)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 stagger-children">
          {filteredInsumos.map((insumo) => (
            <CotacaoCard key={insumo.id} insumo={insumo} onSelect={setSelectedInsumo} />
          ))}
        </div>
      )}

      {filteredInsumos.length > 0 && (
        <CotacaoComparison items={filteredInsumos.slice(0, 3)} onSelect={setSelectedInsumo} />
      )}

      <Modal open={!!selectedInsumo} onClose={() => setSelectedInsumo(null)} title="Cotar Insumo" size="md">
        {selectedInsumo && (
          <CotacaoForm
            insumo={selectedInsumo}
            onConfirm={(qty) => { adicionarAoCarrinho(selectedInsumo, qty); setSelectedInsumo(null); }}
            onCancel={() => setSelectedInsumo(null)}
          />
        )}
      </Modal>
    </div>
  );
}
