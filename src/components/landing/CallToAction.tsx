
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Phone } from 'lucide-react';

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
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
          Quer crescer com a gente?
        </h2>
        
        <p className="text-lg md:text-xl mb-8 text-gray-700">
          Cadastre seu negócio agora e comece a vender mais
        </p>
        
        <Button
          asChild
          size="lg"
          className={`text-lg bg-[#C8102E] hover:bg-[#a70d25] ${isPulsing ? 'animate-pulse' : ''}`}
        >
          <a 
            href="https://wa.me/5562996998635" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Phone className="mr-2" />
            WhatsApp: (62) 99699‑8635
          </a>
        </Button>
      </div>
    </section>
  );
};
