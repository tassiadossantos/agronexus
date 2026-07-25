# AgroNexus — Documentação Técnica Detalhada

> **Versão:** 2.0 — Stark Edition  
> **Última atualização:** Julho 2026

---

## 1. Sumário

O **AgroNexus** é uma plataforma web integrada para gestão do ecossistema agrícola brasileiro. O sistema combina marketplace de insumos, crédito baseado em safra, análiseNDVI por drones e gestão operacional em uma única interface com estética futurista (HUD/sci-fi).

Este documento descreve em detalhes a arquitetura, os módulos, o fluxo de dados, o design system e as decisões técnicas do projeto.

---

## 2. Visão Geral do Sistema

### 2.1 Domínio

O sistema atende ao produtor rural brasileiro com quatro pilares:

| Pilar | Descrição |
|-------|-----------|
| **Marketplace** | Cotação, compra e rastreio de insumos agrícolas (fertilizantes, defensivos, sementes, combustíveis, equipamentos) |
| **Crédito** | Simulação de crédito agrícola atrelado a previsão de colheita, score do produtor, contrato digital |
| **Assistência Técnica** | Upload de imagens de drone/satélite, processamento NDVI, mapa de áreas críticas, recomendações IA |
| **Gestão** | Calendário agrícola, controle de pragas, estoque de insumos, relatórios de produtividade |

### 2.2 Fluxo do Usuário

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Marketplace │────>│    Crédito   │────>│   Análise    │────>│    Gestão    │
│  (Cotação)   │     │ (Simulador)  │     │   (NDVI)     │     │ (Calendário) │
└─────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
       │                    │                    │                    │
       └────────────────────┴────────────────────┴────────────────────┘
                              Dados compartilhados via
                           entities/ + features/ + mocks
```

---

## 3. Stack Tecnológica

### 3.1 Core

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| React | 19.2 | UI library (concurrent features) |
| TypeScript | 6.0 | Tipagem estática |
| Vite | 8.1 | Build tool e dev server |
| React Router DOM | 7.18 | Roteamento SPA |

### 3.2 UI & Estilo

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| Tailwind CSS | 4.3 | CSS utility-first (plugin Vite) |
| Lucide React | 1.27 | Ícones vetoriais |
| Recharts | 3.10 | Gráficos e dashboards |

### 3.3 Estado & Dados

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| TanStack Query | 5.101 | Server state, cache, mutations |
| Dexie.js | 4.4 | IndexedDB wrapper (dados offline) |
| graphql-request | 7.4 | Cliente GraphQL leve |

### 3.4 Mapas & Geolocalização

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| Leaflet | 1.9 | Mapa interativo |
| React-Leaflet | 5.0 | Bindings React para Leaflet |
| CartoDB Dark Matter | — | Tile provider (tema escuro) |

### 3.5 Utilitários

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| clsx + tailwind-merge | 2.1 / 3.6 | Composição de classes CSS |
| date-fns | 4.4 | Manipulação de datas |
| oxlint | 1.71 | Linting (Oxidation Engine) |

---

## 4. Arquitetura de Pastas

```
src/
├── app/                          # Camada de aplicação
│   ├── App.tsx                   # Layout principal (sidebar + rotas)
│   ├── main.tsx                  # Entry point
│   └── providers/                # Providers globais
│       ├── QueryProvider.tsx      # TanStack Query + Auth + Theme + Offline + Toast
│       ├── AuthProvider.tsx       # Autenticação (context + localStorage)
│       ├── ThemeProvider.tsx      # Tema (dark/light)
│       └── OfflineProvider.tsx    # Detecção de conexão
│
├── pages/                        # Páginas (13 rotas)
│   ├── marketplace/
│   │   ├── MarketplaceHome.tsx    # Dashboard com hero, filtros, carrinho
│   │   ├── CatalogoInsumos.tsx    # Catálogo de pedidos
│   │   └── RastreioEntrega.tsx    # Rastreamento de entregas
│   ├── credito/
│   │   ├── SimuladorCredito.tsx   # Simulador com gauge de score
│   │   ├── ScoreProdutor.tsx      # Score detalhado + dicas
│   │   └── Pagamentos.tsx         # Fluxo de parcelas
│   ├── assistencia/
│   │   ├── UploadAnalise.tsx      # Upload + resultado NDVI
│   │   ├── MapaNDVI.tsx           # Mapa Leaflet com áreas críticas
│   │   ├── HistoricoMapas.tsx     # Timeline de análises
│   │   └── Recomendacoes.tsx      # Recomendações IA
│   └── gestao/
│       ├── CalendarioAgricola.tsx  # Calendário + mapa
│       ├── ControlePragas.tsx     # Pragas com níveis de risco
│       ├── EstoqueInsumos.tsx     # Tabela de estoque
│       └── RelatorioProdutividade.tsx  # Gráficos comparativos
│
├── features/                     # Lógica de negócio (feature-based)
│   ├── cotacao/
│   │   ├── useCotacao.ts         # Hook: filtros, carrinho, pedidos
│   │   ├── CotacaoForm.tsx       # Formulário de cotação
│   │   └── CotacaoComparison.tsx # Comparação de preços
│   ├── credito/
│   │   ├── useCredito.ts         # Hook: simulação, score, propostas
│   │   ├── SimuladorForm.tsx     # Formulário de simulação
│   │   └── ContratoDigital.tsx   # Exibição de contrato
│   ├── drone/
│   │   ├── useDroneAnalysis.ts   # Hook: upload, NDVI, recomendações
│   │   ├── ImageUploader.tsx     # Drag & drop de imagens
│   │   └── NDVIViewer.tsx        # Visualização de resultado NDVI
│   └── gestao/
│       ├── useGestao.ts          # Hook: atividades, pragas, estoque
│       ├── CalendarioGrid.tsx    # Grid mensal de atividades
│       └── RelatorioChart.tsx    # Gráficos Recharts
│
├── widgets/                      # Componentes compostos
│   ├── CotacaoCard.tsx           # Card de insumo com rating
│   ├── ScoreGauge.tsx            # Gauge SVG animado
│   ├── MapaInterativo.tsx        # Mapa com marcadores NDVI
│   ├── MapaPropriedade.tsx       # Mapa de propriedade rural
│   ├── TimelineOperacional.tsx   # Timeline de atividades
│   └── AlertasInteligentes.tsx   # Painel de alertas
│
├── entities/                     # Camada de domínio
│   ├── insumo/
│   │   ├── types.ts              # Insumo, Fornecedor, Cotacao, Pedido
│   │   ├── api.ts                # Mock API de insumos
│   │   ├── mocks.ts              # Dados mockados
│   │   └── utils.ts              # getPrecoVariacao, getCategoriaLabel
│   ├── credito/
│   │   ├── types.ts              # CreditoSimulacao, ScoreBreakdown, Pagamento
│   │   ├── api.ts                # Mock API de crédito
│   │   ├── mocks.ts              # Dados mockados
│   │   └── score.ts              # getScoreColor, getScoreLabel
│   ├── analise/
│   │   ├── types.ts              # NDVIResult, AreaCritica, Recomendacao
│   │   ├── api.ts                # Mock API de análise
│   │   ├── mocks.ts              # Dados mockados
│   │   └── ndvi.ts               # getNDVICor, getNivelLabel
│   └── produtor/
│       └── types.ts              # Tipo do produtor
│
├── shared/                       # UI genérica e utilitários
│   ├── ui/
│   │   ├── Button/index.tsx      # 7 variantes, 5 tamanhos, loading
│   │   ├── Card/index.tsx        # 5 variantes, glow animado
│   │   ├── Input/index.tsx       # Input com label, erro, ícone
│   │   ├── Select/index.tsx      # Select estilizado
│   │   ├── Table/index.tsx       # Tabela com thead/tbody
│   │   ├── Modal/index.tsx       # Modal com backdrop blur
│   │   ├── Toast/index.tsx       # Sistema de notificações
│   │   ├── Skeleton/index.tsx    # Loading skeletons
│   │   ├── RealMap.tsx           # Leaflet wrapper
│   │   └── OfflineIndicator.tsx  # Badge de status offline
│   ├── styles/
│   │   └── globals.css           # Tema dark, animações, utilitários HUD
│   └── utils/
│       ├── currency.ts           # formatCurrency (BRL)
│       ├── date.ts               # formatDate, formatRelativeTime
│       ├── cn.ts                 # clsx + tailwind-merge
│       └── compression.ts        # Compressão de imagens no browser
│
└── assets/                       # Estáticos (imagens, SVGs)
```

---

## 5. Design System

### 5.1 Paleta de Cores

```
Background:     #06090f    (quase preto, base do tema)
Surface-900:    #0f172a    (cards, containers)
Surface-800:    #1e293b    (elevações)
Surface-700:    #334155    (bordas suaves)
Surface-600:    #475569    (texto secundário)
Surface-500:    #64748b    (texto terciário)
Surface-400:    #94a3b8    (texto muted)
Surface-300:    #cbd5e1    (texto ativo)

Neon Cyan:      #00f0ff    (primário, destaques, links)
Arc Green:      #22c55e    (sucesso, NDVI bom)
Plasma Purple:  #a855f7    (premium, crédito)
Warning Yellow: #eab308    (atenção, rating)
Danger Red:     #ef4444    (erro, NDVI crítico)
```

### 5.2 Tipografia

| Uso | Fonte | Peso | Aplicação |
|-----|-------|------|-----------|
| Display | Orbitron | 400–900 | h1, h2, h3, números grandes |
| Corpo | Space Grotesk | 300–700 | Texto de parágrafo, labels |
| Mono | JetBrains Mono | 400–700 | Códigos, dados técnicos, timestamps |

**Regra CSS global:**
```css
h1, h2, h3 { font-family: var(--font-display); }
[class*="text-3xl"][class*="font-black"],
[class*="text-4xl"][class*="font-black"] { font-family: var(--font-display); }
```

### 5.3 Componentes UI

#### Button — 7 Variantes

| Variante | Visual | Uso |
|----------|--------|-----|
| `arc` | Gradiente cyan→green | Ação principal (CTA) |
| `neon` | Fundo transparente + borda cyan | Ações secundárias |
| `secondary` | Gradiente purple | Ações premium |
| `ghost` | Fundo transparente | Ações discretas |
| `danger` | Fundo vermelho transparente | Excluir, cancelar |
| `outline` | Borda sutil | Alternativas |
| `primary` | Gradiente cyan→green (bold) | similar a arc |

**Tamanhos:** `xs` (28px), `sm` (36px), `md` (40px), `lg` (48px), `xl` (56px)

#### Card — 5 Variantes

| Variante | Visual |
|----------|--------|
| `default` | Surface básico |
| `hud` | Bordas neon, glassmorphism |
| `elevated` | Sombra projetada |
| `interactive` | Hover com scale |
| `glass` | Blur total |

#### Superfícies HUD

```css
.hud-surface {
  background: linear-gradient(135deg, rgba(15,23,42,0.9), rgba(6,9,15,0.95));
  border: 1px solid rgba(0,240,255,0.08);
  backdrop-filter: blur(20px);
}

.hud-surface-elevated {
  /* + sombra projetada + inset highlight */
}

.hud-glow {
  /* + box-shadow neon cyan */
}
```

### 5.4 Animações

| Classe | Efeito |
|--------|--------|
| `animate-fade-in` | Opacidade 0→1 |
| `animate-fade-in-up` | translateY + opacidade |
| `animate-scale-in` | scale(0.95)→1 |
| `animate-slide-in-right` | translateX |
| `animate-float` | Flutuação suave (4s loop) |
| `animate-shimmer-dark` | Brilho percorrente |
| `border-flow` | Gradiente animado nas bordas |
| `scan-line` | Linha de varredura vertical |
| `stagger-children` | Entrada escalonada dos filhos |

### 5.5 Ícones

Todos os ícones usam **Lucide React** com `strokeWidth={1.5}` para consistência:

| Módulo | Ícones |
|--------|--------|
| Sidebar | ShoppingCart, Package, MapPin, DollarSign, BarChart3, CreditCard, Image, Map, Clock, Calendar, Bug, Box, BarChart |
| Marketplace | Search, ShoppingCart |
| Categorias | FlaskConical, ShieldCheck, Sprout, Fuel, Wrench |
| Crédito | DollarSign, Zap |
| Análise | Satellite |
| Gestão | Calendar, AlertTriangle, Package, BarChart3 |
| UI | X, ChevronDown, ChevronLeft, Star, Layers |

---

## 6. Fluxo de Dados

### 6.1 Providers (ordem de composição)

```
QueryClientProvider
  └── ThemeProvider
        └── AuthProvider
              └── OfflineProvider
                    └── ToastProvider
                          └── {children}
```

### 6.2 TanStack Query

**Configuração padrão:**
```ts
staleTime: 5 * 60 * 1000,  // 5 minutos
retry: 2,
refetchOnWindowFocus: false,
```

**Padrão de hooks (feature-based):**

```ts
// Feature hook padrão
export function useFeatureName() {
  // 1. Queries para dados do servidor
  const { data, isLoading } = useQuery({
    queryKey: ['resource'],
    queryFn: () => api.getResource(),
  });

  // 2. Mutations para escrita
  const mutation = useMutation({
    mutationFn: (payload) => api.createResource(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['resource'] }),
  });

  // 3. Estado local quando necessário
  const [localState, setLocalState] = useState(null);

  return { data, isLoading, mutate: mutation.mutate, localState };
}
```

### 6.3 Mock APIs

Todas as APIs são mockadas com dados estáticos simulados:

| Módulo | API Mock | Dados |
|--------|---------|-------|
| Insumos | `insumoApi.listar()` | 12+ insumos com preços, fornecedores |
| Crédito | `creditoApi.simular()` | Simulação com score, parcelas |
| Análise | `analiseApi.processarNDVI()` | Resultado NDVI com áreas críticas |
| Gestão | `gestaoApi.getAtividades()` | Atividades calendário, pragas |

### 6.4 Banco de Dados Local (Dexie.js)

```ts
// Schema do IndexedDB
db.version(1).stores({
  insumos: '++id, nome, categoria',
  cotacoes: '++id, insumoId, data',
  analises: '++id, data, nivel',
  pedidos: '++id, status, dataCriacao',
});
```

Uso: sincronização offline-first, cache local de cotações e análises.

---

## 7. Módulos Detalhados

### 7.1 Marketplace de Insumos

**Componentes:**
- `MarketplaceHome` — Dashboard com hero (imagem Unsplash), busca, filtros, grid
- `CotacaoCard` — Card de insumo com rating, preço, variação
- `CotacaoForm` — Modal de cotação com quantity picker
- `CotacaoComparison` — Tabela comparativa entre fornecedores
- `CatalogoInsumos` — Lista de pedidos realizados
- `RastreioEntrega` — Mapa de rastreamento com timeline

**Dados:**
```ts
interface Insumo {
  id: string;
  nome: string;
  categoria: 'fertilizante' | 'defensivo' | 'semente' | 'equipamento' | 'combustivel';
  unidade: 'kg' | 'l' | 'un' | 'sc';
  precoAtual: number;
  precoAnterior?: number;
  fornecedor: Fornecedor;
  avaliacao?: number;  // 0-5
}
```

**Fluxo:**
1. Usuário busca/filtra insumos
2. Seleciona insumo → modal `CotacaoForm`
3. Define quantidade → adiciona ao carrinho
4. Carrinho sticky mostra total em tempo real
5. "Finalizar Pedido" → mutation `criarPedido`

### 7.2 Crédito Agrícola

**Componentes:**
- `SimuladorCredito` — Hero + formulário + resultado com gauge
- `SimuladorForm` — Input de valor, prazo, cultura
- `ScoreGauge` — SVG gauge animado (0-100)
- `ScoreProdutor` — Score detalhado + dicas de melhoria
- `ContratoDigital` — Exibição de contrato aprovado
- `Pagamentos` — Lista de parcelas com status

**Dados:**
```ts
interface CreditoSimulacao {
  valorSolicitado: number;
  prazoMeses: number;
  taxaJuros: number;        // Atrelado à previsão de colheita
  parcelaMensal: number;
  scoreBase: number;         // 0-100
  culturaReferencia: string; // Ex: "Soja"
}
```

**Fórmula de Score:**
```
Score = Σ (fator_valor × fator_peso)
Fatores: histórico_safra, seguro, gestão, NDVI, pagamentos
```

### 7.3 Análise NDVI

**Componentes:**
- `UploadAnalise` — Upload + resultado + recomendações + mapa
- `ImageUploader` — Drag & drop com preview
- `NDVIViewer` — Visualização de valores NDVI (mínimo, médio, máximo)
- `Recomendacoes` — Lista de recomendações IA
- `MapaNDVI` — Mapa Leaflet com marcadores coloridos
- `HistoricoMapas` — Timeline de análises anteriores

**Dados:**
```ts
interface NDVIResult {
  ndviMedio: number;    // -1 a 1
  ndviMinimo: number;
  ndviMaximo: number;
  areasCriticas: AreaCritica[];
}

interface AreaCritica {
  nivel: 'critico' | 'atencao' | 'bom';
  latitude: number;
  longitude: number;
  recomendacao: string;
}
```

**Cores NDVI:**
| Nível | Cor | Significado |
|-------|-----|-------------|
| `bom` | #22c55e (verde) | Vegetação saudável |
| `atencao` | #eab308 (amarelo) | Estresse moderado |
| `critico` | #ef4444 (vermelho) | Estresse severo |

**Compressão de imagem:**
```ts
compressImage(file, { maxWidth: 1200, quality: 0.7 })
// Reduz tamanho antes do upload, mantendo qualidade suficiente para NDVI
```

### 7.4 Gestão Operacional

**Componentes:**
- `CalendarioAgricola` — Grid mensal + mapa + alertas
- `CalendarioGrid` — Grid com atividades coloridas por tipo
- `ControlePragas` — Cards de pragas com nível de risco
- `EstoqueInsumos` — Tabela de estoque com valores
- `RelatorioProdutividade` — Gráficos comparativos regionais
- `RelatorioChart` — Recharts (barras, linhas, pizza)
- `TimelineOperacional` — Timeline de atividades recentes
- `AlertasInteligentes` — Painel de alertas do sistema

**Tipos de atividade no calendário:**
```ts
type TipoAtividade = 'plantio' | 'colheita' | 'irrigacao' | 'adubacao' | 'pulverizacao';
// Cores: plantio=#22c55e, colheita=#eab308, irrigacao=#3b82f6, adubacao=#00f0ff, pulverizacao=#ef4444
```

---

## 8. Mapas (Leaflet)

### 8.1 Configuração

```ts
// Tile provider escuro
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png')

// Centro padrão (Triângulo Mineiro, MG)
center: [-18.92, -48.28]
zoom: 12
```

### 8.2 Customização CSS

Popups, controles zoom e attribution são estilizados para o tema escuro:

```css
.leaflet-popup-content-wrapper {
  background: rgba(15,23,42,0.95);
  border: 1px solid rgba(0,240,255,0.15);
  backdrop-filter: blur(12px);
}

.leaflet-control-zoom a {
  background: rgba(15,23,42,0.9);
  color: #94a3b8;
  border: 1px solid rgba(0,240,255,0.1);
}
```

### 8.3 Marcadores

Marcadores customizados via `L.divIcon`:
```ts
L.divIcon({
  html: `<div style="width:28px;height:28px;border-radius:50%;
    background:${color};border:3px solid white;
    box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
  iconSize: [28, 28],
});
```

---

## 9. Performance

| Métrica | Valor |
|---------|-------|
| Build time | ~1.1s |
| Modules transformed | 963 |
| JS bundle (raw) | ~689 KB |
| JS bundle (gzip) | ~205 KB |
| CSS bundle (raw) | ~67 KB |
| CSS bundle (gzip) | ~16 KB |

**Recomendações para produção:**
- Code splitting com `React.lazy()` + `Suspense`
- Lazy loading de rotas
- Tree shaking de Lucide (importar apenas ícones usados)
- Compressão de imagens no build

---

## 10. Configuração do Ambiente

### 10.1 Alias de Caminhos

```ts
// vite.config.ts
'@': path.resolve(__dirname, './src')

// Uso
import { Button } from '@/shared/ui/Button'
```

### 10.2 TypeScript

```json
{
  "target": "es2023",
  "module": "esnext",
  "moduleResolution": "bundler",
  "jsx": "react-jsx",
  "paths": { "@/*": ["src/*"] },
  "ignoreDeprecations": "6.0"
}
```

### 10.3 Scripts

```json
{
  "dev": "vite",           // localhost:3000
  "build": "tsc -b && vite build",
  "lint": "oxlint",
  "preview": "vite preview"
}
```

---

## 11. Convenções de Código

### 11.1 Nomenclatura

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componente | PascalCase | `MarketplaceHome.tsx` |
| Hook | camelCase com `use` | `useCotacao.ts` |
| Tipo/Interface | PascalCase | `Insumo`, `CreditoSimulacao` |
| Utilitário | camelCase | `formatCurrency`, `getCategoriaLabel` |
| Constante | SCREAMING_SNAKE | `TIPO_CONFIG` |

### 11.2 Estrutura de Componente

```tsx
// Componente padrão
interface MeuComponenteProps {
  titulo: string;
  variant?: 'default' | 'hud';
}

export function MeuComponente({ titulo, variant = 'default' }: MeuComponenteProps) {
  return (
    <div className={cn('base-classes', variant === 'hud' && 'hud-classes')}>
      {titulo}
    </div>
  );
}
```

### 11.3 Estilização

- Tailwind CSS utility-first
- `cn()` (clsx + tailwind-merge) para classes condicionais
- Cores hardcoded via variáveis CSS ou hex direto
- Sem CSS modules ou styled-components

### 11.4 Imports

```ts
// Ordem padrão
import React from 'react';                    // 1. React
import { useQuery } from '@tanstack/react-query'; // 2. Bibliotecas
import { Button } from '@/shared/ui/Button';   // 3. Componentes internos
import type { Insumo } from '@/entities/insumo/types'; // 4. Tipos
```

---

## 12. Roadmap

### 12.1 Funcionalidades Futuras

- [ ] Autenticação real (JWT + refresh token)
- [ ] Backend GraphQL (Apollo Server + Prisma)
- [ ] Integração com API de clima (INMET)
- [ ] Processamento NDVI real (backend Python)
- [ ] Push notifications
- [ ] PWA (Progressive Web App)
- [ ] Testes E2E (Playwright)
- [ ] CI/CD (GitHub Actions)
- [ ] Code splitting por rota
- [ ] Internacionalização (pt-BR / en-US)

### 12.2 Débito Técnico

- Remover mocks e conectar a APIs reais
- Adicionar tratamento de erros global
- Implementar refresh automático de token
- Adicionar testes unitários nos hooks
- Otimizar bundle com dynamic imports

---

## 13. Contato

**Equipe AgroNexus**  
Stark Industries — Divisão Agrícola

---

*Documento gerado automaticamente — AgroNexus v2.0 Stark Edition*
