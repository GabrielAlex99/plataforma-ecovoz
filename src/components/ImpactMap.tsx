import React, { useState, useMemo } from 'react';
import { Relato, Category } from '../types';
import { 
  Filter, 
  MapPin, 
  Search, 
  Plus, 
  Minus, 
  AlertTriangle, 
  Info, 
  X, 
  Flame,
  Factory,
  Star,
  MessageSquare,
  TrendingUp,
  Map,
  BadgeAlert,
  Compass,
  ArrowRight
} from 'lucide-react';
import { realIndustrias, avaliacoesLocais, IndustrialSite, AvaliacaoLocalidade } from '../data/initialData';
import { Eye, Calendar, User, Check } from 'lucide-react';

export interface GalleryItem {
  id: string;
  titulo: string;
  imagemUrl: string;
  categoria: Category;
  localizacao: string;
  data: string;
  status: 'Em Análise' | 'Vistoriado' | 'Ação Planejada' | 'Resolvido';
  descricao: string;
  autor: string;
}

export const galeriaDeImpactos: GalleryItem[] = [
  {
    id: 'gal-1',
    titulo: 'Poeira Industrial sobre Moradias',
    imagemUrl: '/images/gallery-air.png',
    categoria: 'Ar',
    localizacao: 'Santa Cruz (Jesuítas), RJ',
    data: 'Demonstração',
    status: 'Em Análise',
    descricao: 'Poeira e fuligem atingindo quintais, janelas e áreas de circulação em moradias próximas a fontes industriais, com registro visual e encaminhamento por prioridade.',
    autor: 'Registro demonstrativo do protótipo'
  },
  {
    id: 'gal-2',
    titulo: 'Óleo e Resíduos em Canal Urbano',
    imagemUrl: '/images/gallery-water.png',
    categoria: 'Água',
    localizacao: 'Santa Cruz dos Navegantes, SP',
    data: 'Demonstração',
    status: 'Vistoriado',
    descricao: 'Manchas oleosas e resíduos flutuantes em canal urbano próximo a moradias e pontos de pesca demonstram como a plataforma registraria riscos hídricos e sanitários.',
    autor: 'Registro demonstrativo do protótipo'
  },
  {
    id: 'gal-3',
    titulo: 'Descarte Irregular de Resíduos',
    imagemUrl: '/images/gallery-waste.png',
    categoria: 'Resíduos',
    localizacao: 'Cubatão (Vila Parisi), SP',
    data: 'Demonstração',
    status: 'Ação Planejada',
    descricao: 'Tambores, entulho e resíduos abandonados em terreno aberto próximos a moradias, sem isolamento adequado e com risco de contaminação do solo.',
    autor: 'Registro demonstrativo do protótipo'
  },
  {
    id: 'gal-4',
    titulo: 'Alagamentos por Chuva Extrema',
    imagemUrl: '/images/gallery-flood.png',
    categoria: 'Mobilidade',
    localizacao: 'Zona periférica demonstrativa, SP',
    data: 'Demonstração',
    status: 'Resolvido',
    descricao: 'Chuvas fortes, bueiros obstruídos e drenagem insuficiente causam alagamentos recorrentes em ruas periféricas, dificultando circulação, acesso a serviços e rotina das famílias.',
    autor: 'Registro demonstrativo do protótipo'
  },
  {
    id: 'gal-5',
    titulo: 'Supressão de Árvores no Entorno Urbano',
    imagemUrl: '/images/gallery-green.png',
    categoria: 'Verde urbano',
    localizacao: 'Pirajá, Salvador - BA',
    data: 'Demonstração',
    status: 'Em Análise',
    descricao: 'Remoção de arborização e solo exposto no entorno urbano-industrial reduzem sombra, aumentam calor local e eliminam barreiras naturais contra poeira e ruído.',
    autor: 'Registro demonstrativo do protótipo'
  },
  {
    id: 'gal-6',
    titulo: 'Mutirão de Arborização Comunitária',
    imagemUrl: '/images/gallery-solution.png',
    categoria: 'Verde urbano',
    localizacao: 'Bairro urbano demonstrativo, RS',
    data: 'Demonstração',
    status: 'Resolvido',
    descricao: 'Ação comunitária demonstrativa com plantio de árvores em calçadas, praças e vias locais para ampliar sombra, reduzir calor e criar barreiras verdes no bairro.',
    autor: 'Registro demonstrativo do protótipo'
  }
];

interface ImpactMapProps {
  relatos: Relato[];
}

export default function ImpactMap({ relatos }: ImpactMapProps) {
  // Advanced Geolocation Filters State
  const [selectedUf, setSelectedUf] = useState<string>('Todos');
  const [cityInput, setCityInput] = useState<string>('');
  const [bairroInput, setBairroInput] = useState<string>('');
  
  // Traditional Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [selectedGravity, setSelectedGravity] = useState<string>('Todos');
  const [heatmapMode, setHeatmapMode] = useState(false);

  // Gallery Interactive zoom states
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  // Map Interactive states
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoverCoordinates, setHoverCoordinates] = useState<{ lat: string; lng: string } | null>(null);
  const [activePopupRelato, setActivePopupRelato] = useState<Relato | null>(null);

  // Intelligent Industry Search state
  const [isSearchingIndustries, setIsSearchingIndustries] = useState(false);
  const [industrySearchResults, setIndustrySearchResults] = useState<IndustrialSite[] | null>(null);

  const categories: (Category | 'Todos')[] = [
    'Todos', 'Ar', 'Água', 'Ruído', 'Resíduos', 'Mobilidade', 'Verde urbano',
  ];

  const ufsDisponiveis = ['Todos', 'RJ', 'SP', 'MG', 'BA', 'RS'];

  // Helper coordinate converter for Brazil-wide simulation (scaled maps)
  const getBrazilGPS = (r: Relato) => {
    // Base GPS reference point for Brasília: -15.793889, -47.882778
    const x = r.coordenadas?.x ?? 50;
    const y = r.coordenadas?.y ?? 50;
    
    // Scale points realistically according to state
    let lat = (-15.7938 - (y - 50) * 0.15).toFixed(4);
    let lng = (-47.8827 + (x - 50) * 0.12).toFixed(4);

    if (r.uf === 'RJ') {
      lat = (-22.9068 - (y - 50) * 0.005).toFixed(4);
      lng = (-43.1729 + (x - 50) * 0.006).toFixed(4);
    } else if (r.uf === 'SP') {
      lat = (-23.5505 - (y - 50) * 0.007).toFixed(4);
      lng = (-46.6333 + (x - 50) * 0.008).toFixed(4);
    } else if (r.uf === 'MG') {
      lat = (-19.9173 - (y - 50) * 0.012).toFixed(4);
      lng = (-43.9345 + (x - 50) * 0.015).toFixed(4);
    }

    return { lat, lng };
  };

  // Perform full multi-filter logic for community reports
  const filteredRelatos = useMemo(() => {
    return relatos.filter((r) => {
      // 1. State UF filter
      const matchesUf = selectedUf === 'Todos' || r.uf === selectedUf;

      // 2. City filter
      const matchesCity = !cityInput.trim() || 
        (r.cidade && r.cidade.toLowerCase().includes(cityInput.toLowerCase()));

      // 3. Bairro filter
      const matchesBairro = !bairroInput.trim() || 
        r.bairro.toLowerCase().includes(bairroInput.toLowerCase());

      // 4. Category filter
      const matchesCategory = selectedCategory === 'Todos' || r.categoria === selectedCategory;

      // 5. Gravity filter
      const matchesGravity = selectedGravity === 'Todos' || r.gravidade === selectedGravity;

      // 6. Keywords input search match
      const matchesKeywords = !searchTerm.trim() ||
        r.bairro.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.cidade && r.cidade.toLowerCase().includes(searchTerm.toLowerCase())) ||
        r.problema.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.descricao.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesUf && matchesCity && matchesBairro && matchesCategory && matchesGravity && matchesKeywords;
    });
  }, [relatos, selectedUf, cityInput, bairroInput, selectedCategory, selectedGravity, searchTerm]);

  // Dynamically filter local reviews & complaints matching current geographical query
  const filteredReviews = useMemo(() => {
    return avaliacoesLocais.filter((rev) => {
      const matchesUf = selectedUf === 'Todos' || rev.uf === selectedUf;
      const matchesCity = !cityInput.trim() || rev.cidade.toLowerCase().includes(cityInput.toLowerCase());
      const matchesBairro = !bairroInput.trim() || rev.bairro.toLowerCase().includes(bairroInput.toLowerCase());
      return matchesUf && matchesCity && matchesBairro;
    });
  }, [selectedUf, cityInput, bairroInput]);

  // Compute local averages for filtered reviews
  const reviewAverages = useMemo(() => {
    if (filteredReviews.length === 0) return null;
    const len = filteredReviews.length;
    const arSum = filteredReviews.reduce((sum, item) => sum + item.notaQualidadeAr, 0);
    const somSum = filteredReviews.reduce((sum, item) => sum + item.notaConfortoAcustico, 0);
    const vidaSum = filteredReviews.reduce((sum, item) => sum + item.notaQualidadeVida, 0);
    
    return {
      ar: (arSum / len).toFixed(1),
      som: (somSum / len).toFixed(1),
      vida: (vidaSum / len).toFixed(1),
      count: len
    };
  }, [filteredReviews]);

  // Trigger Advanced AI Search simulation to look for local factories and emission sources
  const handleTriggerAdvancedSearch = () => {
    setIsSearchingIndustries(true);
    setIndustrySearchResults(null);

    // Simulate smart AI analysis lookup in spatial databases
    setTimeout(() => {
      const filteredInd = realIndustrias.filter((ind) => {
        const matchesUf = selectedUf === 'Todos' || ind.uf === selectedUf;
        const matchesCity = !cityInput.trim() || ind.cidade.toLowerCase().includes(cityInput.toLowerCase());
        const matchesBairro = !bairroInput.trim() || ind.bairro.toLowerCase().includes(bairroInput.toLowerCase());
        return matchesUf && matchesCity && matchesBairro;
      });

      setIndustrySearchResults(filteredInd);
      setIsSearchingIndustries(false);
    }, 1200);
  };

  // Determine potential regional hazards & recurring risk variables based on mapped industrial densities
  const regionalRisksAndProblems = useMemo(() => {
    const currentScopeUf = selectedUf === 'Todos' ? '' : selectedUf;
    const activeIndustriesInRegion = realIndustrias.filter((ind) => {
      const matchesUf = selectedUf === 'Todos' || ind.uf === selectedUf;
      const matchesCity = !cityInput.trim() || ind.cidade.toLowerCase().includes(cityInput.toLowerCase());
      return matchesUf && matchesCity;
    });

    const isHighRiskPresent = activeIndustriesInRegion.some(i => i.riscoAmbiental === 'Alto');
    const categoriesMapped = relatos.filter(r => r.uf === currentScopeUf || currentScopeUf === '').map(r => r.categoria);

    const issues: string[] = [];
    if (isHighRiskPresent) {
      issues.push('Alta dispersão de poluentes fotoquímicos e particulado de ferro sedimentável metálico em dias quentes.');
      issues.push('Risco recorrente de poluição acústica noturna provocado por purgas de caldeiras a vapor.');
    }
    if (categoriesMapped.includes('Água')) {
      issues.push('Potencial escoamento de rejeitos líquidos e ácidos solúveis perto de bacias de escoamento secundárias.');
    }
    if (categoriesMapped.includes('Verde urbano')) {
      issues.push('Efeito ilha de calor concentrado decorrente de drástica redução vegetativa perimetral de segurança.');
    }

    if (issues.length === 0) {
      issues.push('Índice de conforto municipal dentro de marcos seguros vigentes do CONAMA.');
    }

    return {
      issues,
      industriasCount: activeIndustriesInRegion.length,
      severidadeGeral: isHighRiskPresent ? 'Elevada (Zonas Pesadas Mapeadas)' : 'Moderada / Baixa'
    };
  }, [selectedUf, cityInput, relatos]);

  const handleMarkerClick = (r: Relato) => {
    setActivePopupRelato(r);
    const x = r.coordenadas?.x ?? 50;
    const y = r.coordenadas?.y ?? 50;
    setPanOffset({ x: (50 - x) * 0.2, y: (50 - y) * 0.2 });
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.25));
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMapMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    
    const lat = (-15.7938 - (yPct - 50) * 0.15).toFixed(4);
    const lng = (-47.8827 + (xPct - 50) * 0.12).toFixed(4);
    setHoverCoordinates({ lat, lng });
  };

  return (
    <section id="mapa" className="py-20 bg-[#F4F7F2] border-t border-[#A8CBB1]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-left mb-10">
          <span className="text-xs font-bold text-[#F28C28] tracking-wider uppercase block mb-1">Cartografia Participativa</span>
          <h2 className="font-sans font-black text-3xl md:text-4xl text-[#123524] tracking-tight">
            Mapa de Impactos Socioambientais (Brasil)
          </h2>
          <p className="text-[#4B5F55] text-sm md:text-base max-w-2xl mt-1 font-medium">
            Demonstração de como a EcoVoz organizaria relatos comunitários, evidências visuais, filtros territoriais e status de encaminhamento. Dados oficiais ficam na aba Impactos; aqui o foco é o funcionamento da plataforma.
          </p>
        </div>

        {/* MAPEAMENTO: foco no funcionamento da plataforma, sem repetir dados oficiais da aba Impactos */}
        <div className="mb-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
          <article className="bg-white border border-[#DDE8D8] rounded-3xl p-6 shadow-sm">
            <div className="h-11 w-11 rounded-2xl bg-[#E8F1EA] text-[#123524] flex items-center justify-center mb-4">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-black text-[#123524]">Relato localizado</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4B5F55]">
              Moradores registram ocorrências com categoria, localização, descrição e nível de gravidade. Nesta aba, os registros são demonstrações do protótipo.
            </p>
          </article>
          <article className="bg-white border border-[#DDE8D8] rounded-3xl p-6 shadow-sm">
            <div className="h-11 w-11 rounded-2xl bg-[#E8F1EA] text-[#123524] flex items-center justify-center mb-4">
              <Filter className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-black text-[#123524]">Triagem territorial</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4B5F55]">
              Filtros por UF, cidade, bairro, categoria e gravidade ajudam a transformar relatos dispersos em prioridade de atendimento.
            </p>
          </article>
          <article className="bg-white border border-[#DDE8D8] rounded-3xl p-6 shadow-sm">
            <div className="h-11 w-11 rounded-2xl bg-[#E8F1EA] text-[#123524] flex items-center justify-center mb-4">
              <ArrowRight className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-black text-[#123524]">Encaminhamento</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4B5F55]">
              A plataforma organiza evidências visuais, histórico e status para apoiar respostas de empresas, poder público e comunidade.
            </p>
          </article>
        </div>

        {/* Dynamic Filters Grid Panel */}
        <div className="bg-white border border-[#e9ecef] rounded-3xl p-6 mb-8 text-left grid grid-cols-1 md:grid-cols-12 gap-5 shadow-xs relative z-40">
          
          {/* Geolocation UF Filter */}
          <div className="col-span-1 md:col-span-2 space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block flex items-center gap-1">
              <Compass className="h-3 w-3 text-[#f28f3b]" /> Estado (UF)
            </label>
            <select
              value={selectedUf}
              onChange={(e) => {
                setSelectedUf(e.target.value);
                setActivePopupRelato(null);
                setIndustrySearchResults(null);
              }}
              className="w-full px-3 py-2.5 border border-[#e9ecef] bg-[#f5f7f6] rounded-xl text-xs sm:text-sm text-gray-700 focus:outline-[#1b4332] font-semibold cursor-pointer"
            >
              {ufsDisponiveis.map(uf => (
                <option key={uf} value={uf}>{uf === 'Todos' ? 'Todos os Estados' : uf}</option>
              ))}
            </select>
          </div>

          {/* Dynamic City Search Filter  */}
          <div className="col-span-1 md:col-span-3 space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Cidade / Município</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ex: Rio de Janeiro, Cubatão..."
                value={cityInput}
                onChange={(e) => {
                  setCityInput(e.target.value);
                  setActivePopupRelato(null);
                  setIndustrySearchResults(null);
                }}
                className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-[#1b4332] font-medium"
              />
              <Search className="absolute left-2.5 top-3.5 h-4 w-4 text-gray-450" />
            </div>
          </div>

          {/* Dynamic Bairro Search Filter */}
          <div className="col-span-1 md:col-span-3 space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Bairro / Perímetro</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ex: Jesuítas, Vila Parisi, Veneza..."
                value={bairroInput}
                onChange={(e) => {
                  setBairroInput(e.target.value);
                  setActivePopupRelato(null);
                  setIndustrySearchResults(null);
                }}
                className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-[#1b4332] font-medium"
              />
              <Search className="absolute left-2.5 top-3.5 h-4 w-4 text-gray-450" />
            </div>
          </div>

          {/* Gravity Filter */}
          <div className="col-span-1 md:col-span-2 space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Gravidade</label>
            <select
              value={selectedGravity}
              onChange={(e) => {
                setSelectedGravity(e.target.value);
                setActivePopupRelato(null);
              }}
              className="w-full px-3 py-2.5 border border-[#e9ecef] bg-[#f5f7f6] rounded-xl text-xs sm:text-sm text-gray-700 focus:outline-[#1b4332] font-semibold cursor-pointer"
            >
              <option value="Todos">Todos os Níveis</option>
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica</option>
            </select>
          </div>

          {/* Quick Clear Button */}
          <div className="col-span-1 md:col-span-2 flex items-end">
            <button
              onClick={() => {
                setSelectedUf('Todos');
                setCityInput('');
                setBairroInput('');
                setSearchTerm('');
                setSelectedCategory('Todos');
                setSelectedGravity('Todos');
                setActivePopupRelato(null);
                setIndustrySearchResults(null);
              }}
              className="w-full py-2.5 border border-gray-250 bg-white hover:bg-gray-50 text-gray-600 font-bold text-xs rounded-xl cursor-pointer transition-colors"
            >
              Limpar Filtros
            </button>
          </div>

        </div>

        {/* Dynamic Category Selector & Heatmap Switches */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-1.5 bg-white p-2 rounded-2.5xl border border-[#e9ecef] shadow-2xs flex-1 text-left">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActivePopupRelato(null);
                }}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#0b3d59] text-white font-bold shadow-xs'
                    : 'text-gray-650 hover:bg-gray-50 hover:text-[#1b4332]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setHeatmapMode(!heatmapMode)}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer shadow-xs whitespace-nowrap ${
              heatmapMode
                ? 'bg-rose-600 border-rose-700 text-white font-extrabold hover:bg-rose-700 animate-pulse'
                : 'bg-white border-[#e9ecef] text-gray-755 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200'
            }`}
          >
            <Flame className={`h-4.5 w-4.5 ${heatmapMode ? 'text-white fill-white' : 'text-rose-500 fill-rose-500'}`} />
            <span>{heatmapMode ? 'Desativar Mapa de Calor' : 'Ativar Mapa de Calor'}</span>
          </button>
        </div>

        {/* Interactive Columns Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ===================== BRAZIL INTERACTIVE GRAPHIC (Left side) ===================== */}
          <div className="lg:col-span-8 bg-white border border-[#e9ecef] rounded-3xl p-4 flex flex-col justify-between shadow-md relative min-h-[480px] overflow-hidden">
            
            {/* Watermark Details */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 text-left">
              <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-[#e9ecef] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="font-mono text-[9px] text-[#0b3d59] tracking-wide font-bold uppercase">Motor Georreferenciado ESG v3.0</span>
              </div>
              <div className="bg-[#1b4332] text-[9px] font-mono text-white/95 px-2 py-0.5 rounded-md border border-[#235841] shadow-2xs self-start tracking-wider uppercase">
                {selectedUf === 'Todos' ? 'Mapeamento Nacional' : `Região Foco: UF ${selectedUf}`}
              </div>
            </div>

            {/* Hover GPS Coordinates Tracker */}
            {hoverCoordinates && (
              <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-xs border border-[#e9ecef] px-2.5 py-1 rounded-lg text-[9px] font-mono text-gray-500 shadow-2xs">
                GPS Lat: <span className="text-[#1b4332] font-bold">{hoverCoordinates.lat}</span> | Lng: <span className="text-[#1b4332] font-bold">{hoverCoordinates.lng}</span>
              </div>
            )}

            {/* Zoom Action Pane */}
            <div className="absolute top-4 right-4 z-10 flex flex-col space-y-1">
              <button 
                onClick={handleZoomIn}
                className="w-8 h-8 bg-white hover:bg-gray-50 text-[#1b4332] border border-[#e9ecef] rounded-lg shadow-xs flex items-center justify-center font-bold transition-colors focus:outline-none"
                title="Ampliar"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button 
                onClick={handleZoomOut}
                className="w-8 h-8 bg-white hover:bg-gray-50 text-[#1b4332] border border-[#e9ecef] rounded-lg shadow-xs flex items-center justify-center font-bold transition-colors focus:outline-none"
                title="Reduzir"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

            {/* Simulated Brazil Map Geographic Canvas */}
            <div className="w-full h-full relative border border-gray-100 rounded-2.5xl bg-gradient-to-br from-[#ecf3f0] to-[#dbeef9] flex items-center justify-center p-2 pt-16 min-h-[380px] overflow-hidden select-none">
              
              <div 
                className="w-full h-full relative transition-all duration-300"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                  transformOrigin: 'center center',
                }}
              >
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full object-cover opacity-95 text-left"
                  onMouseMove={handleMapMouseMove}
                >
                  <defs>
                    <radialGradient id="heat-glow-critical" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.8"/>
                      <stop offset="35%" stop-color="#f97316" stop-opacity="0.5"/>
                      <stop offset="70%" stop-color="#eab308" stop-opacity="0.2"/>
                      <stop offset="100%" stop-color="#eab308" stop-opacity="0"/>
                    </radialGradient>
                    <radialGradient id="heat-glow-high" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="#f97316" stop-opacity="0.75"/>
                      <stop offset="40%" stop-color="#fbcfe8" stop-opacity="0.4"/>
                      <stop offset="75%" stop-color="#eab308" stop-opacity="0.15"/>
                      <stop offset="100%" stop-color="#eab308" stop-opacity="0"/>
                    </radialGradient>
                    <radialGradient id="heat-glow-moderate" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stop-color="#eab308" stop-opacity="0.6"/>
                      <stop offset="50%" stop-color="#fef08a" stop-opacity="0.3"/>
                      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
                    </radialGradient>
                  </defs>

                  <g className="transition-opacity duration-300">
                    {/* Simulated outline boundaries of Brazil map representing state corridors */}
                    {/* Brazil Border outline */}
                    <path d="M 15,40 Q 25,5 50,5 T 85,25 Q 98,40 85,75 T 50,95 Q 25,95 15,75 Z" fill="none" stroke="#2d6a4f" strokeWidth="0.8" strokeDasharray="1,1" className="opacity-25" />
                    <path d="M 40,20 Q 55,10 70,25" fill="none" stroke="#1b4332" strokeWidth="0.3" className="opacity-20" />
                    <path d="M 30,50 Q 50,65 75,50" fill="none" stroke="#1b4332" strokeWidth="0.3" className="opacity-25" />
                    
                    {/* Atlantic Ocean, Rivers Parahyba & Tietê */}
                    <path d="M -10,85 Q 35,45 80,85 T 120,60" fill="none" stroke="#2d6e9e" strokeWidth="1.5" className="opacity-15" />
                    <path d="M 40,30 L 95,85" fill="none" stroke="#ffffff" strokeWidth="0.6" className="opacity-40" />

                    {/* Regional industrial centers icons backgrounds */}
                    <text x="50" y="52" fontSize="3" fill="#1b4332" fontWeight="extrabold" opacity="0.15" textAnchor="middle">REPÚBLICA FEDERATIVA DO BRASIL</text>

                    {/* Mapped labels based on current filters */}
                    <g className="opacity-80 font-bold font-sans">
                      <text x="76" y="70" fontSize="2.5" fill="#1b4332">SP</text>
                      <g className="opacity-40"><circle cx="75" cy="69" r="0.6" fill="#1b4332" /></g>
                      
                      <text x="82" y="58" fontSize="2.5" fill="#1b4332">RJ</text>
                      <g className="opacity-40"><circle cx="81" cy="57" r="0.6" fill="#1b4332" /></g>
                      
                      <text x="64" y="48" fontSize="2.5" fill="#1b4332">MG</text>
                      <g className="opacity-40"><circle cx="63" cy="47" r="0.6" fill="#1b4332" /></g>

                      <text x="75" y="32" fontSize="2.5" fill="#1b4332">BA</text>
                      <g className="opacity-40"><circle cx="74" cy="31" r="0.6" fill="#1b4332" /></g>

                      <text x="44" y="85" fontSize="2.5" fill="#1b4332">RS</text>
                      <g className="opacity-40"><circle cx="43" cy="84" r="0.6" fill="#1b4332" /></g>
                    </g>
                  </g>

                  {/* Heatmap overlay dots */}
                  {heatmapMode && filteredRelatos.map((r) => {
                    const xCoord = r.coordenadas?.x ?? 50;
                    const yCoord = r.coordenadas?.y ?? 50;
                    
                    let gradientId = 'heat-glow-high';
                    let heatRadius = 14;
                    
                    if (r.gravidade === 'Crítica') {
                      gradientId = 'heat-glow-critical';
                      heatRadius = 18;
                    } else if (r.gravidade === 'Média') {
                      gradientId = 'heat-glow-moderate';
                      heatRadius = 10;
                    } else if (r.gravidade === 'Baixa') {
                      gradientId = 'heat-glow-moderate';
                      heatRadius = 7;
                    }

                    return (
                      <circle
                        key={`heat-${r.id}`}
                        cx={xCoord}
                        cy={yCoord}
                        r={heatRadius}
                        fill={`url(#${gradientId})`}
                        className="animate-pulse opacity-75"
                        style={{ animationDuration: r.gravidade === 'Crítica' ? '2.5s' : '4s', mixBlendMode: 'multiply' }}
                      />
                    );
                  })}

                  {/* Interactive markers representing filtered reports */}
                  {filteredRelatos.map((r) => {
                    const xCoord = r.coordenadas?.x ?? 50;
                    const yCoord = r.coordenadas?.y ?? 50;
                    const isSelected = activePopupRelato?.id === r.id;

                    let colorPreset = '#1b4332';
                    let markerBg = 'fill-[#1b4332]';
                    let markerGlow = 'fill-[#1b4332]/20';

                    if (r.gravidade === 'Crítica') {
                      colorPreset = '#e11d48';
                      markerBg = 'fill-rose-600';
                      markerGlow = 'fill-rose-500/20';
                    } else if (r.gravidade === 'Alta') {
                      colorPreset = '#f28f3b';
                      markerBg = 'fill-[#f28f3b]';
                      markerGlow = 'fill-[#f28f3b]/20';
                    } else if (r.gravidade === 'Média') {
                      colorPreset = '#eab308';
                      markerBg = 'fill-yellow-500';
                      markerGlow = 'fill-yellow-500/20';
                    }

                    return (
                      <g
                        key={r.id}
                        className="cursor-pointer group/marker"
                        onClick={() => handleMarkerClick(r)}
                      >
                        {isSelected && (
                          <circle cx={xCoord} cy={yCoord} r="6" fill="none" stroke={colorPreset} strokeWidth="0.4" className="animate-pulse" />
                        )}
                        <circle cx={xCoord} cy={yCoord} r={isSelected ? "5" : "3.5"} className={`transition-all duration-200 ${markerGlow}`} />
                        <circle cx={xCoord} cy={yCoord} r={isSelected ? "2.2" : "1.6"} className={`transition-all duration-200 ${markerBg} stroke-white stroke-[0.15]`} />
                        
                        <g className="opacity-0 group-hover/marker:opacity-100 transition-opacity duration-150 pointer-events-none">
                          <rect x={xCoord - 14} y={yCoord - 9} width="28" height="5.5" rx="1.2" fill="#1b4332" />
                          <text x={xCoord} y={yCoord - 5.2} fontSize="1.8" fill="#ffffff" fontWeight="bold" textAnchor="middle">
                            {r.bairro.substring(0, 15)}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>

                {/* Simulated popup card over active marker */}
                {activePopupRelato && (
                  <div 
                    className="absolute z-30 bg-white border border-[#DDE8D8] rounded-2xl shadow-md p-4 max-w-[240px] text-xs leading-normal animate-scale-up text-[#16231C]"
                    style={{
                      left: `${activePopupRelato.coordenadas?.x ?? 50}%`,
                      top: `${activePopupRelato.coordenadas?.y ?? 50}%`,
                      transform: 'translate(-50%, -106%)',
                    }}
                  >
                    <div className="absolute bottom-[-6px] left-[50%] translate-x-[-50%] w-3 h-3 bg-white border-r border-b border-[#DDE8D8] rotate-45"></div>
                    <div className="flex items-center justify-between pb-1 text-[9.5px] border-b border-[#DDE8D8] mb-2 gap-x-2">
                      <span className="font-extrabold uppercase tracking-wide text-indigo-900 bg-indigo-50 px-1.5 py-0.5 rounded-md">
                        {activePopupRelato.categoria}
                      </span>
                      <span className={`font-bold px-1.5 py-0.5 rounded-md ${
                        activePopupRelato.gravidade === 'Crítica' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {activePopupRelato.gravidade}
                      </span>
                      <button onClick={() => setActivePopupRelato(null)} className="text-[#4B5F55] hover:text-[#16231C] cursor-pointer">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="text-left">
                      <h4 className="font-bold text-[#16231C] font-sans leading-tight">{activePopupRelato.bairro}</h4>
                      <p className="text-[10px] text-[#4B5F55] mt-0.5 font-semibold">{activePopupRelato.cidade} - {activePopupRelato.uf}</p>
                      <p className="text-[#4B5F55] text-[10px] leading-relaxed mt-2 line-clamp-3 italic">"{activePopupRelato.descricao}"</p>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Map legends */}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 items-center justify-between text-[11px] text-gray-500 font-semibold px-1 border-t border-gray-150 pt-3">
              {heatmapMode ? (
                <div className="flex items-center space-x-2">
                  <span className="text-rose-650 font-bold uppercase text-[9px]">Gravidade de Acordo com Densidade:</span>
                  <div className="w-24 h-2 rounded-full bg-gradient-to-r from-yellow-250 via-orange-400 to-rose-600 border border-gray-150" />
                  <span className="text-[10px] font-normal">Concentrações de Ruído / Fuligem</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2.5">
                  <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-1.5 inline-block border border-white shadow-xs"></span> Crítica</span>
                  <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#f28f3b] mr-1.5 inline-block border border-white shadow-xs"></span> Alta</span>
                  <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 mr-1.5 inline-block border border-white shadow-xs"></span> Média</span>
                  <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#1b4332] mr-1.5 inline-block border border-white shadow-xs"></span> Baixa</span>
                </div>
              )}
              <span className="text-[#0b3d59] font-semibold flex items-center gap-1">
                <Info className="h-3.5 w-3.5 text-[#f28f3b]" /> Dica: Passe o mouse ou clique sobre qualquer ponto territorial!
              </span>
            </div>

          </div>

          {/* ===================== SIDEBAR INSPECTOR & THE REAL COMPLAINTS BAR (Right side) ===================== */}
          <div className="lg:col-span-4 flex flex-col space-y-4 text-left">
            
            {/* 1. Mapped Regional Risk & Analysis Hazards Card */}
            <div className="bg-[#f28f3b]/10 border border-[#f28f3b]/20 rounded-3xl p-5 shadow-3xs text-left">
              <div className="flex items-center space-x-2 mb-3">
                <BadgeAlert className="h-5 w-5 text-[#f28f3b] animate-bounce" />
                <h3 className="text-xs font-extrabold text-[#1b4332] uppercase tracking-wider">Aferição de Risco Técnico Regional</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[9.5px] text-gray-400 font-bold block uppercase">Potenciais Problemas Regionais Mapeados</span>
                  <ul className="mt-1 space-y-1.5">
                    {regionalRisksAndProblems.issues.map((iss, i) => (
                      <li key={i} className="text-[11px] text-gray-700 flex items-start gap-1.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f28f3b] shrink-0" />
                        <span className="leading-relaxed">{iss}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f28f3b]/10 text-[10.5px]">
                  <div>
                    <span className="text-gray-400 block text-[8.5px] uppercase font-bold">Fábricas no Escopo</span>
                    <strong className="text-[#1b4332] font-semibold font-mono">{regionalRisksAndProblems.industriasCount} complexos</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[8.5px] uppercase font-bold">Risco de Emissão</span>
                    <strong className="text-[#1b4332] font-semibold">{regionalRisksAndProblems.severidadeGeral}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Intelligent Industrial Lookup Engine */}
            <div className="bg-white border border-[#e9ecef] rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <Factory className="h-5 w-5 text-[#0b3d59]" />
                  <h3 className="font-sans font-bold text-sm text-[#1b4332]">Busca Inteligente de Indústrias</h3>
                </div>
                <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-md font-bold uppercase">AI Model</span>
              </div>
              
              <p className="text-gray-500 text-[11px] leading-relaxed">
                Clique no botão de busca avançada para realizar uma varredura por IA em bases de dados geográficas de siderúrgicas, aciarias e petroquímicas no perímetro correspondente.
              </p>

              <button
                type="button"
                onClick={handleTriggerAdvancedSearch}
                disabled={isSearchingIndustries}
                className="w-full py-2.5 bg-[#0b3d59] hover:bg-[#072a42] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-wait"
              >
                {isSearchingIndustries ? (
                  <>
                    <span className="animate-spin border-2 border-white border-t-transparent w-3.5 h-3.5 rounded-full inline-block"></span>
                    <span>Varrendo banco geográfico...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-3.5 w-3.5" />
                    <span>Realizar Busca Inteligente</span>
                  </>
                )}
              </button>

              {/* Industry Results Display Panel */}
              {industrySearchResults && (
                <div className="pt-2 max-h-[140px] overflow-y-auto custom-scrollbar space-y-2 border-t border-gray-100">
                  {industrySearchResults.length > 0 ? (
                    industrySearchResults.map((ind) => (
                      <div key={ind.id} className="bg-[#f0f4f8] p-2.5 rounded-xl border border-blue-100 text-left text-xs animate-fade-in">
                        <div className="flex items-center justify-between mb-1">
                          <strong className="text-[#0b3d59] font-bold block">{ind.nome}</strong>
                          <span className="text-[8.5px] px-1 py-0.2 rounded-md bg-rose-100 text-rose-700 font-bold border border-rose-150">Risco: {ind.riscoAmbiental}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-normal">{ind.atividade}</p>
                        <div className="mt-1 text-[9px] text-[#2d6a4f] font-semibold bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-md inline-block">
                          🎯 ODS Associadas: {ind.odsRelacionadas.map(o => `ODS ${o}`).join(', ')}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-[11px] text-gray-400 bg-gray-50 border border-gray-150 rounded-xl">
                      Nenhuma indústria de grande porte com riscos mapeados na região direta de {cityInput || 'Todos'}.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3. Real Citizen Evaluation Feed (Evaluations and Complaints verified by location) */}
            <div className="bg-white border border-[#e9ecef] rounded-3xl p-5 shadow-sm flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                <div className="flex items-center space-x-1.5">
                  <Star className="h-4.5 w-4.5 text-yellow-500 fill-yellow-500" />
                  <h3 className="font-sans font-bold text-xs text-[#1b4332] uppercase tracking-wide">Avaliações demonstrativas</h3>
                </div>
                <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest bg-[#f5f7f6] px-1.5 py-0.5 rounded-md">
                  Vizinhança ({filteredReviews.length})
                </span>
              </div>

              {/* Local quality scoring indices */}
              {reviewAverages && (
                <div className="grid grid-cols-3 gap-2 p-2 bg-[#f5f7f6] rounded-xl border border-gray-150 mb-3 text-center text-[10px]">
                  <div>
                    <span className="text-gray-450 block text-[8px] uppercase font-bold">Qualidade do Ar</span>
                    <strong className="text-[#2d3436] font-extrabold">{reviewAverages.ar} / 5.0</strong>
                  </div>
                  <div>
                    <span className="text-gray-450 block text-[8px] uppercase font-bold">Conforto Acústico</span>
                    <strong className="text-[#2d3436] font-extrabold">{reviewAverages.som} / 5.0</strong>
                  </div>
                  <div>
                    <span className="text-gray-450 block text-[8px] uppercase font-bold">Bem-Estar Geral</span>
                    <strong className="text-[#2d3436] font-extrabold">{reviewAverages.vida} / 5.0</strong>
                  </div>
                </div>
              )}

              {/* Verified testimonies stream */}
              <div className="space-y-2.5 overflow-y-auto max-h-[175px] pr-1 flex-grow custom-scrollbar text-left font-sans">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((rev) => (
                    <div key={rev.id} className="p-3 bg-white border border-gray-150 rounded-xl space-y-1.5 text-xs shadow-3xs animate-fade-in relative">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#123524] font-semibold">{rev.autor}</strong>
                        <span className="text-[9px] text-[#F28C28] font-bold">{rev.bairro} ({rev.uf})</span>
                      </div>
                      <p className="text-gray-650 text-[10.5px] leading-relaxed italic font-normal">
                        "{rev.depoimento}"
                      </p>
                      <div className="flex items-center justify-between text-[9px] text-gray-450 pt-1 border-t border-gray-100 font-mono">
                        <span>Nota Qualidade de Vida: <strong className="text-gray-700">{rev.notaQualidadeVida}/5</strong></span>
                        <span>Mapeado em {rev.data}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-[11px] text-gray-400 border border-dashed border-gray-150 rounded-xl">
                    Sem depoimentos adicionados para {cityInput || 'esta UF'}.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* ===================== VISUAL GALLERY SECTION ===================== */}
        <div className="mt-16 pt-16 border-t border-[#A8CBB1]/30 text-left">
          <div className="mb-8">
            <span className="text-xs font-bold text-[#F28C28] tracking-wider uppercase block mb-1">Registros Fotográficos</span>
            <h3 className="font-sans font-black text-2xl text-[#123524] tracking-tight">
              Galeria de evidências territoriais
            </h3>
            <p className="text-[#4B5F55] text-xs sm:text-sm max-w-xl mt-1">
              Imagens representativas para demonstrar como a plataforma organizaria fotos, status e encaminhamentos de relatos comunitários. Em um piloto real, esses espaços seriam substituídos por registros enviados pela comunidade.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galeriaDeImpactos.map((item) => {
              const statusColors = {
                'Em Análise': 'bg-[#FFF3E0] text-[#C44A1C] border-[#F6C56B]',
                'Vistoriado': 'bg-[#123524] text-[#FFFFFF] border-transparent',
                'Ação Planejada': 'bg-[#123524] text-[#FFFFFF] border-transparent',
                'Resolvido': 'bg-[#123524] text-[#FFFFFF] border-transparent'
              };

              return (
                <div 
                  key={item.id}
                  className="bg-white border border-[#A8CBB1]/40 rounded-2.5xl overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#123524]/50 transition-all duration-300 group"
                >
                  <div>
                    {/* Image Header with Hover Accent */}
                    <div className="relative h-44 overflow-hidden bg-[#E8F1EA] ecovoz-image-fallback cursor-pointer" onClick={() => setSelectedGalleryItem(item)}>
                      <img
                        src={item.imagemUrl}
                        alt={item.titulo}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#123524]/70 via-[#123524]/20 to-transparent"></div>

                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                        <span className="text-[9px] font-black uppercase tracking-wider bg-[#123524] text-white px-2 py-0.5 rounded-md shadow-sm">
                          {item.categoria}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-wider bg-white/90 text-[#C44A1C] px-2 py-0.5 rounded-md shadow-sm">
                          Representativa
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className={`text-[8.5px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${statusColors[item.status]}`}>
                          {item.status}
                        </span>
                        <div className="flex items-center space-x-1 text-gray-400 text-[10px] font-semibold">
                          <Calendar className="h-3 w-3" />
                          <span>{item.data}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase font-black tracking-widest text-[#2F6B4F]">Território</p>
                        <p className="text-xs font-semibold text-[#4B5F55] truncate">{item.localizacao}</p>
                      </div>

                      <h4 className="font-sans font-black text-base text-[#123524] leading-tight">
                        {item.titulo}
                      </h4>

                      <p className="text-[#4B5F55] text-xs font-normal leading-relaxed line-clamp-2">
                        {item.descricao}
                      </p>
                    </div>
                  </div>

                  {/* Card Trigger Button footer */}
                  <div className="p-5 pt-0 border-t border-gray-100/50 mt-2">
                    <button
                      onClick={() => setSelectedGalleryItem(item)}
                      className="w-full py-2.5 bg-[#123524] hover:bg-[#2F6B4F] text-white font-extrabold rounded-xl text-xs transition-all flex items-center justify-center space-x-1 shadow-2xs hover:shadow-xs cursor-pointer active:scale-95 active:bg-[#123524] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123524]"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Ver detalhes do registro</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================== GALLERY ZOOM DETAILED MODAL ===================== */}
        {selectedGalleryItem && (
          <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-[#DDE8D8] rounded-3xl max-w-2xl w-full overflow-hidden shadow-sm relative text-left animate-scale-up max-h-[90vh] flex flex-col text-[#16231C]">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedGalleryItem(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-xl bg-black/60 text-white hover:bg-black/80 border border-white/20 hover:scale-105 transition-all cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="overflow-y-auto custom-scrollbar flex-grow">
                {/* Hero Zoomed Image */}
                <div className="relative h-64 sm:h-72 bg-gray-900">
                  <img 
                    src={selectedGalleryItem.imagemUrl} 
                    alt={selectedGalleryItem.titulo} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Floating Labels over Hero image */}
                  <div className="absolute bottom-6 left-6 right-6 text-left ecovoz-media-overlay">
                    <span className="text-[10px] font-black uppercase bg-[#F28C28] text-white px-2.5 py-1 rounded-md mb-2 inline-block">
                      {selectedGalleryItem.categoria} • Registro demonstrativo
                    </span>
                    <h3 className="font-sans font-black text-xl sm:text-2xl tracking-tight leading-snug text-white">
                      {selectedGalleryItem.titulo}
                    </h3>
                  </div>
                </div>

                {/* Info and Metadata details block */}
                <div className="p-6 md:p-8 space-y-6">
                  
                  {/* Status header progress with clean metadata cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-[#DDE8D8] pb-5 text-xs text-[#16231C]">
                    <div className="flex items-center space-x-3 bg-[#F8FAF7] border border-[#DDE8D8] p-3 rounded-xl shadow-xs">
                      <MapPin className="h-5 w-5 text-[#2F6B4F] shrink-0" />
                      <div className="min-w-0">
                        <span className="block font-bold text-[#4B5F55] uppercase text-[9px] tracking-wider">Localização</span>
                        <strong className="text-[#16231C] font-semibold text-xs block truncate" title={selectedGalleryItem.localizacao}>{selectedGalleryItem.localizacao}</strong>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 bg-[#F8FAF7] border border-[#DDE8D8] p-3 rounded-xl shadow-xs">
                      <Calendar className="h-5 w-5 text-[#F28C28] shrink-0" />
                      <div className="min-w-0">
                        <span className="block font-bold text-[#4B5F55] uppercase text-[9px] tracking-wider">Data do Registro</span>
                        <strong className="text-[#16231C] font-semibold text-xs block truncate">{selectedGalleryItem.data}</strong>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-[#F8FAF7] border border-[#DDE8D8] p-3 rounded-xl shadow-xs">
                      <User className="h-5 w-5 text-[#2F6B4F] shrink-0" />
                      <div className="min-w-0">
                        <span className="block font-bold text-[#4B5F55] uppercase text-[9px] tracking-wider font-sans">Origem</span>
                        <strong className="text-[#16231C] font-semibold text-xs block truncate" title={selectedGalleryItem.autor}>
                          {selectedGalleryItem.autor}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Complete Description panel */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-extrabold text-[#123524] uppercase tracking-widest font-mono">Descrição do registro demonstrativo</h4>
                    <p className="text-[#16231C] text-xs sm:text-sm leading-relaxed bg-[#F8FAF7] p-4 rounded-2xl border border-[#DDE8D8]">
                      {selectedGalleryItem.descricao}
                    </p>
                  </div>

                  {/* Interactive Status Flow indicator bar */}
                  <div className="space-y-3 pt-2 text-[#16231C]">
                    <h4 className="text-[10px] font-extrabold text-[#123524] uppercase tracking-widest font-mono">Fases Operacionais da Solução</h4>
                    <div className="grid grid-cols-4 gap-2 text-center text-[9px] font-bold uppercase tracking-wider">
                      
                      {/* Step 1: Análise */}
                      <div className={`py-2 px-1 rounded-lg border ${
                        selectedGalleryItem.status === 'Em Análise'
                          ? 'bg-[#FFF3E0] text-[#C44A1C] border-[#F6C56B] font-extrabold shadow-sm'
                          : 'bg-[#FFFFFF] text-[#123524] border-[#DDE8D8]'
                      }`}>
                        1. Análise
                      </div>

                      {/* Step 2: Vistoria */}
                      <div className={`py-2 px-1 rounded-lg border ${
                        selectedGalleryItem.status === 'Vistoriado'
                          ? 'bg-[#123524] text-[#FFFFFF] border-transparent font-extrabold shadow-sm'
                          : 'bg-[#FFFFFF] text-[#123524] border-[#DDE8D8]'
                      }`}>
                        2. Vistoria
                      </div>

                      {/* Step 3: Planejado */}
                      <div className={`py-2 px-1 rounded-lg border ${
                        selectedGalleryItem.status === 'Ação Planejada'
                          ? 'bg-[#123524] text-[#FFFFFF] border-transparent font-extrabold shadow-sm'
                          : 'bg-[#FFFFFF] text-[#123524] border-[#DDE8D8]'
                      }`}>
                        3. Planejado
                      </div>

                      {/* Step 4: Resolvido */}
                      <div className={`py-2 px-1 rounded-lg border ${
                        selectedGalleryItem.status === 'Resolvido'
                          ? 'bg-[#123524] text-[#FFFFFF] border-transparent font-extrabold shadow-sm'
                          : 'bg-[#FFFFFF] text-[#123524] border-[#DDE8D8]'
                      }`}>
                        4. Resolvido
                      </div>

                    </div>
                  </div>

                </div>
              </div>

              {/* Modal footer control */}
              <div className="p-5 border-t border-[#DDE8D8] flex justify-end">
                <button
                  onClick={() => setSelectedGalleryItem(null)}
                  className="px-6 py-2.5 bg-[#123524] hover:bg-[#2F6B4F] text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer transition-all active:scale-95"
                >
                  Fechar registro
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
