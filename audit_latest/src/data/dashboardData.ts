export interface ChartDataItem {
  name: string;
  [key: string]: number | string;
}

export interface DashboardDataset {
  title: string;
  description: string;
  sourceName: string;
  sourceUrl: string;
  type: 'DADO_OFICIAL' | 'MOCK_TEMPORARIO_SUBSTITUIR_POR_DADOS_REAIS';
  sourceType: 'official' | 'demo';
  label: 'Dado oficial' | 'Demonstração do protótipo';
  data: ChartDataItem[];
}

// 1. IBGE Censo 2022 - Desigualdade por cor ou raça no esgotamento adequado
export const esgotamentoCorRacaIBGE: DashboardDataset = {
  title: 'Esgotamento Sanitário Adequado por Cor/Raça (%)',
  description: 'O Censo 2022 constatou desigualdades crônicas na coleta/tratamento de esgoto, mostrando que a população amarela, branca e indígena tem acesso significativamente mais elevado que pardos e pretos.',
  sourceName: 'IBGE (Censo Demográfico 2022)',
  sourceUrl: 'https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/39237-censo-2022-rede-de-esgoto-alcanca-62-5-da-populacao-mas-desigualdades-regionais-e-por-cor-e-raca-persistem',
  type: 'DADO_OFICIAL',
  sourceType: 'official',
  label: 'Dado oficial',
  data: [
    { name: 'Branca', 'Acesso Adequado': 72.3 },
    { name: 'Parda', 'Acesso Adequado': 55.3 },
    { name: 'Preta', 'Acesso Adequado': 56.1 },
    { name: 'Indígena', 'Acesso Adequado': 29.9 }
  ]
};

// 2. Ipea - Famílias em habitações sem banheiros por cor or raça (%)
export const domiciliosSemBanheiroIpea: DashboardDataset = {
  title: 'Famílias em Casas Sem Banheiro por Chefe de Família (%)',
  description: 'De mais de 1,2 milhão de famílias vivendo em moradias sem banheiros exclusivos, a esmagadora maioria é chefiada por pessoas autodeclaradas pretas ou pardas.',
  sourceName: 'Ipea (Dados Consolidados)',
  sourceUrl: 'https://www.ipea.gov.br/portal/categorias/45-todas-as-noticias/noticias/16114-brasil-tem-mais-de-1-2-milhao-de-familias-que-vivem-em-casas-sem-banheiro-83-5-delas-sao-chefiadas-por-pessoas-negras-e-70-por-mulheres',
  type: 'DADO_OFICIAL',
  sourceType: 'official',
  label: 'Dado oficial',
  data: [
    { name: 'Pessoas Negras (Pretas/Pardas)', 'Proporção': 83.5 },
    { name: 'Pessoas Não-Negras', 'Proporção': 16.5 }
  ]
};

// 3. MMA MonitorAr - Classificação Indicativa de Poluentes (PM2.5) Geral (Demonstração de Alerta vs WHO)
export const limitesPM25MonitorAr: DashboardDataset = {
  title: 'Níveis Médios de PM2.5 Recorrentes (µg/m³ - Demonstrativo)',
  description: 'Apresenta a comparação de material particulado fino em suspensão nos polos vulneráveis monitorados. Estrutura demonstrativa para futura integração com bases de qualidade do ar. Os valores devem ser preenchidos com medições reais antes de qualquer uso decisório.',
  sourceName: 'Protótipo EcoVoz (Demonstração)',
  sourceUrl: '',
  type: 'MOCK_TEMPORARIO_SUBSTITUIR_POR_DADOS_REAIS',
  sourceType: 'demo',
  label: 'Demonstração do protótipo',
  data: [
    { name: 'Santa Cruz (RJ)', 'Medição Média': 0, 'Diretriz OMS': 5 },
    { name: 'Cubatão (SP)', 'Medição Média': 0, 'Diretriz OMS': 5 },
    { name: 'Volta Redonda (RJ)', 'Medição Média': 0, 'Diretriz OMS': 5 },
    { name: 'Camaçari (BA)', 'Medição Média': 0, 'Diretriz OMS': 5 }
  ]
};

// 4. Queixas registradas no EcoVoz (Demonstração de Prototipagem de Volumetria)
export const queixasPorCategoriaEcoVoz: DashboardDataset = {
  title: 'Chamados Coletados via EcoVoz por Categoria (Demonstração)',
  description: 'Demonstração de volumetria agregada de queixas simuladas para demonstrar o fluxo e a funcionalidade do sistema de triagem do protótipo do comitê.',
  sourceName: 'Banco EcoVoz (Demonstração)',
  sourceUrl: '',
  type: 'MOCK_TEMPORARIO_SUBSTITUIR_POR_DADOS_REAIS',
  sourceType: 'demo',
  label: 'Demonstração do protótipo',
  data: [
    { name: 'Poluição do Ar', 'Total': 142 },
    { name: 'Qualidade da Água', 'Total': 94 },
    { name: 'Conforto Acústico', 'Total': 85 },
    { name: 'Resíduos Sólidos', 'Total': 63 },
    { name: 'Verde Urbano', 'Total': 41 }
  ]
};
