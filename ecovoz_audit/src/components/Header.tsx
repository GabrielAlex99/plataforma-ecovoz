import React, { useState, useEffect } from 'react';
import { 
  Menu, X, User, ChevronDown, Check,
  ChevronLeft, ChevronRight,
  Home as HomeIcon, Map as MapIcon, AlertTriangle, Lightbulb, 
  LayoutDashboard, Database, Info, Heart
} from 'lucide-react';
import { PlataformaUser } from '../types';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  currentUser: PlataformaUser | null;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export default function Header({ 
  activeSection, 
  setActiveSection, 
  currentUser,
  onLogout,
  onOpenAuth,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [scrolled, setScrolled] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Desktop dropdown menu toggle

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Initial check for onboarding tour
    if (typeof document !== 'undefined') {
      setIsTourActive(document.body.classList.contains('tour-active'));
    }

    // Mutation observer to detect style adjustments
    const observer = new MutationObserver(() => {
      setIsTourActive(document.body.classList.contains('tour-active'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { id: 'home', label: 'Início', desc: 'Apresentação visual e justificativa', icon: HomeIcon },
    { id: 'dores', label: 'Impactos no Território 💔', desc: 'Relatos e depoimentos reais de moradores', icon: Heart },
    { id: 'mapa', label: 'Mapeamento Territorial', desc: 'Mapa térmico de ocorrências e conflitos', icon: MapIcon },
    { id: 'relatar', label: 'Relatar Ocorrência 🚨', desc: 'Denuncie poluição, poeira ou barulho no seu CEP', icon: AlertTriangle, highlight: 'urgent' },
    { id: 'propor', label: 'Propor Ação ESG 💡', desc: 'Sugira soluções plausíveis e sustentáveis', icon: Lightbulb, highlight: 'idea' },
    { id: 'dashboard', label: 'Painel ESG (Indicadores)', desc: 'Métricas, relatórios e exportação para PDF/PNG', icon: LayoutDashboard },
    { id: 'banco', label: 'Banco de Soluções Reais', desc: 'Ações de engenharia plausíveis aplicadas', icon: Database },
    currentUser ? { id: 'restrito', label: 'Sua Área Interna 👤', desc: 'Acompanhe as propostas enviadas de perto', icon: User } : null,
    { id: 'sobre', label: 'Sobre o EcoVoz', desc: 'A crise do racismo ambiental descrita com dados', icon: Info },
  ].filter(Boolean) as { id: string; label: string; desc: string; icon: any; highlight?: string }[];

  const activeItem = navItems.find(item => item.id === activeSection) || navItems[0];

  const currentIndex = Math.max(0, navItems.findIndex(item => item.id === activeSection));

  const handlePrevSection = () => {
    const prevIndex = (currentIndex - 1 + navItems.length) % navItems.length;
    handleNavClick(navItems[prevIndex].id);
  };

  const handleNextSection = () => {
    const nextIndex = (currentIndex + 1) % navItems.length;
    handleNavClick(navItems[nextIndex].id);
  };

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    setDropdownOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const isHeaderCompact = scrolled;

  return (
    <>
      {/* Click outside backdrop for desktop dropdown */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/10 cursor-default" 
          onClick={() => setDropdownOpen(false)} 
        />
      )}

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 bg-[#1b4332]/95 backdrop-blur-md border-b border-[#245c44]/45 ${
        isHeaderCompact 
          ? 'py-2 shadow-lg shadow-emerald-950/20' 
          : 'py-3.5 md:py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo & Platform Name (EcoVoz with elegant background and custom colors) */}
            <div 
              className="flex items-center px-4 py-1.5 bg-[#122e22] border border-[#245c44]/55 rounded-xl shadow-inner hover:bg-[#183d2d] transition-all duration-200 cursor-pointer select-none" 
              onClick={() => handleNavClick('home')}
            >
              <div className="text-left leading-tight">
                <span className="font-sans font-black text-lg md:text-xl tracking-tight block">
                  <span className="text-white">Eco</span>
                  <span className="text-[#a7cba8]">Voz</span>
                </span>
                <span className="font-sans text-[9px] md:text-[10px] text-[#A8CBB1] font-black tracking-wide">
                  Plataforma Socioambiental
                </span>
              </div>
            </div>

            {/* Desktop Navigation: fixed-width, calmer and aligned to the left of the action area */}
            <div className="hidden lg:flex flex-1 items-center justify-start gap-3 ml-4" id="tour-nav-box">
              
              {/* Home Quick Button */}
              <button type="button"
                onClick={() => handleNavClick('home')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                  activeSection === 'home'
                    ? 'bg-[#F4F7F2] text-[#123524] shadow-sm'
                    : 'text-emerald-50 hover:text-white hover:bg-white/10'
                }`}
              >
                Início
              </button>

              {/* Connected selector with backward and forward arrows */}
              <div className="flex items-center gap-1.5 rounded-2xl border border-white/15 bg-white/5 p-1 shadow-inner">
                <button
                  type="button"
                  onClick={handlePrevSection}
                  className="p-2 text-[#f28f3b] hover:bg-[#F4F7F2] hover:text-[#123524] rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center active:scale-90"
                  title="Aba anterior (Voltar)"
                  aria-label="Aba anterior"
                >
                  <ChevronLeft className="h-4.5 w-4.5" />
                </button>

                {/* The "Menu de Escolha" Dropdown Toggle (Opens and Closes only on Click) */}
                <div className="relative animate-fade-in">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={dropdownOpen}
                    aria-controls="ecovoz-navigation-menu"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`w-[330px] px-4 py-2 rounded-xl text-xs font-bold transition-all duration-250 flex items-center justify-between gap-2 shadow-sm cursor-pointer select-none border bg-[#F4F7F2] hover:bg-white border-[#f28f3b] text-[#123524] ${
                      activeSection !== 'home' ? 'ring-1 ring-[#f28f3b]/35' : ''
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="text-[#2F6B4F] text-[10px] uppercase font-black tracking-wider shrink-0">Canal:</span>
                      <span className="text-[#123524] font-extrabold truncate" title={activeItem.label}>{activeItem.label}</span>
                    </span>
                    <ChevronDown className={`h-3.5 w-3.5 text-[#f28f3b] shrink-0 transition-transform duration-350 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                  </button>

                  {/* Dropdown Floating Panel with Scrollable bounds */}
                  {dropdownOpen && (
                    <div id="ecovoz-navigation-menu" role="menu" className="absolute right-0 mt-2 w-96 bg-white border border-[#DDE8D8] rounded-2xl shadow-xl z-50 max-h-[360px] overflow-y-auto transform origin-top-right transition-all duration-250 py-2 animate-fade-in">
                      <div className="px-4 py-1.5 border-b border-[#DDE8D8] mb-1">
                        <span className="text-[10px] font-bold text-[#4B5F55] uppercase tracking-widest">Navegação da Plataforma</span>
                      </div>
                      {navItems.map((item) => {
                        const IconComp = item.icon;
                        const isCurrent = activeSection === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            role="menuitem"
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full text-left px-4 py-2.5 flex items-start space-x-3 transition-all duration-150 cursor-pointer ${
                              isCurrent
                                ? 'bg-emerald-500/10 text-[#1b4332]  font-bold border-l-4 border-[#f28f3b]'
                                : 'hover:bg-[#F4F7F2] text-[#4B5F55]'
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                              item.highlight === 'urgent'
                                ? 'bg-rose-50 text-rose-600'
                                : item.highlight === 'idea'
                                ? 'bg-amber-50 text-[#f28f3b]'
                                : 'bg-[#F4F7F2] text-[#4B5F55]'
                            }`}>
                              <IconComp className="h-4 w-4" />
                            </div>
                            <div className="space-y-0.5 text-left truncate">
                              <div className="flex items-center space-x-1.5">
                                <span className={`text-[12px] font-bold ${isCurrent ? 'text-[#123524]' : ''}`}>{item.label}</span>
                                {isCurrent && <Check className="h-3 w-3 text-emerald-600 shrink-0" />}
                              </div>
                              <p className="text-[10px] text-[#4B5F55] leading-tight font-medium truncate max-w-xs">{item.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNextSection}
                  className="p-2 text-[#f28f3b] hover:bg-[#F4F7F2] hover:text-[#123524] rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center active:scale-90"
                  title="Próxima aba (Avançar)"
                  aria-label="Próxima aba"
                >
                  <ChevronRight className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* System controls */}
              <div className="flex items-center space-x-2 shrink-0">
                {/* Desktop Auth Section */}
                {currentUser ? (
                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-tight truncate max-w-[65px]" title={currentUser.name}>
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <button
                      type="button"
                      onClick={onLogout}
                      className="px-2.5 py-1.5 bg-rose-600/90 hover:bg-rose-700 text-white rounded-lg text-[9px] font-extrabold uppercase transition-all cursor-pointer flex items-center justify-center"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenAuth}
                    className="px-3 py-2 bg-[#f28f3b] hover:bg-[#de7c2a] text-white font-bold rounded-lg text-[10px] uppercase transition-all shadow-sm cursor-pointer flex items-center justify-center"
                  >
                    Entrar
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 lg:hidden">
              {/* Back and Forward Arrow Buttons on mobile header directly */}
              <button
                type="button"
                onClick={handlePrevSection}
                className="p-2 rounded-lg bg-white/5 text-[#f28f3b] hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center cursor-pointer"
                title="Aba anterior"
                aria-label="Aba anterior"
              >
                <ChevronLeft className="h-4 w-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={handleNextSection}
                className="p-2 rounded-lg bg-white/5 text-[#f28f3b] hover:bg-white/10 active:scale-90 transition-all flex items-center justify-center cursor-pointer"
                title="Próxima aba"
                aria-label="Próxima aba"
              >
                <ChevronRight className="h-4 w-4 shrink-0" />
              </button>
              {/* Mobile Auth Button */}
              {currentUser ? (
                <button
                  type="button"
                  onClick={() => handleNavClick('restrito')}
                  className="p-2 rounded-lg bg-emerald-500/10 text-emerald-200 border border-emerald-500/20"
                  title="Sua Área"
                >
                  <User className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="px-2.5 py-1.5 bg-[#f28f3b] text-white font-bold rounded-lg text-[11px] cursor-pointer"
                >
                  Entrar
                </button>
              )}

              {/* Menu trigger */}
              <button
                type="button"
                id="tour-mobile-menu-trigger"
                aria-expanded={isOpen}
                aria-controls="ecovoz-mobile-navigation"
                aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/5 focus:outline-none transition-all duration-200 cursor-pointer"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div id="ecovoz-mobile-navigation" className="lg:hidden bg-[#122e22] border-b border-[#245c44] px-4 pt-2.5 pb-6 space-y-2 shadow-inner transition-transform duration-300">
            <div className="flex flex-col space-y-1.5">
              <div className="px-3 pb-2 pt-1">
                <span className="text-[10px] font-bold text-emerald-300/60 uppercase tracking-widest text-left block">Selecione o Canal EcoVoz</span>
              </div>
              {navItems.map((item) => {
                const IconComp = item.icon;
                const isCurrent = activeSection === item.id;
                let itemClass = "";
                if (item.highlight === 'urgent') {
                  itemClass = isCurrent
                    ? 'bg-rose-600 text-white font-bold'
                    : 'bg-rose-600/15 text-rose-200 border border-rose-500/20';
                } else if (item.highlight === 'idea') {
                  itemClass = isCurrent
                    ? 'bg-[#f28f3b] text-slate-950 font-bold'
                    : 'bg-[#f28f3b]/15 text-orange-200 border border-[#f28f3b]/25';
                } else {
                  itemClass = isCurrent
                    ? 'bg-white/10 text-[#f28f3b] border-l-4 border-[#f28f3b] font-bold'
                    : 'text-gray-200 hover:text-white hover:bg-white/5';
                }
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors flex items-center space-x-2.5 cursor-pointer ${itemClass}`}
                  >
                    {IconComp && <IconComp className="h-4 w-4 shrink-0 opacity-90" />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              <hr className="border-[#245c44]/60 my-2" />
              
              {/* Mobile Auth options in drawer */}
              {currentUser ? (
                <div className="py-2 px-3 flex items-center justify-between bg-white/5 rounded-xl border border-white/5 text-left">
                  <span className="text-[11px] text-emerald-100 font-bold truncate max-w-xs">Conta: {currentUser.name}</span>
                  <button
                    type="button"
                    onClick={() => { onLogout(); setIsOpen(false); }}
                    className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[10px] uppercase cursor-pointer"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => { onOpenAuth(); setIsOpen(false); }}
                  className="w-full text-center py-2 px-4 bg-[#f28f3b] text-white font-bold rounded-lg text-xs tracking-wider uppercase cursor-pointer"
                >
                  Entrar / Criar Conta
                </button>
              )}

            </div>
          </div>
        )}
      </header>
    </>
  );
}
