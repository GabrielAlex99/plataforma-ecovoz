export interface PlataformaUser {
  id: string;
  name: string;
  email: string;
}

export type Category = 'Ar' | 'Água' | 'Ruído' | 'Resíduos' | 'Mobilidade' | 'Verde urbano';

export interface Relato {
  id: string;
  bairro: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  problema: string;
  descricao: string;
  gravidade: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  categoria: Category;
  frequência?: string;
  autor?: string;
  data: string;
  coordenadas?: { x: number; y: number }; // Simulated map coordinates
  vulnerabilidade: 'Baixa' | 'Média' | 'Alta';
  numRelatos: number;
  userEmail?: string; // Tying to logged-in user
  sentimento?: 'crítico' | 'neutro' | 'positivo';
}

export interface Proposta {
  id: string;
  titulo: string;
  autor: string;
  problemaRelacionado: string;
  descricao: string;
  categoria: string;
  custo: 'Baixo' | 'Médio' | 'Alto';
  prazo: string;
  impacto: string;
  viabilidade: 'Baixa' | 'Média' | 'Alta';
  userEmail?: string; // Tying to logged-in user
  status?: 'Em Discussão' | 'Em Andamento' | 'Implementado';
}

export interface SolucaoPadrao {
  id: string;
  titulo: string;
  problemaRelacionado: string;
  descricao: string;
  impactoEsperado: string;
  complexidade: 'Baixa' | 'Média' | 'Alta';
  categoria: string;
}
