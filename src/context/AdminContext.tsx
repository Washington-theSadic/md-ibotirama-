
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MarketingCampaign {
  id: string;
  imageUrl: string;
}

export interface TeamMember {
  id: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  business: string;
  location: string;
  logoUrl: string;
}

export interface Video {
  id: string;
  url: string;
  title: string;
}

interface AdminContextType {
  marketingCampaigns: MarketingCampaign[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
  videos: Video[];
  updateMarketingCampaigns: (campaigns: MarketingCampaign[]) => void;
  updateTeamMembers: (members: TeamMember[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updateVideos: (videos: Video[]) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with data from localStorage or defaults
  const [marketingCampaigns, setMarketingCampaigns] = useState<MarketingCampaign[]>(() => {
    const saved = localStorage.getItem('admin-marketing-campaigns');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', imageUrl: 'https://i.imgur.com/Z70ULv8.jpeg' },
      { id: '2', imageUrl: 'https://i.imgur.com/8lTN5pa.jpeg' },
      { id: '3', imageUrl: 'https://i.imgur.com/7ShMluZ.jpeg' },
      { id: '4', imageUrl: 'https://i.imgur.com/fNA8WBM.jpeg' }
    ];
  });
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('admin-team-members');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', imageUrl: 'https://i.imgur.com/eKGLi9U.jpeg' },
      { id: '2', imageUrl: 'https://i.imgur.com/oILzGmK.jpeg' }
    ];
  });
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('admin-testimonials');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: '1',
        quote: "No dia que aceitei integrar meu estabelecimento ao Mais Delivery, vi resultados imediatos. Agora estamos oferecendo nossos produtos para um público muito maior, sem precisar de investimento.",
        author: "José Pereira",
        business: "JP LANCHES",
        location: "Ibotirama/BA",
        logoUrl: "/lovable-uploads/f77b271e-548c-4262-acd1-cc6a29a145d8.png"
      },
      {
        id: '2',
        quote: "A parceria com o Mais Delivery transformou nossa visibilidade no mercado. O aumento nas vendas foi notável já nos primeiros meses, e a taxa justa torna o serviço extremamente vantajoso.",
        author: "Jairo Chagas",
        business: "JC IMPORTS",
        location: "Ibotirama/BA",
        logoUrl: "/lovable-uploads/fd760325-58a6-411e-a047-98f63307db41.png"
      },
      {
        id: '3',
        quote: "Nossa entrada no Mais Delivery foi uma decisão acertada. A plataforma é intuitiva e a equipe de suporte realmente se importa com nosso sucesso. Recomendamos o serviço.",
        author: "Eriques Fonseca",
        business: "Lanchonete Pinguim",
        location: "Barra/BA",
        logoUrl: "/lovable-uploads/c301d3fe-5693-4938-b64e-be25b2d44acf.png"
      }
    ];
  });
  
  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem('admin-videos');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Vídeo Demonstrativo 1' },
      { id: '2', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Vídeo Demonstrativo 2' }
    ];
  });
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('admin-marketing-campaigns', JSON.stringify(marketingCampaigns));
  }, [marketingCampaigns]);
  
  useEffect(() => {
    localStorage.setItem('admin-team-members', JSON.stringify(teamMembers));
  }, [teamMembers]);
  
  useEffect(() => {
    localStorage.setItem('admin-testimonials', JSON.stringify(testimonials));
  }, [testimonials]);
  
  useEffect(() => {
    localStorage.setItem('admin-videos', JSON.stringify(videos));
  }, [videos]);
  
  const updateMarketingCampaigns = (campaigns: MarketingCampaign[]) => {
    setMarketingCampaigns(campaigns);
  };
  
  const updateTeamMembers = (members: TeamMember[]) => {
    setTeamMembers(members);
  };
  
  const updateTestimonials = (testimonials: Testimonial[]) => {
    setTestimonials(testimonials);
  };
  
  const updateVideos = (videos: Video[]) => {
    setVideos(videos);
  };
  
  return (
    <AdminContext.Provider value={{
      marketingCampaigns,
      teamMembers,
      testimonials,
      videos,
      updateMarketingCampaigns,
      updateTeamMembers,
      updateTestimonials,
      updateVideos
    }}>
      {children}
    </AdminContext.Provider>
  );
};
