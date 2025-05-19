import React from 'react';
import { useInView } from '@/hooks/useInView';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
export const TeamSection = () => {
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.1
  });
  const teamImages = ["https://i.imgur.com/eKGLi9U.jpeg", "https://i.imgur.com/oILzGmK.jpeg"];
  return <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <Carousel opts={{
            align: "start",
            loop: true
          }} className="w-full">
              <CarouselContent>
                {teamImages.map((image, index) => <CarouselItem key={index} className="basis-full">
                    <img src={image} alt={`Equipe Mais Delivery ${index + 1}`} className="rounded-lg shadow-md h-70 md:h-80 w-full object-cover" />
                  </CarouselItem>)}
              </CarouselContent>
              <div className="absolute -bottom-10 w-full flex justify-center gap-2">
                <CarouselPrevious className="relative static mx-1 transform-none" />
                <CarouselNext className="relative static mx-1 transform-none" />
              </div>
            </Carousel>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#A21C1C]">
              Uma Equipe Dedicada ao Seu Sucesso
            </h2>
            
            <p className="text-[#1F2937] text-lg mb-6">
              Por trás da nossa tecnologia existe uma equipe completa de profissionais dedicados a garantir o sucesso do seu negócio. Nossa central de monitoramento funciona das 7:30 às 23:30, todos os dias, garantindo que cada pedido seja entregue com excelência.
            </p>
          </div>
        </div>
      </div>
    </section>;
};