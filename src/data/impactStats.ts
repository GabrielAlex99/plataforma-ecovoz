export interface ImpactStat {
  id: string;
  category: string;
  displayValue: string;
  metricName: string;
  label: 'Dado oficial' | 'Demonstração do protótipo';
  description: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: 'official' | 'demo';
  type: 'DADO_OFICIAL' | 'MOCK_TEMPORARIO_SUBSTITUIR_POR_DADOS_REAIS';
}

export const realImpactStats: ImpactStat[] = [
  {
    id: 'stat1',
    category: 'Saneamento Desigual',
    displayValue: '83,5%',
    metricName: 'Famílias sem banheiro chefiadas por pessoas negras',
    description: 'De mais de 1,2 milhão de famílias brasileiras vivendo em domicílios sem banheiro de uso exclusivo, 83,5% são chefiadas por pessoas negras (pretas ou pardas) e 70% por mulheres.',
    sourceName: 'Ipea (Instituto de Pesquisa Econômica Aplicada)',
    sourceUrl: 'https://www.ipea.gov.br/portal/categories/45-todas-as-noticias/noticias/16114-brasil-tem-mais-de-1-2-milhao-de-familias-que-vivem-em-casas-sem-banheiro-83-5-delas-sao-chefiadas-por-pessoas-negras-e-70-por-mulheres',
    sourceType: 'official',
    label: 'Dado oficial',
    type: 'DADO_OFICIAL'
  },
  {
    id: 'stat2',
    category: 'Esgotamento Sanitário',
    displayValue: '62,5%',
    metricName: 'Acesso Geral ao Esgoto no Censo 2022',
    description: 'A rede de coleta de esgoto alcança 62,5% da população nacional, contudo há intensas desigualdades por cor e raça: o acesso é substancialmente menor entre pretos e pardos em comparação a pessoas brancas.',
    sourceName: 'IBGE (Censo Demográfico 2022)',
    sourceUrl: 'https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/39237-censo-2022-rede-de-esgoto-alcanca-62-5-da-populacao-mas-desigualdades-regionais-e-por-cor-e-raca-persistem',
    sourceType: 'official',
    label: 'Dado oficial',
    type: 'DADO_OFICIAL'
  },
  {
    id: 'stat3',
    category: 'Série Histórica Territorial',
    displayValue: '1985–2024',
    metricName: 'Cobertura e Uso da Terra no Brasil',
    description: 'A série histórica do MapBiomas permite observar transformações do território, como expansão urbana, perda de áreas naturais, mudanças no uso do solo e pressão sobre áreas vulneráveis.',
    sourceName: 'MapBiomas Brasil (Coleções de Cobertura e Uso da Terra)',
    sourceUrl: 'https://brasil.mapbiomas.org/colecoes-mapbiomas/',
    sourceType: 'official',
    label: 'Dado oficial',
    type: 'DADO_OFICIAL'
  },
  {
    id: 'stat4',
    category: 'Emissões Climáticas',
    displayValue: 'SEEG',
    metricName: 'Estimativas de Gases de Efeito Estufa',
    description: 'A análise sistemática do SEEG aponta as emissões industriais e agropecuárias estatais nacionais, gerando riscos crescentes de clima extremo nas populações que habitam as faldas de grandes polos.',
    sourceName: 'SEEG Brasil (Sistema de Estimativas de Emissões de Gases)',
    sourceUrl: 'https://seeg.eco.br/',
    sourceType: 'official',
    label: 'Dado oficial',
    type: 'DADO_OFICIAL'
  }
];

export const demoImpactStats: ImpactStat[] = [
  {
    id: 'demo1',
    category: 'Cubatão / SP (Demonstração)',
    displayValue: 'A inserir',
    metricName: 'Ruído Noturno Aferido em Zonas Residenciais',
    description: 'Aferição simulada de limites noturnos residenciais sob a norma NBR 10151 para propósitos de demonstração prática do dispositivo.',
    sourceName: 'Protótipo EcoVoz (Demonstração)',
    sourceUrl: '#',
    sourceType: 'demo',
    label: 'Demonstração do protótipo',
    type: 'MOCK_TEMPORARIO_SUBSTITUIR_POR_DADOS_REAIS'
  }
];
