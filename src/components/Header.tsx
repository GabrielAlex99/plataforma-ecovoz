import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  User,
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Map as MapIcon,
  AlertTriangle,
  Lightbulb,
  LayoutDashboard,
  Database,
  Info,
  HeartCrack,
  Play,
  FileDown,
} from 'lucide-react';
import { PlataformaUser } from '../types';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  showCodeViewer: boolean;
  setShowCodeViewer: (show: boolean) => void;
  currentUser: PlataformaUser | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onStartPitchMode: () => void;
  onExportPitchPdf: () => void;
}

type NavItem = {
  id: string;
  label: string;
  shortLabel: string;
  desc: string;
  icon: React.ElementType;
  highlight?: 'urgent' | 'idea';
};

export default function Header({
  activeSection,
  setActiveSection,
  setShowCodeViewer,
  currentUser,
  onLogout,
  onOpenAuth,
  onStartPitchMode,
  onExportPitchPdf,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Início', shortLabel: 'Início', desc: 'Apresentação visual e justificativa', icon: HomeIcon },
    { id: 'dores', label: 'Impactos no Território', shortLabel: 'Impactos', desc: 'Dados oficiais, casos documentados e impacto humano', icon: HeartCrack },
    { id: 'mapa', label: 'Mapeamento Territorial', shortLabel: 'Mapa', desc: 'Mapa, galeria e relatos demonstrativos', icon: MapIcon },
    { id: 'relatar', label: 'Relatar Ocorrência', shortLabel: 'Relatar', desc: 'Registrar poluição, ruído, água, resíduos ou risco territorial', icon: AlertTriangle, highlight: 'urgent' as const },
    { id: 'propor', label: 'Propor Ação ESG', shortLabel: 'Propor', desc: 'Sugerir soluções plausíveis e sustentáveis', icon: Lightbulb, highlight: 'idea' as const },
    { id: 'dashboard', label: 'Painel ESG (Indicadores)', shortLabel: 'Indicadores', desc: 'Gráficos, evidências e métricas demonstrativas', icon: LayoutDashboard },
    { id: 'banco', label: 'Banco de Soluções', shortLabel: 'Soluções', desc: 'Soluções, valor corporativo e calculadora demonstrativa', icon: Database },
    currentUser ? { id: 'restrito', label: 'Sua Área Interna', shortLabel: 'Área interna', desc: 'Acompanhar propostas e relatos enviados', icon: User } : null,
    { id: 'sobre', label: 'Sobre o EcoVoz', shortLabel: 'Sobre', desc: 'ODS, propósito e contexto do projeto', icon: Info },
  ].filter(Boolean) as NavItem[];

  const activeItem = navItems.find((item) => item.id === activeSection) || navItems[0];
  const ActiveIcon = activeItem.icon;
  const currentIndex = Math.max(0, navItems.findIndex((item) => item.id === activeSection));

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    setDropdownOpen(false);
    setShowCodeViewer(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevSection = () => {
    const prevIndex = (currentIndex - 1 + navItems.length) % navItems.length;
    handleNavClick(navItems[prevIndex].id);
  };

  const handleNextSection = () => {
    const nextIndex = (currentIndex + 1) % navItems.length;
    handleNavClick(navItems[nextIndex].id);
  };

  return (
    <>
      {dropdownOpen && (
        <button
          type="button"
          aria-label="Fechar menu de navegação"
          className="fixed inset-0 z-40 cursor-default bg-black/5"
          onClick={() => setDropdownOpen(false)}
        />
      )}

      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b border-[#245c44]/25 bg-[#1b4332]/95 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'py-2 shadow-lg shadow-emerald-950/12' : 'py-3'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex shrink-0 items-center rounded-xl border border-[#245c44]/45 bg-[#122e22] px-4 py-2 text-left shadow-sm transition hover:bg-[#183d2d]"
              onClick={() => handleNavClick('home')}
              aria-label="Ir para início"
            >
              <span className="leading-tight">
                <span className="block text-lg font-black tracking-tight md:text-xl">
                  <span className="text-white">Eco</span>
                  <span className="text-[#a7cba8]">Voz</span>
                </span>
                <span className="block text-[10px] font-black tracking-wide text-[#A8CBB1] md:text-[11px]">
                  Plataforma Socioambiental
                </span>
              </span>
            </button>

            <nav
              className="hidden min-w-0 flex-1 items-center justify-start gap-2 lg:flex"
              aria-label="Navegação principal"
              id="tour-nav-box"
            >
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className={`rounded-xl px-4 py-2 text-sm font-extrabold transition ${
                  activeSection === 'home'
                    ? 'bg-[#E8F1EA] text-[#123524]'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                Início
              </button>

              <div className="relative ml-2">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex h-8 w-[146px] items-center justify-between gap-1.5 rounded-lg border border-[#DDE8D8] bg-[#F8FAF7] px-2 text-[12px] font-extrabold text-[#123524] shadow-sm transition hover:border-[#F28C28] hover:bg-white"
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                >
                  <span className="flex min-w-0 items-center gap-1.5 truncate">
                    <ActiveIcon className="h-3.5 w-3.5 shrink-0 text-[#2F6B4F]" />
                    <span className="shrink-0 text-[9px] font-black uppercase tracking-wider text-[#2F6B4F]">Canal:</span>
                    <span className="truncate">{activeItem.shortLabel}</span>
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-[#F28C28] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 z-50 mt-2 max-h-[380px] w-[390px] overflow-y-auto rounded-2xl border border-[#DDE8D8] bg-white py-2 shadow-2xl animate-fade-in">
                    <div className="border-b border-[#DDE8D8] px-4 pb-2 pt-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#4B5F55]">Navegação da plataforma</span>
                    </div>
                    {navItems.map((item) => {
                      const IconComp = item.icon;
                      const isCurrent = activeSection === item.id;
                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`flex w-full items-start gap-3 px-4 py-3 text-left transition ${
                            isCurrent
                              ? 'border-l-4 border-[#F28C28] bg-[#E8F1EA] text-[#123524]'
                              : 'text-[#4B5F55] hover:bg-[#F8FAF7] hover:text-[#123524]'
                          }`}
                        >
                          <span className={`mt-0.5 rounded-xl p-2 ${item.highlight === 'urgent' ? 'bg-[#FFF3E0] text-[#C44A1C]' : item.highlight === 'idea' ? 'bg-[#FFF8EF] text-[#F28C28]' : 'bg-[#F4F7F2] text-[#2F6B4F]'}`}>
                            <IconComp className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2 text-sm font-black">
                              <span className="truncate">{item.label}</span>
                              {isCurrent && <Check className="h-4 w-4 shrink-0 text-[#2F6B4F]" />}
                            </span>
                            <span className="mt-0.5 block truncate text-xs font-medium text-[#4B5F55]">{item.desc}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="ml-1 flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevSection}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDE8D8]/35 bg-white/8 text-[#F28C28] transition hover:bg-white/14 active:scale-95"
                  title="Aba anterior"
                  aria-label="Aba anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextSection}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDE8D8]/35 bg-white/8 text-[#F28C28] transition hover:bg-white/14 active:scale-95"
                  title="Próxima aba"
                  aria-label="Próxima aba"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </nav>

            <div className="ml-auto hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={onStartPitchMode}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#A8CBB1]/45 bg-[#E8F1EA] px-3 py-2 text-xs font-black uppercase tracking-wide text-[#123524] transition hover:bg-white"
                title="Iniciar modo apresentação"
              >
                <Play className="h-3.5 w-3.5" />
                Pitch
              </button>
              <button
                type="button"
                onClick={onExportPitchPdf}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#F6C56B]/70 bg-[#FFF8EF] px-3 py-2 text-xs font-black uppercase tracking-wide text-[#C44A1C] transition hover:bg-[#FFF3E0]"
                title="Exportar relatório PDF"
              >
                <FileDown className="h-3.5 w-3.5" />
                PDF
              </button>
              {currentUser ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleNavClick('restrito')}
                    className="rounded-xl px-3 py-2 text-xs font-black uppercase tracking-wide text-emerald-50 transition hover:bg-white/10"
                    title={currentUser.name}
                  >
                    {currentUser.name.split(' ')[0]}
                  </button>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-black uppercase text-white transition hover:bg-rose-700"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="rounded-xl bg-[#F28C28] px-4 py-2 text-xs font-black uppercase text-[#16231C] transition hover:bg-[#de7c2a]"
                >
                  Entrar
                </button>
              )}
            </div>

            <div className="ml-auto flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={handlePrevSection}
                className="rounded-xl bg-white/10 p-2 text-[#F28C28] transition hover:bg-white/15 active:scale-95"
                aria-label="Aba anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNextSection}
                className="rounded-xl bg-white/10 p-2 text-[#F28C28] transition hover:bg-white/15 active:scale-95"
                aria-label="Próxima aba"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              {currentUser ? (
                <button
                  type="button"
                  onClick={() => handleNavClick('restrito')}
                  className="rounded-xl border border-emerald-300/20 bg-emerald-500/10 p-2 text-emerald-100"
                  aria-label="Sua área interna"
                >
                  <User className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="rounded-xl bg-[#F28C28] px-3 py-2 text-xs font-black text-[#16231C]"
                >
                  Entrar
                </button>
              )}
              <button
                type="button"
                id="tour-mobile-menu-trigger"
                onClick={() => setIsOpen((prev) => !prev)}
                className="rounded-xl p-2 text-white/90 transition hover:bg-white/10 hover:text-white"
                aria-expanded={isOpen}
                aria-label="Abrir menu de navegação"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-[#245c44] bg-[#122e22] px-4 pb-6 pt-3 shadow-inner lg:hidden">
            <div className="mb-2 px-3 text-[10px] font-black uppercase tracking-widest text-[#A8CBB1]">Selecione o canal EcoVoz</div>
            <div className="space-y-2">
              {navItems.map((item) => {
                const IconComp = item.icon;
                const isCurrent = activeSection === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
                      isCurrent ? 'bg-white text-[#123524]' : 'text-emerald-50 hover:bg-white/10'
                    }`}
                  >
                    <IconComp className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                <button type="button" onClick={() => { onStartPitchMode(); setIsOpen(false); }} className="rounded-xl bg-white px-3 py-2 text-xs font-black uppercase text-[#123524]">Modo pitch</button>
                <button type="button" onClick={() => { onExportPitchPdf(); setIsOpen(false); }} className="rounded-xl bg-[#FFF8EF] px-3 py-2 text-xs font-black uppercase text-[#C44A1C]">Exportar PDF</button>
              </div>
              <div className="border-t border-white/10 pt-3">
                {currentUser ? (
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="max-w-[220px] truncate text-xs font-bold text-emerald-50">Conta: {currentUser.name}</span>
                    <button type="button" onClick={() => { onLogout(); setIsOpen(false); }} className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-black uppercase text-white">
                      Sair
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => { onOpenAuth(); setIsOpen(false); }} className="w-full rounded-xl bg-[#F28C28] px-4 py-3 text-sm font-black uppercase text-[#16231C]">
                    Entrar / Criar Conta
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
