
import React from 'react';
import { useInView } from '@/hooks/useInView';

export const MarketingCampaigns = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  
  const campaigns = [
    "https://i.imgur.com/Z70ULv8.jpeg",
    "https://i.imgur.com/8lTN5pa.jpeg",
    "https://i.imgur.com/7ShMluZ.jpeg",
    "https://i.imgur.com/fNA8WBM.jpeg"
  ];
  
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#A21C1C]">
          CAMPANHAS DE MARKETING QUE FUNCIONAM
        </h2>
        
        <p className="text-center text-lg text-[#1F2937] mb-12 max-w-3xl mx-auto">
          Realizamos campanhas de marketing cooperado, onde o estabelecimento e o Mais Delivery dividem os custos para maximizar o alcance e os resultados. Veja alguns exemplos reais:
        </p>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {campaigns.map((campaign, index) => (
            <div 
              key={index}
              className={`overflow-hidden rounded-lg shadow-md transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img 
                src={campaign} 
                alt={`Campanha de Marketing ${index + 1}`} 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
