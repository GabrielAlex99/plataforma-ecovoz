import React, { useState } from 'react';
import {
  BarChart3,
  BookOpen,
  ExternalLink,
  FileText,
  Heart,
  MapPin,
  MessageSquare,
  Newspaper,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { realImpactStats } from '../data/impactStats';
import { publicEvidenceCases, documentedRacismCases } from '../data/realCases';

type TabKey = 'indicadores' | 'relatos' | 'evidencias';
type FiltroRelato = 'Todos' | 'Ar' | 'Água' | 'Ruído';

interface RelatoDemo {
  id: string;
  perfil: string;
  local: string;
  categoria: 'Ar' | 'Água' | 'Ruído';
  queixa: string;
  resumo: string;
  impacto: string;
  cotidiano: string;
  prioridade: 'Alta' | 'Média';
}

const relatosDemo: RelatoDemo[] = [
  {
    id: 'demo-ar-1',
    perfil: 'Moradora do território, 64 anos',
    local: 'Santa Cruz - RJ',
    categoria: 'Ar',
    queixa: 'Poeira industrial recorrente sobre quintais e roupas',
    resumo:
      'Exemplo representativo de relato para demonstrar como a plataforma registra queixas de poeira, fuligem e incômodo respiratório em áreas próximas a polos industriais.',
    impacto: 'Irritação respiratória e redução do uso de áreas externas da casa.',
    cotidiano: 'Janelas fechadas por longos períodos, roupas sujas por poeira e necessidade de registrar recorrência do problema.',
    prioridade: 'Alta',
  },
  {
    id: 'demo-ar-2',
    perfil: 'Morador do território, 52 anos',
    local: 'Cubatão - SP',
    categoria: 'Ar',
    queixa: 'Odor químico em horários de baixa ventilação',
    resumo:
      'Exemplo demonstrativo de denúncia sobre cheiro forte e incômodo em períodos noturnos, útil para testar triagem, mapa e encaminhamento técnico.',
    impacto: 'Desconforto, tosse e dificuldade de permanência em áreas abertas.',
    cotidiano: 'O relato ajuda a indicar horários críticos e orientar verificação por órgãos responsáveis.',
    prioridade: 'Alta',
  },
  {
    id: 'demo-agua-1',
    perfil: 'Trabalhador da pesca artesanal',
    local: 'Guarujá - SP',
    categoria: 'Água',
    queixa: 'Manchas de óleo e resíduos em canais próximos à comunidade',
    resumo:
      'Exemplo visual de como moradores poderiam registrar imagens, localização e descrição de contaminação hídrica percebida no território.',
    impacto: 'Risco para pesca, lazer e segurança alimentar local.',
    cotidiano: 'A plataforma organiza a recorrência e fortalece a cobrança por resposta técnica.',
    prioridade: 'Média',
  },
  {
    id: 'demo-ruido-1',
    perfil: 'Moradora do território, 38 anos',
    local: 'Ipatinga - MG',
    categoria: 'Ruído',
    queixa: 'Ruídos e vibrações durante a madrugada',
    resumo:
      'Exemplo de relato sobre incômodo sonoro e vibração residencial, usado apenas para demonstrar o fluxo de classificação por categoria.',
    impacto: 'Sono interrompido, estresse e dificuldade de concentração.',
    cotidiano: 'O registro recorrente pode apoiar análise de horários, áreas mais afetadas e possíveis medidas mitigadoras.',
    prioridade: 'Média',
  },
];

const tabConfig = [
  { id: 'indicadores' as TabKey, label: 'Indicadores oficiais', icon: BarChart3 },
  { id: 'relatos' as TabKey, label: 'Relatos demonstrativos', icon: MessageSquare },
  { id: 'evidencias' as TabKey, label: 'Fontes e evidências', icon: Newspaper },
];

function Badge({ children, tone = 'green' }: { children: React.ReactNode; tone?: 'green' | 'orange' | 'soft' }) {
  const classes =
    tone === 'orange'
      ? 'bg-[#FFF3E0] text-[#C44A1C] border-[#F6C56B]'
      : tone === 'soft'
        ? 'bg-[#F4F7F2] text-[#4B5F55] border-[#DDE8D8]'
        : 'bg-[#E8F1EA] text-[#123524] border-[#A8CBB1]';

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${classes}`}>
      {children}
    </span>
  );
}

export default function CommunityPains() {
  const [activeTab, setActiveTab] = useState<TabKey>('indicadores');
  const [activeFiltro, setActiveFiltro] = useState<FiltroRelato>('Todos');
  const [selectedRelato, setSelectedRelato] = useState<string>(relatosDemo[0].id);

  const filteredRelatos = activeFiltro === 'Todos' ? relatosDemo : relatosDemo.filter((relato) => relato.categoria === activeFiltro);
  const currentRelato = filteredRelatos.find((relato) => relato.id === selectedRelato) || filteredRelatos[0] || relatosDemo[0];

  const filters: FiltroRelato[] = ['Todos', 'Ar', 'Água', 'Ruído'];

  return (
    <div id="dores" className="bg-[#F4F7F2] text-[#16231C] py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <section className="bg-white border border-[#DDE8D8] rounded-[28px] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <Badge tone="orange">Diagnóstico socioambiental</Badge>
              <h1 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-[#123524]">
                Impactos no Território
              </h1>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#4B5F55]">
                Dados públicos e exemplos de relatos organizados para demonstrar como o EcoVoz transforma escuta comunitária em evidências, prioridades e encaminhamentos.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 rounded-2xl border border-[#DDE8D8] bg-[#F8FAF7] p-1.5">
              {tabConfig.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold transition-all ${
                      active
                        ? 'bg-[#123524] text-white shadow-sm'
                        : 'bg-white text-[#123524] hover:bg-[#E8F1EA] border border-[#DDE8D8]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {activeTab === 'indicadores' && (
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {realImpactStats.slice(0, 4).map((stat) => (
                <article key={stat.id} className="bg-white border border-[#DDE8D8] rounded-2xl p-6 shadow-sm flex flex-col min-h-[260px]">
                  <div className="flex items-start justify-between gap-4">
                    <Badge>{stat.label}</Badge>
                    <ShieldCheck className="h-5 w-5 text-[#2F6B4F] shrink-0" />
                  </div>
                  <strong className="mt-5 text-3xl font-black text-[#C44A1C]">{stat.displayValue}</strong>
                  <p className="mt-2 text-[11px] font-black uppercase tracking-wider text-[#4B5F55]">{stat.category}</p>
                  <h3 className="mt-2 text-lg font-black leading-tight text-[#123524]">{stat.metricName}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B5F55] flex-1">{stat.description}</p>
                  <a
                    href={stat.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#2F6B4F] hover:text-[#123524]"
                  >
                    Fonte: {stat.sourceName}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </article>
              ))}
            </div>

            <div className="bg-white border border-[#DDE8D8] rounded-[28px] p-6 sm:p-8 shadow-sm">
              <div className="max-w-3xl">
                <Badge tone="orange">Casos documentados</Badge>
                <h2 className="mt-4 text-2xl sm:text-3xl font-black text-[#123524]">Casos reais que mostram por que a EcoVoz importa</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5F55]">
                  Indicadores mostram a escala do problema. Casos documentados revelam o impacto humano: território, saúde, moradia, pesca, memória e permanência comunitária.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
                {documentedRacismCases.map((caseItem) => (
                  <article key={caseItem.id} className="overflow-hidden rounded-3xl border border-[#DDE8D8] bg-white shadow-sm flex flex-col hover:shadow-md transition-shadow">
                    <div className="relative h-48 bg-[#E8F1EA] overflow-hidden">
                      {caseItem.imageUrl ? (
                        <img
                          src={caseItem.imageUrl}
                          alt={caseItem.imageCaption || caseItem.title}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(event) => {
                            event.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#123524]/75 via-[#123524]/25 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge tone="orange">{caseItem.label}</Badge>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-xl font-black leading-tight text-[#123524]">{caseItem.title}</h3>
                      <p className="mt-1 text-[11px] font-black uppercase tracking-wider text-[#2F6B4F]">{caseItem.location}</p>
                      <p className="mt-3 text-sm leading-relaxed text-[#4B5F55]">{caseItem.context}</p>
                      <div className="mt-4 rounded-2xl bg-[#F8FAF7] border border-[#DDE8D8] p-4">
                        <p className="text-[10px] font-black uppercase tracking-wider text-[#C44A1C]">Impacto humano</p>
                        <p className="mt-2 text-sm text-[#16231C] leading-relaxed">{caseItem.humanImpact}</p>
                      </div>
                      {caseItem.imageCaption && (
                        <p className="mt-3 text-[10px] text-[#4B5F55] italic">{caseItem.imageCaption}</p>
                      )}
                      <a
                        href={caseItem.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#2F6B4F] hover:text-[#123524]"
                      >
                        Fonte: {caseItem.sourceName}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#DDE8D8] rounded-[28px] p-6 sm:p-8 shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
                <div>
                  <Badge tone="soft">Leitura correta dos dados</Badge>
                  <h2 className="mt-4 text-2xl font-black text-[#123524]">Dados oficiais + protótipo demonstrativo</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B5F55]">
                    Os indicadores acima usam fontes públicas. Já os relatos da próxima seção são exemplos simulados para demonstrar o funcionamento da plataforma, e não entrevistas reais.
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-[#F8FAF7] border border-[#DDE8D8] p-4">
                    <BookOpen className="h-5 w-5 text-[#F28C28]" />
                    <h3 className="mt-3 text-sm font-black text-[#123524]">Dado oficial</h3>
                    <p className="mt-1 text-xs text-[#4B5F55]">Possui fonte pública e link verificável.</p>
                  </div>
                  <div className="rounded-2xl bg-[#F8FAF7] border border-[#DDE8D8] p-4">
                    <FileText className="h-5 w-5 text-[#2F6B4F]" />
                    <h3 className="mt-3 text-sm font-black text-[#123524]">Relato documentado</h3>
                    <p className="mt-1 text-xs text-[#4B5F55]">Deve vir de notícia, estudo ou registro real.</p>
                  </div>
                  <div className="rounded-2xl bg-[#F8FAF7] border border-[#DDE8D8] p-4">
                    <Users className="h-5 w-5 text-[#2F6B4F]" />
                    <h3 className="mt-3 text-sm font-black text-[#123524]">Demonstração</h3>
                    <p className="mt-1 text-xs text-[#4B5F55]">Exemplo criado para validar o protótipo.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'relatos' && (
          <section className="bg-white border border-[#DDE8D8] rounded-[28px] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DDE8D8] pb-6">
              <div>
                <Badge tone="soft">Demonstração do protótipo</Badge>
                <h2 className="mt-4 text-2xl font-black text-[#123524]">Relatos representativos do protótipo</h2>
                <p className="mt-2 text-sm text-[#4B5F55]">
                  Exemplos de relatos comunitários para demonstrar como a plataforma organiza problemas do território.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFiltro(filter);
                      const next = filter === 'Todos' ? relatosDemo[0] : relatosDemo.find((item) => item.categoria === filter);
                      if (next) setSelectedRelato(next.id);
                    }}
                    className={`rounded-full px-4 py-2 text-xs font-extrabold border transition-all ${
                      activeFiltro === filter
                        ? 'bg-[#123524] text-white border-[#123524]'
                        : 'bg-white text-[#123524] border-[#DDE8D8] hover:bg-[#E8F1EA]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 mt-6">
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredRelatos.map((relato) => {
                  const selected = currentRelato.id === relato.id;
                  return (
                    <button
                      key={relato.id}
                      onClick={() => setSelectedRelato(relato.id)}
                      className={`w-full text-left rounded-2xl border p-5 transition-all ${
                        selected
                          ? 'bg-[#FFF8EF] border-[#F6C56B] shadow-sm'
                          : 'bg-white border-[#DDE8D8] hover:border-[#A8CBB1] hover:bg-[#F8FAF7]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-base font-black text-[#123524]">{relato.perfil}</h3>
                          <p className="mt-1 text-xs text-[#4B5F55]">{relato.local}</p>
                        </div>
                        <span className="rounded-full bg-[#E8F1EA] px-2.5 py-1 text-[10px] font-black text-[#2F6B4F]">
                          {relato.categoria}
                        </span>
                      </div>
                      <p className="mt-4 text-sm italic text-[#4B5F55]">“{relato.queixa}”</p>
                    </button>
                  );
                })}
              </div>

              <article className="rounded-[28px] border border-[#DDE8D8] bg-[#F8FAF7] p-5 sm:p-7 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#FFF3E0] border border-[#F6C56B] flex items-center justify-center text-[#C44A1C] font-black">
                      D
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-black text-[#123524]">{currentRelato.perfil}</h3>
                        <Badge tone="orange">{currentRelato.prioridade}</Badge>
                      </div>
                      <p className="mt-1 inline-flex items-center gap-1 text-sm text-[#4B5F55]"><MapPin className="h-4 w-4 text-[#F28C28]" />{currentRelato.local}</p>
                    </div>
                  </div>
                  <Badge tone="soft">Demonstração do protótipo</Badge>
                </div>

                <div className="mt-6 rounded-2xl bg-white border border-[#DDE8D8] p-5">
                  <p className="text-[11px] font-black uppercase tracking-wider text-[#F28C28]">Queixa coletiva</p>
                  <p className="mt-2 text-sm italic text-[#16231C]">“{currentRelato.queixa}”</p>
                </div>

                <div className="mt-5 rounded-2xl bg-white border border-[#DDE8D8] p-5">
                  <p className="text-[11px] font-black uppercase tracking-wider text-[#123524]">Relato demonstrativo</p>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#4B5F55]">{currentRelato.resumo}</p>
                </div>

                <div className="mt-5 grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white border border-[#DDE8D8] p-5">
                    <Heart className="h-5 w-5 text-[#C44A1C]" />
                    <h4 className="mt-3 text-sm font-black text-[#123524]">Impacto percebido</h4>
                    <p className="mt-2 text-sm text-[#4B5F55]">{currentRelato.impacto}</p>
                  </div>
                  <div className="rounded-2xl bg-white border border-[#DDE8D8] p-5">
                    <Users className="h-5 w-5 text-[#2F6B4F]" />
                    <h4 className="mt-3 text-sm font-black text-[#123524]">Cotidiano afetado</h4>
                    <p className="mt-2 text-sm text-[#4B5F55]">{currentRelato.cotidiano}</p>
                  </div>
                </div>
              </article>
            </div>
          </section>
        )}

        {activeTab === 'evidencias' && (
          <section className="space-y-6">
            <div className="bg-white border border-[#DDE8D8] rounded-[28px] p-6 sm:p-8 shadow-sm">
              <div className="max-w-3xl">
                <Badge>Base técnica</Badge>
                <h2 className="mt-4 text-2xl sm:text-3xl font-black text-[#123524]">Base técnica e evidências do projeto</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4B5F55]">
                  Esta área explica quais fontes sustentam a proposta e como elas podem alimentar a EcoVoz. Ela não substitui perícia, monitoramento oficial ou consulta comunitária; funciona como base inicial para estruturar dados, mapas e critérios de priorização.
                </p>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-[#F8FAF7] border border-[#DDE8D8] p-5">
                  <BookOpen className="h-5 w-5 text-[#2F6B4F]" />
                  <h3 className="mt-3 text-sm font-black text-[#123524]">1. Dados oficiais</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#4B5F55]">Bases públicas como IBGE, Ipea, MMA, MapBiomas e SEEG ajudam a contextualizar saneamento, emissões, qualidade ambiental e transformação territorial.</p>
                </div>
                <div className="rounded-2xl bg-[#F8FAF7] border border-[#DDE8D8] p-5">
                  <Newspaper className="h-5 w-5 text-[#F28C28]" />
                  <h3 className="mt-3 text-sm font-black text-[#123524]">2. Casos documentados</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#4B5F55]">Registros jornalísticos, mapas de conflitos e estudos mostram o impacto humano que os indicadores isolados não conseguem traduzir.</p>
                </div>
                <div className="rounded-2xl bg-[#F8FAF7] border border-[#DDE8D8] p-5">
                  <ShieldCheck className="h-5 w-5 text-[#2F6B4F]" />
                  <h3 className="mt-3 text-sm font-black text-[#123524]">3. Aplicação na EcoVoz</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#4B5F55]">As fontes orientam filtros, indicadores, matriz de risco, priorização de soluções e transparência para stakeholders.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {publicEvidenceCases.slice(0, 4).map((caseItem) => (
                <article key={caseItem.id} className="rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <Badge>{caseItem.label}</Badge>
                    <Newspaper className="h-5 w-5 text-[#2F6B4F]" />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#123524] leading-tight">{caseItem.title}</h3>
                  <p className="mt-1 text-xs font-bold text-[#4B5F55]">{caseItem.location}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B5F55]">{caseItem.context}</p>
                  {caseItem.parameters && (
                    <div className="mt-4 rounded-2xl border border-[#DDE8D8] bg-[#F8FAF7] p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#2F6B4F]">Como pode alimentar o EcoVoz</p>
                      <p className="mt-2 text-xs leading-relaxed text-[#4B5F55]">{caseItem.parameters}</p>
                    </div>
                  )}
                  <a
                    href={caseItem.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#2F6B4F] hover:text-[#123524]"
                  >
                    Fonte: {caseItem.sourceName}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
