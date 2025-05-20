
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Users, MessageSquare, Video, Settings, User } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Admin {
  id: string;
  email: string;
}

const AdminDashboard = () => {
  const { 
    marketingCampaigns, 
    teamMembers, 
    testimonials,
    videos
  } = useAdmin();
  
  const [adminCount, setAdminCount] = useState(0);
  
  useEffect(() => {
    // Fetch admin count from Supabase
    const fetchAdminCount = async () => {
      try {
        const { data, error, count } = await supabase
          .from('admins')
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.error('Error fetching admin count:', error);
          return;
        }
        
        if (count !== null) {
          setAdminCount(count);
        }
      } catch (err) {
        console.error('Failed to fetch admin count:', err);
      }
    };
    
    fetchAdminCount();
  }, []);

  const dashboardItems = [
    {
      title: 'Campanhas de Marketing',
      description: `${marketingCampaigns.length} campanhas cadastradas`,
      icon: <Image className="w-10 h-10 text-[#A21C1C]" />,
      path: '/admin/marketing',
      count: marketingCampaigns.length
    },
    {
      title: 'Imagens da Equipe',
      description: `${teamMembers.length} imagens cadastradas`,
      icon: <Users className="w-10 h-10 text-[#A21C1C]" />,
      path: '/admin/team',
      count: teamMembers.length
    },
    {
      title: 'Depoimentos',
      description: `${testimonials.length} depoimentos cadastrados`,
      icon: <MessageSquare className="w-10 h-10 text-[#A21C1C]" />,
      path: '/admin/testimonials',
      count: testimonials.length
    },
    {
      title: 'Vídeos',
      description: `${videos.length} vídeos cadastrados`,
      icon: <Video className="w-10 h-10 text-[#A21C1C]" />,
      path: '/admin/videos',
      count: videos.length
    },
    {
      title: 'Configurações',
      description: 'Preços e links do rodapé',
      icon: <Settings className="w-10 h-10 text-[#A21C1C]" />,
      path: '/admin/settings',
      count: null
    },
    {
      title: 'Usuários Administrativos',
      description: `${adminCount} usuários cadastrados`,
      icon: <User className="w-10 h-10 text-[#A21C1C]" />,
      path: '/admin/users',
      count: adminCount
    }
  ];

  return (
    <AdminGuard>
      <AdminLayout active="dashboard">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-500">Bem-vindo ao painel administrativo do Mais Delivery</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => (
            <Link to={item.path} key={index} className="transition-transform hover:scale-105">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex justify-between items-center">
                    {item.title}
                    {item.icon}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {item.count !== null ? (
                    <div className="text-3xl font-bold text-[#A21C1C]">{item.count}</div>
                  ) : (
                    <div className="text-sm text-gray-500">Configurações do sistema</div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Instruções</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Use este painel administrativo para gerenciar todo o conteúdo do site:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                <li>Campanhas de marketing - imagens promocionais</li>
                <li>Imagens da equipe - fotos dos membros da equipe</li>
                <li>Depoimentos - avaliações de clientes</li>
                <li>Vídeos - links para vídeos promocionais</li>
                <li>Configurações - gerenciar preços e links do rodapé</li>
                <li>Usuários - adicionar ou remover administradores</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Todas as alterações são sincronizadas automaticamente com o banco de dados e refletidas no site em tempo real.
              </p>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminDashboard;
