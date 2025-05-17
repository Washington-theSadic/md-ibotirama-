
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useInView } from '@/hooks/useInView';
import { Smartphone, TrendingUp, Megaphone } from 'lucide-react';

export const HowItWorks = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  const features = [
    {
      icon: <Smartphone className="w-10 h-10 text-[#C8102E] mb-4" />,
      title: "Gestão Delivery",
      description: "Painel de controle intuitivo… gerencie pedidos, cardápio, taxas e relatórios.",
      expandedDescription: "Tenha total controle do seu negócio com um dashboard completo e fácil de usar. Gerencie todos os aspectos do seu delivery em um só lugar."
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-[#C8102E] mb-4" />,
      title: "Impulsionamento",
      description: "Acrescente um novo canal de vendas, onde milhares de novos clientes encontrarão você.",
      expandedDescription: "Aumente sua visibilidade na plataforma e alcance mais clientes. Nossa base de usuários está sempre crescendo e procurando por novos estabelecimentos."
    },
    {
      icon: <Megaphone className="w-10 h-10 text-[#C8102E] mb-4" />,
      title: "Publicidade",
      description: "Acesso a campanhas e promoções dentro da plataforma.",
      expandedDescription: "Destaque seu estabelecimento com campanhas promocionais exclusivas e ganhe visibilidade premium na nossa plataforma."
    }
  ];

  return (
    <section id="como-funciona" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#C8102E]">
          Somos muito mais do que um aplicativo de delivery
        </h2>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {features.map((feature, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger asChild>
                <div 
                  className={`bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center h-full transition-all duration-500 cursor-pointer hover:shadow-xl hover:scale-[1.02] ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#C8102E]/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4">
                <div>
                  <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                  <p>{feature.expandedDescription}</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
            alt="Ilustração de restaurante" 
            className="rounded-xl shadow-lg max-w-full md:max-w-lg lg:max-w-2xl h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};
