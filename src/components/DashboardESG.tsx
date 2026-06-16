import React from 'react';
import { Relato, Proposta, PlataformaUser } from '../types';
import {
  BarChart3,
  CheckCircle2,
  ExternalLink,
  FileText,
  PieChart as PieChartIcon,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  domiciliosSemBanheiroIpea,
  esgotamentoCorRacaIBGE,
} from '../data/dashboardData';

interface DashboardESGProps {
  relatos: Relato[];
  propostas: Proposta[];
  currentUser?: PlataformaUser | null;
}

const chartColors = ['#2F6B4F', '#F28C28', '#A8CBB1', '#C44A1C', '#6B8F71', '#F6C56B'];

function Badge({ children, tone = 'green' }: { children: React.ReactNode; tone?: 'green' | 'orange' | 'soft' }) {
  const classes =
    tone === 'orange'
      ? 'bg-[#FFF3E0] text-[#C44A1C] border-[#F6C56B]'
      : tone === 'soft'
        ? 'bg-[#F4F7F2] text-[#4B5F55] border-[#DDE8D8]'
        : 'bg-[#E8F1EA] text-[#123524] border-[#A8CBB1]';

  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${classes}`}>{children}</span>;
}

function SourceLink({ name, url }: { name: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-[#2F6B4F] hover:text-[#123524]">
      Fonte: {name}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}

function ChartCard({ title, description, label, sourceName, sourceUrl, children }: {
  title: string;
  description: string;
  label: string;
  sourceName?: string;
  sourceUrl?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="bg-white border border-[#DDE8D8] rounded-[28px] p-5 sm:p-6 shadow-sm min-h-[420px] flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <Badge tone={label.includes('Demonstração') ? 'orange' : 'green'}>{label}</Badge>
          <h3 className="mt-3 text-lg font-black text-[#123524] leading-tight">{title}</h3>
          <p className="mt-2 text-sm text-[#4B5F55] leading-relaxed">{description}</p>
        </div>
        <BarChart3 className="h-6 w-6 text-[#2F6B4F] shrink-0" />
      </div>
      <div className="flex-1 min-h-[260px]">{children}</div>
      {sourceName && sourceUrl && <div className="pt-4 mt-4 border-t border-[#DDE8D8]"><SourceLink name={sourceName} url={sourceUrl} /></div>}
    </article>
  );
}

export default function DashboardESG({ relatos, propostas, currentUser }: DashboardESGProps) {
  const categoriaCounts = relatos.reduce<Record<string, number>>((acc, relato) => {
    acc[relato.categoria] = (acc[relato.categoria] || 0) + Math.max(1, relato.numRelatos || 1);
    return acc;
  }, {});

  const categoryData = Object.entries(categoriaCounts).map(([name, total]) => ({ name, Total: total }));
  const categoryChartData = categoryData.length > 0 ? categoryData : [
    { name: 'Ar', Total: 3 },
    { name: 'Água', Total: 2 },
    { name: 'Ruído', Total: 2 },
    { name: 'Resíduos', Total: 1 },
  ];

  const statusData = [
    { name: 'Em discussão', value: propostas.filter((p) => !p.status || p.status === 'Em Discussão').length },
    { name: 'Em andamento', value: propostas.filter((p) => p.status === 'Em Andamento').length },
    { name: 'Implementadas', value: propostas.filter((p) => p.status === 'Implementado').length },
  ].map((item) => ({ ...item, value: item.value || 0 }));

  const totalSolucoes = statusData.reduce((sum, item) => sum + item.value, 0);
  const statusDisplay = totalSolucoes > 0 ? statusData : [
    { name: 'Em discussão', value: 1 },
    { name: 'Em andamento', value: 1 },
    { name: 'Implementadas', value: 0 },
  ];

  const gravidadeData = ['Baixa', 'Média', 'Alta', 'Crítica'].map((nivel) => ({
    name: nivel,
    Total: relatos.filter((relato) => relato.gravidade === nivel).length,
  }));

  const totalRelatos = relatos.length;
  const totalCriticos = relatos.filter((relato) => relato.gravidade === 'Crítica').length;

  const tooltipStyle = {
    background: '#FFFFFF',
    border: '1px solid #DDE8D8',
    borderRadius: '12px',
    color: '#16231C',
    boxShadow: '0 10px 30px rgba(18, 53, 36, 0.12)',
  };

  return (
    <section id="dashboard" className="bg-[#F4F7F2] py-10 sm:py-12 text-[#16231C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white border border-[#DDE8D8] rounded-[28px] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <Badge>Indicadores ESG e socioambientais</Badge>
              <h1 className="mt-4 text-3xl sm:text-4xl font-black text-[#123524] tracking-tight">Painel de evidências</h1>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#4B5F55]">
                Visualização clara dos dados oficiais disponíveis e dos dados demonstrativos do protótipo. O painel evita tratar simulações como fatos reais.
              </p>
            </div>
            <div className="rounded-2xl bg-[#F8FAF7] border border-[#DDE8D8] p-4 min-w-[230px]">
              <p className="text-[11px] font-black uppercase tracking-wider text-[#4B5F55]">Sessão atual</p>
              <p className="mt-1 text-sm font-black text-[#123524]">{currentUser ? currentUser.name : 'Modo apresentação'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-[#DDE8D8] rounded-2xl p-5 shadow-sm">
            <FileText className="h-5 w-5 text-[#2F6B4F]" />
            <strong className="block mt-4 text-2xl font-black text-[#123524]">{totalRelatos}</strong>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#4B5F55]">Relatos no protótipo</p>
            <p className="mt-2 text-sm text-[#4B5F55]">Contagem de registros demonstrativos da aplicação.</p>
          </div>
          <div className="bg-white border border-[#DDE8D8] rounded-2xl p-5 shadow-sm">
            <TrendingUp className="h-5 w-5 text-[#F28C28]" />
            <strong className="block mt-4 text-2xl font-black text-[#C44A1C]">{totalCriticos}</strong>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#4B5F55]">Prioridade crítica</p>
            <p className="mt-2 text-sm text-[#4B5F55]">Itens que exigiriam triagem mais rápida.</p>
          </div>
          <div className="bg-white border border-[#DDE8D8] rounded-2xl p-5 shadow-sm">
            <CheckCircle2 className="h-5 w-5 text-[#2F6B4F]" />
            <strong className="block mt-4 text-2xl font-black text-[#123524]">{totalSolucoes}</strong>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#4B5F55]">Soluções cadastradas</p>
            <p className="mt-2 text-sm text-[#4B5F55]">Propostas criadas ou em acompanhamento.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ChartCard
            title={esgotamentoCorRacaIBGE.title}
            description={esgotamentoCorRacaIBGE.description}
            label={esgotamentoCorRacaIBGE.label}
            sourceName={esgotamentoCorRacaIBGE.sourceName}
            sourceUrl={esgotamentoCorRacaIBGE.sourceUrl}
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={esgotamentoCorRacaIBGE.data} margin={{ top: 12, right: 20, left: 6, bottom: 18 }}>
                <CartesianGrid stroke="#DDE8D8" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: '#4B5F55', fontSize: 11 }} interval={0} angle={-10} textAnchor="end" height={50} />
                <YAxis tick={{ fill: '#4B5F55', fontSize: 11 }} width={42} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="Acesso Adequado" fill="#2F6B4F" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title={domiciliosSemBanheiroIpea.title}
            description={domiciliosSemBanheiroIpea.description}
            label={domiciliosSemBanheiroIpea.label}
            sourceName={domiciliosSemBanheiroIpea.sourceName}
            sourceUrl={domiciliosSemBanheiroIpea.sourceUrl}
          >
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={domiciliosSemBanheiroIpea.data} dataKey="Proporção" nameKey="name" cx="50%" cy="50%" innerRadius={62} outerRadius={96} paddingAngle={3}>
                  {domiciliosSemBanheiroIpea.data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              {domiciliosSemBanheiroIpea.data.map((item, index) => (
                <div key={item.name} className="rounded-xl border border-[#DDE8D8] bg-[#F8FAF7] p-3">
                  <span className="inline-block h-2.5 w-2.5 rounded-full mr-2" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
                  <span className="text-xs font-bold text-[#123524]">{item.name}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard
            title="Relatos por categoria"
            description="Distribuição demonstrativa dos relatos cadastrados no protótipo. Não representa base real de pesquisa."
            label="Demonstração do protótipo"
          >
            <div className="category-chart-mobile-fix">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryChartData} layout="vertical" margin={{ top: 10, right: 8, left: -8, bottom: 8 }}>
                  <CartesianGrid stroke="#DDE8D8" strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fill: '#4B5F55', fontSize: 11 }} allowDecimals={false} />
                  <YAxis type="category" dataKey="name" width={86} tick={{ fill: '#4B5F55', fontSize: 10 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="Total" fill="#F28C28" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Status das ações mitigatórias"
            description="Acompanhamento demonstrativo das propostas cadastradas no protótipo."
            label="Demonstração do protótipo"
          >
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={statusDisplay} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={92} label>
                  {statusDisplay.map((_, index) => <Cell key={index} fill={chartColors[index % chartColors.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid sm:grid-cols-3 gap-3 mt-2">
              {statusDisplay.map((item, index) => (
                <div key={item.name} className="rounded-xl border border-[#DDE8D8] bg-[#F8FAF7] p-3">
                  <span className="inline-block h-2.5 w-2.5 rounded-full mr-2" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
                  <span className="text-xs font-bold text-[#123524]">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        <div className="bg-white border border-[#DDE8D8] rounded-[28px] p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <PieChartIcon className="h-6 w-6 text-[#2F6B4F] shrink-0" />
            <div>
              <h2 className="text-xl font-black text-[#123524]">Classificação dos relatos</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#4B5F55]">
                Esta versão não usa IA real para classificar sentimentos. A etapa pode ser implementada futuramente com análise de texto, mas nesta apresentação os dados de categoria e gravidade são tratados como demonstração do protótipo.
              </p>
              <div className="mt-4 grid sm:grid-cols-4 gap-3">
                {gravidadeData.map((item) => (
                  <div key={item.name} className="rounded-2xl bg-[#F8FAF7] border border-[#DDE8D8] p-4">
                    <p className="text-xs font-bold uppercase text-[#4B5F55]">{item.name}</p>
                    <strong className="mt-2 block text-2xl text-[#123524]">{item.Total}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
