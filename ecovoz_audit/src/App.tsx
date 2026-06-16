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
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AccessibilityMenu from './components/AccessibilityMenu';
import { ArrowUp } from 'lucide-react';

import { Relato, Proposta, SolucaoPadrao, PlataformaUser } from './types';
import { initialRelatos, initialPropostas, solucoesPadrao } from './data/initialData';

export default function App() {
  // relatos & propostas core arrays
  const [relatos, setRelatos] = useState<Relato[]>(initialRelatos);
  const [propostas, setPropostas] = useState<Proposta[]>(initialPropostas);
  const [activeSection, setActiveSection] = useState('home');

  // Accessibility States
  const [contrastMode, setContrastMode] = useState<'normal' | 'high-contrast' | 'grayscale'>('normal');
  const [fontSizeScale, setFontSizeScale] = useState(1.0);
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);
  const [speechSynthesisEnabled, setSpeechSynthesisEnabled] = useState(false);

  // Back to Top State
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    // Simulated notification trigger for proposal submission
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
    contrastMode === 'high-contrast' ? "high-contrast-root bg-slate-950 text-yellow-300" : "bg-[#fafcfa] text-[#2d3436]",
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
          .high-contrast-root .app-shell,
          .high-contrast-root .app-shell * {
            background-color: #0c0f0d !important;
            color: #ffff00 !important;
            border-color: #ffff00 !important;
            box-shadow: none !important;
            text-shadow: none !important;
          }
          .high-contrast-root .app-shell a,
          .high-contrast-root .app-shell a *,
          .high-contrast-root .app-shell button,
          .high-contrast-root .app-shell button * {
            background-color: #000000 !important;
            color: #00ffff !important;
            border: 2px solid #ffff00 !important;
            text-decoration: underline !important;
          }
          .high-contrast-root .app-shell input,
          .high-contrast-root .app-shell select,
          .high-contrast-root .app-shell textarea {
            background-color: #000000 !important;
            color: #ffffff !important;
            border: 2px solid #ffff00 !important;
          }
          .high-contrast-root .app-shell select option {
            background-color: #0c0f0d !important;
            color: #ffff00 !important;
          }
          .high-contrast-root .app-shell svg,
          .high-contrast-root .app-shell svg * {
            stroke: #ffff00 !important;
            fill: none !important;
          }
        ` : ''}
        ${contrastMode === 'grayscale' ? `
          .grayscale-root .app-shell {
            filter: grayscale(100%) !important;
          }
          .grayscale-root #accessibility-panel,
          .grayscale-root #btn-accessibility-trigger {
            filter: none !important;
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
      
      <div className="app-shell">
      {/* Dynamic Header */}
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Structural Page Flow - Separate Standalone Views instead of Infinite Scrolling Stack */}
      <main className={`relative min-h-[65vh] ${activeSection !== 'home' ? 'pt-16 lg:pt-20' : ''}`}>
        
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
      <Footer />

      {/* Onboarding Interactive walkthrough Tour */}
      <OnboardingTour activeSection={activeSection} onNavigate={setActiveSection} />
      </div>

      {/* Accessibility Helper floating options menu */}
      <AccessibilityMenu 
        onContrastChange={setContrastMode}
        onFontSizeChange={setFontSizeScale}
        onUnderlineLinksChange={setUnderlineLinks}
        onDyslexiaFontChange={setDyslexiaFont}
        onReadingGuideChange={setReadingGuide}
        onSpeechSynthesisChange={setSpeechSynthesisEnabled}
        onNavigate={setActiveSection}
      />

      {/* Authentication Popup Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed right-6 bottom-6 z-55 p-3.5 bg-[#f28f3b] hover:bg-[#de7c2a] text-slate-950 hover:text-white rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-white/20 active:scale-95 cursor-pointer"
          aria-label="Voltar para o topo"
          title="Voltar para o topo"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}


    </div>
  );
}
