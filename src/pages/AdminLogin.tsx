
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("Gabriel");
  const [pin, setPin] = useState("");
  const [loginMethod, setLoginMethod] = useState<"email" | "pin">("email");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if already authenticated
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/admin/dashboard');
      }
    };
    
    checkAuth();

    // Pre-fill the default admin email if it doesn't exist
    if (!email) {
      setEmail("washingtongabrielps@gmail.com");
      setPassword("Md36377667");
    }
  }, [navigate, email]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }

      if (data.user) {
        localStorage.setItem('admin-email', email);
        localStorage.setItem('admin-auth', 'true');
        toast({
          title: "Login bem-sucedido",
          description: "Você está sendo redirecionado para o painel"
        });
        navigate('/admin/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePinLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the Supabase RPC function to check the PIN
      const { data, error } = await supabase.rpc('check_pin_login', {
        p_username: username,
        p_pin: pin
      });

      if (error) {
        throw error;
      }

      if (data) {
        // Valid PIN, create a session
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: "washingtongabrielps@gmail.com",
          password: "Md36377667"
        });

        if (authError) {
          throw authError;
        }

        localStorage.setItem('admin-email', username);
        localStorage.setItem('admin-auth', 'true');
        toast({
          title: "Login bem-sucedido",
          description: "Você está sendo redirecionado para o painel"
        });
        navigate('/admin/dashboard');
      } else {
        throw new Error("PIN inválido");
      }
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePinChange = (value: string) => {
    setPin(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/476b844f-a75b-468e-ba6a-1e7345b83181.png" 
              alt="Mais Delivery Logo" 
              className="h-12"
            />
          </div>
          <h1 className="text-2xl font-bold text-center mb-8">Admin Login</h1>
          
          <Tabs defaultValue="email" className="w-full" onValueChange={(value) => setLoginMethod(value as "email" | "pin")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email">Login com Email</TabsTrigger>
              <TabsTrigger value="pin">Login com PIN</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <form onSubmit={handleEmailLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-[#A21C1C] hover:bg-[#911616]"
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="pin">
              <form onSubmit={handlePinLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Usuário</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pin">PIN</Label>
                  <div className="flex justify-center">
                    <InputOTP maxLength={4} value={pin} onChange={handlePinChange}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-[#A21C1C] hover:bg-[#911616]"
                  disabled={loading || pin.length < 4}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <Link to="/" className="text-sm text-[#A21C1C] hover:underline flex justify-center">
              Voltar para o site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
