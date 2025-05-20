
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface FooterLink {
  id: string;
  name: string;
  url: string;
  active: boolean;
  display_order: number;
}

export const Footer = () => {
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);

  useEffect(() => {
    const fetchFooterLinks = async () => {
      try {
        const { data, error } = await supabase
          .from('site_links')
          .select('*')
          .eq('section', 'footer')
          .eq('active', true)
          .order('display_order', { ascending: true });
        
        if (error) {
          console.error('Error fetching footer links:', error);
          return;
        }
        
        if (data) {
          setFooterLinks(data);
        }
      } catch (err) {
        console.error('Failed to fetch footer links:', err);
      }
    };
    
    fetchFooterLinks();
  }, []);

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
            {footerLinks.map((link) => (
              <a 
                key={link.id} 
                href={link.url} 
                className="text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
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
