import React from 'react';
import { Award, BookOpen, CheckCircle2, Code, Globe2, Handshake, Leaf, MapPinned, ShieldCheck, Target, Users } from 'lucide-react';

interface Pillar {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface OdsCard {
  number: string;
  code: string;
  title: string;
  desc: string;
  color: string;
}

const pilares: Pillar[] = [
  {
    title: 'Escuta comunitária',
    desc: 'Relatos simples, organizados por território, categoria e prioridade.',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Mapeamento territorial',
    desc: 'Visualização dos pontos críticos para orientar resposta e prevenção.',
    icon: <MapPinned className="h-5 w-5" />,
  },
  {
    title: 'Governança ESG',
    desc: 'Evidências, indicadores e rastreabilidade para decisões mais transparentes.',
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: 'Soluções aplicáveis',
    desc: 'Banco de ações sustentáveis para mitigar riscos e gerar impacto mensurável.',
    icon: <Leaf className="h-5 w-5" />,
  },
];

const odsCards: OdsCard[] = [
  {
    number: '3',
    code: 'ODS 3',
    title: 'Saúde e bem-estar',
    desc: 'Redução de exposição a poluição, ruído e riscos ambientais que afetam a saúde cotidiana.',
    color: '#4C9F38',
  },
  {
    number: '6',
    code: 'ODS 6',
    title: 'Água e saneamento',
    desc: 'Apoio ao mapeamento de esgoto, contaminação hídrica e vulnerabilidade sanitária.',
    color: '#26BDE2',
  },
  {
    number: '9',
    code: 'ODS 9',
    title: 'Indústria e inovação',
    desc: 'Uso de tecnologia para aproximar indústria, território e prevenção socioambiental.',
    color: '#F36D25',
  },
  {
    number: '11',
    code: 'ODS 11',
    title: 'Cidades sustentáveis',
    desc: 'Priorização de comunidades vulnerabilizadas no planejamento urbano e ambiental.',
    color: '#FD9D24',
  },
  {
    number: '12',
    code: 'ODS 12',
    title: 'Consumo responsável',
    desc: 'Incentivo a economia circular, gestão de resíduos e rastreabilidade de impactos.',
    color: '#C1971F',
  },
  {
    number: '13',
    code: 'ODS 13',
    title: 'Ação climática',
    desc: 'Integração de dados climáticos, emissões e riscos territoriais para prevenção.',
    color: '#3F7E44',
  },
  {
    number: '15',
    code: 'ODS 15',
    title: 'Vida terrestre',
    desc: 'Valorização de arborização, corredores verdes e recomposição de áreas degradadas.',
    color: '#56C02B',
  },
  {
    number: '17',
    code: 'ODS 17',
    title: 'Parcerias',
    desc: 'Conexão entre empresa, poder público, academia e lideranças comunitárias.',
    color: '#194873',
  },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="relative bg-[#F4F7F2] py-20 text-left text-[#16231C]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(168,203,177,0.36),transparent_28%),radial-gradient(circle_at_90%_5%,rgba(242,140,40,0.08),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center rounded-full border border-[#A8CBB1] bg-white px-4 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#123524] shadow-sm">
              Sobre o EcoVoz
            </span>
            <h2 className="mt-5 max-w-2xl text-3xl font-black leading-tight tracking-tight text-[#123524] md:text-5xl">
              A voz do território vira dado. O dado vira ação.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#4B5F55] md:text-base">
              A EcoVoz é uma proposta de plataforma socioambiental para transformar relatos comunitários em evidências, mapas, prioridades e soluções aplicáveis. O foco é apoiar decisões mais transparentes em territórios afetados por desigualdades ambientais.
            </p>

            <div className="mt-6 rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-[#FFF3E0] p-3 text-[#C44A1C]">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-[#C44A1C]">Proposta de valor</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#4B5F55]">
                    Para comunidades, mais voz e retorno. Para empresas, prevenção de riscos, evidências ESG e priorização de investimentos sociais. Para o território, decisões orientadas por dados verificáveis.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-[32px] border border-[#DDE8D8] bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-[#DDE8D8] pb-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-[#F28C28]">Como o projeto funciona</p>
                  <h3 className="mt-1 text-xl font-black text-[#123524]">Da escuta à resposta concreta</h3>
                </div>
                <Globe2 className="h-7 w-7 text-[#2F6B4F]" />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {pilares.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-[#DDE8D8] bg-[#F8FAF7] p-4">
                    <div className="mb-3 inline-flex rounded-xl bg-white p-2 text-[#2F6B4F] shadow-sm">
                      {item.icon}
                    </div>
                    <h4 className="text-sm font-black text-[#123524]">{item.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#4B5F55]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-[#DDE8D8] pt-12">
          <div className="mb-8 max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-[#A8CBB1] bg-white px-4 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#123524] shadow-sm">
              Agenda 2030
            </span>
            <h3 className="mt-4 text-2xl font-black tracking-tight text-[#123524] md:text-3xl">
              ODS conectadas ao impacto do projeto
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4B5F55]">
              A EcoVoz não tenta resolver todos os Objetivos de Desenvolvimento Sustentável ao mesmo tempo. Ela atua como infraestrutura de escuta e evidência para orientar ações em saúde, saneamento, clima, território e governança.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {odsCards.map((ods) => (
              <article
                key={ods.code}
                className="min-h-[190px] rounded-3xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                style={{ borderColor: `${ods.color}33` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[11px] font-black uppercase tracking-wider" style={{ color: ods.color }}>
                      {ods.code}
                    </p>
                    <h4 className="mt-2 pr-1 text-base font-black leading-tight text-[#123524]">
                      {ods.title}
                    </h4>
                  </div>
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-base font-black text-white shadow-sm"
                    style={{ backgroundColor: ods.color }}
                    aria-hidden="true"
                  >
                    {ods.number}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#4B5F55]">
                  {ods.desc}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-sm">
              <BookOpen className="h-5 w-5 text-[#F28C28]" />
              <h4 className="mt-3 text-sm font-black text-[#123524]">Base técnica</h4>
              <p className="mt-1 text-xs leading-relaxed text-[#4B5F55]">Fontes públicas e casos documentados sustentam a narrativa do projeto.</p>
            </div>
            <div className="rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-sm">
              <Handshake className="h-5 w-5 text-[#2F6B4F]" />
              <h4 className="mt-3 text-sm font-black text-[#123524]">Parcerias possíveis</h4>
              <p className="mt-1 text-xs leading-relaxed text-[#4B5F55]">Empresa, comunidade, universidades e poder público podem atuar com responsabilidades claras.</p>
            </div>
            <div className="rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-[#2F6B4F]" />
              <h4 className="mt-3 text-sm font-black text-[#123524]">Próxima etapa</h4>
              <p className="mt-1 text-xs leading-relaxed text-[#4B5F55]">Validar um piloto local com indicadores, retorno à comunidade e acompanhamento de soluções.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
