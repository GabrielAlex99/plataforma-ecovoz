import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Map, 
  Lightbulb, 
  Layers, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Sparkles, 
  Smile, 
  CheckCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  targetId: string | null; // null means centered modal
  icon: React.ReactNode;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

interface OnboardingTourProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function OnboardingTour({ onNavigate, activeSection }: OnboardingTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const steps: TourStep[] = [
    {
      title: "Boas-vindas à Plataforma Socioambiental! 👋",
      description: "Esta plataforma dinâmica de escuta atenta, monitoramento ESG e justiça ambiental foi construída para dar voz ativa às comunidades vulneráveis que convivem diretamente com grandes polos industriais.",
      targetId: null,
      icon: <Sparkles className="h-6 w-6 text-[#f28f3b]" />,
      position: 'center'
    },
    {
      title: "1. Registrar Ocorrência 📢",
      description: "Clicando em 'Relatar Problema', você pode cadastrar de forma confidencial (ou anônima) ocorrências como poeiras de minério suspensas, odores químicos fortes, escoamentos poluentes ou ruídos noturnos insuportáveis.",
      targetId: "tour-btn-relatar",
      icon: <Send className="h-5 w-5 text-sky-400" />,
      position: 'bottom'
    },
    {
      title: "2. Mapa Territorial de Impacto 🗺️",
      description: "Aqui, todos os relatos socioambientais enviados pela comunidade são consolidados no mapa demonstrativo do protótipo. Isso ajuda a identificar instantaneamente quais vilas e bairros necessitam de auditoria imediata.",
      targetId: "tour-btn-mapa",
      icon: <Map className="h-5 w-5 text-emerald-400" />,
      position: 'bottom'
    },
    {
      title: "3. Formular Soluções Ambientais 💡",
      description: "Nós não apenas coletamos problemas, nós agimos! Use o formulário de Propostas para enviar soluções corporativas de engenharia, filtros, barreiras acústicas ou programas de saúde comunitária.",
      targetId: "tour-btn-propor",
      icon: <Lightbulb className="h-5 w-5 text-yellow-400" />,
      position: 'bottom'
    },
    {
      title: "4. Central de Navegação e Auditoria 🧭",
      description: "Use os botões de tamanho padronizado na barra superior para navegar para nossa Clínica de Vozes Comunitárias (o Mural de Impacto Humano), visualizar os gráficos em nosso Dashboard ESG, ou conferir o andamento de soluções executadas.",
      targetId: "tour-nav-box",
      icon: <Layers className="h-5 w-5 text-[#f28f3b]" />,
      position: 'bottom'
    },
    {
      title: "Pronto para começar! 🎉",
      description: "Sua participação é a semente de uma transformação concreta nas margens industriais. Você pode rever este tour interativo a qualquer momento clicando no ícone flutuante de interrogação no canto do painel.",
      targetId: null,
      icon: <CheckCircle className="h-7 w-7 text-emerald-500" />,
      position: 'center'
    }
  ];

  // Auto trigger for first time visitors in this session
  useEffect(() => {
    const hasSeenTour = sessionStorage.getItem('hasSeenOnboardingSocioambiental_session');
    if (!hasSeenTour) {
      // Small timeout to allow page layout to settle
      const introTimer = setTimeout(() => {
        setIsOpen(true);
        setStep(0);
      }, 1200);
      return () => clearTimeout(introTimer);
    }
  }, []);

  // Toggle body class to indicate active onboarding tour
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('tour-active');
    } else {
      document.body.classList.remove('tour-active');
    }
    return () => {
      document.body.classList.remove('tour-active');
    };
  }, [isOpen]);

  const activeTargetId = steps[step].targetId;

  // Track target coordinates
  useEffect(() => {
    if (!isOpen) {
      setTargetRect(null);
      return;
    }

    if (!activeTargetId) {
      setTargetRect(null);
      return;
    }

    // Ensure we are in home section if we target a home element
    if (activeTargetId.startsWith('tour-btn-') && activeSection !== 'home') {
      onNavigate('home');
    }

    const calculatePosition = () => {
      let targetId = activeTargetId;
      if (targetId === 'tour-nav-box') {
        const desktopNav = document.getElementById('tour-nav-box');
        if (!desktopNav || desktopNav.offsetWidth === 0) {
          targetId = 'tour-mobile-menu-trigger';
        }
      }

      if (!targetId) {
        setTargetRect(null);
        return;
      }

      const el = document.getElementById(targetId);
      if (el) {
        const rect = el.getBoundingClientRect();
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        });
      }
    };

    // First scroll the target smoothly into view
    let targetId = activeTargetId;
    if (targetId === 'tour-nav-box') {
      const desktopNav = document.getElementById('tour-nav-box');
      if (!desktopNav || desktopNav.offsetWidth === 0) {
        targetId = 'tour-mobile-menu-trigger';
      }
    }
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    const timer = setTimeout(calculatePosition, 350);

    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [activeTargetId, step, isOpen, activeSection]);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    sessionStorage.setItem('hasSeenOnboardingSocioambiental_session', 'true');
    localStorage.setItem('hasSeenOnboardingSocioambiental_v2', 'true');
    setIsOpen(false);
    setStep(0);
  };

  const startTour = () => {
    onNavigate('home');
    setStep(0);
    setIsOpen(true);
  };

  if (!isOpen) {
    // Return replay trigger button in the bottom left to avoid overlapping the accessibility panel triggers in the bottom right
    return (
      <button type="button"
        onClick={startTour}
        className="fixed left-6 bottom-6 z-[45] p-3.5 bg-[#1b4332] hover:bg-emerald-800 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group active:scale-95 border border-[#2d5c48] cursor-pointer"
        title="Iniciar Tour de Introdução"
        aria-label="Iniciar Tour de Introdução"
      >
        <HelpCircle className="h-5.5 w-5.5 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-bold transition-all duration-300 whitespace-nowrap uppercase tracking-wider">
          Tour de Introdução
        </span>
      </button>
    );
  }

  const currentStepData = steps[step];

  return (
    <div className="fixed inset-0 z-[9999] overflow-x-hidden font-sans pointer-events-auto">
      {/* Dim backdrop overlay */}
      <div 
        className="absolute inset-0 bg-slate-950/80 transition-opacity duration-300 backdrop-blur-2xs"
        onClick={handleSkip}
      />

      {/* SVG/CSS Spotlight mask centered on computed target properties */}
      {targetRect && (
        <div 
          className="fixed border-4 border-yellow-400 rounded-2xl pointer-events-none transition-all duration-300 shadow-[0_0_0_9999px_rgba(11,20,26,0.6)]"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
          }}
        />
      )}

      {/* Popover Step Content Container */}
      <div 
        className={`fixed p-4 w-full max-w-md transition-all duration-300 z-50 transform ${
          targetRect 
            ? 'bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 md:bottom-6' 
            : 'top-[22%] left-1/2 -translate-x-1/2'
        }`}
      >
        <div className="bg-white border border-[#DDE8D8] rounded-3xl p-[26px] shadow-2xl text-left relative flex flex-col space-y-4 max-h-[90vh] overflow-y-auto">
          {/* Progress segment header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-[#1b4332]/10 rounded-xl text-[#1b4332]">
                {currentStepData.icon}
              </span>
              <span className="text-xs font-bold text-gray-400 tracking-wider uppercase h-fit-content">
                Onboarding ({step + 1} de {steps.length})
              </span>
            </div>
            <button type="button" 
              onClick={handleSkip}
              className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              title="Pular Tour"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Text Title & Body */}
          <div className="space-y-2">
            <h3 className="font-sans font-bold text-lg md:text-xl text-[#1b4332] tracking-tight">
              {currentStepData.title}
            </h3>
            <p className="text-[#4B5F55] text-xs md:text-sm leading-relaxed font-normal">
              {currentStepData.description}
            </p>
          </div>

          {/* Progress bar visual indicator */}
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-600 transition-all duration-300" 
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Control Buttons Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            {/* Skip Option */}
            <button type="button"
              onClick={handleSkip}
              className="text-xs text-gray-400 hover:text-gray-600 font-semibold px-2 py-1 transition-colors cursor-pointer"
            >
              Pular tutorial
            </button>

            {/* Navigation buttons */}
            <div className="flex items-center space-x-2">
              {step > 0 && (
                <button type="button"
                  onClick={handlePrev}
                  className="px-3.5 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Voltar</span>
                </button>
              )}

              <button type="button"
                onClick={handleNext}
                className="px-4.5 py-2 bg-[#1b4332] hover:bg-[#133024] text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-all shadow-md shadow-emerald-950/10 cursor-pointer"
              >
                <span>{step === steps.length - 1 ? "Entendi!" : "Próximo"}</span>
                {step === steps.length - 1 ? (
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
