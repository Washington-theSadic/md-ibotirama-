
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Image, Users, MessageSquare, Video } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  active: 'dashboard' | 'marketing' | 'team' | 'testimonials' | 'videos';
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, active }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    navigate('/admin');
  };
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Image size={18} />, path: '/admin/dashboard' },
    { id: 'marketing', label: 'Campanhas', icon: <Image size={18} />, path: '/admin/marketing' },
    { id: 'team', label: 'Equipe', icon: <Users size={18} />, path: '/admin/team' },
    { id: 'testimonials', label: 'Depoimentos', icon: <MessageSquare size={18} />, path: '/admin/testimonials' },
    { id: 'videos', label: 'Vídeos', icon: <Video size={18} />, path: '/admin/videos' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-[#1F2937] text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4">
          <img 
            src="/lovable-uploads/476b844f-a75b-468e-ba6a-1e7345b83181.png" 
            alt="Mais Delivery Logo" 
            className="h-8"
          />
          <h1 className="text-xl font-bold hidden sm:block">Painel Administrativo</h1>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-white border-white hover:bg-white hover:text-[#1F2937]"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          Sair
        </Button>
      </header>
      
      <div className="flex flex-1">
        <aside className="w-16 sm:w-64 bg-white shadow-md">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={active === item.id ? "default" : "ghost"}
                    className={`w-full justify-start ${active === item.id ? 'bg-[#A21C1C] text-white hover:bg-[#911616]' : 'text-gray-600'}`}
                    onClick={() => navigate(item.path)}
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
