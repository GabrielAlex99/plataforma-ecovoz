import React, { useState } from 'react';
import { Proposta } from '../types';
import { Send, CheckCircle, Lightbulb, TrendingUp, DollarSign, Clock, Check } from 'lucide-react';

interface SolutionFormProps {
  onAddProposta: (nova: Proposta) => void;
}

export default function SolutionForm({ onAddProposta }: SolutionFormProps) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [problemaRelacionado, setProblemaRelacionado] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('Barreiras verdes');
  const [custo, setCusto] = useState<'Baixo' | 'Médio' | 'Alto'>('Médio');
  const [prazo, setPrazo] = useState('6 meses');
  const [impacto, setImpacto] = useState('');
  const [viabilidade, setViabilidade] = useState<'Baixa' | 'Média' | 'Alta'>('Alta');
  const [lgpdConsent, setLgpdConsent] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [errorMess, setErrorMess] = useState('');

  const categoriasSolucao = [
    'Barreiras verdes',
    'Monitoramento ambiental',
    'Educação ambiental',
    'Economia circular',
    'Eficiência energética',
    'Mobilidade sustentável',
    'Drenagem urbana',
    'Gestão de resíduos',
    'Relacionamento comunitário'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!lgpdConsent) {
      setErrorMess('De acordo com a LGPD, você deve aceitar os termos de consentimento para poder submeter ideias ou identificar autoria ambiental.');
      return;
    }

    if (!titulo.trim()) {
      setErrorMess('Por favor, dê um título descritivo para sua proposta.');
      return;
    }
    if (!autor.trim()) {
      setErrorMess('Por favor, informe quem é o autor, grupo de pesquisa ou morador.');
      return;
    }
    if (!problemaRelacionado.trim()) {
      setErrorMess('Por favor, explique brevemente qual problema ou queixa do mapa essa ideia ajuda a resolver.');
      return;
    }
    if (!descricao.trim() || descricao.length < 15) {
      setErrorMess('Por favor, preencha a descrição da solução (pelo menos 15 caracteres).');
      return;
    }
    if (!impacto.trim()) {
      setErrorMess('Descreva qual é o impacto socioambiental esperado da proposta.');
      return;
    }

    setErrorMess('');

    const novaProposta: Proposta = {
      id: 'prop-' + Date.now(),
      titulo,
      autor,
      problemaRelacionado,
      descricao,
      categoria,
      custo,
      prazo,
      impacto,
      viabilidade,
      status: 'Em Discussão'
    };

    onAddProposta(novaProposta);
    setSubmitted(true);
  };

  const handleReset = () => {
    setTitulo('');
    setAutor('');
    setProblemaRelacionado('');
    setDescricao('');
    setImpacto('');
    setLgpdConsent(false);
    setSubmitted(false);
  };

  return (
    <section id="propor" className="py-20 bg-[#f5f7f6] border-t border-[#e9ecef] relative">
      <div className="absolute bottom-5 left-5 w-80 h-80 bg-[#1b4332]/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#f28f3b] tracking-wider uppercase block mb-2">Inovação e Coparticipação</span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-[#1b4332] tracking-tight">
            Propor Solução Sustentável
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto mt-2">
            Chamado acadêmico: Estudantes, pesquisadores, colaboradores industriais e moradores locais podem desenhar ações sustentáveis conectando tecnologia e mitigação ESG.
          </p>
        </div>

        {/* Input Form Panel */}
        <div className="bg-white border border-[#e9ecef] rounded-3xl p-6 md:p-10 shadow-lg relative">
          
          {submitted ? (
            /* Animated success panel */
            <div className="py-12 px-4 text-center space-y-6 animate-fade-in text-left">
              <div className="w-16 h-16 bg-[#1b4332]/10 text-[#1b4332] rounded-full border border-[#1b4332]/25 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h3 className="font-sans font-bold text-2.5xl text-[#1b4332]">Solução cadastrada com sucesso!</h3>
              <p className="text-gray-600 text-base max-w-lg mx-auto leading-relaxed">
                A proposta será avaliada conforme impacto, viabilidade e benefício socioambiental por nosso comitê de sustentabilidade e representantes comunitários.
              </p>
              
              <div className="pt-6">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#0b3d59] hover:bg-[#072a42] text-white font-bold rounded-xl text-sm transition-all"
                >
                  Propor outra solução
                </button>
              </div>
            </div>
          ) : (
            /* Form input fields */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Educational focus header */}
              <div className="bg-[#1b4332]/5 border border-[#1b4332]/20 p-4 rounded-2xl flex items-start space-x-3.5 text-left">
                <div className="bg-[#1b4332]/10 p-2.5 rounded-xl text-[#1b4332] self-center shrink-0">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  <strong>Ideias geram transformação:</strong> Formule propostas práticas, de barreiras verdes a soluções circulares de resíduos. Nossas equipes avaliam a viabilidade técnica ao lado de lideranças comunitárias do entorno.
                </p>
              </div>

              {errorMess && (
                <div className="bg-rose-50 border border-rose-220 p-4 rounded-xl text-xs text-rose-700 flex items-center space-x-2 text-left animate-pulse">
                  <span>{errorMess}</span>
                </div>
              )}

              {/* Title & Author grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                
                {/* Title */}
                <div className="space-y-1.5">
                  <label htmlFor="input-prop-title" className="text-xs font-bold text-gray-600 uppercase block">Nome da Proposta / Título Curto *</label>
                  <input
                    id="input-prop-title"
                    type="text"
                    required
                    aria-required="true"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ex: Cinturão Verde Perimetral"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#e9ecef] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1b4332] text-sm transition-colors font-semibold shadow-sm"
                  />
                </div>

                {/* Author */}
                <div className="space-y-1.5">
                  <label htmlFor="input-prop-autor" className="text-xs font-bold text-gray-600 uppercase block">Autor, Grupo ou Instituição *</label>
                  <input
                    id="input-prop-autor"
                    type="text"
                    required
                    aria-required="true"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    placeholder="Ex: Coletivo EcoJovens / Unifesp"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#e9ecef] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1b4332] text-sm transition-colors shadow-sm"
                  />
                </div>

              </div>

              {/* Target problem & Category choosing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left font-normal">
                
                {/* Solves which problem */}
                <div className="space-y-1.5">
                  <label htmlFor="input-prop-target" className="text-xs font-bold text-gray-600 uppercase block">Qual problema/queixa essa ideia resolve? *</label>
                  <input
                    id="input-prop-target"
                    type="text"
                    required
                    aria-required="true"
                    value={problemaRelacionado}
                    onChange={(e) => setProblemaRelacionado(e.target.value)}
                    placeholder="Ex: Poeira e ruídos na divisa da Vila Industrial"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#e9ecef] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1b4332] text-sm transition-colors shadow-sm"
                  />
                </div>

                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label htmlFor="select-prop-cat" className="text-xs font-bold text-gray-600 uppercase block">Categoria de Enquadramento *</label>
                  <select
                    id="select-prop-cat"
                    value={categoria}
                    required
                    aria-required="true"
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#e9ecef] text-[#0b3d59] focus:outline-none focus:border-[#1b4332] text-sm transition-colors shadow-sm font-medium"
                  >
                    {categoriasSolucao.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Feasibility, budget and timeline grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                
                {/* Cost Estimation */}
                <div className="space-y-1.5 animate-fade-in">
                  <label className="text-xs font-bold text-gray-600 uppercase block" id="id-custo-est">Custo Estimado *</label>
                  <div className="grid grid-cols-3 gap-2 bg-[#f5f7f6] p-1.5 rounded-xl border border-[#e9ecef] shadow-sm" role="radiogroup" aria-labelledby="id-custo-est">
                    {(['Baixo', 'Médio', 'Alto'] as const).map(c => {
                      const isActive = custo === c;
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCusto(c)}
                          aria-pressed={isActive}
                          className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                            isActive
                              ? 'bg-[#1b4332]/10 text-[#1b4332] font-bold border border-[#1b4332]/25'
                              : 'text-gray-400 hover:text-gray-700'
                          }`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Lead Time Estimations */}
                <div className="space-y-1.5">
                  <label htmlFor="select-prop-prazo" className="text-xs font-bold text-gray-600 uppercase block">Prazo de Execução Estimado *</label>
                  <select
                    id="select-prop-prazo"
                    value={prazo}
                    required
                    aria-required="true"
                    onChange={(e) => setPrazo(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#e9ecef] rounded-xl text-gray-800 text-xs focus:outline-none focus:border-[#1b4332] shadow-sm font-medium"
                  >
                    <option value="1 a 3 meses">1 a 3 meses (Curto)</option>
                    <option value="6 meses">6 meses (Médio)</option>
                    <option value="1 ano">1 ano (Longo)</option>
                    <option value="Mais de 1 ano">Mais de 1 ano</option>
                  </select>
                </div>

                {/* Technical Feasibility */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase block" id="id-viabilidade-est">Viabilidade Técnica *</label>
                  <div className="grid grid-cols-3 gap-2 bg-[#f5f7f6] p-1.5 rounded-xl border border-[#e9ecef] shadow-sm" role="radiogroup" aria-labelledby="id-viabilidade-est">
                    {(['Baixa', 'Média', 'Alta'] as const).map(v => {
                      const isActive = viabilidade === v;
                      return (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setViabilidade(v)}
                          aria-pressed={isActive}
                          className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                            isActive
                              ? 'bg-[#1b4332]/10 text-[#1b4332] font-bold border border-[#1b4332]/25'
                              : 'text-gray-400 hover:text-gray-700'
                          }`}
                        >
                          {v}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Solution breakdown text-area */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="textarea-prop-desc" className="text-xs font-bold text-gray-600 uppercase block">Como funciona a Solução? (Descrição Técnica) *</label>
                <textarea
                  id="textarea-prop-desc"
                  rows={4}
                  required
                  aria-required="true"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Explique o escopo tecnológico ou comunitário da ação. Quais materiais, sistemas ou rotinas operacionais serão modificados para sanar o problema?..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#e9ecef] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1b4332] text-sm transition-colors resize-none leading-relaxed shadow-sm"
                />
              </div>

              {/* Expected Impact Summary */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="textarea-prop-impact" className="text-xs font-bold text-gray-600 uppercase block">Impacto Socioambiental Esperado *</label>
                <textarea
                  id="textarea-prop-impact"
                  rows={2}
                  required
                  aria-required="true"
                  value={impacto}
                  onChange={(e) => setImpacto(e.target.value)}
                  placeholder="Ex: Mitigação das enchentes urbanas nas residências marginais através da retenção natural do solo do jardim."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#e9ecef] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1b4332] text-sm transition-colors resize-none leading-relaxed shadow-sm"
                />
              </div>

              {/* LGPD Clause */}
              <div className="bg-[#1b4332]/5 border border-[#1b4332]/10 rounded-2xl p-5 text-left text-xs text-gray-600 space-y-3 shadow-sm font-normal">
                <div className="flex items-start space-x-2.5">
                  <input
                    id="checkbox-lgpd-proposta"
                    type="checkbox"
                    checked={lgpdConsent}
                    onChange={(e) => setLgpdConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1b4332] focus:ring-[#1b4332]"
                  />
                  <label htmlFor="checkbox-lgpd-proposta" className="leading-relaxed select-none cursor-pointer text-gray-700">
                    <strong className="text-[#1b4332] font-semibold">Consentimento LGPD:</strong> Estou ciente e concordo que os dados inseridos nesta proposta (incluindo o meu nome, pseudônimo ou o nome da instituição que represento) sejam arquivados e tratados em total conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/18) com a finalidade exclusiva de análise de viabilidade, divulgação pública no Banco de Soluções e elaboração de estudos socioambientais colaborativos.
                  </label>
                </div>
              </div>

              {/* Submit trigger */}
              <div className="pt-4 border-t border-gray-200 text-right">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#0b3d59] hover:bg-[#072a42] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center space-x-2 inline-flex"
                >
                  <Send className="h-4 w-4" />
                  <span>Submeter Proposta à Avaliação</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
