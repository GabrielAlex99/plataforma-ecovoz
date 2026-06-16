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
  label: 'Dado oficial' | 'Demonstração do protótipo';
}

export const realSolutions: RealSolution[] = [
  {
    id: 'sol-real-1',
    title: 'Cinturões Verdes de Amortecimento Industrial (Silt Belts)',
    problem: 'Dispersão de material particulado de minério e ferro metálico.',
    description: 'Implantação de barreiras físicas e biológicas ativas baseadas em estratos arbustivos densos (Ipês, Clúsias, Pitangueiras) plantados ortogonalmente à direção preferencial do vento de dispersão para sedimentar o pó suspenso.',
    expectedImpact: 'Estudos ambientais indicam potencial de filtragem física de material particulado com espécies de copa média/segunda classe.',
    complexity: 'Média',
    category: 'Barreiras verdes',
    sourceName: 'MMA - MonitorAr e Boas Práticas',
    sourceUrl: 'https://www.gov.br/mma/pt-br/assuntos/meio-ambiente-urbano-recursos-hidricos-qualidade-ambiental/qualidade-do-ar',
    type: 'DADO_OFICIAL',
    sourceType: 'official',
    label: 'Dado oficial'
  },
  {
    id: 'sol-real-2',
    title: 'Sistemas de Aspersão de Microgotas e Umectação Contínua',
    problem: 'Emissão difusa de poeira e cinzas de carvão (coque e escória).',
    description: 'Bicos atomizadores instalados em pilhas e áreas de movimentação que emitem névoa ultrafina de água com polímeros biodegradáveis aglomerantes, coibindo a ação eólica de arraste.',
    expectedImpact: 'Prevenção de arraste aéreo de poeira em áreas abertas nos parques de estocagem mineral.',
    complexity: 'Alta',
    category: 'Ar',
    sourceName: 'Portal de Dados Abertos MMA (Padrões Tecnológicos)',
    sourceUrl: 'https://dados.mma.gov.br/',
    type: 'DADO_OFICIAL',
    sourceType: 'official',
    label: 'Dado oficial'
  },
  {
    id: 'sol-real-3',
    title: 'Jardins de Chuva e Sistemas Fitodepuradores Pluviais',
    problem: 'Escoamento superficial poluído de óleos, graxas e metais pesados.',
    description: 'Zonas baixas de captação providas de substrato poroso e espécies macrofitas filtrantes que retêm resíduos industriais, óleos da rodovia e metais em suspensão antes do retorno ao leito do estuário de pesca para garantir justiça hídrica comunitária.',
    expectedImpact: 'Biorretenção e decantação de contaminantes solúveis por filtragem de substratos e plantas fitoremediadoras.',
    complexity: 'Baixa',
    category: 'Água',
    sourceName: 'MapBiomas Brasil (Infraestrutura Verde)',
    sourceUrl: 'https://brasil.mapbiomas.org/',
    type: 'DADO_OFICIAL',
    sourceType: 'official',
    label: 'Dado oficial'
  },
  {
    id: 'sol-real-4',
    title: 'Rede Local Popular de Micro-Sensores Abertos de Particulados',
    problem: 'Falta de dados e assimetria informativa para a comunidade.',
    description: 'Micro-scrapers IoT de baixo custo espalhados pelas varandas de residências vulneráveis, coletando leituras constantes e alimentando painéis da sociedade civil para monitorar alertas.',
    expectedImpact: 'Capacitação comunitária para detecção indicativa de ar através de sensores de fita óptica ou PM2.5 de canal aberto.',
    complexity: 'Média',
    category: 'Ar',
    sourceName: 'MMA - MonitorAr (Ações Coletivas)',
    sourceUrl: 'https://www.gov.br/pt-br/servicos/obter-dados-das-estacoes-de-monitoramento-da-qualidade-do-ar-por-meio-do-indice-de-qualidade-do-ar-iqar-por-meio-do-aplicativo-monitorar',
    type: 'DADO_OFICIAL',
    sourceType: 'official',
    label: 'Dado oficial'
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
    sourceUrl: '#',
    type: 'MOCK_TEMPORARIO_SUBSTITUIR_POR_DADOS_REAIS',
    sourceType: 'demo',
    label: 'Demonstração do protótipo'
  }
];
