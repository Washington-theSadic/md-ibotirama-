
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminGuard, useAdminGuard } from '@/components/admin/AdminGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Image, Users, MessageSquare } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const { 
    marketingCampaigns, 
    teamMembers, 
    testimonials
  } = useAdmin();
  
  const { setUnsavedChanges } = useAdminGuard();
  const [clickUpFormUrl, setClickUpFormUrl] = useState<string>('');
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load stored ClickUp form URL
    const savedUrl = localStorage.getItem('clickup-form-url') || '';
    setClickUpFormUrl(savedUrl);
  }, []);
  
  useEffect(() => {
    // Check if URL has changed from saved value
    const savedUrl = localStorage.getItem('clickup-form-url') || '';
    setHasChanged(clickUpFormUrl !== savedUrl);
    setUnsavedChanges(clickUpFormUrl !== savedUrl);
  }, [clickUpFormUrl, setUnsavedChanges]);
  
  const handleSaveClickUpUrl = () => {
    localStorage.setItem('clickup-form-url', clickUpFormUrl);
    setHasChanged(false);
    setUnsavedChanges(false);
    toast({
      title: "URL do formulário salva",
      description: "A URL do formulário ClickUp foi salva com sucesso.",
      duration: 3000,
    });
  };

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
                  <div className="text-3xl font-bold text-[#A21C1C]">{item.count}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Configuração do Formulário de Parceria</CardTitle>
              <CardDescription>
                Configure a URL do formulário ClickUp para onde os usuários serão redirecionados ao clicar em "Quero ser parceiro"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="clickup-form-url" className="text-sm font-medium">
                  URL do formulário ClickUp
                </label>
                <Input
                  id="clickup-form-url"
                  type="url"
                  placeholder="https://forms.clickup.com/..."
                  value={clickUpFormUrl}
                  onChange={(e) => setClickUpFormUrl(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className={`bg-[#A21C1C] hover:bg-[#911616] ${!hasChanged ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!hasChanged}
                onClick={handleSaveClickUpUrl}
              >
                Salvar URL
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Instruções</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Use este painel administrativo para gerenciar as campanhas de marketing, imagens da equipe e depoimentos exibidos no site.
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
