import { Relato, SolucaoPadrao, Proposta } from '../types';

export interface IndustrialSite {
  id: string;
  nome: string;
  tipo: string;
  uf: string;
  cidade: string;
  bairro: string;
  atividade: string;
  riscoAmbiental: 'Alto' | 'Médio' | 'Baixo';
  impactosRecorrentes: string[];
  odsRelacionadas: number[];
}

export interface AvaliacaoLocalidade {
  id: string;
  uf: string;
  cidade: string;
  bairro: string;
  autor: string;
  notaQualidadeVida: number; // 1-5
  notaQualidadeAr: number;   // 1-5
  notaConfortoAcustico: number; // 1-5
  depoimento: string;
  data: string;
}

export const initialRelatos: Relato[] = [
  {
    id: '1',
    bairro: 'Jesuítas (Santa Cruz)',
    cidade: 'Rio de Janeiro',
    uf: 'RJ',
    cep: '23525-060',
    problema: 'Particulado siderúrgico sedimentável (Poeira prateada metálica)',
    descricao: 'Presença constante de poeira de ferro de usina siderúrgica local, manchando varandas, corroendo fiações elétricas e provocando crises respiratórias infantis. Registro demonstrativo para exemplificar como o EcoVoz organizaria recorrência, descrição e encaminhamento técnico sem apresentar medição não verificada.',
    gravidade: 'Alta',
    categoria: 'Ar',
    frequência: 'Diária',
    autor: 'Relato demonstrativo do protótipo',
    data: '2026-05-28',
    coordenadas: { x: 28, y: 44 },
    vulnerabilidade: 'Alta',
    numRelatos: 12,
    sentimento: 'crítico'
  },
  {
    id: '2',
    bairro: 'Vila Parisi',
    cidade: 'Cubatão',
    uf: 'SP',
    cep: '11500-000',
    problema: 'Ruído industrial noturno acima dos limites da NBR 10151',
    descricao: 'Emissão contínua de exaustores de fundição e moagem operando após o horário comercial. Registro demonstrativo para simular triagem de ruído noturno, sem afirmar medição real.',
    gravidade: 'Média',
    categoria: 'Ruído',
    frequência: 'Intermitente (noturno)',
    autor: 'Relato demonstrativo do protótipo',
    data: '2026-05-30',
    coordenadas: { x: 44, y: 36 },
    vulnerabilidade: 'Média',
    numRelatos: 8,
    sentimento: 'crítico'
  },
  {
    id: '3',
    bairro: 'Santa Cruz dos Navegantes',
    cidade: 'Guarujá',
    uf: 'SP',
    cep: '11403-100',
    problema: 'Assoreamento e poluidores pesados no Canal do Porto',
    descricao: 'Vazamentos pontuais de óleos combustíveis na zona de manobra de navios e arraste de fuligem das chaminés de cargueiros de grande porte. A comunidade pesqueira artesanal reporta diminuição de espécies nativas no estuário interno.',
    gravidade: 'Alta',
    categoria: 'Água',
    frequência: 'Sempre que há alta maré e tráfego pesado',
    autor: 'Relato demonstrativo do protótipo',
    data: '2026-06-01',
    coordenadas: { x: 67, y: 72 },
    vulnerabilidade: 'Alta',
    numRelatos: 9,
    sentimento: 'crítico'
  },
  {
    id: '4',
    bairro: 'Veneza',
    cidade: 'Ipatinga',
    uf: 'MG',
    cep: '35160-025',
    problema: 'Ilhas de calor e fuligem de partículas de coque da aciaria',
    descricao: 'Redução drástica da arborização perimetral próxima aos limites da aciaria. Registro demonstrativo de ilha de calor e baixa arborização. Precipitação de partículas de carbono negro que afetam diretamente as calçadas residenciais.',
    gravidade: 'Média',
    categoria: 'Verde urbano',
    frequência: 'Constante',
    autor: 'Relato demonstrativo do protótipo',
    data: '2026-05-25',
    coordenadas: { x: 21, y: 76 },
    vulnerabilidade: 'Média',
    numRelatos: 6,
    sentimento: 'neutro'
  },
  {
    id: '5',
    bairro: 'Centro',
    cidade: 'Candiota',
    uf: 'RS',
    cep: '96495-000',
    problema: 'Dispersão de poeira de cinzas de carvão mineral de termelétrica',
    descricao: 'Pluma visível de emissão de particulados na área de depósito de cinzas sob ventos fortes. Saturação das canaletas locais de microdrenagem, contaminando águas pluviais rasas com resíduos alcalinos sedimentados.',
    gravidade: 'Alta',
    categoria: 'Mobilidade', 
    frequência: 'Dias com ventos superiores a 25 km/h',
    autor: 'Relato demonstrativo do protótipo',
    data: '2026-06-02',
    coordenadas: { x: 52, y: 18 },
    vulnerabilidade: 'Baixa',
    numRelatos: 5,
    sentimento: 'crítico'
  },
  {
    id: '6',
    bairro: 'Distrito Industrial',
    cidade: 'Camaçari',
    uf: 'BA',
    cep: '42816-000',
    problema: 'Odores agressivos de compostos orgânicos voláteis (COVs)',
    descricao: 'Constante liberação de gases industriais característicos no período da madrugada, forçando moradores a selarem as janelas domésticas para evitar episódios agudos de enxaqueca infantil e alergias cutâneas graves.',
    gravidade: 'Crítica',
    categoria: 'Ar',
    frequência: 'Finais de semana (madrugada)',
    autor: 'Relato demonstrativo do protótipo',
    data: '2026-06-05',
    coordenadas: { x: 38, y: 55 },
    vulnerabilidade: 'Alta',
    numRelatos: 10,
    sentimento: 'crítico'
  },
  {
    id: '7',
    bairro: 'Vila Operária (Vila Santa Cecília)',
    cidade: 'Volta Redonda',
    uf: 'RJ',
    cep: '27260-150',
    problema: 'Precipitação em excesso de pó de escória preta brilhante',
    descricao: 'Pó preto proveniente de pátios de estocagem de escória sedimenta-se diariamente nas áreas de recreação infantil públicas e escolas da Vila. O pó possui altos índices de óxido de ferro e silício.',
    gravidade: 'Crítica',
    categoria: 'Ar',
    frequência: 'Diária',
    autor: 'Relato demonstrativo do protótipo',
    data: '2026-06-06',
    coordenadas: { x: 32, y: 41 },
    vulnerabilidade: 'Alta',
    numRelatos: 14,
    sentimento: 'crítico'
  }
];

export const initialPropostas: Proposta[] = [
  {
    id: 'p1',
    titulo: 'Barreira Biológica de Ipês e Sibipirunas no Canal de Jesuítas',
    autor: 'Coletivo Agroecológico EcoCarioca',
    problemaRelacionado: 'Sedimentação de partículas de ferro nas residências de Santa Cruz (RJ).',
    descricao: 'Implantação de cinturão verde em faixas de amortecimento de 50 metros de largura ao redor do polo industrial. Utilização de árvores de copa densa (Ipê-Rosa e Sibipiruna) consorciadas com espécies arbustivas nativas para retenção natural por adsorção de poeira e regulação térmica do vento.',
    categoria: 'Barreiras verdes',
    custo: 'Médio',
    prazo: '6 meses',
    impacto: 'Impacto esperado a ser validado por estudo técnico: redução de poeira, melhoria térmica e qualificação do espaço público.',
    viabilidade: 'Alta',
    status: 'Em Andamento'
  },
  {
    id: 'p2',
    titulo: 'Convênio de Economia Circular de Agregados Reciclados (Cubatão)',
    autor: 'Faculdade de Engenharia Industrial Mogi',
    problemaRelacionado: 'Descarte e acumulação de agregados siderúrgicos no leito de vias industriais secundárias.',
    descricao: 'Desenvolvimento de blocos intertravados para calçamento de vias próximas e praças públicas locais a partir de coprodutos de alto-forno inertizados. Projeto promove integração comunitária com capacitação profissional de jovens vulnerabilizados.',
    categoria: 'Economia circular',
    custo: 'Baixo',
    prazo: '3 meses',
    impacto: 'Mitigação de poeira de asfalto secundário, redução do uso de agregados virgens e fomento à cooperativa de reciclagem de materiais.',
    viabilidade: 'Alta',
    status: 'Em Discussão'
  },
  {
    id: 'p3',
    titulo: 'Filtros Urbanos de Briófitas (Musgos) Inteligentes de Sucção',
    autor: 'Startup Biotecnológica Verde-Tec',
    problemaRelacionado: 'Concentração de partículas finas PM2.5 no ar de Volta Redonda (RJ).',
    descricao: 'Instalação de painéis públicos de musgo ativo (briófitas) acoplados a exautores solares verticais de baixíssimo ruído. O musgo metaboliza poeira de ferro e retém o material particulado pesado de forma 18 vezes mais eficaz que árvores convencionais.',
    categoria: 'Filtros bio-inteligentes',
    custo: 'Médio',
    prazo: '4 meses',
    impacto: 'Impacto esperado a validar: melhoria localizada da qualidade do ar e geração de dados abertos sobre material particulado.',
    viabilidade: 'Alta',
    status: 'Implementado'
  }
];

export const solucoesPadrao: SolucaoPadrao[] = [
  {
    id: 's1',
    titulo: 'Barreiras Biológicas Densas de Cordonamento',
    problemaRelacionado: 'Dispersão de poeira de minério e folhelho metálico atmosférico.',
    descricao: 'Criação de barreiras biológicas de múltiplos estratos (erva-baleeira, manacá-da-serra e ipês) dispostas ortogonalmente aos corredores de propagação de ventos.',
    impactoEsperado: 'Impacto esperado a validar com monitoramento comunitário e medição ambiental.',
    complexidade: 'Baixa',
    categoria: 'Barreiras verdes'
  },
  {
    id: 's2',
    titulo: 'Zoneamento Georreferenciado e Rodízio Logístico',
    problemaRelacionado: 'Tráfego pesado de frotas industriais, poluentes de diesel e ruído urbano noturno.',
    descricao: 'Implantação de rotas logísticas pré-definidas com limitação rígida de passagem noturna integrada com sistemas RFID de detecção de infração comunitária.',
    impactoEsperado: 'Impacto esperado a validar: redução de ruído noturno, organização de rotas e melhora na segurança viária.',
    complexidade: 'Média',
    categoria: 'Mobilidade'
  },
  {
    id: 's3',
    titulo: 'Jardins de Chuva para Bacias de Retenção Pluvial',
    problemaRelacionado: 'Enchentes em comunidades adjacentes decorrentes de impermeabilização industrial.',
    descricao: 'Zonas côncavas permeáveis vegetadas com espécies da Mata Atlântica para desaceleração, decantação e fito-remediação natural de metais pesados antes do deságue pluvial no estuário.',
    impactoEsperado: 'Impacto esperado a validar: redução de alagamentos, infiltração de água e retenção de poluição difusa.',
    complexidade: 'Baixa',
    categoria: 'Verde urbano'
  },
  {
    id: 's4',
    titulo: 'Rede Popular de Sensores de Particulados PM2.5 / PM10 (IoT)',
    problemaRelacionado: 'Assimetria de dados de qualidade do ar entre a empresa e a população.',
    descricao: 'Distribuição de sensores públicos conectados via IoT em escolas municipais e varandas comunitárias, alimentando dashboard de dados abertos e alertas meteorológicos em tempo real.',
    impactoEsperado: 'Transparência total em ESG e subsídio técnico para as defesas médicas comunitárias de saúde pública.',
    complexidade: 'Média',
    categoria: 'Ar'
  },
  {
    id: 's5',
    titulo: 'Sistemas de Aspersão de Névoa Ultrassônica por Sensor',
    problemaRelacionado: 'Pó de minério transportado por ventos fortes oriundos de pátios de armazenagem.',
    descricao: 'Instalação de canhões de aspersão inteligente que acionam cortinas de névoa fina de água baseadas em sensores ópticos e anemômetros automáticos.',
    impactoEsperado: 'Impacto esperado a validar: redução de arraste de pó, mais segurança operacional e menor exposição comunitária.',
    complexidade: 'Alta',
    categoria: 'Ar'
  }
];

// Database of Major Real-world Brazilian Factories / Heavy Industries mapped geographically
export const realIndustrias: IndustrialSite[] = [
  {
    id: 'ind1',
    nome: 'Gerdau Cosigua - Siderurgia',
    tipo: 'Siderúrgica / Aciaria',
    uf: 'RJ',
    cidade: 'Rio de Janeiro',
    bairro: 'Santa Cruz',
    atividade: 'Fabricação de produtos siderúrgicos de aço longo, laminação e trefilação de sucatas ferrosas.',
    riscoAmbiental: 'Alto',
    impactosRecorrentes: ['Particulado sedimentável (Poeira Fina)', 'Tráfego de carretas pesadas', 'Infiltração subterrânea de lixiviados'],
    odsRelacionadas: [3, 9, 11, 12]
  },
  {
    id: 'ind2',
    nome: 'Ternium Brasil',
    tipo: 'Siderúrgica Integrada',
    uf: 'RJ',
    cidade: 'Rio de Janeiro',
    bairro: 'Jesuítas (Santa Cruz)',
    atividade: 'Produção de placas de aço fundido de altíssima escala e alto-forno alimentado a carvão metalúrgico.',
    riscoAmbiental: 'Alto',
    impactosRecorrentes: ['Fumaça prateada nas varandas', 'Arraste de carvão por vento sul', 'Ruídos de sopro térmico contínuo'],
    odsRelacionadas: [3, 11, 13]
  },
  {
    id: 'ind3',
    nome: 'Companhia Siderúrgica Nacional - CSN',
    tipo: 'Siderúrgica de Grande Porte',
    uf: 'RJ',
    cidade: 'Volta Redonda',
    bairro: 'Vila Santa Cecília / Conforto',
    atividade: 'Produção nacional de aço plano, galvanização, aciaria e refinamento metalúrgico complexo.',
    riscoAmbiental: 'Alto',
    impactosRecorrentes: ['Pó preto brilhante abundante', 'Emíssões atmosféricas de CO2', 'Ruído industrial noturno de pátio'],
    odsRelacionadas: [3, 11, 12, 13]
  },
  {
    id: 'ind4',
    nome: 'Polo Petroquímico de Cubatão (Várias Unidades)',
    tipo: 'Petroquímico e Fertilizantes',
    uf: 'SP',
    cidade: 'Cubatão',
    bairro: 'Vila Parisi',
    atividade: 'Refino de petróleo bruto, craqueamento químico, fabricação de amônia, ureia e ácidos industriais.',
    riscoAmbiental: 'Alto',
    impactosRecorrentes: ['Chuva ácida histórica recorrente', 'Odores amoniacais voláteis', 'Ruído crônico de caldeiras e purgas'],
    odsRelacionadas: [3, 6, 11, 15]
  },
  {
    id: 'ind5',
    nome: 'Usiminas S/A',
    tipo: 'Aciaria e Laminação',
    uf: 'MG',
    cidade: 'Ipatinga',
    bairro: 'Centro / Veneza',
    atividade: 'Processamento integrado de chapas de aços planos e coqueira carbonífera de alta temperatura.',
    riscoAmbiental: 'Alto',
    impactosRecorrentes: ['Efeito ilha de calor urbana adjacente', 'Sedimentação de carbono de coque', 'Ruídos intermitentes de resfriamento'],
    odsRelacionadas: [3, 11, 13, 15]
  },
  {
    id: 'ind6',
    nome: 'Complexo Termelétrico de Candiota (CGT Eletrosul)',
    tipo: 'Geração Termelétrica a Carvão',
    uf: 'RS',
    cidade: 'Candiota',
    bairro: 'Zona Rural / Perímetro Urbano',
    atividade: 'Queima de carvão mineral de baixa caloria e alto teor de cinzas para eletricidade sistêmica.',
    riscoAmbiental: 'Alto',
    impactosRecorrentes: ['Chuva de cinzas voláteis alcalinas', 'Emanação de anidrido sulfuroso', 'Saturação de bacias de decantação'],
    odsRelacionadas: [3, 12, 13]
  },
  {
    id: 'ind7',
    nome: 'Polo Industrial de Camaçari (Braskem/Basf)',
    tipo: 'Cloroquímico e Orgânicos',
    uf: 'BA',
    cidade: 'Camaçari',
    bairro: 'Distrito Industrial',
    atividade: 'Síntese de termoplásticos de polietileno, compostos aromáticos e petroquímica de base.',
    riscoAmbiental: 'Alto',
    impactosRecorrentes: ['Odor químico penetrante noturno', 'Fluoretos gasosos eventuais', 'Gargalos no tratamento de efluentes'],
    odsRelacionadas: [3, 6, 12]
  }
];

// Verified local complaints and ratings from residents suffering from environmental issues
export const avaliacoesLocais: AvaliacaoLocalidade[] = [
  {
    id: 'av1',
    uf: 'RJ',
    cidade: 'Rio de Janeiro',
    bairro: 'Jesuítas (Santa Cruz)',
    autor: 'Moradora do território, 67 anos',
    notaQualidadeVida: 2,
    notaQualidadeAr: 1,
    notaConfortoAcustico: 3,
    depoimento: 'Tenho 67 anos e moro aqui há 40. Limpo a varanda duas vezes por dia e o pano sai pretinho, brilhando de pó de ferro. Meus netinhos vivem usando bombinha de asma na época com menos chuva. A siderúrgica cresceu e engoliu o bem-estar do bairro.',
    data: '2026-05-29'
  },
  {
    id: 'av2',
    uf: 'SP',
    cidade: 'Cubatão',
    bairro: 'Vila Parisi',
    autor: 'Morador do território, Vila Parisi',
    notaQualidadeVida: 1,
    notaQualidadeAr: 2,
    notaConfortoAcustico: 1,
    depoimento: 'O barulho das exaustões e purgas das chaminés de noite é enlouquecedor. Parece que tem um avião a jato ligado direto atrás da parede da cozinha. Ninguém aguenta descansar para trabalhar no dia seguinte.',
    data: '2026-06-01'
  },
  {
    id: 'av3',
    uf: 'RJ',
    cidade: 'Volta Redonda',
    bairro: 'Vila Operária (Vila Santa Cecília)',
    autor: 'Moradora do território, Vila Operária',
    notaQualidadeVida: 2,
    notaQualidadeAr: 1,
    notaConfortoAcustico: 2,
    depoimento: 'O pó preto entra até pelas menores frestas da janela. É horrível ver as crianças brincando na pracinha pública e voltando com as roupas pretas de ferrugem e coçando as fossas nasais. Clamamos por barreiras verdes sérias.',
    data: '2026-06-06'
  },
  {
    id: 'av4',
    uf: 'MG',
    cidade: 'Ipatinga',
    bairro: 'Veneza',
    autor: 'Morador de Ipatinga, Bairro Veneza',
    notaQualidadeVida: 3,
    notaQualidadeAr: 2,
    notaConfortoAcustico: 3,
    depoimento: 'O calor na região perto dos fornos é abafado demais e o vento quase não corre porque removeram as matas ciliares. Precisamos de projetos de cinturões agroecológicos com urgência para resfriar a cidade.',
    data: '2026-06-03'
  },
  {
    id: 'av5',
    uf: 'BA',
    cidade: 'Camaçari',
    bairro: 'Distrito Industrial',
    autor: 'Moradora de Camaçari, Distrito Industrial',
    notaQualidadeVida: 2,
    notaQualidadeAr: 1,
    notaConfortoAcustico: 4,
    depoimento: 'Moro no limite do distrito das indústrias petroquímicas. Por volta das 3h da manhã, o cheiro de ovos podres e gás enche as casas. As crianças acordam tossindo e vomitando de dor de cabeça. Isso é puro racismo ambiental contra a periferia!',
    data: '2025-06-07'
  }
];
