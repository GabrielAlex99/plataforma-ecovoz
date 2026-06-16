import React, { useState, useMemo } from 'react';
import { SolucaoPadrao } from '../types';
import { 
  Search, Eye, Info, X, Compass, Check, ListFilter, 
  Leaf, Wind, RefreshCw, ShieldCheck, Users, BookOpen, ExternalLink, TrendingUp, DollarSign, Handshake, Target
} from 'lucide-react';
import { realSolutions, demoSolutions, RealSolution } from '../data/solutionBank';

interface SolutionBankProps {
  solucoes: SolucaoPadrao[];
}

export default function SolutionBank({ solucoes }: SolutionBankProps) {
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('Todos');

  const [activeModalSol, setActiveModalSol] = useState<RealSolution | null>(null);

  // Simulador demonstrativo para pitch: valores editáveis, sem prometer economia real.
  const [monthlyReports, setMonthlyReports] = useState(18);
  const [lateResponseCost, setLateResponseCost] = useState(8500);
  const [riskReduction, setRiskReduction] = useState(25);

  const annualAvoidedRisk = Math.max(0, monthlyReports * lateResponseCost * 12 * (riskReduction / 100));
  const formattedAvoidedRisk = annualAvoidedRisk.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  const formattedMonthlyExposure = (monthlyReports * lateResponseCost).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  // Combine verified database solutions with custom submitted ones
  const displayedSolutions = useMemo(() => {
    const customProposals = solucoes.filter(
      s => !['s1', 's2', 's3', 's4', 's5'].includes(s.id) && !s.id.startsWith('sol-real-') && !s.id.startsWith('sol-demo-')
    );
    
    const mappedCustom: RealSolution[] = customProposals.map(s => ({
      id: s.id,
      title: s.titulo,
      problem: s.problemaRelacionado,
      description: s.descricao,
      expectedImpact: s.impactoEsperado,
      complexity: s.complexidade,
      category: s.categoria || 'Gerais',
      sourceName: 'Proposta Comunitária',
      sourceUrl: '',
      type: 'MOCK_TEMPORARIO_SUBSTITUIR_POR_DADOS_REAIS',
      sourceType: 'demo',
      label: 'Demonstração do protótipo'
    }));

    return [...realSolutions, ...demoSolutions, ...mappedCustom];
  }, [solucoes]);

  // Extract unique categories dynamically from displayed list
  const uniqueCategories = useMemo(() => {
    const list = new Set<string>();
    list.add('Todos');
    displayedSolutions.forEach(s => {
      if (s.category) {
        list.add(s.category);
      }
    });
    return Array.from(list);
  }, [displayedSolutions]);

  // Filtering criteria
  const filteredSolucoes = useMemo(() => {
    return displayedSolutions.filter(s => {
      const matchesCategory = selectedCategory === 'Todos' || s.category === selectedCategory;
      const matchesComplexity = selectedComplexity === 'Todos' || s.complexity === selectedComplexity;
      const matchesSearch = 
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesComplexity && matchesSearch;
    });
  }, [displayedSolutions, selectedCategory, selectedComplexity, searchTerm]);

  const getComplexityColor = (c: RealSolution['complexity']) => {
    switch (c) {
      case 'Baixa': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Média': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Alta': return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  // Helper for illustrative category icons
  const getCategoryIcon = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('verde') || c.includes('barreira')) return <Leaf className="h-4.5 w-4.5 text-emerald-600" />;
    if (c.includes('ar') || c.includes('filtro') || c.includes('aspers')) return <Wind className="h-4.5 w-4.5 text-sky-600" />;
    if (c.includes('circular') || c.includes('economia')) return <RefreshCw className="h-4.5 w-4.5 text-[#F28C28]" />;
    if (c.includes('água')) return <Compass className="h-4.5 w-4.5 text-emerald-700" />;
    return <ShieldCheck className="h-4.5 w-4.5 text-indigo-500" />;
  };

  // Helper for qualitative signals; avoids presenting invented percentages as if they were evidence.
  const getSolutionSignal = (s: RealSolution) => {
    const c = s.category.toLowerCase();
    if (c.includes('verde') || c.includes('barreira')) return { label: 'Eixo principal', value: 'Amortecimento verde', tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (c.includes('aspers')) return { label: 'Eixo principal', value: 'Controle de poeira', tone: 'bg-sky-50 text-sky-700 border-sky-200' };
    if (c.includes('ar')) return { label: 'Eixo principal', value: 'Monitoramento do ar', tone: 'bg-sky-50 text-sky-700 border-sky-200' };
    if (c.includes('água')) return { label: 'Eixo principal', value: 'Drenagem e água', tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    return { label: 'Eixo principal', value: 'Governança ESG', tone: 'bg-[#F4F7F2] text-[#123524] border-[#DDE8D8]' };
  };

  return (
    <section id="banco" className="py-20 bg-[#F4F7F2] text-[#16231C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-left mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-y-4">
          <div>
            <span className="text-xs font-bold text-[#F28C28] tracking-wider uppercase block mb-1">Soluções aplicáveis • Valor ESG</span>
            <h2 className="font-sans font-black text-3xl md:text-4xl text-[#123524] tracking-tight">
              Banco de Soluções Socioambientais
            </h2>
            <p className="text-[#16231C]/80 text-xs sm:text-sm max-w-xl mt-1 leading-normal font-medium">
              Catálogo visual de ações ambientais e sociais para transformar evidências do território em mitigação, prevenção e compromisso institucional.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-80 shrink-0">
            <input
              type="text"
              placeholder="Pesquisar soluções ou problemas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#A8CBB1] text-gray-800 placeholder-gray-400 text-xs sm:text-sm focus:outline-[#123524] transition-all font-medium shadow-sm"
            />
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-[#123524]" />
          </div>
        </div>


        {/* Stakeholder value proposition + demonstrative calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-7 bg-white border border-[#DDE8D8] rounded-[28px] p-6 sm:p-7 shadow-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#A8CBB1] bg-[#F4F7F2] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#123524]">
              <Target className="h-3.5 w-3.5" /> Por que investir na EcoVoz?
            </span>
            <h3 className="mt-4 text-2xl font-black tracking-tight text-[#123524]">
              Valor para comunidade, empresa e território
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4B5F55] max-w-2xl">
              Para stakeholders industriais, a EcoVoz ajuda a transformar escuta comunitária em prevenção: menos conflito desorganizado, mais dados para priorizar investimentos e maior transparência em compromissos ESG.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <ShieldCheck className="h-5 w-5" />, title: 'Risco reputacional', desc: 'Antecipar problemas antes que se tornem crise pública.' },
                { icon: <TrendingUp className="h-5 w-5" />, title: 'Eficiência de resposta', desc: 'Organizar relatos, status e histórico em uma trilha única.' },
                { icon: <Users className="h-5 w-5" />, title: 'Relação comunitária', desc: 'Criar retorno visível para moradores e lideranças locais.' },
                { icon: <Handshake className="h-5 w-5" />, title: 'ESG verificável', desc: 'Gerar evidências para relatórios, auditorias e ações territoriais.' },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#DDE8D8] bg-[#F8FAF7] p-4">
                  <div className="mb-3 inline-flex rounded-xl bg-white p-2 text-[#2F6B4F] shadow-sm">{item.icon}</div>
                  <h4 className="text-sm font-black text-[#123524]">{item.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-[#4B5F55]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#123524] text-white rounded-[28px] p-6 sm:p-7 shadow-md">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#F6C56B]">
              <DollarSign className="h-3.5 w-3.5" /> Simulação demonstrativa
            </span>
            <h3 className="mt-4 text-2xl font-black tracking-tight text-white">
              Calculadora de risco evitado
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#DDE8D8]">
              Simulação para conversa executiva. A conta não promete economia: ela estima quanto de exposição pode ser reduzida quando relatos críticos são tratados antes de virarem crise, multa, retrabalho ou dano reputacional.
            </p>

            <div className="mt-5 rounded-2xl border border-white/15 bg-white/8 p-4">
              <p className="text-[10px] font-black uppercase tracking-wider text-[#F6C56B]">Base do cálculo</p>
              <p className="mt-2 text-[12px] leading-relaxed text-[#E8F1EA]">
                Relatos críticos/mês × custo médio de resposta tardia × 12 meses × redução estimada de risco.
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-[#A8CBB1]">
                Os valores abaixo são parâmetros editáveis. Em uma implantação real, devem vir de custos internos, histórico de ocorrências, ouvidoria, jurídico, operações e relacionamento comunitário.
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#A8CBB1]">Relatos críticos por mês</span>
                <input type="number" min="0" value={monthlyReports} onChange={(e) => setMonthlyReports(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-white outline-none focus:border-[#F6C56B]" />
                <span className="mt-1 block text-[10px] text-[#DDE8D8]">Ocorrências com potencial de gerar resposta técnica, conflito comunitário, retrabalho ou exposição pública.</span>
              </label>
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#A8CBB1]">Custo médio de resposta tardia (R$)</span>
                <input type="number" min="0" value={lateResponseCost} onChange={(e) => setLateResponseCost(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-white outline-none focus:border-[#F6C56B]" />
                <span className="mt-1 block text-[10px] text-[#DDE8D8]">Pode considerar vistoria emergencial, deslocamento, retrabalho, comunicação, jurídico, consultoria ou correção operacional.</span>
              </label>
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#A8CBB1]">Redução estimada de risco (%)</span>
                <input type="number" min="0" max="100" value={riskReduction} onChange={(e) => setRiskReduction(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-white outline-none focus:border-[#F6C56B]" />
                <span className="mt-1 block text-[10px] text-[#DDE8D8]">Percentual conservador estimado de redução por triagem rápida, priorização e resposta transparente.</span>
              </label>
            </div>
            <div className="mt-5 rounded-2xl border border-[#F6C56B]/40 bg-white/10 p-4">
              <p className="text-[10px] font-black uppercase tracking-wider text-[#F6C56B]">Risco financeiro evitável — estimativa anual</p>
              <p className="mt-1 text-3xl font-black text-white">{formattedAvoidedRisk}</p>
              <p className="mt-2 text-[11px] leading-relaxed text-[#DDE8D8]">
                Exposição mensal antes da mitigação: {formattedMonthlyExposure}. Aplicando {riskReduction}% de redução de risco em 12 meses, a estimativa chega ao valor acima.
              </p>
              <p className="mt-2 text-[10px] leading-relaxed text-[#A8CBB1]">Não é promessa financeira. É uma ferramenta de sensibilização para discutir prevenção, reputação, resposta comunitária e priorização de investimentos ESG.</p>
            </div>
          </div>
        </div>

        {/* Filters panel */}
        <div className="flex flex-col space-y-4 bg-white p-5 rounded-3xl border border-[#A8CBB1] mb-8 text-left shadow-sm">
          <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
            <ListFilter className="h-4.5 w-4.5 text-[#123524]" />
            <span className="text-xs font-bold text-[#123524] uppercase tracking-wider">Filtros Rápidos, Categorias e Escala</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Filter by Category */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Filtrar por Categoria</label>
              <div className="flex flex-wrap gap-1.5">
                {uniqueCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#123524] text-white shadow-sm'
                        : 'bg-white border border-[#A8CBB1]/40 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Complexity */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Complexidade de Operação</label>
              <div className="flex flex-wrap gap-1.5">
                {['Todos', 'Baixa', 'Média', 'Alta'].map((comp) => (
                  <button
                    key={comp}
                    onClick={() => setSelectedComplexity(comp)}
                    className={`px-4.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedComplexity === comp
                        ? 'bg-[#123524] text-white shadow-sm'
                        : 'bg-white border border-[#A8CBB1]/40 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {comp === 'Todos' ? 'Todas' : comp}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredSolucoes.length > 0 ? (
            filteredSolucoes.map((s) => {
              const signal = getSolutionSignal(s);
              const isReal = s.sourceType === 'official';

              return (
                <div 
                  key={s.id} 
                  className={`bg-white border rounded-3xl p-6 shadow-sm relative flex flex-col justify-between hover:border-[#123524] transition-all duration-300 group hover:-translate-y-1 hover:shadow-md ${
                    isReal ? 'border-[#A8CBB1]' : 'border-dashed border-amber-300 bg-amber-50/10'
                  }`}
                >
                  <div className="space-y-4">
                    
                    {/* Category Header with Illustration Icon and Status badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-[#F4F7F2] rounded-xl border border-[#A8CBB1]/30 justify-center">
                          {getCategoryIcon(s.category)}
                        </div>
                        <span className="text-[10px] uppercase font-extrabold text-[#123524] tracking-wider">
                          {s.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1.5 shrink-0">
                        {/* Status badge */}
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                          isReal 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                            : 'bg-amber-50 text-amber-700 border-amber-300'
                        }`}>
                          • {s.label}
                        </span>
                      </div>
                    </div>

                    {/* Title & Concise Summary */}
                    <div>
                      <h3 className="font-sans font-black text-[15px] sm:text-base text-[#123524] group-hover:text-[#F28C28] transition-colors leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-[10.5px] text-gray-400 font-bold mt-1 leading-normal">
                        Foco prático: {s.problem}
                      </p>
                    </div>

                    {/* Qualitative signal; avoids fake numeric efficiency claims */}
                    <div className="bg-white p-3 rounded-2xl border border-[#A8CBB1]/30 space-y-2 shadow-sm">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider">{signal.label}</span>
                        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black ${signal.tone}`}>{signal.value}</span>
                      </div>
                      <p className="text-[10.5px] leading-relaxed text-gray-500">
                        A priorização deve ser validada com orçamento, consulta comunitária e dados técnicos locais.
                      </p>
                    </div>

                    {/* Short Description */}
                    <p className="text-gray-600 text-xs leading-relaxed font-light line-clamp-3">
                      {s.description}
                    </p>

                    {/* Expected Impact, Beneficiaries & Real Source details inside the card */}
                    <div className="space-y-2.5 pt-3.5 border-t border-gray-100 text-[11px]">
                      {/* Impact */}
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-extrabold text-[#F28C28] uppercase tracking-wider block">Impacto esperado:</span>
                        <p className="text-gray-700 font-medium leading-normal">{s.expectedImpact}</p>
                      </div>

                      {/* Source */}
                      <div className="flex items-start space-x-2 text-gray-500 leading-normal pt-1.5">
                        <BookOpen className="h-4 w-4 text-[#2F6B4F] shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block font-mono">Fonte ou base:</span>
                          <p className="font-bold text-[#123524] truncate max-w-[210px]" title={s.sourceName}>
                            {s.sourceName}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Details Trigger Button */}
                  <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center bg-white">
                    <span className="text-[9px] font-mono text-gray-400 uppercase font-black tracking-widest">Complexidade: <span className="text-gray-700">{s.complexity}</span></span>
                    <button
                      onClick={() => setActiveModalSol(s)}
                      className="px-3.5 py-2 bg-[#123524] hover:bg-[#2F6B4F] text-white font-extrabold rounded-lg text-[10px] transition-all flex items-center space-x-1 hover:shadow-sm cursor-pointer active:scale-95 text-center justify-center font-mono uppercase tracking-wider"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Detalhes</span>
                    </button>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="col-span-full py-16 bg-white rounded-3xl text-center text-gray-500 border border-dashed border-[#A8CBB1]/50 flex flex-col items-center justify-center space-y-2">
              <Compass className="h-8 w-8 text-[#1b4332]/50" />
              <p className="font-bold text-gray-800">Nenhuma solução cadastrada ou correspondente</p>
              <p className="text-xs text-gray-500">Mude os filtros rápidos de pesquisa.</p>
            </div>
          )}
        </div>

        {/* Dynamic Detail Modal */}
        {activeModalSol && (
          <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 text-left">
            <div className="bg-white border border-[#A8CBB1] rounded-[28px] max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
              
              {/* Close Button */}
              <button 
                onClick={() => setActiveModalSol(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-gray-50 text-gray-400 hover:text-gray-700 border border-gray-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6">
                
                {/* Header labels */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#123524] uppercase bg-[#F4F7F2] border border-[#A8CBB1] px-2.5 py-1 rounded-md">
                    Catálogo de Soluções • {activeModalSol.category}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${getComplexityColor(activeModalSol.complexity)}`}>
                    Complexidade {activeModalSol.complexity}
                  </span>
                </div>

                {/* Main title */}
                <div>
                  <h3 className="font-sans font-black text-2xl text-[#123524] tracking-tight">
                    {activeModalSol.title}
                  </h3>
                  <p className="text-xs font-bold text-[#F28C28] mt-1">
                    Problema Mapeado: {activeModalSol.problem}
                  </p>
                </div>

                {/* Body paragraph */}
                <div className="space-y-2 bg-[#F4F7F2] p-5 rounded-3xl border border-[#A8CBB1]/30">
                  <h4 className="text-xs font-bold text-[#123524] uppercase tracking-widest">Como a solução funciona</h4>
                  <p className="text-xs sm:text-sm text-[#16231C] leading-relaxed font-normal">{activeModalSol.description}</p>
                </div>

                {/* Technical stats grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#F4F7F2] p-4 rounded-xl border border-[#A8CBB1]/20 text-xs">
                    <strong className="text-[#123524] block mb-1 font-bold">Impacto socioambiental esperado</strong>
                    <p className="text-gray-600 leading-relaxed font-medium">{activeModalSol.expectedImpact}</p>
                  </div>

                  <div className="bg-[#F4F7F2] p-4 rounded-xl border border-[#A8CBB1]/20 text-xs">
                    <strong className="text-[#123524] block mb-1 font-bold">Fonte ou referência</strong>
                    <p className="text-gray-600 leading-normal font-bold text-[11px] mb-1">{activeModalSol.sourceName}</p>
                    {activeModalSol.sourceUrl && activeModalSol.sourceUrl !== '#' && (
                      <a 
                        href={activeModalSol.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[10px] font-black text-[#123524] hover:underline flex items-center gap-1 mt-1 font-mono uppercase"
                      >
                        Acessar site de dados <ExternalLink className="h-3 w-3 inline" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Footer warning informative */}
                <div className="text-[11px] text-gray-500 flex items-start space-x-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <Info className="h-4 w-4 text-[#F28C28] shrink-0 mt-0.5" />
                  <p>Os dados desta seção combinam soluções documentadas e propostas demonstrativas. Em uma implantação real, a priorização deve ser validada com dados técnicos, orçamento e consulta comunitária.</p>
                </div>

                {/* Action controls */}
                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setActiveModalSol(null)}
                    className="px-6 py-2.5 bg-[#123524] hover:bg-[#2F6B4F] text-white font-extrabold rounded-xl text-xs transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Fechar
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
