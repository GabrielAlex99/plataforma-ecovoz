import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, 
  Volume2, 
  ZoomIn, 
  ZoomOut, 
  Check, 
  RotateCcw, 
  Underline, 
  Type, 
  Keyboard, 
  X, 
  HelpCircle,
  HelpCircle as AccessibilityIcon
} from 'lucide-react';

interface AccessibilityMenuProps {
  onContrastChange: (mode: 'normal' | 'high-contrast' | 'grayscale') => void;
  onFontSizeChange: (scale: number) => void;
  onUnderlineLinksChange: (underline: boolean) => void;
  onDyslexiaFontChange: (dyslexic: boolean) => void;
  onReadingGuideChange: (guide: boolean) => void;
  onSpeechSynthesisChange: (enabled: boolean) => void;
  onNavigate?: (sectionId: string) => void;
}

export default function AccessibilityMenu({
  onContrastChange,
  onFontSizeChange,
  onUnderlineLinksChange,
  onDyslexiaFontChange,
  onReadingGuideChange,
  onSpeechSynthesisChange,
  onNavigate
}: AccessibilityMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contrast, setContrast] = useState<'normal' | 'high-contrast' | 'grayscale'>('normal');
  const [fontScale, setFontScale] = useState(1.0); // 0.85 to 1.3
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);
  const [speechSynthesisEnabled, setSpeechSynthesisEnabled] = useState(false);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);

  // Mouse position tracker for reading guide
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (readingGuide) {
        setMouseY(e.clientY);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [readingGuide]);

  // Hook for Keyboard Shortcuts (e-MAG compliant)
  // Alt+1: Home, Alt+2: Mapa, Alt+3: Relatar, Alt+4: Propor, Alt+5: Dashboard, Alt+6: Banco de Soluções, Alt+9: Menu de Acessibilidade
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if Alt/Option key is pressed
      if (e.altKey) {
        let targetId = '';
        if (e.key === '1') targetId = 'home';
        else if (e.key === '2') targetId = 'mapa';
        else if (e.key === '3') targetId = 'relatar';
        else if (e.key === '4') targetId = 'propor';
        else if (e.key === '5') targetId = 'dashboard';
        else if (e.key === '6') targetId = 'banco';
        else if (e.key === '7') targetId = 'dores';
        else if (e.key === '9') {
          e.preventDefault();
          setIsOpen(prev => !prev);
          announceToScreenReader(isOpen ? "Menu de acessibilidade fechado" : "Menu de acessibilidade aberto. Pressione tab para navegar pelas opções.");
          return;
        }

        if (targetId) {
          e.preventDefault();
          if (onNavigate) {
            onNavigate(targetId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            announceToScreenReader(`Navegando para a seção: ${targetId}`);
          } else {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              el.focus();
              announceToScreenReader(`Navegando para a seção: ${targetId}`);
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Screen reader announcer helper (adds a hidden live region dynamically)
  const announceToScreenReader = (message: string) => {
    let announcer = document.getElementById('sr-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'sr-announcer';
      announcer.setAttribute('aria-live', 'assertive');
      announcer.className = 'sr-only absolute w-px h-px p-0 overflow-hidden text-nowrap border-0';
      document.body.appendChild(announcer);
    }
    announcer.textContent = '';
    setTimeout(() => {
      if (announcer) announcer.textContent = message;
    }, 100);
  };

  // Contrast toggle
  const toggleContrast = (mode: 'normal' | 'high-contrast' | 'grayscale') => {
    setContrast(mode);
    onContrastChange(mode);
    const label = mode === 'high-contrast' ? 'Alto Contraste ativado' : mode === 'grayscale' ? 'Escala de Cinza ativada' : 'Contraste Padrão restaurado';
    announceToScreenReader(label);
  };

  // Font adjustments
  const adjustFontScale = (direction: 'in' | 'out' | 'reset') => {
    let newScale = fontScale;
    if (direction === 'in') {
      newScale = Math.min(1.3, fontScale + 0.1);
    } else if (direction === 'out') {
      newScale = Math.max(0.85, fontScale - 0.1);
    } else {
      newScale = 1.0;
    }
    setFontScale(newScale);
    onFontSizeChange(newScale);
    announceToScreenReader(`Tamanho do texto configurado para ${Math.round(newScale * 100)}%`);
  };

  // Link underline toggle
  const toggleUnderlines = () => {
    const nextVal = !underlineLinks;
    setUnderlineLinks(nextVal);
    onUnderlineLinksChange(nextVal);
    announceToScreenReader(nextVal ? 'Sublinhar links ativado' : 'Sublinhar links desativado');
  };

  // Dyslexia font toggle
  const toggleDyslexia = () => {
    const nextVal = !dyslexiaFont;
    setDyslexiaFont(nextVal);
    onDyslexiaFontChange(nextVal);
    announceToScreenReader(nextVal ? 'Fonte de fácil leitura ativada' : 'Fonte padrão ativada');
  };

  // Reading Guide toggle
  const toggleReadingGuide = () => {
    const nextVal = !readingGuide;
    setReadingGuide(nextVal);
    onReadingGuideChange(nextVal);
    announceToScreenReader(nextVal ? 'Régua guia de leitura ativada' : 'Guia de leitura removido');
  };

  // Speech helper: speaks text in Portuguese
  const speakText = (text: string) => {
    if (!speechSynthesisEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Stop ongoing speech
    
    // Clean text from emoji or icon text
    const cleanText = text.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Speech TTS toggler
  const toggleSpeechSynthesis = () => {
    const nextVal = !speechSynthesisEnabled;
    setSpeechSynthesisEnabled(nextVal);
    onSpeechSynthesisChange(nextVal);
    
    if (nextVal) {
      announceToScreenReader('Leitor de tela por síntese de voz ativado. Passe o mouse ou foque os elementos para ouvir o texto.');
      setTimeout(() => {
        speakText('Leitor de tela por síntese de voz ativado. Ao passar o mouse ou focar os elementos da tela, eles serão lidos para você.');
      }, 800);
    } else {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      announceToScreenReader('Leitor de tela por síntese de voz desativado.');
    }
  };

  // Global hover and focus catcher for Speech Synthesis
  useEffect(() => {
    if (!speechSynthesisEnabled) return;

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      // Let's speak meaningful elements only (headings, paragraphs, buttons, labels, lists)
      const matches = target.closest('h1, h2, h3, h4, h5, h6, p, button, label, select, input, textarea, strong, span, .text-readable');
      if (matches) {
        const textToRead = matches.textContent || '';
        if (textToRead.trim()) {
          // Speak it
          speakText(textToRead);
        }
      }
    };

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const textToRead = target.getAttribute('aria-label') || target.textContent || target.getAttribute('placeholder') || '';
      if (textToRead.trim()) {
        speakText(textToRead);
      }
    };

    // Attach passive listeners
    document.addEventListener('mouseover', handleHover);
    document.addEventListener('focusin', handleFocus);

    return () => {
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('focusin', handleFocus);
    };
  }, [speechSynthesisEnabled]);

  // Shortcut key describer
  const shortcuts = [
    { key: 'Alt + 1', desc: 'Ir para o Início / Principal' },
    { key: 'Alt + 2', desc: 'Ir para o Mapa de Impactos' },
    { key: 'Alt + 3', desc: 'Ir para Form de Relatar Problema' },
    { key: 'Alt + 4', desc: 'Ir para Form de Propor Solução' },
    { key: 'Alt + 5', desc: 'Ir para o Painel Dashboard ESG' },
    { key: 'Alt + 6', desc: 'Ir para o Banco de Soluções' },
    { key: 'Alt + 7', desc: 'Ir para Vozes e Impacto Humano 💔' },
    { key: 'Alt + 9', desc: 'Abrir / Fechar este menu' },
    { key: 'Tab', desc: 'Navegar sequencialmente entre botões e campos' },
    { key: 'Enter / Espaço', desc: 'Ativar botões e links focados' }
  ];

  const renderSwitch = (
    checked: boolean,
    onClick: () => void,
    ariaLabel: string
  ) => (
    <button
      type="button"
      onClick={onClick}
      className={`access-switch ${checked ? 'access-switch--on' : 'access-switch--off'}`}
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
    >
      <span className="access-switch__thumb" aria-hidden="true" />
    </button>
  );

  return (
    <>
      {/* 1. Unobtrusive Floating Trigger Badge */}
      <div className="fixed right-6 bottom-[84px] z-50 flex flex-col items-end gap-2">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            announceToScreenReader(isOpen ? "Menu de acessibilidade fechado" : "Menu de acessibilidade aberto. Pressione tab para navegar pelas opções.");
          }}
          className="bg-[#0b3d59] hover:bg-[#072a42] text-[#f28f3b] p-3.5 rounded-full shadow-2xl transition-all border border-[#f28f3b]/30 flex items-center justify-center cursor-pointer group hover:scale-105"
          id="btn-accessibility-trigger"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-label="Opções de Acessibilidade do site (Atalho: Alt+9)"
          title="Menu de Acessibilidade (Atalho: Alt+9)"
        >
          {/* Custom SVG combining humanoid / eye or spark to make it clearly accessibility */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-2 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="1.5" />
            <path d="m9 22 2-6H9l1-5h4l1 5h-2l2 6" />
            <path d="M6 12h12" />
          </svg>
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 group-hover:max-w-xs group-hover:ml-2">
            Acessibilidade
          </span>
        </button>
      </div>

      {/* 2. Slide Out Accessibility Panel */}
      {isOpen && (
        <div 
          className="fixed inset-y-0 right-0 z-55 w-80 md:w-96 bg-white shadow-2.5xl border-l border-gray-150 p-6 flex flex-col overflow-y-auto animate-fade-in text-left transition-all"
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-menu-title"
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <span className="bg-[#1b4332]/10 text-[#1b4332] p-2 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
              </span>
              <h2 id="accessibility-menu-title" className="font-sans font-extrabold text-lg text-gray-800 tracking-tight">
                Menu de Acessibilidade
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-xl transition"
              aria-label="Fechar menu de acessibilidade"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="text-gray-500 text-xs mt-3 leading-relaxed">
            Personalize a renderização visual e sonora do portal corporativo para obter melhor legibilidade e conformidade inclusiva.
          </p>

          <div className="space-y-6 mt-6 flex-1">
            
            {/* Control: Contrast styling */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Estilo de Contraste</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => toggleContrast('normal')}
                  className={`py-2 px-1 text-center font-semibold rounded-xl text-xs border transition-all ${
                    contrast === 'normal'
                      ? 'bg-[#1b4332] text-white border-[#1b4332]'
                      : 'bg-white text-gray-700 border-gray-150 hover:bg-gray-50'
                  }`}
                  aria-pressed={contrast === 'normal'}
                >
                  Padrão
                </button>
                <button
                  onClick={() => toggleContrast('high-contrast')}
                  className={`py-2 px-1 text-center font-bold rounded-xl text-xs border transition-all ${
                    contrast === 'high-contrast'
                      ? 'bg-yellow-400 text-black border-black border-2'
                      : 'bg-slate-900 text-yellow-400 border-gray-800 hover:bg-slate-800'
                  }`}
                  aria-pressed={contrast === 'high-contrast'}
                  title="Amarelo sobre Fundo Cinza Escuro (Standard Acessibilidade)"
                >
                  Alto Contraste
                </button>
                <button
                  onClick={() => toggleContrast('grayscale')}
                  className={`py-2 px-1 text-center font-semibold rounded-xl text-xs border transition-all ${
                    contrast === 'grayscale'
                      ? 'bg-gray-600 text-white border-gray-600'
                      : 'bg-white text-gray-700 border-gray-150 hover:bg-gray-50'
                  }`}
                  aria-pressed={contrast === 'grayscale'}
                >
                  Monocromático
                </button>
              </div>
            </div>

            {/* Control: Font scale zoom */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Tamanho da Fonte</label>
              <div className="bg-[#f5f7f6] p-2 rounded-xl flex items-center justify-between border border-gray-150">
                <span className="text-xs font-bold text-gray-600">
                  Zoom atual: <strong className="text-emerald-800 font-extrabold">{Math.round(fontScale * 100)}%</strong>
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => adjustFontScale('out')}
                    disabled={fontScale <= 0.85}
                    className="p-1.5 bg-white text-gray-700 rounded-lg hover:bg-gray-150 border border-gray-200 transition disabled:opacity-40"
                    aria-label="Diminuir tamanho da letra"
                    title="Diminuir letra"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => adjustFontScale('reset')}
                    className="p-1.5 bg-white text-gray-700 rounded-lg hover:bg-gray-150 border border-gray-200 transition"
                    aria-label="Restaurar tamanho padrão da letra"
                    title="Resetar"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => adjustFontScale('in')}
                    disabled={fontScale >= 1.3}
                    className="p-1.5 bg-white text-gray-700 rounded-lg hover:bg-gray-150 border border-gray-200 transition disabled:opacity-40"
                    aria-label="Aumentar tamanho da letra"
                    title="Aumentar letra"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Switch: Screen Reader audio TTS */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Leitor de Tela de Voz</span>
                <span className="text-[10px] text-gray-500 block">Sintetiza em áudio os textos ao focar</span>
              </div>
              {renderSwitch(speechSynthesisEnabled, toggleSpeechSynthesis, 'Ativar leitura por síntese de voz')}
            </div>

            {/* Switch: Underline link decorations */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Destacar Links do Portal</span>
                <span className="text-[10px] text-gray-500 block">Sublinha com clareza botões e âncoras</span>
              </div>
              {renderSwitch(underlineLinks, toggleUnderlines, 'Sublinhar links')}
            </div>

            {/* Switch: Dyslexia readable spacing */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Legibilidade Simples</span>
                <span className="text-[10px] text-gray-500 block">Aumenta o espaçamento das letras</span>
              </div>
              {renderSwitch(dyslexiaFont, toggleDyslexia, 'Ativar fonte e espaçamento de fácil leitura')}
            </div>

            {/* Switch: Reading guide focus bar */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Guia Dinâmico de Leitura</span>
                <span className="text-[10px] text-gray-500 block">Régua horizontal de apoio visual</span>
              </div>
              {renderSwitch(readingGuide, toggleReadingGuide, 'Habilitar régua visual de leitura')}
            </div>

            {/* Section: Keyboard shortcut helper */}
            <div className="bg-[#f5f7f6] p-4.5 rounded-2xl border border-gray-150 space-y-3">
              <button
                onClick={() => setShowShortcutsHelp(!showShortcutsHelp)}
                className="w-full flex items-center justify-between text-[#0b3d59] font-bold text-xs uppercase"
                aria-expanded={showShortcutsHelp}
                aria-label="Ver atalhos de teclado para navegação"
              >
                <span className="flex items-center space-x-1.5">
                  <Keyboard className="h-4 w-4 text-[#f28f3b]" />
                  <span>Teclado e Atalhos Rápidos</span>
                </span>
                <span className="text-xs">{showShortcutsHelp ? 'Ocultar' : 'Exibir'}</span>
              </button>

              {showShortcutsHelp && (
                <div className="space-y-2.5 pt-2 border-t border-gray-200 animate-fade-in text-xs max-h-48 overflow-y-auto custom-scrollbar">
                  {shortcuts.map((sc) => (
                    <div key={sc.key} className="flex justify-between items-start gap-1 pb-1.5 border-b border-gray-100 last:border-0">
                      <kbd className="px-1.5 py-0.5 bg-white border border-gray-350 rounded shadow-xs text-[9.5px] font-mono text-gray-800 shrink-0 font-bold">
                        {sc.key}
                      </kbd>
                      <span className="text-gray-600 text-right text-[10.5px]">{sc.desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          <div className="pt-4 border-t border-gray-100 text-center font-mono text-[9px] text-gray-400">
            ESG INCLUSIVO COMPLIANCE PORTAL v1.5
          </div>
        </div>
      )}

      {/* 3. Visual Overlay: Reading Guide Line */}
      {readingGuide && (
        <div 
          className="fixed left-0 right-0 h-4 bg-emerald-500/15 pointer-events-none z-50 border-y border-emerald-500/40 mix-blend-multiply"
          style={{ top: `${mouseY - 8}px` }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
