
import React from 'react';
import { useInView } from '@/hooks/useInView';

export const Pricing = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  
  const pricingOptions = [
    {
      title: "Taxa Única de Adesão",
      price: "R$ 150,00",
      color: "bg-gradient-to-br from-[#C8102E]/80 to-[#C8102E]"
    },
    {
      title: "Comissão por Pedido",
      price: "9,5%",
      color: "bg-gradient-to-br from-[#5F2C82]/80 to-[#5F2C82]"
    }
  ];

  return (
    <section id="precos" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#C8102E]">
          Preços Transparentes
        </h2>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
        >
          {pricingOptions.map((option, index) => (
            <div 
              key={index}
              className={`rounded-xl overflow-hidden shadow-lg transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`${option.color} py-6 px-8 text-white`}>
                <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                <p className="text-3xl font-bold">{option.price}</p>
              </div>
              
              <div className="bg-white p-6">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-[#C8102E] rounded-full"></span>
                    <span>Sem taxas escondidas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-[#C8102E] rounded-full"></span>
                    <span>Transparência completa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-[#C8102E] rounded-full"></span>
                    <span>Suporte técnico incluído</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center text-gray-500 mt-8">
          Cancele a qualquer momento sem taxas ou multas.
        </p>
      </div>
    </section>
  );
};
