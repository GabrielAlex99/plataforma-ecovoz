import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import ImpactMap from './components/ImpactMap';
import ReportForm from './components/ReportForm';
import SolutionForm from './components/SolutionForm';
import DashboardESG from './components/DashboardESG';
import SolutionBank from './components/SolutionBank';
import MyRestrictedArea from './components/MyRestrictedArea';
import AboutSection from './components/AboutSection';
import CommunityPains from './components/CommunityPains';
import OnboardingTour from './components/OnboardingTour';
import CodeViewer from './components/CodeViewer';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AccessibilityMenu from './components/AccessibilityMenu';
import { ArrowUp, FileDown, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

import { Relato, Proposta, SolucaoPadrao, PlataformaUser } from './types';
import { initialRelatos, initialPropostas, solucoesPadrao } from './data/initialData';
import { jsPDF } from 'jspdf';
import { realImpactStats } from './data/impactStats';
import { documentedRacismCases } from './data/realCases';
import { realSolutions } from './data/solutionBank';


type PitchStep = {
  id: string;
  title: string;
  cue: string;
};

const PITCH_STEPS: PitchStep[] = [
  {
    id: 'home',
    title: 'Abertura',
    cue: 'A voz da comunidade vira dado. O dado vira ação.'
  },
  {
    id: 'dores',
    title: 'Problema e evidências',
    cue: 'Dados oficiais e casos documentados mostram por que a escuta territorial precisa virar rotina.'
  },
  {
    id: 'mapa',
    title: 'Como a EcoVoz organiza relatos',
    cue: 'O território passa a ser visualizado por categoria, prioridade, imagem e status de encaminhamento.'
  },
  {
    id: 'dashboard',
    title: 'Indicadores para decisão',
    cue: 'O painel transforma registros demonstrativos e fontes públicas em leitura executiva.'
  },
  {
    id: 'banco',
    title: 'Valor para empresa e soluções',
    cue: 'A EcoVoz apoia reputação, priorização ESG, prevenção de risco e resposta comunitária.'
  },
  {
    id: 'sobre',
    title: 'Fechamento e alinhamento aos ODS',
    cue: 'O projeto conecta tecnologia, sustentabilidade e compromisso socioambiental verificável.'
  }
];

interface PitchModeBarProps {
  currentStep: PitchStep;
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onExit: () => void;
  onExportPdf: () => void;
}

function PitchModeBar({ currentStep, currentIndex, total, onPrev, onNext, onExit, onExportPdf }: PitchModeBarProps) {
  return (
    <div className="fixed left-0 right-0 top-0 z-[70] border-b border-[#DDE8D8] bg-white/95 shadow-lg backdrop-blur-md print:hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="min-w-0">
          <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#F28C28]">Modo apresentação · {currentIndex + 1}/{total}</span>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-base font-black text-[#123524] sm:text-lg">{currentStep.title}</h2>
            <p className="text-xs font-medium text-[#4B5F55] sm:text-sm">{currentStep.cue}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={onPrev} className="inline-flex h-9 items-center gap-1 rounded-full border border-[#DDE8D8] bg-white px-3 text-xs font-black text-[#123524] transition hover:bg-[#F4F7F2]" aria-label="Etapa anterior do pitch">
            <ChevronLeft className="h-4 w-4" /> Anterior
          </button>
          <button type="button" onClick={onNext} className="inline-flex h-9 items-center gap-1 rounded-full bg-[#123524] px-3 text-xs font-black text-white transition hover:bg-[#2F6B4F]" aria-label="Próxima etapa do pitch">
            Próximo <ChevronRight className="h-4 w-4" />
          </button>
          <button type="button" onClick={onExportPdf} className="hidden h-9 items-center gap-1 rounded-full border border-[#F6C56B] bg-[#FFF8EF] px-3 text-xs font-black text-[#C44A1C] transition hover:bg-[#FFF3E0] sm:inline-flex" aria-label="Exportar relatório em PDF">
            <FileDown className="h-4 w-4" /> PDF
          </button>
          <button type="button" onClick={onExit} className="inline-flex h-9 items-center gap-1 rounded-full border border-[#DDE8D8] bg-white px-3 text-xs font-black text-[#4B5F55] transition hover:bg-[#F4F7F2]" aria-label="Sair do modo apresentação">
            <X className="h-4 w-4" /> Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // relatos & propostas core arrays
  const [relatos, setRelatos] = useState<Relato[]>(initialRelatos);
  const [propostas, setPropostas] = useState<Proposta[]>(initialPropostas);
  const [activeSection, setActiveSection] = useState('home');
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [isPitchMode, setIsPitchMode] = useState(false);

  // Accessibility States
  const [contrastMode, setContrastMode] = useState<'normal' | 'high-contrast' | 'grayscale'>('normal');
  const [fontSizeScale, setFontSizeScale] = useState(1.0);
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);
  const [speechSynthesisEnabled, setSpeechSynthesisEnabled] = useState(false);

  // Dark Mode & Back to Top States
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.add('dark-mode-root');
        document.body.classList.add('dark-mode-root');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.remove('dark-mode-root');
        document.body.classList.remove('dark-mode-root');
      }
    } catch (error) {
      console.error("Dark mode transition failed:", error);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScrollButton = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollButton);
    return () => window.removeEventListener('scroll', handleScrollButton);
  }, []);

  const handleToggleDarkMode = () => {
    // Tema escuro desativado neste protótipo para manter contraste e identidade visual institucional.
    setIsDarkMode(false);
    localStorage.setItem('esg_plataforma_dark_mode', 'false');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pitchIndex = Math.max(0, PITCH_STEPS.findIndex((step) => step.id === activeSection));
  const currentPitchStep = PITCH_STEPS[pitchIndex] || PITCH_STEPS[0];

  const handleStartPitchMode = () => {
    setShowCodeViewer(false);
    setIsPitchMode(true);
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitPitchMode = () => {
    setIsPitchMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePitchPrev = () => {
    const prevIndex = (pitchIndex - 1 + PITCH_STEPS.length) % PITCH_STEPS.length;
    setActiveSection(PITCH_STEPS[prevIndex].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePitchNext = () => {
    const nextIndex = (pitchIndex + 1) % PITCH_STEPS.length;
    setActiveSection(PITCH_STEPS[nextIndex].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportPitchPdf = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 48;
    let y = 52;

    const addPageIfNeeded = (height = 70) => {
      if (y + height > pageHeight - margin) {
        doc.addPage();
        y = 52;
      }
    };

    const addWrappedText = (text: string, size = 10, color: [number, number, number] = [22, 35, 28], maxWidth = pageWidth - margin * 2, lineGap = 14) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(size);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, maxWidth);
      addPageIfNeeded(lines.length * lineGap + 6);
      doc.text(lines, margin, y);
      y += lines.length * lineGap + 8;
    };

    const addSectionTitle = (title: string) => {
      addPageIfNeeded(46);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.setTextColor(18, 53, 36);
      doc.text(title, margin, y);
      y += 22;
      doc.setDrawColor(221, 232, 216);
      doc.line(margin, y, pageWidth - margin, y);
      y += 18;
    };

    doc.setFillColor(18, 53, 36);
    doc.rect(0, 0, pageWidth, 120, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(30);
    doc.text('EcoVoz', margin, 58);
    doc.setFontSize(14);
    doc.text('A voz da comunidade vira dado. O dado vira ação.', margin, 86);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Relatório sintético para pitch e discussão com stakeholders', margin, 106);
    y = 154;

    addSectionTitle('1. Por que o projeto importa');
    addWrappedText('A EcoVoz propõe uma plataforma socioambiental de escuta, mapeamento e priorização de ações para territórios vulnerabilizados. A proposta separa dados oficiais, casos documentados e demonstrações do protótipo para manter transparência e credibilidade.');

    addSectionTitle('2. Indicadores oficiais usados como base');
    realImpactStats.forEach((stat) => {
      addPageIfNeeded(80);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(196, 74, 28);
      doc.text(`${stat.displayValue} · ${stat.category}`, margin, y);
      y += 17;
      doc.setTextColor(18, 53, 36);
      doc.text(stat.metricName, margin, y);
      y += 15;
      addWrappedText(`${stat.description} Fonte: ${stat.sourceName}.`, 9, [75, 95, 85]);
      y += 4;
    });

    addSectionTitle('3. Casos documentados que reforçam o problema');
    documentedRacismCases.forEach((item) => {
      addPageIfNeeded(86);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(18, 53, 36);
      doc.text(`${item.location} — ${item.title}`, margin, y);
      y += 17;
      addWrappedText(`${item.context} Impacto humano: ${item.humanImpact || item.impact || ''} Fonte: ${item.sourceName}.`, 9, [75, 95, 85]);
    });

    addSectionTitle('4. Valor para stakeholders');
    ['Reduzir risco reputacional com escuta e resposta antecipadas.', 'Priorizar investimento social com base em evidências territoriais.', 'Organizar relatos dispersos em indicadores, mapa e histórico.', 'Apoiar compromissos ESG com rastreabilidade e transparência.', 'Fortalecer relação comunitária com retorno visível das ações.'].forEach((bullet) => addWrappedText(`• ${bullet}`, 10));

    addSectionTitle('5. Banco inicial de soluções');
    realSolutions.slice(0, 4).forEach((solution) => {
      addPageIfNeeded(72);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(18, 53, 36);
      doc.text(solution.title, margin, y);
      y += 15;
      addWrappedText(`${solution.description} Impacto esperado: ${solution.expectedImpact}. Fonte: ${solution.sourceName}.`, 9, [75, 95, 85]);
    });

    addSectionTitle('6. Observação sobre a calculadora');
    addWrappedText('A calculadora do protótipo é demonstrativa. Ela usa a lógica: relatos críticos por mês × custo médio estimado de resposta tardia × 12 meses × redução estimada de risco. Em uma implantação real, os parâmetros devem ser substituídos por dados internos da empresa e histórico de atendimento.', 10);

    doc.setProperties({ title: 'EcoVoz - Relatório sintético de pitch', subject: 'Plataforma socioambiental de escuta e mapeamento', author: 'EcoVoz' });
    doc.save('EcoVoz_relatorio_pitch.pdf');
  };

  // Authentication State
  const [currentUser, setCurrentUser] = useState<PlataformaUser | null>(() => {
    try {
      const active = localStorage.getItem('esg_plataforma_active_user');
      return active ? JSON.parse(active) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Combine default catalog solutions and user proposals into one derived list
  const todasSolucoes = useMemo(() => {
    const userSols: SolucaoPadrao[] = propostas.map((novaProposta) => ({
      id: novaProposta.id,
      titulo: novaProposta.titulo,
      problemaRelacionado: novaProposta.problemaRelacionado,
      descricao: novaProposta.descricao,
      impactoEsperado: novaProposta.impacto,
      complexidade: novaProposta.viabilidade === 'Alta' ? 'Baixa' : novaProposta.viabilidade === 'Média' ? 'Média' : 'Alta',
      categoria: 'Gerais',
      userEmail: novaProposta.userEmail // Keep ties intact
    }));
    return [...userSols, ...solucoesPadrao];
  }, [propostas]);

  // Auth Handlers
  const handleLoginSuccess = (user: PlataformaUser) => {
    setCurrentUser(user);
    localStorage.setItem('esg_plataforma_active_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('esg_plataforma_active_user');
    // If they were browsing their restricted profile, gently scroll back to home section
    if (activeSection === 'restrito') {
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handler to add newly reported issue from form
  const handleAddRelato = (novoRelato: Relato) => {
    const itemWithAuth: Relato = {
      ...novoRelato,
      userEmail: currentUser ? currentUser.email : undefined
    };
    setRelatos((prev) => [itemWithAuth, ...prev]);
  };

  // Handler to add newly proposed solution from form
  const handleAddProposta = async (novaProposta: Proposta) => {
    const itemWithAuth: Proposta = {
      ...novaProposta,
      userEmail: currentUser ? currentUser.email : undefined
    };
    setPropostas((prev) => [itemWithAuth, ...prev]);

    // Real full-stack email trigger for proposal submission
    try {
      const resp = await fetch('/api/enviar-email-esg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipo: 'Proposta',
          data: itemWithAuth
        })
      });
      if (resp.ok) {
        const result = await resp.json();
        console.log('Proposal notification email sent successfully to coordinator:', result);
      }
    } catch (err) {
      console.error('Failed to dispatch proposal notification email:', err);
    }
  };

  // CRUD modifications for Relato in active session
  const handleUpdateRelato = (updated: Relato) => {
    setRelatos((prev) => prev.map(r => r.id === updated.id ? updated : r));
  };

  const handleDeleteRelato = (id: string) => {
    setRelatos((prev) => prev.filter(r => r.id !== id));
  };

  // CRUD modifications for Proposta in active session
  const handleUpdateProposta = (updated: Proposta) => {
    setPropostas((prev) => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleDeleteProposta = (id: string) => {
    setPropostas((prev) => prev.filter(p => p.id !== id));
  };

  // Scroll to top when active section changes to make section swaps crisp
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeSection]);

  const rootClasses = [
    "min-h-screen transition-all duration-300",
    contrastMode === 'high-contrast' ? "high-contrast-root bg-slate-950 text-yellow-300" : (isDarkMode ? "dark dark-mode-root bg-[#080d0a] text-slate-100" : "bg-[#fafcfa] text-[#2d3436]"),
    contrastMode === 'grayscale' ? "grayscale-root" : "relative",
    underlineLinks ? "underline-links-root" : "",
    dyslexiaFont ? "dyslexia-font-root" : ""
  ].filter(Boolean).join(" ");

  const rootStyle = {
    fontSize: `${fontSizeScale}rem`
  };

  return (
    <div className={rootClasses} style={rootStyle} id="root-viewport">
      
      {/* Accessibility Style Overrides */}
      <style>{`
        ${contrastMode === 'high-contrast' ? `
          .high-contrast-root, 
          .high-contrast-root * {
            background-color: #0c0f0d !important;
            color: #ffff00 !important;
            border-color: #ffff00 !important;
            box-shadow: none !important;
            text-shadow: none !important;
          }
          .high-contrast-root a,
          .high-contrast-root a *,
          .high-contrast-root button,
          .high-contrast-root button * {
            background-color: #000000 !important;
            color: #00ffff !important;
            border: 2px solid #ffff00 !important;
            text-decoration: underline !important;
          }
          .high-contrast-root input,
          .high-contrast-root select,
          .high-contrast-root textarea {
            background-color: #000000 !important;
            color: #ffffff !important;
            border: 2px solid #ffff00 !important;
          }
          .high-contrast-root select option {
            background-color: #0c0f0d !important;
            color: #ffff00 !important;
          }
          .high-contrast-root svg,
          .high-contrast-root svg * {
            stroke: #ffff00 !important;
            fill: none !important;
          }
        ` : ''}
        ${false && isDarkMode && contrastMode !== 'high-contrast' ? `
          /* Main structural dark style overrides */
          .dark-mode-root {
            background-color: #080d0a !important;
            color: #f1f5f9 !important;
          }
          .dark-mode-root main {
            background-color: #080d0a !important;
          }
          .dark-mode-root select,
          .dark-mode-root input,
          .dark-mode-root textarea {
            background-color: #111a14 !important;
            color: #e2e8f0 !important;
            border-color: #24352a !important;
          }
          /* Card backgrounds */
          .dark-mode-root .bg-white,
          .dark-mode-root .bg-slate-50,
          .dark-mode-root .bg-gray-50,
          .dark-mode-root .bg-\\[\\#f5f7f6\\],
          .dark-mode-root .bg-emerald-50\\/40,
          .dark-mode-root [class*="bg-white"],
          .dark-mode-root [class*="bg-slate-50"],
          .dark-mode-root [class*="bg-gray-50"],
          .dark-mode-root [class*="bg-\\\\[\\\\#f5f7f6\\\\]"],
          .dark-mode-root [class*="bg-\\\\[\\\\#eef2f0\\\\]"] {
            background-color: #0e1712 !important;
            background-image: none !important;
            color: #e2e8f0 !important;
          }
          /* Clear gradient backgrounds in dark mode and apply deep dark slate bg */
          .dark-mode-root [class*="bg-gradient-to"] {
            background-image: none !important;
            background-color: #080d0a !important;
          }
          /* Target text overrides */
          .dark-mode-root .text-gray-950,
          .dark-mode-root .text-gray-900,
          .dark-mode-root .text-slate-900,
          .dark-mode-root .text-gray-800,
          .dark-mode-root .text-slate-800,
          .dark-mode-root .text-gray-700,
          .dark-mode-root .text-slate-700,
          .dark-mode-root [class*="text-\\\\[\\\\#1b4332\\\\]"],
          .dark-mode-root [class*="text-\\\\[\\\\#0b3d59\\\\]"],
          .dark-mode-root [class*="text-\\\\[\\\\#2d3436\\\\]"],
          .dark-mode-root [class*="text-gray-950"],
          .dark-mode-root [class*="text-gray-900"],
          .dark-mode-root [class*="text-slate-900"],
          .dark-mode-root [class*="text-gray-850"],
          .dark-mode-root [class*="text-gray-800"],
          .dark-mode-root [class*="text-slate-800"],
          .dark-mode-root [class*="text-gray-700"],
          .dark-mode-root [class*="text-slate-700"] {
            color: #f1f5f9 !important;
          }
          .dark-mode-root .text-gray-650,
          .dark-mode-root .text-slate-650,
          .dark-mode-root .text-slate-600,
          .dark-mode-root .text-gray-600,
          .dark-mode-root [class*="text-gray-600"],
          .dark-mode-root [class*="text-slate-600"],
          .dark-mode-root [class*="text-gray-500"],
          .dark-mode-root [class*="text-slate-500"] {
            color: #cbd5e1 !important;
          }
          .dark-mode-root .text-gray-500,
          .dark-mode-root .text-slate-500,
          .dark-mode-root .text-gray-400,
          .dark-mode-root [class*="text-gray-400"],
          .dark-mode-root [class*="text-slate-400"] {
            color: #94a3b8 !important;
          }
          /* Custom borders */
          .dark-mode-root .border-gray-150,
          .dark-mode-root .border-gray-200,
          .dark-mode-root .border-gray-300,
          .dark-mode-root .border-slate-200,
          .dark-mode-root .border-emerald-100,
          .dark-mode-root .border-\\\\[\\\\#e9ecef\\\\] {
            border-color: #1b2a21 !important;
          }
          /* Special section headers and widgets */
          .dark-mode-root section,
          .dark-mode-root div[id="home"],
          .dark-mode-root div[id="mapa"],
          .dark-mode-root div[id="relatar"],
          .dark-mode-root div[id="propor"],
          .dark-mode-root div[id="dashboard"],
          .dark-mode-root div[id="banco"],
          .dark-mode-root div[id="restrito"],
          .dark-mode-root div[id="sobre"] {
            background-color: #080d0a !important;
            border-color: #1b2a21 !important;
          }
          .dark-mode-root .border-t {
            border-color: #1b2a21 !important;
          }
          /* Table items active */
          .dark-mode-root .divide-y > * {
            border-color: #1b2a21 !important;
          }
          .dark-mode-root h1,
          .dark-mode-root h2,
          .dark-mode-root h3,
          .dark-mode-root h4 {
            color: #ffffff !important;
          }
          .dark-mode-root .bg-emerald-50,
          .dark-mode-root .bg-teal-50 {
            background-color: rgba(16, 185, 129, 0.12) !important;
            color: #34d399 !important;
          }
          .dark-mode-root .bg-blue-50 {
            background-color: rgba(56, 189, 248, 0.12) !important;
            color: #38bdf8 !important;
          }
          .dark-mode-root .bg-amber-50,
          .dark-mode-root .bg-orange-50 {
            background-color: rgba(245, 158, 11, 0.12) !important;
            color: #fbbf24 !important;
          }
          .dark-mode-root .bg-\\\\[\\\\#1b4332\\\\]\\\\/5 {
            background-color: rgba(52, 211, 153, 0.06) !important;
          }
          .dark-mode-root .bg-\\\\[\\\\#0b3d59\\\\]\\\\/5 {
            background-color: rgba(56, 189, 248, 0.06) !important;
          }
          .dark-mode-root p,
          .dark-mode-root blockquote,
          .dark-mode-root cite,
          .dark-mode-root span:not([class*="bg-[#f28f3b]"]):not([class*="bg-[#1b4332]"]) {
            color: #cbd5e1 !important;
          }
          .dark-mode-root .shadow-lg,
          .dark-mode-root .shadow-md,
          .dark-mode-root .shadow-xl,
          .dark-mode-root .shadow-xs {
            box-shadow: 0 4px 20px -2px rgba(0,0,0,0.5) !important;
          }
        ` : ''}
        ${contrastMode === 'grayscale' ? `
          .grayscale-root {
            filter: grayscale(100%) !important;
          }
        ` : ''}
        ${underlineLinks ? `
          .underline-links-root a,
          .underline-links-root button,
          .underline-links-root [role="button"] {
            text-decoration: underline !important;
          }
        ` : ''}
        ${dyslexiaFont ? `
          .dyslexia-font-root,
          .dyslexia-font-root * {
            font-family: Arial, Helvetica, sans-serif !important;
            letter-spacing: 0.05em !important;
            word-spacing: 0.12em !important;
            line-height: 1.85 !important;
          }
        ` : ''}
      `}</style>
      
      {/* Dynamic Header */}
      {!isPitchMode && (
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        showCodeViewer={showCodeViewer}
        setShowCodeViewer={setShowCodeViewer}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onStartPitchMode={handleStartPitchMode}
        onExportPitchPdf={handleExportPitchPdf}
      />
      )}

      {isPitchMode && (
        <PitchModeBar
          currentStep={currentPitchStep}
          currentIndex={pitchIndex}
          total={PITCH_STEPS.length}
          onPrev={handlePitchPrev}
          onNext={handlePitchNext}
          onExit={handleExitPitchMode}
          onExportPdf={handleExportPitchPdf}
        />
      )}

      {/* Code Viewer Mode Toggle Area */}
      {showCodeViewer && (
        <div className="pt-28 pb-4 animate-fade-in bg-[#1b4332] text-white">
          <CodeViewer />
        </div>
      )}

      {/* Main Structural Page Flow - Separate Standalone Views instead of Infinite Scrolling Stack */}
      <main className={`relative min-h-[65vh] ${isPitchMode ? 'pt-20 lg:pt-24' : activeSection !== 'home' ? 'pt-16 lg:pt-20' : ''}`}>
        
        {/* Render only active topic as a separate screen/view */}
        {activeSection === 'home' && <Home onNavigate={setActiveSection} />}
        
        {activeSection === 'mapa' && <ImpactMap relatos={relatos} />}
        
        {activeSection === 'relatar' && <ReportForm onAddRelato={handleAddRelato} />}
        
        {activeSection === 'propor' && <SolutionForm onAddProposta={handleAddProposta} />}
        
        {activeSection === 'dores' && <CommunityPains />}
        
        {activeSection === 'dashboard' && <DashboardESG relatos={relatos} propostas={propostas} currentUser={currentUser} />}
        
        {activeSection === 'banco' && <SolutionBank solucoes={todasSolucoes} />}
        
        {activeSection === 'restrito' && (
          <MyRestrictedArea
            currentUser={currentUser}
            relatos={relatos}
            propostas={propostas}
            onUpdateRelato={handleUpdateRelato}
            onDeleteRelato={handleDeleteRelato}
            onUpdateProposta={handleUpdateProposta}
            onDeleteProposta={handleDeleteProposta}
          />
        )}
        
        {activeSection === 'sobre' && <AboutSection />}

      </main>

      {/* Dynamic Footer */}
      {!isPitchMode && <Footer />}

      {/* Accessibility Helper floating options menu */}
      {!isPitchMode && (
      <AccessibilityMenu 
        onContrastChange={setContrastMode}
        onFontSizeChange={setFontSizeScale}
        onUnderlineLinksChange={setUnderlineLinks}
        onDyslexiaFontChange={setDyslexiaFont}
        onReadingGuideChange={setReadingGuide}
        onSpeechSynthesisChange={setSpeechSynthesisEnabled}
        onNavigate={setActiveSection}
      />
      )}

      {/* Authentication Popup Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Back to Top Button */}
      {!isPitchMode && showBackToTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed right-6 bottom-6 z-55 p-3.5 bg-[#f28f3b] hover:bg-[#de7c2a] text-slate-950 hover:text-white rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-white/20 active:scale-95 cursor-pointer"
          aria-label="Voltar para o topo"
          title="Voltar para o topo"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Onboarding Interactive walkthrough Tour */}
      {!isPitchMode && <OnboardingTour activeSection={activeSection} onNavigate={setActiveSection} />}

    </div>
  );
}
