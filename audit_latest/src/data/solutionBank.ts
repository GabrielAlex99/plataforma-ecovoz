export interface RealSolution {
  id: string;
  title: string;
  problem: string;
  description: string;
  expectedImpact: string;
  complexity: 'Baixa' | 'Média' | 'Alta';
  category: string;
  sourceName: string;
  sourceUrl: string;
  type: 'DADO_OFICIAL' | 'MOCK_TEMPORARIO_SUBSTITUIR_POR_DADOS_REAIS';
  sourceType: 'official' | 'demo';
  label: 'Fonte pública' | 'Demonstração do protótipo' | 'Fonte pública';
}

export const realSolutions: RealSolution[] = [
  {
    id: 'sol-real-1',
    title: 'Cinturões verdes de amortecimento industrial',
    problem: 'Dispersão de material particulado de minério e ferro metálico.',
    description: 'Implantação de barreiras vegetais, arborização perimetral e zonas de amortecimento para reduzir poeira, calor e desconforto no entorno de áreas industriais.',
    expectedImpact: 'Estudos ambientais indicam potencial de filtragem física de material particulado com espécies de copa média/segunda classe.',
    complexity: 'Média',
    category: 'Barreiras verdes',
    sourceName: 'MMA - MonitorAr e Boas Práticas',
    sourceUrl: 'https://www.gov.br/mma/pt-br/assuntos/meio-ambiente-urbano-recursos-hidricos-qualidade-ambiental/qualidade-do-ar',
    type: 'DADO_OFICIAL',
    sourceType: 'official',
    label: 'Fonte pública'
  },
  {
    id: 'sol-real-2',
    title: 'Aspersão e umectação em áreas de poeira difusa',
    problem: 'Emissão difusa de poeira e cinzas de carvão (coque e escória).',
    description: 'Sistemas de aspersão, umectação e contenção de poeira aplicados em pátios, vias internas e áreas de movimentação de materiais.',
    expectedImpact: 'Prevenção de arraste aéreo de poeira em áreas abertas nos parques de estocagem mineral.',
    complexity: 'Alta',
    category: 'Ar',
    sourceName: 'Portal de Dados Abertos MMA (Padrões Tecnológicos)',
    sourceUrl: 'https://dados.mma.gov.br/',
    type: 'DADO_OFICIAL',
    sourceType: 'official',
    label: 'Fonte pública'
  },
  {
    id: 'sol-real-3',
    title: 'Jardins de chuva e infraestrutura verde',
    problem: 'Escoamento superficial poluído de óleos, graxas e metais pesados.',
    description: 'Soluções baseadas na natureza para retenção, drenagem, infiltração e tratamento preliminar de águas pluviais em áreas vulneráveis.',
    expectedImpact: 'Biorretenção e decantação de contaminantes solúveis por filtragem de substratos e plantas fitoremediadoras.',
    complexity: 'Baixa',
    category: 'Água',
    sourceName: 'MapBiomas Brasil (Infraestrutura Verde)',
    sourceUrl: 'https://brasil.mapbiomas.org/',
    type: 'DADO_OFICIAL',
    sourceType: 'official',
    label: 'Fonte pública'
  },
  {
    id: 'sol-real-4',
    title: 'Rede comunitária de sensores indicativos',
    problem: 'Falta de dados e assimetria informativa para a comunidade.',
    description: 'Sensores indicativos de baixo custo podem apoiar triagem comunitária e sinalizar áreas que merecem monitoramento oficial ou vistoria técnica.',
    expectedImpact: 'Capacitação comunitária para detecção indicativa de ar através de sensores de fita óptica ou PM2.5 de canal aberto.',
    complexity: 'Média',
    category: 'Ar',
    sourceName: 'MMA - MonitorAr (Ações Coletivas)',
    sourceUrl: 'https://www.gov.br/pt-br/servicos/obter-dados-das-estacoes-de-monitoramento-da-qualidade-do-ar-por-meio-do-indice-de-qualidade-do-ar-iqar-por-meio-do-aplicativo-monitorar',
    type: 'DADO_OFICIAL',
    sourceType: 'official',
    label: 'Fonte pública'
  }
];

export const demoSolutions: RealSolution[] = [
  {
    id: 'sol-demo-1',
    title: 'Silenciadores Acústicos Ativos de Pressão (Demonstração)',
    problem: 'Sopro de purga térmica industrial durante madrugadas.',
    description: 'Instalação de silenciadores de dispersão aerodinâmica para cancelamento de ondas mecânicas sob testes de bancada no simulador.',
    expectedImpact: 'Redução acústica simulada no painel demonstrativo do protótipo.',
    complexity: 'Alta',
    category: 'Ruído',
    sourceName: 'Protótipo EcoVoz (Demonstração)',
    sourceUrl: '',
    type: 'MOCK_TEMPORARIO_SUBSTITUIR_POR_DADOS_REAIS',
    sourceType: 'demo',
    label: 'Demonstração do protótipo'
  }
];
