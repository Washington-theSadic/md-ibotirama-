
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#1F2937] text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/admin">
              <img 
                src="/lovable-uploads/476b844f-a75b-468e-ba6a-1e7345b83181.png" 
                alt="Mais Delivery Logo" 
                className="h-8 mb-2 cursor-pointer transition-opacity hover:opacity-80"
              />
            </Link>
            <p className="text-sm text-gray-400">
              © 2025 Mais Delivery. Todos os direitos reservados.
            </p>
          </div>
          
          <nav className="flex flex-wrap gap-4">
            <a href="#beneficios" className="text-gray-300 hover:text-white transition-colors">
              Benefícios
            </a>
            <a href="#como-funciona" className="text-gray-300 hover:text-white transition-colors">
              Como Funciona
            </a>
            <a href="#depoimentos" className="text-gray-300 hover:text-white transition-colors">
              Depoimentos
            </a>
            <a href="#cta" className="text-gray-300 hover:text-white transition-colors">
              Contato
            </a>
          </nav>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600 mt-2">
            © Mais Delivery Oeste da Bahia e Washington - Oesteframelab
          </p>
        </div>
      </div>
    </footer>
  );
};
