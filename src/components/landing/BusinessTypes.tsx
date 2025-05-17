
import React from 'react';
import { useInView } from '@/hooks/useInView';
import { Store, ShoppingBag, Users } from 'lucide-react';

export const BusinessTypes = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  
  const businessTypes = [
    {
      icon: <Store className="w-12 h-12 text-[#C8102E]" />,
      title: "Pet shops",
      description: "Disponibilize produtos e serviços para pets com entrega rápida e prática para donos de animais."
    },
    {
      icon: <ShoppingBag className="w-12 h-12 text-[#C8102E]" />,
      title: "Lojas de conveniência",
      description: "Ofereça produtos essenciais com a praticidade que seus clientes precisam a qualquer hora do dia."
    },
    {
      icon: <Users className="w-12 h-12 text-[#C8102E]" />,
      title: "Serviços gerais",
      description: "Amplie seu alcance oferecendo serviços diversos através da nossa plataforma de delivery."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-[#C8102E]">
          Para todos os estabelecimentos
        </h2>
        
        <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
          O Mais Delivery não é apenas para restaurantes. Nossa plataforma atende diversos segmentos de negócio.
        </p>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {businessTypes.map((type, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl shadow-md p-6 text-center transition-all duration-500 ${
                inView 
                  ? 'opacity-100 rotate-y-0' 
                  : 'opacity-0 rotate-y-90'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="flex justify-center mb-4">
                {type.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {type.title}
              </h3>
              
              <p className="text-gray-600">
                {type.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
