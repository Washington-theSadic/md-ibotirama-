
import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Users, MessageSquare, Video } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { 
    marketingCampaigns, 
    teamMembers, 
    testimonials,
    videos
  } = useAdmin();

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
    }
  ];

  return (
    <AdminGuard>
      <AdminLayout active="dashboard">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-500">Bem-vindo ao painel administrativo do Mais Delivery</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
                  <div className="text-3xl font-bold text-[#A21C1C]">{item.count}</div>
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
                Use este painel administrativo para gerenciar as campanhas de marketing, imagens da equipe, depoimentos e vídeos exibidos no site.
              </p>
              <p className="text-gray-600 mt-4">
                Clique em uma das seções acima para começar a editar o conteúdo.
              </p>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminDashboard;
