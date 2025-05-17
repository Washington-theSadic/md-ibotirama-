
import React from 'react';
import { useInView } from '@/hooks/useInView';
import { Badge } from "@/components/ui/badge";
import { Check } from 'lucide-react';

export const Advantages = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  
  const advantages = [
    "Catálogo do estabelecimento dentro da plataforma",
    "Equipe de Monitoramento (07:30–23:30)",
    "Suporte Técnico Online",
    "Equipe de Marketing",
    "Treinamento passo a passo",
    "Equipe de Entregadores",
    "Consultor de Suporte Local",
    "Campanhas, Cupons, Promoções e Parcerias",
    "Flexibilidade na Entrega (própria ou Mais Delivery)"
  ];

  return (
    <section id="vantagens" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-[#C8102E]">
          Por que milhares de negócios escolhem o Mais Delivery?
        </h2>
        
        <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
          Mais do que uma plataforma — uma solução completa para o seu negócio crescer
        </p>
        
        <div 
          ref={ref} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-3 bg-white rounded-full px-4 py-3 shadow-sm transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-8 h-8 rounded-full bg-[#C8102E]/10 flex items-center justify-center flex-shrink-0">
                <Check className={`w-4 h-4 text-[#C8102E] ${inView ? 'animate-pulse' : ''}`} />
              </div>
              <span className="text-gray-700">{advantage}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
