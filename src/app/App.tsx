import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { AppProviders } from './providers/QueryProvider';
import { useAuth } from './providers/AuthProvider';
import { useTheme } from './providers/ThemeProvider';
import { OfflineIndicator } from '@/shared/ui/OfflineIndicator';
import { MarketplaceHome } from '@/pages/marketplace/MarketplaceHome';
import { CatalogoInsumos } from '@/pages/marketplace/CatalogoInsumos';
import { RastreioEntrega } from '@/pages/marketplace/RastreioEntrega';
import { SimuladorCredito } from '@/pages/credito/SimuladorCredito';
import { ScoreProdutor } from '@/pages/credito/ScoreProdutor';
import { Pagamentos } from '@/pages/credito/Pagamentos';
import { UploadAnalise } from '@/pages/assistencia/UploadAnalise';
import { MapaNDVI } from '@/pages/assistencia/MapaNDVI';
import { HistoricoMapas } from '@/pages/assistencia/HistoricoMapas';
import { CalendarioAgricola } from '@/pages/gestao/CalendarioAgricola';
import { ControlePragas } from '@/pages/gestao/ControlePragas';
import { EstoqueInsumos } from '@/pages/gestao/EstoqueInsumos';
import { RelatorioProdutividade } from '@/pages/gestao/RelatorioProdutividade';
import { useState } from 'react';
import {
  Layers, ShoppingCart, Package, MapPin, DollarSign, BarChart3,
  CreditCard, Image, Map, Clock, Calendar, Bug, Box, BarChart,
  ChevronLeft, User, Cpu
} from 'lucide-react';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();

  const navItems = [
    { section: 'MARKETPLACE', items: [
      { path: '/', icon: <ShoppingCart size={18} strokeWidth={1.5} />, label: 'Cotação de Insumos' },
      { path: '/pedidos', icon: <Package size={18} strokeWidth={1.5} />, label: 'Meus Pedidos' },
      { path: '/rastreio', icon: <MapPin size={18} strokeWidth={1.5} />, label: 'Rastreio' },
    ]},
    { section: 'CRÉDITO', items: [
      { path: '/credito', icon: <DollarSign size={18} strokeWidth={1.5} />, label: 'Simulador' },
      { path: '/score', icon: <BarChart3 size={18} strokeWidth={1.5} />, label: 'Meu Score' },
      { path: '/pagamentos', icon: <CreditCard size={18} strokeWidth={1.5} />, label: 'Pagamentos' },
    ]},
    { section: 'ASSISTÊNCIA', items: [
      { path: '/analise', icon: <Image size={18} strokeWidth={1.5} />, label: 'Upload & Análise' },
      { path: '/mapa-ndvi', icon: <Map size={18} strokeWidth={1.5} />, label: 'Mapa NDVI' },
      { path: '/historico-mapas', icon: <Clock size={18} strokeWidth={1.5} />, label: 'Histórico' },
    ]},
    { section: 'GESTÃO', items: [
      { path: '/calendario', icon: <Calendar size={18} strokeWidth={1.5} />, label: 'Calendário' },
      { path: '/pragas', icon: <Bug size={18} strokeWidth={1.5} />, label: 'Controle Pragas' },
      { path: '/estoque', icon: <Box size={18} strokeWidth={1.5} />, label: 'Estoque' },
      { path: '/relatorios', icon: <BarChart size={18} strokeWidth={1.5} />, label: 'Relatórios' },
    ]},
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[260px]'}`}>
      <div className="h-full hud-surface-elevated flex flex-col border-r border-[rgba(0,240,255,0.06)]">
        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none scan-line opacity-30" />

        {/* Logo */}
        <div className={`relative px-4 py-5 flex items-center gap-3 border-b border-[rgba(255,255,255,0.04)] ${collapsed ? 'justify-center' : ''}`}>
          <div className="relative w-10 h-10 shrink-0">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#22c55e] opacity-20 blur-md" />
            <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#22c55e] flex items-center justify-center">
              <Layers className="w-5 h-5 text-[#06090f]" strokeWidth={2} />
            </div>
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-black text-white tracking-tight">
                AGRO<span className="text-[#00f0ff]">NEXUS</span>
              </h1>
              <p className="text-[9px] font-mono text-[#475569] tracking-[0.2em] uppercase -mt-0.5">v2.0</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
          {navItems.map((group) => (
            <div key={group.section}>
              {!collapsed && (
                <div className="text-[9px] font-mono font-bold text-[#475569] tracking-[0.25em] px-3 mb-2 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#00f0ff]" />
                  {group.section}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group relative ${
                        isActive
                          ? 'bg-[rgba(0,240,255,0.1)] text-[#00f0ff] shadow-[inset_0_0_20px_rgba(0,240,255,0.05)]'
                          : 'text-[#64748b] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#cbd5e1]'
                      } ${collapsed ? 'justify-center' : ''}`
                    }
                    title={collapsed ? item.label : undefined}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.5)]" />}
                        <span className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* System Status */}
        {!collapsed && (
          <div className="mx-3 mb-3 p-3 rounded-xl bg-[rgba(0,240,255,0.03)] border border-[rgba(0,240,255,0.06)]">
            <div className="flex items-center gap-2 mb-2">
              <div className="status-online" />
              <span className="text-[10px] font-mono text-[#64748b] tracking-wider">SISTEMA ONLINE</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-[10px] font-mono text-[#475569]">API</div>
                <div className="text-[10px] font-bold text-[#22c55e]">OK</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#475569]">SYNC</div>
                <div className="text-[10px] font-bold text-[#00f0ff]">ON</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#475569]">LAT</div>
                <div className="text-[10px] font-bold text-[#22c55e]">12ms</div>
              </div>
            </div>
          </div>
        )}

        {/* User + Collapse */}
        <div className="px-3 py-3 border-t border-[rgba(255,255,255,0.04)] space-y-2">
          {user && !collapsed && (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)]">
              <div className="relative w-8 h-8 shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#22c55e] opacity-30 blur-sm" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#00f0ff] to-[#22c55e] flex items-center justify-center text-[10px] font-black text-[#06090f]">
                  {user.nome.charAt(0)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate">{user.nome}</div>
                <div className="text-[10px] font-mono text-[#475569] truncate">{user.email}</div>
              </div>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-[#475569] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#94a3b8] transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} strokeWidth={1.5} />
            {!collapsed && <span>Recolher</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

function AppLayout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-[260px] p-6 md:p-8 min-h-screen transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<MarketplaceHome />} />
            <Route path="/pedidos" element={<CatalogoInsumos />} />
            <Route path="/rastreio" element={<RastreioEntrega />} />
            <Route path="/credito" element={<SimuladorCredito />} />
            <Route path="/score" element={<ScoreProdutor />} />
            <Route path="/pagamentos" element={<Pagamentos />} />
            <Route path="/analise" element={<UploadAnalise />} />
            <Route path="/mapa-ndvi" element={<MapaNDVI areasCriticas={[
              { id: '1', lat: -18.92, lng: -48.28, nivel: 'critico', descricao: 'Estresse hídrico severo na parcela Norte' },
              { id: '2', lat: -18.915, lng: -48.275, nivel: 'atencao', descricao: 'Deficiência de nitrogênio detectada' },
              { id: '3', lat: -18.925, lng: -48.285, nivel: 'bom', descricao: 'Área com vegetação saudável' },
            ]} />} />
            <Route path="/historico-mapas" element={<HistoricoMapas />} />
            <Route path="/calendario" element={<CalendarioAgricola />} />
            <Route path="/pragas" element={<ControlePragas />} />
            <Route path="/estoque" element={<EstoqueInsumos />} />
            <Route path="/relatorios" element={<RelatorioProdutividade />} />
          </Routes>
        </div>
      </main>
      <OfflineIndicator />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppLayout />
      </AppProviders>
    </BrowserRouter>
  );
}
