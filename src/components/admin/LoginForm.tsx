
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface LoginFormProps {
  adminAccounts: { email: string; password: string }[];
}

export const LoginForm: React.FC<LoginFormProps> = ({ adminAccounts }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
  );
};
