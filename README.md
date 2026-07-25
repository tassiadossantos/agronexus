<div align="center">

# AGRO<span style="color:#00f0ff">NEXUS</span>

**Plataforma integrada de gestão agrícola com inteligência artificial**

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_6-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)

</div>

---

## Visão Geral

**AgroNexus** é uma aplicação web full-stack voltada para o ecossistema agrícola brasileiro, integrando marketplace de insumos, crédito baseado em safra, análise NDVI por drones e gestão operacional — com interface futurista inspirada em sistemas HUD.

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | React | 19.2 |
| Linguagem | TypeScript | 6.0 |
| Build Tool | Vite | 8.1 |
| CSS Framework | Tailwind CSS | 4.3 |
| State Management | TanStack Query | 5.101 |
| Roteamento | React Router DOM | 7.18 |
| Mapas | Leaflet + React-Leaflet | 1.9 / 5.0 |
| Gráficos | Recharts | 3.10 |
| Ícones | Lucide React | 1.27 |
| Banco Local | Dexie.js (IndexedDB) | 4.4 |
| GraphQL | graphql-request | 7.4 |
| Linting | oxlint | 1.71 |

## Arquitetura

```
src/
├── app/                    # Providers, layout principal, roteamento
│   ├── App.tsx             # Sidebar + rotas
│   └── providers/          # Auth, Theme, Query, Offline
├── pages/                  # Páginas (13 rotas)
│   ├── marketplace/        # Cotação, Pedidos, Rastreio
│   ├── credito/            # Simulador, Score, Pagamentos
│   ├── assistencia/        # Upload NDVI, Mapa, Histórico
│   └── gestao/             # Calendário, Pragas, Estoque, Relatórios
├── features/               # Lógica de negócio
│   ├── cotacao/            # Cotação de insumos, comparação
│   ├── credito/            # Simulador, contrato digital
│   ├── drone/              # Upload, análise NDVI, recomendações
│   └── gestao/             # Calendário grid, relatórios
├── widgets/                # Componentes de UI compostos
│   ├── CotacaoCard.tsx
│   ├── ScoreGauge.tsx
│   ├── MapaInterativo.tsx
│   ├── MapaPropriedade.tsx
│   ├── TimelineOperacional.tsx
│   └── AlertasInteligentes.tsx
├── entities/               # Tipos, mocks, utilitários de domínio
│   ├── insumo/
│   ├── credito/
│   └── analise/
├── shared/                 # UI genérica, utils, estilos
│   ├── ui/                 # Button, Card, Input, Select, Table, Modal, Toast, Skeleton, RealMap
│   ├── styles/             # globals.css (tema dark, animações HUD)
│   └── utils/              # currency, date, cn
└── assets/                 # Estáticos
```

## Design System

### Tema Escuro HUD

- **Background:** `#06090f`
- **Neon Cyan:** `#00f0ff` — cor primária de destaque
- **Arc Green:** `#22c55e` — status positivo
- **Plasma Purple:** `#a855f7` — elementos premium

### Tipografia

| Uso | Fonte | Peso |
|-----|-------|------|
| Headings | Orbitron | 400–900 |
| Corpo | Space Grotesk | 300–700 |
| Código/Dados | JetBrains Mono | 400–700 |

### Componentes

- **7 variantes de Button** — default, neon, arc, plasma, ghost, outline, danger
- **5 variantes de Card** — default, hud, elevated, interactive, glass
- **Superfícies HUD** — glassmorphism com `backdrop-filter: blur(20px)`
- **Animações** — fade-in, scale-in, border-flow gradient, scan-line, shimmer
- **Indicadores de status** — online/offline com glow pulse

## Funcionalidades

### Marketplace de Insumos
- Cotação comparativa de fertilizantes, defensivos, sementes
- Carrinho de compras com total em tempo real
- Filtro por categoria com ícones Lucide
- Comparação de preços entre fornecedores

### Crédito Agrícola
- Simulador baseado em previsão de colheita (não taxa fixa)
- Score do produtor com gauge animado
- Contrato digital com cláusulas
- Simulação de parcelas

### Análise NDVI
- Upload de imagens de drone/satélite
- Processamento NDVI com visualização de mapa
- Níveis: crítico, atenção, bom
- Recomendações IA (irrigação, adubação, manejo)
- Histórico de análises

### Gestão Operacional
- Calendário agrícola com atividades
- Controle de pragas com níveis de risco
- Estoque de insumos com tabela
- Relatórios de produtividade com gráficos
- Mapas interativos com Leaflet (CartoDB Dark Matter)

## Pré-requisitos

- Node.js >= 18
- npm >= 9

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/agro-nexus.git
cd agro-nexus

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Build de produção (tsc + vite build) |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Linting com oxlint |

## Configuração

### Alias de Caminhos

```ts
// vite.config.ts
'@': path.resolve(__dirname, './src')
```

Uso: `import { Button } from '@/shared/ui/Button'`

### Mapas

Utiliza **CartoDB Dark Matter** como tile provider para tema escuro:

```ts
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png')
```

### Banco de Dados Local

Dexie.js (IndexedDB) para dados offline:

```ts
// Dexie database schema
db.version(1).stores({
  insumos: '++id, nome, categoria',
  cotacoes: '++id, insumoId, data',
  analises: '++id, data, nivel',
});
```

## Performance

- **Build:** ~1.1s (963 modules)
- **Bundle:** ~689 KB JS (gzip: ~205 KB) / ~67 KB CSS (gzip: ~16 KB)
- **Code Splitting:** recomendado para produção (chunk > 500 KB warning)

## Estrutura de Rotas

| Rota | Página |
|------|--------|
| `/` | Marketplace de Insumos |
| `/pedidos` | Catálogo / Meus Pedidos |
| `/rastreio` | Rastreio de Entregas |
| `/credito` | Simulador de Crédito |
| `/score` | Score do Produtor |
| `/pagamentos` | Pagamentos |
| `/analise` | Upload & Análise NDVI |
| `/mapa-ndvi` | Mapa NDVI |
| `/historico-mapas` | Histórico de Análises |
| `/calendario` | Calendário Agrícola |
| `/pragas` | Controle de Pragas |
| `/estoque` | Estoque de Insumos |
| `/relatorios` | Relatórios de Produtividade |

## Licença

MIT License — veja [LICENSE](LICENSE) para detalhes.

---

<div align="center">

**AgroNexus** — v2.0

</div>
