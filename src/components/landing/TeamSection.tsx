
import React from 'react';
import { useInView } from '@/hooks/useInView';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowRight } from 'lucide-react';
import { useCarouselImages } from '@/hooks/useCarouselImages';

export const TeamSection = () => {
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.1
  });

  const { images, loading } = useCarouselImages('team');
  
  if (loading || images.length === 0) {
    return null;
  }

  return (
    <section id="equipe" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#A21C1C] mb-4">Nossa Equipe</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Conheça os profissionais por trás do Mais Delivery, trabalhando para o seu sucesso.
          </p>
        </div>

        <div ref={ref} className={`transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full transition-all hover:shadow-xl">
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={image.image_url} 
                        alt={`Membro da Equipe ${index + 1}`} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        
        <div className="flex justify-center w-full mt-6">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-[#A21C1C] text-sm">
              <span>Arraste para ver mais</span>
              <ArrowRight className="w-4 h-4 animate-bounce animate-infinite" />
            </div>
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#A21C1C] to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
