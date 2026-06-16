import React from 'react';
import { Shield, Sparkles, AlertTriangle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1b4332] border-t border-[#133225] py-12 text-left text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#133225]">
          
          {/* Col 1: Brand pitch */}
          <div className="space-y-3">
            <span className="font-heading font-extrabold text-[#f5f7f6] text-base tracking-tight flex items-center space-x-2">
              <span>Plataforma Socioambiental ESG</span>
            </span>
            <p className="text-xs text-emerald-100/80 leading-relaxed max-w-sm">
              Um protótipo institucional voltado à integridade de escuta comunitária, mitigando o racismo ambiental através da inovação aplicada ao território siderúrgico.
            </p>
          </div>

          {/* Col 2: High stakes taglines */}
          <div className="space-y-2 text-xs text-emerald-100/90">
            <span className="text-[10px] uppercase font-bold text-[#f28f3b] block tracking-widest">Slogan Operacional</span>
            <ul className="space-y-1 bg-[#133225]/40 p-3 rounded-xl border border-emerald-900/10">
              <li className="flex items-center">✨ Transformar escuta em ação.</li>
              <li className="flex items-center">📊 Dados para decisões socioambientais justas.</li>
              <li className="flex items-center">🌱 Sustentabilidade significa justiça territorial.</li>
            </ul>
          </div>

          {/* Col 3: Academic verification */}
          <div className="space-y-2 text-xs">
            <span className="text-[10px] uppercase font-bold text-emerald-200 block tracking-widest">Status de Publicação</span>
            <div className="bg-[#133225]/40 border border-[#133225] p-3 rounded-xl flex items-start space-x-2 text-emerald-100/80 leading-relaxed">
              <AlertTriangle className="h-4.5 w-4.5 text-[#f28f3b] shrink-0 mt-0.5" />
              <span>
                <strong>Trabalho Dirigido:</strong> Código elaborado sob preceitos sustentáveis de desenvolvimento web front-end. Protótipo simulado conceitual.
              </span>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-100/60 font-medium">
          <span>
            © 2026 Plataforma de Escuta, Mapeamento e Soluções Socioambientais • Engenharia de Software ESG
          </span>
          <span className="mt-2 sm:mt-0 flex items-center bg-[#133225] px-3 py-1 rounded-md text-emerald-200 border border-[#133225]">
            <Shield className="h-3 w-3 mr-1 text-[#f28f3b]" /> Ambiente de Visualização Acadêmica Ativo
          </span>
        </div>

      </div>
    </footer>
  );
}
