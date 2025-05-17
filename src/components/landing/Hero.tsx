
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Youtube } from 'lucide-react';

export const Hero = () => {
  useEffect(() => {
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
      heroSection.classList.add('animate-fade-in');
    }
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex items-center justify-center px-4 py-16 md:py-24 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80')",
        backgroundPosition: "center center",
      }}
    >
      <div className="absolute inset-0 bg-[#5F2C82] bg-opacity-70"></div>
      
      <div className="container mx-auto relative z-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 transform translate-y-0 opacity-100 transition-all duration-700 delay-300">
          Evolua com o Mais Delivery e aumente suas vendas
        </h1>
        
        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto transform translate-y-0 opacity-100 transition-all duration-700 delay-500">
          Junte-se a mais de 300 cidades em todo o Brasil e impulsione seu negócio — sem mensalidades
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 transform translate-y-0 opacity-100 transition-all duration-700 delay-700">
          <Button asChild size="lg" className="w-full md:w-auto bg-[#C8102E] hover:bg-[#a70d25] text-white">
            <a href="#cta">Quero ser parceiro</a>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="w-full md:w-auto bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
            <a href="https://www.youtube.com/watch?v=mrQK78o7hUk" target="_blank" rel="noopener noreferrer">
              <Youtube className="mr-2" /> Assista o vídeo
            </a>
          </Button>
        </div>
        
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            '+ 300 cidades em todo o Brasil',
            '+ Milhares de clientes potenciais',
            '+ Eficiência no atendimento e gestão',
            '+ Vendas com novo canal de pedidos'
          ].map((item, index) => (
            <li 
              key={index}
              className="bg-white/10 backdrop-blur-sm text-white py-3 px-4 rounded-lg font-medium transform transition-all duration-500"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
