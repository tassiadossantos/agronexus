import { useQuery } from '@tanstack/react-query';

interface Atividade {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  tipo: 'plantio' | 'adubacao' | 'colheita' | 'defensivo' | 'irrigacao' | 'manejo';
  status: 'concluido' | 'em_andamento' | 'pendente' | 'atrasado';
  propriedade: string;
}

interface Praga {
  id: string;
  nome: string;
  nomeCientifico: string;
  cultura: string;
  nivelRisco: 'alto' | 'medio' | 'baixo';
  descricao: string;
  manejo: string[];
  regiao: string;
}

interface EstoqueItem {
  id: string;
  insumo: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  estoqueMinimo: number;
  custoUnitario: number;
  ultimoReabastecimento: string;
}

interface Relatorio {
  periodos: { mes: string; produtividade: number; area: number }[];
  comparativoRegiao: { fazenda: number; regiao: number; estado: number };
}

const mockAtividades: Atividade[] = [
  { id: 'at1', titulo: 'Plantio Soja Lote A', descricao: 'Semeadura direta soja IPRO', data: '2026-10-15', tipo: 'plantio', status: 'pendente', propriedade: 'Fazenda São Jorge' },
  { id: 'at2', titulo: 'Adubacao Foliar', descricao: 'Aplicação ureia 2% lote central', data: '2026-07-25', tipo: 'adubacao', status: 'em_andamento', propriedade: 'Fazenda São Jorge' },
  { id: 'at3', titulo: 'Pulverização Defensivos', descricao: 'Aplicação inseticida lote B', data: '2026-07-20', tipo: 'defensivo', status: 'concluido', propriedade: 'Fazenda Santa Maria' },
  { id: 'at4', titulo: 'Controle de Pragas', descricao: 'Monitoramento semanal - percevejos', data: '2026-07-22', tipo: 'manejo', status: 'em_andamento', propriedade: 'Fazenda São Jorge' },
  { id: 'at5', titulo: 'Irrigacao Pivot Central', descricao: 'Ciclo completo 48h', data: '2026-07-23', tipo: 'irrigacao', status: 'pendente', propriedade: 'Fazenda São Jorge' },
  { id: 'at6', titulo: 'Colheita Milho Safrinha', descricao: 'Colheita mecanizada lote C', data: '2026-07-10', tipo: 'colheita', status: 'concluido', propriedade: 'Fazenda Santa Maria' },
];

const mockPragas: Praga[] = [
  { id: 'pg1', nome: 'Percevejo Marrom', nomeCientifico: 'Euschistus heros', cultura: 'Soja', nivelRisco: 'alto', descricao: 'Praga de alta devastação na soja em fase reprodutiva', manejo: ['Monitoramento com bandeja de queda', 'Aplicação de bifentrina quando >5 percevejos/bandeja', 'Controle biológico com Telenomus'], regiao: 'Sudeste' },
  { id: 'pg2', nome: 'Lagarta-do-cartucho', nomeCientifico: 'Spodoptera frugiperda', cultura: 'Milho', nivelRisco: 'medio', descricao: 'Principal praga do milho, causa perdas significativas', manejo: ['Bt na semente', 'Monitoramento com feromonio', 'Aplicação de Bt quando NDF >30%'], regiao: 'Centro-Oeste' },
  { id: 'pg3', nome: 'Ferrugem Asiática', nomeCientifico: 'Phakopsora pachyrhizi', cultura: 'Soja', nivelRisco: 'alto', descricao: 'Doença fúngica de alto impacto na produtividade', manejo: ['Variedades resistentes', 'Aplicação preventiva de fungicidas', 'Rotação de culturas'], regiao: 'Nacional' },
];

const mockEstoque: EstoqueItem[] = [
  { id: 'e1', insumo: 'Uréia 45-00-00', categoria: 'Fertilizante', quantidade: 8500, unidade: 'kg', estoqueMinimo: 5000, custoUnitario: 2.85, ultimoReabastecimento: '2026-07-15' },
  { id: 'e2', insumo: 'Glifosato 480 SL', categoria: 'Defensivo', quantidade: 120, unidade: 'L', estoqueMinimo: 80, custoUnitario: 45.90, ultimoReabastecimento: '2026-07-10' },
  { id: 'e3', insumo: 'Soja TMG 7062 IPRO', categoria: 'Semente', quantidade: 35, unidade: 'sc', estoqueMinimo: 20, custoUnitario: 380.00, ultimoReabastecimento: '2026-06-20' },
  { id: 'e4', insumo: 'Fosfato MAP', categoria: 'Fertilizante', quantidade: 2200, unidade: 'kg', estoqueMinimo: 3000, custoUnitario: 3.20, ultimoReabastecimento: '2026-07-01' },
];

const mockRelatorio: Relatorio = {
  periodos: [
    { mes: 'Jan', produtividade: 58, area: 200 },
    { mes: 'Fev', produtividade: 62, area: 350 },
    { mes: 'Mar', produtividade: 55, area: 500 },
    { mes: 'Abr', produtividade: 0, area: 0 },
    { mes: 'Mai', produtividade: 0, area: 0 },
    { mes: 'Jun', produtividade: 48, area: 400 },
    { mes: 'Jul', produtividade: 52, area: 600 },
  ],
  comparativoRegiao: { fazenda: 58, regiao: 54, estado: 52 },
};

export function useGestao() {
  const { data: atividades = mockAtividades, isLoading: loadingAtividades } = useQuery({
    queryKey: ['atividades'],
    queryFn: async () => { await new Promise((r) => setTimeout(r, 300)); return mockAtividades; },
  });

  const { data: pragas = mockPragas, isLoading: loadingPragas } = useQuery({
    queryKey: ['pragas'],
    queryFn: async () => { await new Promise((r) => setTimeout(r, 300)); return mockPragas; },
  });

  const { data: estoque = mockEstoque, isLoading: loadingEstoque } = useQuery({
    queryKey: ['estoque'],
    queryFn: async () => { await new Promise((r) => setTimeout(r, 300)); return mockEstoque; },
  });

  const { data: relatorio = mockRelatorio } = useQuery({
    queryKey: ['relatorio'],
    queryFn: async () => { await new Promise((r) => setTimeout(r, 400)); return mockRelatorio; },
  });

  return {
    atividades, loadingAtividades,
    pragas, loadingPragas,
    estoque, loadingEstoque,
    relatorio,
  };
}
