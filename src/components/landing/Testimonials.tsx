import React, { useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useInView } from '@/hooks/useInView';
import { MessageCircle } from 'lucide-react';
export const Testimonials = () => {
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.1
  });
  const testimonials = [{
    quote: "A parceria com o Mais Delivery transformou nossa visibilidade no mercado. O aumento nas vendas foi notável já nos primeiros meses, e a taxa justa torna o serviço extremamente vantajoso.",
    author: "Maria Silva",
    business: "Cantinho do Sabor",
    location: "Barra/BA"
  }, {
    quote: "No dia que aceitei integrar meu estabelecimento ao Mais Delivery, vi resultados imediatos. Agora estamos oferecendo nossos produtos para um público muito maior, sem precisar de investimento.",
    author: "Jairo Chagas",
    business: "JC IMPORTS",
    location: "Ibotirama/BA"
  }];
  return <section id="depoimentos" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#A21C1C]">
          O que dizem nossos parceiros
        </h2>
        
        <div ref={ref} className="relative">
          <Carousel opts={{
          align: "start",
          loop: true
        }} className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 pl-4">
                  <div className={`bg-white rounded-xl shadow-md p-6 h-full transition-all duration-500 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{
                transitionDelay: `${index * 150}ms`
              }}>
                    <div className="flex items-start mb-4">
                      <MessageCircle className="w-8 h-8 text-[#A21C1C] mr-3 flex-shrink-0" />
                      
                    </div>
                    
                    <blockquote className="mb-6">
                      <p className="text-[#1F2937] italic mb-4">"{testimonial.quote}"</p>
                      <footer className="text-sm">
                        <span className="font-bold text-[#1F2937]">{testimonial.author}, </span>
                        <span className="text-[#1F2937]">{testimonial.business} – </span>
                        <span className="text-[#A21C1C] font-medium">{testimonial.location}</span>
                      </footer>
                    </blockquote>
                  </div>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>;
};