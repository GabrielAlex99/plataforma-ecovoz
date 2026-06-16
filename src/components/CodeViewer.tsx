import React, { useState } from 'react';
import { Copy, Check, FileCode, CheckCircle2, Download } from 'lucide-react';

export default function CodeViewer() {
  const [activeFile, setActiveFile] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);

  const htmlCode = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plataforma de Escuta, Mapeamento e Soluções Socioambientais</title>
    <!-- Tailwind CSS CDN para renderização ágil e responsiva -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Estilos customizados para o protótipo acadêmico */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #071613;
            color: #f3f4f6;
            scroll-behavior: smooth;
        }
    </style>
</head>
<body class="bg-[#071613] text-[#f3f4f6]">

    <!-- 1. Header & Menu Responsivo -->
    <header class="fixed top-0 left-0 right-0 bg-[#0f2a24]/95 border-b border-[#1b3d35] z-50 py-4 px-6">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div class="flex items-center space-x-3">
                <div class="bg-emerald-500 text-black p-2 rounded-xl font-bold">♻️</div>
                <div>
                    <span class="font-bold text-white block">Socioambiental ESG</span>
                    <span class="text-xs text-teal-400 font-medium">Escuta & Soluções</span>
                </div>
            </div>
            <!-- Menu Desktop -->
            <nav class="hidden md:flex space-x-4">
                <a href="#inicio" class="text-gray-300 hover:text-white px-3 py-2 text-sm">Início</a>
                <a href="#mapa" class="text-gray-300 hover:text-white px-3 py-2 text-sm">Mapa</a>
                <a href="#relatar" class="text-gray-300 hover:text-white px-3 py-2 text-sm">Relatar</a>
                <a href="#propor" class="text-gray-300 hover:text-white px-3 py-2 text-sm">Propor Solução</a>
                <a href="#dashboard" class="text-gray-300 hover:text-white px-3 py-2 text-sm">Dashboard</a>
                <a href="#banco" class="text-gray-300 hover:text-white px-3 py-2 text-sm">Banco de Soluções</a>
                <a href="#sobre" class="text-gray-300 hover:text-white px-3 py-2 text-sm">Sobre</a>
            </nav>
            <button id="btn-mobile" class="md:hidden text-white">☰</button>
        </div>
    </header>

    <!-- 2. Landing Hero Section -->
    <section id="inicio" class="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div class="text-left space-y-6">
            <span class="bg-emerald-900 text-emerald-300 text-xs px-3 py-1 rounded-full uppercase font-bold">Justiça Ambiental</span>
            <h1 class="text-4xl md:text-5xl font-extrabold text-white">Escuta, dados e soluções para uma indústria mais justa e sustentável</h1>
            <p class="text-gray-300 max-w-2xl text-lg">Uma plataforma de mapeamento socioambiental que conecta comunidades, empresas e soluções sustentáveis para enfrentar desigualdades ambientais.</p>
            <div class="flex flex-wrap gap-4 pt-4">
                <a href="#relatar" class="bg-emerald-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-emerald-400">Relatar Problema</a>
                <a href="#mapa" class="bg-slate-900 border border-slate-700 text-white px-6 py-3 rounded-xl font-bold">Ver Mapa de Impactos</a>
            </div>
        </div>
    </section>

    <!-- 3. Mapa de Impactos Interativo (Pontos e filtros) -->
    <section id="mapa" class="py-20 px-6 bg-[#0b1c19] border-t border-emerald-950">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-3xl font-bold text-white mb-2">Mapa de Impactos Socioambientais</h2>
            <p class="text-gray-400 text-sm mb-8">Navegue pelas sub-regiões e filtre as queixas por categoria:</p>

            <!-- Filtros de Categorias -->
            <div class="flex flex-wrap gap-2 mb-6" id="map-filters">
                <button class="filter-btn bg-emerald-500 text-black px-4 py-2 rounded-xl text-sm font-bold" data-cat="Todos">Todos</button>
                <button class="filter-btn bg-emerald-950 text-emerald-300 px-4 py-2 rounded-xl text-sm" data-cat="Ar">Ar</button>
                <button class="filter-btn bg-emerald-950 text-emerald-300 px-4 py-2 rounded-xl text-sm" data-cat="Água">Água</button>
                <button class="filter-btn bg-emerald-950 text-emerald-300 px-4 py-2 rounded-xl text-sm" data-cat="Ruído">Ruído</button>
                <button class="filter-btn bg-emerald-950 text-emerald-300 px-4 py-2 rounded-xl text-sm" data-cat="Verde urbano">Verde Urbano</button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <!-- Div do Mapa Visual -->
                <div class="lg:col-span-8 bg-[#071613] rounded-3xl p-6 min-h-[350px] flex items-center justify-center border border-emerald-900/60 relative">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <span class="text-gray-700 font-mono text-xs select-none">REPRESENTAÇÃO MAPA CARTOGRÁFICO VIRTUAL</span>
                    </div>
                    <!-- Marcadores gerados dinamicamente via script.js -->
                    <div id="pins-container" class="relative w-full h-full min-h-[300px]"></div>
                </div>
                <!-- Box de Detalhes -->
                <div class="lg:col-span-4 bg-[#0e241f] border border-emerald-900 p-6 rounded-3xl" id="map-detail-card">
                    <h3 class="font-bold text-lg text-white mb-2">Clique em um registro</h3>
                    <p class="text-sm text-gray-400">Escolha uma ocorrência para inspecionar os detalhes do relato.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Outras seções como relatar, propor, dashboard... -->
    <!-- (Consulte o script.js para ver a lógica de dados interativa completa) -->

    <script src="script.js"></script>
</body>
</html>`;

  const cssCode = `/* ==========================================
   style.css - Protótipo Acadêmico ESG
   ========================================== */

/* Cores principais adotadas no projeto */
:root {
    --primary: #10b981; /* Verde esmeralda */
    --primary-hover: #34d399;
    --background: #071613; /* Fundo petróleo profundo */
    --bg-card: #0e241f; /* Fundo do card */
    --border-card: #1b433b;
    --text-white: #ffffff;
    --text-muted: #9ca3af;
}

/* Scrollbar fluida para o corpo */
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-track {
    background: #05110e;
}
::-webkit-scrollbar-thumb {
    background: #194036;
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
    background: #10b981;
}

/* Animações simples para feedbacks e modais */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
}

/* Custom class para marcadores do mapa simulado */
.map-pin {
    position: absolute;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}
.map-pin:hover {
    transform: scale(1.25);
    z-index: 10;
}
`;

  const jsCode = `// ==========================================
// script.js - Dados Simulados e Lógica Científica
// ==========================================

// 1. Array principal de ocorrências relatadas pelas comunidades
const relatosIniciais = [
    {
        id: "1",
        bairro: "Jesuítas (Santa Cruz - RJ)",
        problema: "Particulado siderúrgico sedimentável (Fumaça Prateada)",
        descricao: "Presença constante de fumaça cinzenta e poeira fina contendo óxido de ferro nos quintais.",
        gravidade: "Alta",
        categoria: "Ar",
        x: 35, // percentual de posição na div do mapa
        y: 40
    },
    {
        id: "2",
        bairro: "Vila Parisi (Cubatão - SP)",
        problema: "Ruído industrial contínuo e poluição do ar",
        descricao: "Sons severos de maquinário e movimentação pesada tiram o sono de crianças e idosos locais.",
        gravidade: "Média",
        categoria: "Ruído",
        x: 55,
        y: 25
    },
    {
        id: "3",
        bairro: "Santa Cruz dos Navegantes (SP)",
        problema: "Assoreamento e óleo combustível estuarino",
        descricao: "Maré arrasta resíduos de navios de carga poluindo a fauna aquática local.",
        gravidade: "Alta",
        categoria: "Água",
        x: 65,
        y: 75
    }
];

// 2. Manipulação de Filtros e Renderização do Mapa
const filterButtons = document.querySelectorAll('.filter-btn');
const pinsContainer = document.getElementById('pins-container');
const detailCard = document.getElementById('map-detail-card');

function renderMapPoints(categoriaAtiva = "Todos") {
    if (!pinsContainer) return;
    pinsContainer.innerHTML = ''; // Limpa os marcadores atuais
    
    const filtrados = categoriaAtiva === "Todos" 
        ? relatosIniciais 
        : relatosIniciais.filter(r => r.categoria === categoriaAtiva);

    filtrados.forEach(relato => {
        const pin = document.createElement('div');
        pin.className = 'map-pin p-1 text-xs bg-red-500 rounded-full border border-white text-white absolute';
        pin.style.left = relato.x + '%';
        pin.style.top = relato.y + '%';
        pin.innerText = relato.categoria === 'Ar' ? '💨' : relato.categoria === 'Água' ? '💧' : '🔊';
        
        // Evento ao clicar no marcador revela informações
        pin.addEventListener('click', () => {
            showDetail(relato);
        });

        pinsContainer.appendChild(pin);
    });
}

function showDetail(relato) {
    if (!detailCard) return;
    detailCard.innerHTML = \`
        <div class="space-y-4 animate-fade-in">
            <span class="bg-emerald-950 text-emerald-400 px-3 py-1 rounded-md text-xs font-bold uppercase">\${relato.categoria}</span>
            <h3 class="text-xl font-bold text-white mt-2">\${relato.bairro}</h3>
            <p class="text-sm font-semibold text-rose-400">Problema: \${relato.problema}</p>
            <p class="text-xs text-gray-300 leading-relaxed">\${relato.descricao}</p>
            <hr class="border-emerald-900">
            <span class="text-xs text-gray-500 block">Gravidade Atribuída: <strong>\${relato.gravidade}</strong></span>
        </div>
    \`;
}

// Inicializa a escuta de eventos nos filtros de categoria
filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const cat = e.target.getAttribute('data-cat');
        
        // Altera classes de cores ativa
        filterButtons.forEach(b => b.className = 'filter-btn bg-emerald-950 text-emerald-300 px-4 py-2 rounded-xl text-sm');
        e.target.className = 'filter-btn bg-emerald-500 text-black px-4 py-2 rounded-xl text-sm font-bold';
        
        renderMapPoints(cat);
    });
});

// Executa renderização do mapa ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    renderMapPoints("Todos");
    if (relatosIniciais.length > 0) {
        showDetail(relatosIniciais[0]);
    }
});
`;

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCodeContent = () => {
    if (activeFile === 'html') return htmlCode;
    if (activeFile === 'css') return cssCode;
    return jsCode;
  };

  return (
    <div className="bg-[#1b4332] border-y border-[#133225] py-10 text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#133225] p-6 rounded-3xl border border-[#1d4f3b] space-y-4 shadow-xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-[#183e2f] gap-y-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-[#f28f3b] text-white text-[10px] uppercase font-semibold px-2 py-0.5 rounded-sm">Área de Estudos</span>
                <h3 className="font-sans font-bold text-lg text-[#f5f7f6]">Código Fonte Acadêmico para Estudantes</h3>
              </div>
              <p className="text-xs text-emerald-100/80 mt-1">
                Para fins curriculares de sua faculdade ou curso técnico, veja abaixo como construir esta mesma lógica usando <strong>HTML5, CSS3 estrutural e JavaScript puro</strong>!
              </p>
            </div>

            {/* Copy file button */}
            <button
              onClick={() => copyToClipboard(getCodeContent())}
              className="px-4 py-2 bg-[#f28f3b] hover:bg-[#de7c2a] text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-all self-start sm:self-center shrink-0 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>
          </div>

          {/* File selector buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveFile('html')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                activeFile === 'html'
                  ? 'bg-[#1b4332] text-white border border-[#1b4332]/50'
                  : 'text-emerald-100/60 hover:text-white'
              }`}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>index.html</span>
            </button>
            <button
              onClick={() => setActiveFile('css')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                activeFile === 'css'
                  ? 'bg-[#1b4332] text-white border border-[#1b4332]/50'
                  : 'text-emerald-100/60 hover:text-white'
              }`}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>style.css</span>
            </button>
            <button
              onClick={() => setActiveFile('js')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                activeFile === 'js'
                  ? 'bg-[#1b4332] text-white border border-[#1b4332]/50'
                  : 'text-emerald-100/60 hover:text-white'
              }`}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>script.js</span>
            </button>
          </div>

          {/* Render raw script pre blocks */}
          <div className="relative mt-2 rounded-2xl bg-[#0a2016] border border-[#0d2e20] p-4 max-h-[300px] overflow-auto custom-scrollbar">
            <pre className="font-mono text-[10.5px] sm:text-xs text-emerald-250 leading-normal whitespace-pre-wrap select-text">
              <code>{getCodeContent()}</code>
            </pre>
          </div>

          {/* Footer warning info */}
          <div className="text-[11px] text-emerald-100/60 font-medium text-center">
            💡 Dica: Salve esses três arquivos numa mesma pasta de seu computador para ver a mágica rodar no navegador imediatamente!
          </div>

        </div>
      </div>
    </div>
  );
}
