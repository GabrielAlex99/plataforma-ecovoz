import React from 'react';
import { 
  Map, Send, ArrowRight, MessageSquare, MapPin, BarChart3, Shield, CheckCircle2, AlertCircle, Clock
} from 'lucide-react';

interface HomeProps {
  onNavigate: (sectionId: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const handleAction = (id: string) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      id="home" 
      className="min-h-screen bg-[#F4F7F2] text-[#16231C] transition-colors duration-300 relative overflow-hidden"
    >
      
      {/* FUNDO SUAVE SEM IMAGEM GENÉRICA: mantém leitura e evita aparência desconexa */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_15%_20%,rgba(168,203,177,0.35),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(47,107,79,0.13),transparent_28%)]" />

      {/* HERO SECTION in 2 Columns - Bright, human, institutional */}
      <section className="relative z-10 pt-24 pb-16 md:pt-32 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* COLUMN 1: LEFT SIDE (Badge, title, subtitle, description, buttons) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Humanistic territorial badge */}
            <div className="inline-flex items-center space-x-2 bg-white border border-[#A8CBB1] px-4 py-1.5 rounded-full shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#F28C28]"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#123524]">
                Mapeamento contra o racismo ambiental
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="font-sans font-black text-5xl sm:text-6xl tracking-tight text-[#123524] leading-none">
                EcoVoz
              </h1>
              <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-[#2F6B4F] leading-tight max-w-lg">
                Plataforma socioambiental de escuta, mapeamento e ação comunitária.
              </h2>
            </div>

            {/* Concise, emotional and direct description */}
            <p className="text-[#16231C]/90 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              A voz do território vira dado. O dado vira ação. Transformamos relatos de moradores em evidências visuais para priorizar respostas, soluções e políticas em territórios vulnerabilizados.
            </p>

            {/* Action Buttons using correct palette contrast */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button type="button"
                onClick={() => handleAction('relatar')}
                className="px-6 py-3.5 bg-[#123524] hover:bg-[#2F6B4F] text-white font-extrabold rounded-xl flex items-center justify-center space-x-2.5 transition-all shadow-md active:scale-98 cursor-pointer text-xs uppercase tracking-wider [&_*]:text-white"
              >
                <Send className="h-4.5 w-4.5" />
                <span>Relatar ocorrência</span>
              </button>
              
              <button type="button"
                onClick={() => handleAction('mapa')}
                className="px-6 py-3.5 bg-white hover:bg-gray-50 text-[#123524] font-extrabold rounded-xl flex items-center justify-center space-x-2 border border-[#A8CBB1] transition-all shadow-2xs active:scale-98 cursor-pointer text-xs uppercase tracking-wider [&_span]:text-[#123524]"
              >
                <Map className="h-4.5 w-4.5 text-[#F28C28]" />
                <span>Ver mapa de impacto</span>
              </button>
            </div>
          </div>

          {/* COLUMN 2: RIGHT SIDE (Clean product card simulating real socioenvironmental flow) */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-[#A8CBB1] rounded-3xl p-[26px] shadow-md text-left space-y-5">
              
              {/* Product Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2F6B4F]"></div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#123524]">
                    Painel Territorial de Monitoramento
                  </span>
                </div>
                <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full uppercase">
                  DADOS INTEGRADOS
                </span>
              </div>

              {/* Central flow elements */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                
                {/* Simulated Mini Map with pristine clear styling */}
                <div className="sm:col-span-7 bg-[#F4F7F2] border border-[#A8CBB1]/40 rounded-2xl p-3 h-36 flex flex-col justify-between relative overflow-hidden">
                  {/* Subtle dotted background */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#123524 1.5px, transparent 1.5px)', backgroundSize: '10px 10px' }}></div>
                  
                  {/* Simulated pin points */}
                  <div className="absolute top-10 left-16 w-3 h-3 rounded-full bg-[#F28C28] border border-white animate-pulse shadow-xs"></div>
                  <div className="absolute bottom-8 right-12 w-3 h-3 rounded-full bg-[#2F6B4F] border border-white shadow-xs"></div>
                  
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#123524] bg-white px-2 py-0.5 rounded border border-[#A8CBB1]/40 shadow-3xs inline-block w-fit z-10">
                    Território Sob Monitoramento
                  </span>

                  <div className="z-10 bg-white/95 p-1.5 rounded-lg border border-[#A8CBB1]/30 text-[8px] font-bold text-[#16231C] flex items-center justify-between">
                    <span>Mapeamento Físico-Químico</span>
                    <span className="text-[#F28C28] font-bold">Ativo</span>
                  </div>
                </div>

                {/* Status elements list */}
                <div className="sm:col-span-5 flex flex-col justify-between space-y-2">
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1">Status de Relatos</span>
                  
                  {/* Status: Novo */}
                  <div className="flex items-center justify-between bg-[#F4F7F2] p-2 rounded-xl border border-[#A8CBB1]/20">
                    <span className="text-[10px] font-bold text-[#16231C] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#F28C28]" /> Novo
                    </span>
                    <span className="text-[8px] bg-[#F28C28]/10 text-[#F28C28] font-extrabold px-1.5 py-0.5 rounded">
                      Enviado
                    </span>
                  </div>

                  {/* Status: Em análise */}
                  <div className="flex items-center justify-between bg-[#F4F7F2] p-2 rounded-xl border border-[#A8CBB1]/20">
                    <span className="text-[10px] font-bold text-[#16231C] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-[#2F6B4F]" /> Análise
                    </span>
                    <span className="text-[8px] bg-[#2F6B4F]/10 text-[#2F6B4F] font-extrabold px-1.5 py-0.5 rounded">
                      Técnica
                    </span>
                  </div>

                  {/* Status: Encaminhado */}
                  <div className="flex items-center justify-between bg-[#F4F7F2] p-2 rounded-xl border border-[#A8CBB1]/20">
                    <span className="text-[10px] font-bold text-[#16231C] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#123524]" /> Resolvido
                    </span>
                    <span className="text-[8px] bg-[#123524]/10 text-[#123524] font-extrabold px-1.5 py-0.5 rounded">
                      Comitê
                    </span>
                  </div>
                </div>

              </div>

              {/* 3 Small illustrative cards at the bottom */}
              <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-gray-100">
                <div className="p-2.5 bg-[#F4F7F2] rounded-xl border border-[#A8CBB1]/30 text-center">
                  <span className="text-[10px] font-bold text-[#123524] block">Escuta Ativa</span>
                </div>
                <div className="p-2.5 bg-[#F4F7F2] rounded-xl border border-[#A8CBB1]/30 text-center">
                  <span className="text-[10px] font-bold text-[#123524] block">Mapa Local</span>
                </div>
                <div className="p-2.5 bg-[#F4F7F2] rounded-xl border border-[#A8CBB1]/30 text-center">
                  <span className="text-[10px] font-bold text-[#123524] block">Resolução</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* THREE EXQUISITE LIGHT CARDS BELOW HERO */}
      <section className="relative z-10 py-16 md:py-24 bg-white border-t border-[#A8CBB1]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-extrabold text-[#2F6B4F] uppercase tracking-widest block">Metodologia e Impacto Social</span>
            <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#123524] tracking-tight leading-none">
              Ações de Monitoramento Territorial
            </h3>
            <p className="text-[#16231C]/75 text-xs sm:text-sm">
              Conectando vozes, sistematizando dados e construindo soluções de mitigação contra assimetrias ambientais históricas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[26px] sm:gap-8">
            
            {/* Card 1: Escuta da comunidade */}
            <div 
              onClick={() => handleAction('relatar')}
              className="bg-white border border-[#A8CBB1]/65 rounded-3xl p-7 text-left space-y-4 shadow-2xs hover:shadow-md hover:border-[#123524] transition-all cursor-pointer group flex flex-col justify-between h-56"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#F28C28]/10 text-[#F28C28] flex items-center justify-center shrink-0">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-sans font-bold text-base text-[#123524] group-hover:text-[#2F6B4F] transition-colors leading-tight">
                    Escuta da comunidade
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Moradores registram problemas com foto, texto ou áudio.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-[11px] font-black text-[#123524] group-hover:translate-x-1.5 transition-transform">
                <span>Registrar ocorrência</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>

            {/* Card 2: Mapa de ocorrências */}
            <div 
              onClick={() => handleAction('mapa')}
              className="bg-white border border-[#A8CBB1]/65 rounded-3xl p-7 text-left space-y-4 shadow-2xs hover:shadow-md hover:border-[#123524] transition-all cursor-pointer group flex flex-col justify-between h-56"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#2F6B4F]/10 text-[#2F6B4F] flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-sans font-bold text-base text-[#123524] group-hover:text-[#2F6B4F] transition-colors leading-tight">
                    Mapa de ocorrências
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Relatos organizados por território, categoria e prioridade.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-[11px] font-black text-[#123524] group-hover:translate-x-1.5 transition-transform">
                <span>Explorar ocorrências</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>

            {/* Card 3: Resposta orientada por dados */}
            <div 
              onClick={() => handleAction('dashboard')}
              className="bg-white border border-[#A8CBB1]/65 rounded-3xl p-7 text-left space-y-4 shadow-2xs hover:shadow-md hover:border-[#123524] transition-all cursor-pointer group flex flex-col justify-between h-56"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#123524]/10 text-[#123524] flex items-center justify-center shrink-0">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-sans font-bold text-base text-[#123524] group-hover:text-[#2F6B4F] transition-colors leading-tight">
                    Resposta orientada por dados
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Indicadores ajudam a priorizar soluções e acompanhar resultados.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-[11px] font-black text-[#123524] group-hover:translate-x-1.5 transition-transform">
                <span>Análise de Indicadores</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>

          </div>

          {/* Clean Call To Action to the Solutions Page */}
          <div className="bg-[#FFFFFF] border border-[#A8CBB1]/50 p-8 rounded-3xl text-left max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1">
              <h4 className="font-sans font-bold text-lg text-[#123524]">Soluções e valor para stakeholders</h4>
              <p className="text-xs text-gray-500 max-w-lg leading-relaxed">Veja soluções, benefícios institucionais e uma simulação demonstrativa de risco evitado para apoiar decisões ESG.</p>
            </div>
            <button type="button"
              onClick={() => handleAction('banco')}
              className="px-5 py-3.5 bg-[#123524] hover:bg-[#2F6B4F] text-white font-extrabold text-xs rounded-xl flex items-center space-x-1.5 transition-all shadow-md shrink-0 uppercase tracking-wider cursor-pointer"
            >
              <span>Ver Soluções</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
