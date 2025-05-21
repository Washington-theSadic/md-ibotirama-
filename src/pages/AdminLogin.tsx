
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [adminAccounts, setAdminAccounts] = useState<{email: string, password: string}[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if the email and password match any admin account
    const foundAccount = adminAccounts.find(
      account => account.email === email && account.password === password
    );

    if (foundAccount) {
      // Set admin authentication in localStorage
      localStorage.setItem('admin-auth', 'true');
      localStorage.setItem('admin-email', email);
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
        duration: 3000,
      });
      
      navigate('/admin/dashboard');
    } else {
      toast({
        title: "Falha no login",
        description: "Email ou senha incorretos.",
        variant: "destructive",
        duration: 3000,
      });
    }
    setIsLoading(false);
  };

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

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="login-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="login-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="login-password" className="text-sm font-medium">
                Senha
              </label>
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-[#A21C1C] hover:bg-[#911616]" 
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
