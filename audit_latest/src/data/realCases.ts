export interface RealCase {
  id: string;
  title: string;
  location: string;
  context: string;
  parameters: string;
  sourceName: string;
  sourceUrl: string;
  type: 'DADO_OFICIAL' | 'RELATO_DOCUMENTADO' | 'MOCK_TEMPORARIO_SUBSTITUIR_POR_DADOS_REAIS';
  sourceType: 'official' | 'documented_case' | 'demo';
  label: 'Dado oficial' | 'Caso documentado' | 'Demonstração do protótipo';
  imageUrl?: string;
  imageCaption?: string;
  impact?: string;
  humanImpact?: string;
}

export const publicEvidenceCases: RealCase[] = [
  {
    id: 'evidence-monitorar',
    title: 'Monitoramento Nacional de Qualidade do Ar (MonitorAr)',
    location: 'Nacional',
    context: 'Base pública que reúne dados das estações automáticas e manuais para acompanhamento dos limites regulatórios de qualidade do ar.',
    parameters: 'PM10, PM2.5, SO2, NO2, CO e O3. Pode apoiar alertas territoriais quando cruzado com vulnerabilidade social e relatos comunitários.',
    sourceName: 'MMA - MonitorAr / Qualidade do Ar',
    sourceUrl: 'https://www.gov.br/mma/pt-br/assuntos/meio-ambiente-urbano-recursos-hidricos-qualidade-ambiental/qualidade-do-ar',
    type: 'DADO_OFICIAL',
    sourceType: 'official',
    label: 'Dado oficial',
    imageUrl: '/images/gallery-solution.svg',
    imageCaption: 'Imagem representativa de monitoramento ambiental urbano.'
  },
  {
    id: 'evidence-iqar',
    title: 'Índice de Qualidade do Ar (IQAr)',
    location: 'Plataforma Integrada',
    context: 'Serviço federal para obter medições diárias enviadas por órgãos estaduais, incluindo dados usados pelo aplicativo MonitorAr.',
    parameters: 'Classificações de qualidade do ar que podem ser combinadas com mapas de exposição territorial.',
    sourceName: 'Serviço Federal MonitorAr',
    sourceUrl: 'https://www.gov.br/pt-br/servicos/obter-dados-das-estacoes-de-monitoramento-da-qualidade-do-ar-por-meio-do-indice-de-qualidade-do-ar-iqar-por-meio-do-aplicativo-monitorar',
    type: 'DADO_OFICIAL',
    sourceType: 'official',
    label: 'Dado oficial',
    imageUrl: '/images/gallery-air.svg',
    imageCaption: 'Imagem representativa de dados e infraestrutura urbana.'
  },
  {
    id: 'evidence-dados-mma',
    title: 'Portal de Dados Abertos do Ministério do Meio Ambiente',
    location: 'Brasil',
    context: 'Reúne bases geoespaciais e tabulares relacionadas a recursos hídricos, qualidade ambiental, controle e gestão ambiental.',
    parameters: 'Licenciamentos, bases territoriais, inventários, fiscalização e séries históricas ambientais.',
    sourceName: 'Portal de Dados Abertos MMA',
    sourceUrl: 'https://dados.mma.gov.br/',
    type: 'DADO_OFICIAL',
    sourceType: 'official',
    label: 'Dado oficial',
    imageUrl: '/images/gallery-solution.svg',
    imageCaption: 'Imagem representativa de dados territoriais.'
  },
  {
    id: 'evidence-mapbiomas',
    title: 'Mapeamento de cobertura e uso da terra',
    location: 'Brasil',
    context: 'O MapBiomas organiza séries históricas de cobertura e uso da terra, úteis para visualizar perda de vegetação, expansão urbana e pressão sobre áreas verdes.',
    parameters: 'Cobertura vegetal, áreas urbanizadas, corpos hídricos e alterações territoriais ao longo do tempo.',
    sourceName: 'MapBiomas Brasil',
    sourceUrl: 'https://brasil.mapbiomas.org/',
    type: 'DADO_OFICIAL',
    sourceType: 'official',
    label: 'Dado oficial',
    imageUrl: '/images/gallery-green.svg',
    imageCaption: 'Imagem representativa de cobertura do solo.'
  }
];

export const documentedRacismCases: RealCase[] = [
  {
    id: 'case-piquia-baixo',
    title: 'Piquiá de Baixo/MA',
    location: 'Açailândia, Maranhão',
    context: 'Comunidade localizada no entorno da cadeia de mineração e siderurgia convive há anos com poluição, passivos ambientais e conflitos sobre direito à moradia e à saúde.',
    parameters: 'Poluição do ar, contaminação, saúde comunitária, reassentamento, conflito socioambiental.',
    impact: 'O caso mostra como comunidades periféricas podem absorver os custos ambientais de cadeias produtivas que geram riqueza fora do território afetado.',
    humanImpact: 'A vida doméstica, o ar respirado e o direito de permanecer no território passam a depender de respostas institucionais e empresariais demoradas.',
    sourceName: 'Mapa de Conflitos - Fiocruz',
    sourceUrl: 'https://mapadeconflitos.ensp.fiocruz.br/conflito/ma-industria-guseira-contaminacao-da-agua-falta-de-seguranca-e-condicoes-improprias-a-vida-e-a-saude-dos-moradores-do-distrito-industrial-de-pequia-acailandia/',
    type: 'RELATO_DOCUMENTADO',
    sourceType: 'documented_case',
    label: 'Caso documentado',
    imageUrl: '/images/case-piquia.svg',
    imageCaption: 'Imagem representativa de paisagem industrial; consulte a fonte para registros do caso.'
  },
  {
    id: 'case-ilha-mare',
    title: 'Ilha de Maré/BA',
    location: 'Salvador, Bahia',
    context: 'Comunidades pesqueiras e quilombolas denunciam exposição a poluentes, falta de saneamento, atendimento público insuficiente e impactos sobre pesca, mariscagem e saúde.',
    parameters: 'Racismo ambiental, território quilombola, pesca, saneamento, contaminação industrial e portuária.',
    impact: 'O conflito revela como populações tradicionais podem ser invisibilizadas mesmo estando próximas a grandes infraestruturas econômicas.',
    humanImpact: 'Quando a água, a pesca e a saúde são atingidas, o dano não é apenas ambiental: ele compromete renda, alimentação, cultura e permanência no território.',
    sourceName: 'MonitoramentoDH / Mongabay Brasil',
    sourceUrl: 'https://monitoramentodh.org.br/casos-acompanhados/caso-ilha-de-mare-ba/',
    type: 'RELATO_DOCUMENTADO',
    sourceType: 'documented_case',
    label: 'Caso documentado',
    imageUrl: '/images/case-ilha.svg',
    imageCaption: 'Imagem representativa de território costeiro; consulte a fonte para registros do caso.'
  },
  {
    id: 'case-maceio-braskem',
    title: 'Maceió/AL',
    location: 'Maceió, Alagoas',
    context: 'A subsidência associada à mineração de sal-gema tornou áreas urbanas inseguras, levando milhares de pessoas a deixarem suas casas e alterando a memória urbana de bairros inteiros.',
    parameters: 'Subsidência, mineração, remoção de moradores, reparação, risco geológico e urbano.',
    impact: 'O caso mostra que dano ambiental também pode significar perda de bairro, rede de vizinhança, comércio local e pertencimento.',
    humanImpact: 'A urgência não é só técnica: é a ruptura de histórias familiares, rotinas e vínculos construídos por décadas.',
    sourceName: 'Agência Brasil / Reuters',
    sourceUrl: 'https://agenciabrasil.ebc.com.br/geral/noticia/2023-12/dramas-humanos-se-acumulam-em-tragedia-da-braskem-em-maceio',
    type: 'RELATO_DOCUMENTADO',
    sourceType: 'documented_case',
    label: 'Caso documentado',
    imageUrl: '/images/case-maceio.svg',
    imageCaption: 'Imagem representativa de área urbana; consulte a fonte para registros do caso.'
  }
];

// Mantém compatibilidade com componentes antigos: fontes públicas oficiais.
export const realCases: RealCase[] = publicEvidenceCases;

export const demoCases: RealCase[] = [
  {
    id: 'democase1',
    title: 'Relato demonstrativo de alerta territorial',
    location: 'Cubatão / SP',
    context: 'Exemplo simulado para demonstrar como o protótipo poderia classificar e encaminhar uma ocorrência enviada por moradores.',
    parameters: 'Categoria, prioridade, status e encaminhamento. Não representa registro real.',
    sourceName: 'Protótipo EcoVoz (Demonstração)',
    sourceUrl: '',
    type: 'MOCK_TEMPORARIO_SUBSTITUIR_POR_DADOS_REAIS',
    sourceType: 'demo',
    label: 'Demonstração do protótipo',
    imageUrl: '/images/gallery-solution.svg',
    imageCaption: 'Imagem representativa temporária.'
  }
];
