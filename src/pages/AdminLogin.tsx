
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [adminAccounts, setAdminAccounts] = useState<{email: string, password: string}[]>([]);
  const [activeTab, setActiveTab] = useState<string>("login");
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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation checks
    if (password !== confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não conferem.",
        variant: "destructive",
        duration: 3000,
      });
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Erro no cadastro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
        duration: 3000,
      });
      setIsLoading(false);
      return;
    }

    // Check if email already exists
    const emailExists = adminAccounts.some(account => account.email === email);
    if (emailExists) {
      toast({
        title: "Erro no cadastro",
        description: "Este email já está cadastrado.",
        variant: "destructive",
        duration: 3000,
      });
      setIsLoading(false);
      return;
    }

    // Add new admin account
    const updatedAccounts = [...adminAccounts, { email, password }];
    setAdminAccounts(updatedAccounts);
    localStorage.setItem('admin-accounts', JSON.stringify(updatedAccounts));

    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Você pode acessar o painel administrativo agora.",
      duration: 3000,
    });

    // Switch to login tab
    setActiveTab("login");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 mx-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Cadastro</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
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
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="register-email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="register-password" className="text-sm font-medium">
                    Senha
                  </label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-sm font-medium">
                    Confirmar Senha
                  </label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                  {isLoading ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AdminLogin;
