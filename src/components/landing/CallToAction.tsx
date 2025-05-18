
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from 'lucide-react';

export const CallToAction = () => {
  const [isPulsing, setIsPulsing] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true);
      
      const timeout = setTimeout(() => {
        setIsPulsing(false);
      }, 1500);
      
      return () => clearTimeout(timeout);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="cta" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1F2937]">
          Quer crescer com a gente?
        </h2>
        
        <p className="text-lg md:text-xl mb-8 text-[#1F2937]">
          Cadastre seu negócio agora e comece a vender mais
        </p>
        
        <Button
          asChild
          size="lg"
          className={`text-lg bg-[#A21C1C] hover:bg-[#911616] ${isPulsing ? 'animate-pulse' : ''}`}
        >
          <a 
            href="https://wa.me/5577991301796" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <MessageSquare className="mr-2" />
            WhatsApp: (77) 99130-1796
          </a>
        </Button>

        <div className="fixed bottom-4 right-4 z-50">
          <Button
            asChild
            size="icon"
            className="h-14 w-14 rounded-full bg-[#A21C1C] hover:bg-[#911616] shadow-lg flex items-center justify-center"
          >
            <a 
              href="https://wa.me/5577991301796" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Contato via WhatsApp"
              className="flex items-center justify-center"
            >
              <MessageSquare className="h-6 w-6" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
