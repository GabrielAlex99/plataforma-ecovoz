import React, { useState } from 'react';
import { PlataformaUser, Relato, Proposta, Category } from '../types';
import { jsPDF } from 'jspdf';
import { 
  FileText, 
  Lightbulb, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  Calendar, 
  Activity, 
  Users, 
  Settings, 
  Lock, 
  DollarSign, 
  Clock, 
  Award, 
  TrendingUp, 
  Zap,
  Info,
  User,
  Download
} from 'lucide-react';

interface MyRestrictedAreaProps {
  currentUser: PlataformaUser | null;
  relatos: Relato[];
  propostas: Proposta[];
  onUpdateRelato: (updated: Relato) => void;
  onDeleteRelato: (id: string) => void;
  onUpdateProposta: (updated: Proposta) => void;
  onDeleteProposta: (id: string) => void;
}

export default function MyRestrictedArea({
  currentUser,
  relatos,
  propostas,
  onUpdateRelato,
  onDeleteRelato,
  onUpdateProposta,
  onDeleteProposta
}: MyRestrictedAreaProps) {
  const [activeTab, setActiveTab] = useState<'relatos' | 'propostas'>('relatos');
  
  // Edit state for Relato
  const [editingRelato, setEditingRelato] = useState<Relato | null>(null);
  const [editedRelatoProblem, setEditedRelatoProblem] = useState('');
  const [editedRelatoDesc, setEditedRelatoDesc] = useState('');
  const [editedRelatoGravity, setEditedRelatoGravity] = useState<'Baixa' | 'Média' | 'Alta' | 'Crítica'>('Baixa');
  const [editedRelatoCategory, setEditedRelatoCategory] = useState<Category>('Ar');
  const [editedRelatoFrequencia, setEditedRelatoFrequencia] = useState('');
  const [editedRelatoBairro, setEditedRelatoBairro] = useState('');

  // Edit state for Proposta
  const [editingProposta, setEditingProposta] = useState<Proposta | null>(null);
  const [editedPropostaTitle, setEditedPropostaTitle] = useState('');
  const [editedPropostaDesc, setEditedPropostaDesc] = useState('');
  const [editedPropostaCost, setEditedPropostaCost] = useState<'Baixo' | 'Médio' | 'Alto'>('Baixo');
  const [editedPropostaPrazo, setEditedPropostaPrazo] = useState('');
  const [editedPropostaImpact, setEditedPropostaImpact] = useState('');
  const [editedPropostaViabilidade, setEditedPropostaViabilidade] = useState<'Baixa' | 'Média' | 'Alta'>('Alta');
  const [editedPropostaProblemRel, setEditedPropostaProblemRel] = useState('');
  const [editedPropostaStatus, setEditedPropostaStatus] = useState<'Em Discussão' | 'Em Andamento' | 'Implementado'>('Em Discussão');

  // Delete Confirmation State
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: 'relatos' | 'propostas' } | null>(null);

  if (!currentUser) {
    return (
      <section id="restrito" className="py-20 bg-[#f5f7f6] border-t border-[#e9ecef]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white border border-[#e9ecef] rounded-3xl p-12 shadow-md space-y-4 max-w-xl mx-auto">
            <div className="w-16 h-16 bg-amber-500/10 text-[#f28f3b] rounded-full flex items-center justify-center mx-auto">
              <Lock className="h-8 w-8" />
            </div>
            <h3 className="font-sans font-bold text-2xl text-[#1b4332]">Área Restrita do Usuário</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Esta seção contém o gerenciamento dos seus relatos e propostas submetidas. Para visualizar e interagir com seus envios pessoais, faça o login na plataforma utilizando o botão no topo da página.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Filter items owned by the current logged-in user
  const userRelatos = relatos.filter(r => r.userEmail === currentUser.email);
  const userPropostas = propostas.filter(p => p.userEmail === currentUser.email);

  const handleExportUserRelatosPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryGreen = [27, 67, 50]; // #1b4332
    const bgLight = [245, 247, 246]; // #f5f7f6
    const borderGray = [230, 235, 230];

    // Banner Top
    doc.setFillColor(27, 67, 50);
    doc.rect(0, 0, 210, 36, 'F');

    // Branding text
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('CANAIS DE OUVIDORIA & TRANSPARÊNCIA ESG', 15, 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(190, 215, 200);
    doc.text('Dossiê Individual de Ocorrências e Relatos de Impacto', 15, 20);
    doc.text(`Compilação gerada em: ${new Date().toLocaleString('pt-BR')}`, 15, 25);

    // Profile Details
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(242, 143, 59); // Orange accent
    doc.text(`Usuário Relatante: ${currentUser.name} (${currentUser.email})`, 15, 31);

    // Document title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(27, 67, 50);
    doc.text('Resumo de Relatos Submetidos', 15, 48);

    doc.setDrawColor(27, 67, 50);
    doc.setLineWidth(0.75);
    doc.line(15, 51, 195, 51);

    // Stats indicator Box
    doc.setFillColor(245, 247, 246);
    doc.rect(15, 56, 180, 15, 'F');
    doc.setDrawColor(220, 225, 220);
    doc.setLineWidth(0.2);
    doc.rect(15, 56, 180, 15, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 105, 100);
    doc.text('ESTATÍSTICA DO SEU PERFIL:', 20, 65);
    doc.setTextColor(27, 67, 50);
    doc.setFontSize(10);
    doc.text(`${userRelatos.length} relatos registrados no sistema`, 78, 65);

    let currentY = 82;

    userRelatos.forEach((r, idx) => {
      // Check if we need a new page
      if (currentY > 240) {
        doc.addPage();
        currentY = 20;
      }

      // Card header box
      doc.setFillColor(249, 250, 249);
      doc.rect(15, currentY, 180, 7, 'F');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(27, 67, 50);
      doc.text(`Relato #${idx + 1} - Categoria: ${r.categoria}`, 18, currentY + 5);

      // Gravity badge
      if (r.gravidade === 'Crítica') {
        doc.setTextColor(220, 53, 69);
      } else if (r.gravidade === 'Alta') {
        doc.setTextColor(242, 143, 59);
      } else {
        doc.setTextColor(27, 67, 50);
      }
      doc.text(`Gravidade: ${r.gravidade}`, 115, currentY + 5);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(130, 135, 130);
      doc.text(`Data: ${r.data}`, 160, currentY + 5);

      currentY += 12;

      // Problem title line
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(27, 67, 50);
      doc.text(r.problema, 15, currentY);

      currentY += 5;

      // Location & Frequency metadata
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(110, 115, 110);
      doc.text(`Região/Bairro: ${r.bairro}  |  Vulnerabilidade Social: ${r.vulnerabilidade}  |  Frequência: ${r.frequência || 'N/A'}`, 15, currentY);

      currentY += 6;

      // Description wrap
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(50, 55, 50);
      const splitDesc = doc.splitTextToSize(r.descricao, 178);
      
      // Calculate how much space description needs
      const descHeight = splitDesc.length * 4.5;
      
      // Check again if description fits, otherwise shift to next page
      if (currentY + descHeight > 270) {
        doc.addPage();
        currentY = 20;
        doc.text(splitDesc, 15, currentY);
        currentY += descHeight + 6;
      } else {
        doc.text(splitDesc, 15, currentY);
        currentY += descHeight + 6;
      }

      // Draw thin grey divider between relatos
      doc.setDrawColor(235, 240, 235);
      doc.setLineWidth(0.2);
      doc.line(15, currentY, 195, currentY);

      currentY += 10;
    });

    // Multi-page friendly Footer signature (draw on the last page)
    if (currentY > 260) {
      doc.addPage();
      currentY = 20;
    }
    
    currentY = Math.max(currentY, 255);
    doc.setDrawColor(27, 67, 50);
    doc.setLineWidth(0.3);
    doc.line(15, currentY, 195, currentY);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(130, 140, 135);
    doc.text('Plataforma ESG de Transparência Social. Esta cópia impressa documenta sua queixa formal sob o canal ético de conformidade.', 15, currentY + 5);
    doc.text('O andamento das ações mitigadoras associadas a cada relato pode ser acompanhado no Painel Geral da plataforma.', 15, currentY + 9);

    doc.save(`meus-relatos-esg-${currentUser.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  };

  // Edit Handlers
  const handleStartEditRelato = (r: Relato) => {
    setEditingRelato(r);
    setEditedRelatoProblem(r.problema);
    setEditedRelatoDesc(r.descricao);
    setEditedRelatoGravity(r.gravidade);
    setEditedRelatoCategory(r.categoria);
    setEditedRelatoFrequencia(r.frequência || 'Diária');
    setEditedRelatoBairro(r.bairro);
  };

  const handleSaveRelatoEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRelato) return;

    const updated: Relato = {
      ...editingRelato,
      problema: editedRelatoProblem,
      descricao: editedRelatoDesc,
      gravidade: editedRelatoGravity,
      categoria: editedRelatoCategory,
      frequência: editedRelatoFrequencia,
      bairro: editedRelatoBairro,
    };

    onUpdateRelato(updated);
    setEditingRelato(null);
  };

  const handleStartEditProposta = (p: Proposta) => {
    setEditingProposta(p);
    setEditedPropostaTitle(p.titulo);
    setEditedPropostaDesc(p.descricao);
    setEditedPropostaCost(p.custo);
    setEditedPropostaPrazo(p.prazo);
    setEditedPropostaImpact(p.impacto);
    setEditedPropostaViabilidade(p.viabilidade);
    setEditedPropostaProblemRel(p.problemaRelacionado);
    setEditedPropostaStatus(p.status || 'Em Discussão');
  };

  const handleSavePropostaEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProposta) return;

    const updated: Proposta = {
      ...editingProposta,
      titulo: editedPropostaTitle,
      descricao: editedPropostaDesc,
      custo: editedPropostaCost,
      prazo: editedPropostaPrazo,
      impacto: editedPropostaImpact,
      viabilidade: editedPropostaViabilidade,
      problemaRelacionado: editedPropostaProblemRel,
      status: editedPropostaStatus,
    };

    onUpdateProposta(updated);
    setEditingProposta(null);
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    if (itemToDelete.type === 'relatos') {
      onDeleteRelato(itemToDelete.id);
    } else {
      onDeleteProposta(itemToDelete.id);
    }
    setItemToDelete(null);
  };

  const bairrosSugeridos = [
    'Jesuítas (Santa Cruz - RJ)',
    'Vila Parisi (Cubatão - SP)',
    'Santa Cruz dos Navegantes (Guarujá - SP)',
    'Bairro Veneza (Ipatinga - MG)',
    'Zona Residencial (Candiota - RS)'
  ];

  const categoriesChoices: Category[] = ['Ar', 'Água', 'Ruído', 'Resíduos', 'Mobilidade', 'Verde urbano'];

  return (
    <section id="restrito" className="py-20 bg-[#f5f7f6] border-t border-[#e9ecef] scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Profile Info Title */}
        <div className="bg-white border border-[#e9ecef] rounded-3xl p-6 md:p-8 shadow-sm mb-10 text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="bg-[#1b4332] text-white p-5 rounded-full shadow-md">
              <User className="h-8 w-8" />
            </div>
            <div>
              <span className="text-[#f28f3b] text-xs font-bold uppercase tracking-wider block">Área Restrita e Exclusiva</span>
              <h2 className="font-sans font-bold text-2xl text-[#1b4332] tracking-tight md:text-3.5xl pt-0.5">
                Olá, {currentUser.name}!
              </h2>
              <p className="text-xs text-gray-500 mt-1 pb-1">
                Acesso unificado corporativo: <strong className="text-gray-700 font-semibold">{currentUser.email}</strong>
              </p>
            </div>
          </div>

          {/* Quick Statistic Indicators */}
          <div className="flex space-x-4">
            <div className="bg-[#f5f7f6] border border-[#e9ecef] px-5 py-3.5 rounded-2xl shadow-sm text-center">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wide block">Seus Relatos</span>
              <span className="text-2xl font-extrabold text-[#1b4332] mt-1 block">{userRelatos.length}</span>
            </div>
            <div className="bg-[#f5f7f6] border border-[#e9ecef] px-5 py-3.5 rounded-2xl shadow-sm text-center">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wide block">Suas Propostas</span>
              <span className="text-2xl font-extrabold text-[#1b4332] mt-1 block">{userPropostas.length}</span>
            </div>
          </div>
        </div>

        {/* Action Tabs for toggling list views and export controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 mb-8 gap-4">
          <div className="flex space-x-6 w-full md:max-w-md">
            <button
              onClick={() => setActiveTab('relatos')}
              className={`flex-1 pb-3 text-sm font-bold flex items-center justify-center space-x-2 border-b-2 transition-all ${
                activeTab === 'relatos'
                  ? 'border-[#1b4332] text-[#1b4332]'
                  : 'border-transparent text-gray-400 hover:text-gray-705'
              }`}
            >
              <FileText className="h-4.5 w-4.5" />
              <span>Gerenciar Relatos ({userRelatos.length})</span>
            </button>
            
            <button
              onClick={() => setActiveTab('propostas')}
              className={`flex-1 pb-3 text-sm font-bold flex items-center justify-center space-x-2 border-b-2 transition-all ${
                activeTab === 'propostas'
                  ? 'border-[#1b4332] text-[#1b4332]'
                  : 'border-transparent text-gray-400 hover:text-gray-705'
              }`}
            >
              <Lightbulb className="h-4.5 w-4.5" />
              <span>Gerenciar Propostas ({userPropostas.length})</span>
            </button>
          </div>

          {activeTab === 'relatos' && userRelatos.length > 0 && (
            <button
              onClick={handleExportUserRelatosPDF}
              className="bg-[#1b4332] hover:bg-[#133024] cursor-pointer text-white px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 self-start md:self-auto mb-2 md:mb-0 transition-all shadow-sm"
              id="btn-export-user-relatos-pdf"
            >
              <Download className="h-4 w-4" />
              <span>Exportar Seus Relatos (PDF)</span>
            </button>
          )}
        </div>

        {/* Tab contents list layout */}
        {activeTab === 'relatos' ? (
          /* User Relatos List */
          <div className="space-y-4 text-left">
            {userRelatos.length > 0 ? (
              userRelatos.map((r) => (
                <div key={r.id} className="bg-white border border-[#e9ecef] rounded-3xl p-6 shadow-sm relative hover:border-[#1b4332]/25 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-full md:max-w-[70%]">
                    
                    {/* Header tags */}
                    <div className="flex items-center space-x-2.5">
                      <span className="text-[10px] font-bold text-[#1b4332] tracking-wider bg-[#1b4332]/10 border border-[#1b4332]/20 px-2 py-0.5 rounded-md uppercase">
                        {r.categoria}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        r.gravidade === 'Crítica' ? 'bg-rose-50 text-rose-600 border-rose-220' :
                        r.gravidade === 'Alta' ? 'bg-[#f28f3b]/10 text-[#f28f3b] border-[#f28f3b]/25' :
                        r.gravidade === 'Média' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                        'bg-emerald-50 text-[#1b4332] border-[#1b4332]/25'
                      }`}>
                        Gravidade {r.gravidade}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> {r.data}
                      </span>
                    </div>

                    {/* Problem detailed headings */}
                    <div>
                      <h4 className="font-sans font-bold text-lg text-[#1b4332]">{r.problema}</h4>
                      <p className="text-xs text-gray-500 font-medium">Bairro ou Região: <strong className="text-gray-700">{r.bairro}</strong> • Frequência: {r.frequência || 'Constante'}</p>
                    </div>

                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{r.descricao}</p>

                  </div>

                  {/* Operational Management controls (Edit & Delete) */}
                  <div className="flex md:flex-col items-center justify-end gap-2 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <button
                      onClick={() => handleStartEditRelato(r)}
                      className="px-4 py-2 bg-gray-50 hover:bg-[#1b4332]/10 text-gray-700 hover:text-[#1b4332] rounded-xl text-xs font-bold border border-gray-200 hover:border-[#1b4332]/20 flex items-center space-x-1.5 transition-all shadow-sm"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      <span>Editar</span>
                    </button>

                    <button
                      onClick={() => setItemToDelete({ id: r.id, type: 'relatos' })}
                      className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold border border-rose-200 flex items-center space-x-1.5 transition-all shadow-sm"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Excluir</span>
                    </button>
                  </div>

                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center text-gray-500 border border-dashed border-[#e9ecef] max-w-xl mx-auto my-6 space-y-3">
                <FileText className="h-10 w-10 text-[#1b4332] mx-auto opacity-40" />
                <p className="font-bold text-gray-800">Você ainda não enviou nenhum relato territorial</p>
                <p className="text-xs text-gray-500">Qualquer queixa ou desconforto ambiental do seu bairro pode ser submetido de modo seguro na seção 'Relatar Problema'.</p>
              </div>
            )}
          </div>
        ) : (
          /* User Propostas List */
          <div className="space-y-4 text-left">
            {userPropostas.length > 0 ? (
              userPropostas.map((p) => (
                <div key={p.id} className="bg-white border border-[#e9ecef] rounded-3xl p-6 shadow-sm relative hover:border-[#1b4332]/25 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-full md:max-w-[70%]">
                    
                    {/* Header Tags */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold text-teal-850 tracking-wider bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md uppercase">
                        {p.categoria}
                      </span>
                      <span className="text-[10px] font-bold bg-[#1b4332]/10 text-[#1b4332] border border-[#1b4332]/20 px-2 py-0.5 rounded-md uppercase flex items-center">
                        Viabilidade {p.viabilidade}
                      </span>
                      <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md uppercase flex items-center">
                        Custo {p.custo}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase flex items-center ${
                        p.status === 'Implementado' ? 'bg-emerald-50 text-emerald-800 border-emerald-250 font-bold' :
                        p.status === 'Em Andamento' ? 'bg-indigo-50 text-indigo-850 border-indigo-250 font-bold' :
                        'bg-amber-50 text-amber-800 border-amber-250 font-bold'
                      }`}>
                        Urgência/Status: {p.status || 'Em Discussão'}
                      </span>
                    </div>

                    {/* Proposal problem detail headings */}
                    <div>
                      <h4 className="font-sans font-bold text-lg text-[#1b4332] uppercase tracking-tight">{p.titulo}</h4>
                      <p className="text-xs text-[#0b3d59] font-bold mt-0.5 leading-tight">Problema Alvo: {p.problemaRelacionado}</p>
                    </div>

                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{p.descricao}</p>

                    {/* Impact subcard */}
                    <div className="bg-[#f5f7f6] p-3 rounded-xl border border-gray-200 text-xs text-left">
                      <strong className="text-[#1b4332] block mb-0.5">Impacto Mitigatório Estimado:</strong>
                      <span className="text-gray-600 font-normal">{p.impacto}</span>
                    </div>

                    {/* Progress tracking quick updating bar */}
                    <div className="flex items-center space-x-2.5 bg-gray-50 border border-gray-200 rounded-xl p-2.5 max-w-xs cursor-pointer shadow-sm mt-1 text-left">
                      <span className="text-[10px] font-bold text-gray-500 uppercase ml-1">Acompanhamento:</span>
                      <select
                        value={p.status || 'Em Discussão'}
                        onChange={(e) => {
                          const nextStatus = e.target.value as 'Em Discussão' | 'Em Andamento' | 'Implementado';
                          onUpdateProposta({ ...p, status: nextStatus });
                        }}
                        className="bg-white border border-gray-250 rounded-lg text-xs font-semibold text-[#1b4332] px-2 py-1 outline-hidden focus:border-[#1b4332] cursor-pointer"
                      >
                        <option value="Em Discussão">Em Discussão</option>
                        <option value="Em Andamento">Em Andamento</option>
                        <option value="Implementado">Implementado</option>
                      </select>
                    </div>

                  </div>

                  {/* Management Buttons */}
                  <div className="flex md:flex-col items-center justify-end gap-2 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <button
                      onClick={() => handleStartEditProposta(p)}
                      className="px-4 py-2 bg-gray-50 hover:bg-[#1b4332]/10 text-gray-700 hover:text-[#1b4332] rounded-xl text-xs font-bold border border-gray-200 hover:border-[#1b4332]/20 flex items-center space-x-1.5 transition-all shadow-sm"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      <span>Editar</span>
                    </button>

                    <button
                      onClick={() => setItemToDelete({ id: p.id, type: 'propostas' })}
                      className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold border border-rose-200 flex items-center space-x-1.5 transition-all shadow-sm"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Excluir</span>
                    </button>
                  </div>

                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center text-gray-500 border border-dashed border-[#e9ecef] max-w-xl mx-auto my-6 space-y-3">
                <Lightbulb className="h-10 w-10 text-[#1b4332] mx-auto opacity-40" />
                <p className="font-bold text-gray-800">Você ainda não propôs nenhuma solução sustentável</p>
                <p className="text-xs text-gray-500">Estudantes e cientistas sociais criam propostas integradoras unindo tecnologia e bem-estar local na seção 'Propor Solução'.</p>
              </div>
            )}
          </div>
        )}

        {/* ----------------- SUB-MODAL: EDIT RELATO ----------------- */}
        {editingRelato && (
          <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-[#e9ecef] rounded-[28px] max-w-lg w-full p-6 md:p-8 shadow-2xl relative text-left animate-scale-up max-h-[90vh] overflow-y-auto custom-scrollbar">
              
              <h3 className="font-sans font-bold text-xl text-[#1b4332] mb-6 block border-b border-gray-100 pb-3">
                Editar Relato de Ocorrência
              </h3>

              <form onSubmit={handleSaveRelatoEdit} className="space-y-4">
                
                {/* Bairro chooser */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 block uppercase">Região / Bairro</label>
                  <select
                    value={editedRelatoBairro}
                    onChange={(e) => setEditedRelatoBairro(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-sm text-gray-800"
                  >
                    {bairrosSugeridos.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Problem line */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 block uppercase">Resumo dO que está acontecendo</label>
                  <input
                    type="text"
                    required
                    value={editedRelatoProblem}
                    onChange={(e) => setEditedRelatoProblem(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-sm text-gray-800"
                  />
                </div>

                {/* Categoria and Gravity */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 block uppercase">Categoria</label>
                    <select
                      value={editedRelatoCategory}
                      onChange={(e) => setEditedRelatoCategory(e.target.value as Category)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-sm text-[#0b3d59] font-semibold"
                    >
                      {categoriesChoices.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 block uppercase">Gravidade</label>
                    <select
                      value={editedRelatoGravity}
                      onChange={(e) => setEditedRelatoGravity(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-sm"
                    >
                      <option value="Baixa">Baixa</option>
                      <option value="Média">Média</option>
                      <option value="Alta">Alta</option>
                      <option value="Crítica">Crítica</option>
                    </select>
                  </div>
                </div>

                {/* Frequência */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 block uppercase">Frequência</label>
                  <input
                    type="text"
                    required
                    value={editedRelatoFrequencia}
                    onChange={(e) => setEditedRelatoFrequencia(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-sm text-gray-800"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 block uppercase">Descrição Inteira</label>
                  <textarea
                    rows={4}
                    required
                    value={editedRelatoDesc}
                    onChange={(e) => setEditedRelatoDesc(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-sm text-gray-800 resize-none leading-relaxed"
                  />
                </div>

                {/* Actions button */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setEditingRelato(null)}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700/90 font-bold rounded-xl text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#1b4332] hover:bg-[#133024] text-white font-bold rounded-xl text-sm transition-all"
                  >
                    Salvar Alterações
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ----------------- SUB-MODAL: EDIT PROPOSTA ----------------- */}
        {editingProposta && (
          <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-[#e9ecef] rounded-[28px] max-w-lg w-full p-6 md:p-8 shadow-2xl relative text-left animate-scale-up max-h-[90vh] overflow-y-auto custom-scrollbar">
              
              <h3 className="font-sans font-bold text-xl text-[#1b4332] mb-6 block border-b border-gray-100 pb-3">
                Editar Proposta de Lógica Sustentável
              </h3>

              <form onSubmit={handleSavePropostaEdit} className="space-y-4">
                
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 block uppercase">Título da Proposta</label>
                  <input
                    type="text"
                    required
                    value={editedPropostaTitle}
                    onChange={(e) => setEditedPropostaTitle(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-sm text-gray-800 font-bold"
                  />
                </div>

                {/* Problem Related */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 block uppercase">Qual queixa ou problema ela se direciona?</label>
                  <input
                    type="text"
                    required
                    value={editedPropostaProblemRel}
                    onChange={(e) => setEditedPropostaProblemRel(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-sm text-gray-800"
                  />
                </div>

                {/* Viability & Cost */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 block uppercase">Viabilidade Técnica</label>
                    <select
                      value={editedPropostaViabilidade}
                      onChange={(e) => setEditedPropostaViabilidade(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-sm font-semibold text-[#1b4332]"
                    >
                      <option value="Baixa">Baixa</option>
                      <option value="Média">Média</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 block uppercase">Custo Estimado</label>
                    <select
                      value={editedPropostaCost}
                      onChange={(e) => setEditedPropostaCost(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-sm text-amber-700 font-semibold"
                    >
                      <option value="Baixo">Baixo</option>
                      <option value="Médio">Médio</option>
                      <option value="Alto">Alto</option>
                    </select>
                  </div>
                </div>

                {/* Prazo */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 block uppercase">Prazo de Execução</label>
                  <input
                    type="text"
                    required
                    value={editedPropostaPrazo}
                    onChange={(e) => setEditedPropostaPrazo(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-sm text-gray-800"
                  />
                </div>

                {/* Scope Description */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 block uppercase">Escopo / Descrição Técnica</label>
                  <textarea
                    rows={4}
                    required
                    value={editedPropostaDesc}
                    onChange={(e) => setEditedPropostaDesc(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-sm text-gray-800 resize-none leading-relaxed"
                  />
                </div>

                {/* Impact */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 block uppercase">Impacto Socioambiental Esperado</label>
                  <textarea
                    rows={2}
                    required
                    value={editedPropostaImpact}
                    onChange={(e) => setEditedPropostaImpact(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-sm text-gray-800 resize-none leading-relaxed"
                  />
                </div>

                {/* Status chooser */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 block uppercase">Status de Progresso da Proposta</label>
                  <select
                    value={editedPropostaStatus}
                    onChange={(e) => setEditedPropostaStatus(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-sm font-semibold text-[#1b4332] cursor-pointer"
                  >
                    <option value="Em Discussão">Em Discussão</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Implementado">Implementado</option>
                  </select>
                </div>

                {/* Actions button */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setEditingProposta(null)}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700/90 font-bold rounded-xl text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#1b4332] hover:bg-[#133024] text-white font-bold rounded-xl text-sm transition-all"
                  >
                    Salvar Alterações
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ----------------- SUB-MODAL: DELETE CONFIRMATION ----------------- */}
        {itemToDelete && (
          <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-[#e9ecef] rounded-[28px] max-w-sm w-full p-6 shadow-2xl relative text-center animate-scale-up">
              
              <div className="w-12 h-12 bg-rose-50 border border-rose-200 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-6 w-6" />
              </div>

              <h3 className="font-sans font-bold text-lg text-[#1b4332] mb-2">
                Deseja realmente excluir este registro?
              </h3>
              
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                Esta ação é definitiva e removerá este item do mapa interativo e das estatísticas do painel executivo.
              </p>

              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => setItemToDelete(null)}
                  className="px-4.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-all flex-1"
                >
                  Não, Cancelar
                </button>
                
                <button
                  onClick={handleConfirmDelete}
                  className="px-4.5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-all flex-1"
                >
                  Sim, Excluir item
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
