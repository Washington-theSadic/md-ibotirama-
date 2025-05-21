
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ContactForm } from './ContactForm';

export const CallToAction = () => {
  const [isPulsing, setIsPulsing] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  // Get the ClickUp form URL from localStorage (set in AdminDashboard)
  const [clickUpFormUrl, setClickUpFormUrl] = useState<string>('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true);
      const timeout = setTimeout(() => {
        setIsPulsing(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }, 3000);
    
    // Get the ClickUp form URL from localStorage
    const savedUrl = localStorage.getItem('clickup-form-url');
    if (savedUrl) {
      setClickUpFormUrl(savedUrl);
    }
    
    return () => clearInterval(interval);
  }, []);
  
  const handlePartnerClick = () => {
    if (clickUpFormUrl) {
      window.open(clickUpFormUrl, '_blank');
    } else {
      // If no ClickUp URL is set, open the dialog with the contact form as fallback
      setIsFormOpen(true);
    }
  };

  return <section id="cta" className="py-16 px-4 bg-gray-50 relative z-10">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1F2937] animate-pulse">
          Quer crescer com a gente?
        </h2>
        
        <p className="text-lg md:text-xl mb-8 text-[#1F2937]">
          Cadastre seu negócio agora e comece a vender mais
        </p>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <Button 
            size="lg" 
            className={`text-lg bg-[#A21C1C] hover:bg-[#911616] shadow-lg hover:shadow-xl transition-all duration-300 ${isPulsing ? 'animate-pulse scale-105' : 'scale-100'}`}
            onClick={handlePartnerClick}
          >
            Quero ser parceiro
          </Button>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl text-[#A21C1C]">Entre em contato</DialogTitle>
            </DialogHeader>
            <ContactForm />
          </DialogContent>
        </Dialog>

        <div className="fixed bottom-4 right-4 z-50">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" aria-label="Contato via WhatsApp" className="h-14 w-14 rounded-full bg-[#A21C1C] hover:bg-[#911616] shadow-lg hover:shadow-xl transition-all duration-600 animate-bounce">
                <MessageSquare className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl text-[#A21C1C]">Entre em contato</DialogTitle>
              </DialogHeader>
              <ContactForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>;
};
