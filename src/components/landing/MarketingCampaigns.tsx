import React from 'react';
import { useInView } from '@/hooks/useInView';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
          Realizamos campanhas de marketing cooperado, onde o estabelecimento e o Mais Delivery dividem os custos para maximizar o alcance e os resultados. Veja alguns exemplos reais:
        </p>
        
        <div ref={ref} className={`transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Carousel className="w-full max-w-4xl mx-auto" opts={{
          align: "center",
          loop: true
        }}>
            <CarouselContent>
              {campaigns.map((campaign, index) => <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3">
                  <div className="overflow-hidden rounded-lg shadow-md p-1">
                    <img src={campaign} alt={`Campanha de Marketing ${index + 1}`} className="w-auto h-auto max-w-full max-h-[500px] hover:scale-105 transition-transform duration-300 object-contain\n" />
                  </div>
                </CarouselItem>)}
            </CarouselContent>
            <div className="mt-6 flex justify-center gap-4">
              <CarouselPrevious className="relative static transform-none mx-[40px]" />
              <CarouselNext className="w-auto h-auto max-w-full max-h-[500px] hover:scale-105 transition-transform duration-300 object-contain\n" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>;
};