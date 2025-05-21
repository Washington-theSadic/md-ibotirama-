
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import { LoginForm } from '@/components/admin/LoginForm';

const AdminLogin = () => {
  const [adminAccounts, setAdminAccounts] = useState<{email: string, password: string}[]>([]);
  
  useEffect(() => {
    // Load existing admin accounts from localStorage
    const savedAccounts = localStorage.getItem('admin-accounts');
    if (savedAccounts) {
      setAdminAccounts(JSON.parse(savedAccounts));
    } else {
      // Initialize with the default account
      const defaultAccount = { email: 'washingtongabrielps@gmail.com', password: 'Md36377667' };
      setAdminAccounts([defaultAccount]);
      localStorage.setItem('admin-accounts', JSON.stringify([defaultAccount]));
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="hover:text-[#A21C1C] transition-colors">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowLeft size={16} />
                Voltar
              </Button>
            </Link>
            <img 
              src="/lovable-uploads/476b844f-a75b-468e-ba6a-1e7345b83181.png" 
              alt="Mais Delivery Logo" 
              className="h-12"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-[#A21C1C]">
            Painel Administrativo
          </CardTitle>
          <CardDescription className="text-center">
            Entre com suas credenciais para acessar o painel
          </CardDescription>
        </CardHeader>

        <LoginForm adminAccounts={adminAccounts} />
      </Card>
    </div>
  );
};

export default AdminLogin;
