
import React from 'react';
import { useInView } from '@/hooks/useInView';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight } from 'lucide-react';

export const MarketingCampaigns = () => {
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.1
  });
  const campaigns = ["https://i.imgur.com/Z70ULv8.jpeg", "https://i.imgur.com/8lTN5pa.jpeg", "https://i.imgur.com/7ShMluZ.jpeg", "https://i.imgur.com/fNA8WBM.jpeg"];
  return <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#A21C1C]">
          CAMPANHAS DE MARKETING QUE FUNCIONAM
        </h2>
        
        <p className="text-center text-lg text-[#1F2937] mb-12 max-w-3xl mx-auto">
          Criamos campanhas de marketing em parceria com seu estabelecimento, compartilhando esforços para maximizar seu alcance e resultados. Confira alguns cases de sucesso!
        </p>
        
        <div ref={ref} className={`transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Carousel className="w-full mx-auto" opts={{
            align: "center",
            loop: true
          }}>
            <CarouselContent>
              {campaigns.map((campaign, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 xl:basis-1/3">
                  <div className="overflow-hidden rounded-lg shadow-md p-1">
                    <img 
                      src={campaign} 
                      alt={`Campanha de Marketing ${index + 1}`} 
                      className="w-full h-auto object-contain max-h-[500px] hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center w-full gap-4 mt-6">
              <CarouselPrevious className="relative static transform-none mx-2" />
              <CarouselNext className="relative static transform-none mx-2" />
            </div>
            <div className="flex justify-center w-full mt-4">
              <div className="flex items-center gap-2 text-[#A21C1C] text-sm animate-pulse">
                <span>Arraste para ver mais</span>
                <ArrowRight className="w-4 h-4 animate-bounce" />
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </section>;
};
