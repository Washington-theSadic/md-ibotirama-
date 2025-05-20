
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Trash2, UserPlus } from 'lucide-react';

interface Admin {
  id: string;
  email: string;
  created_at: string;
  is_super_admin: boolean;
}

const AdminUsers = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  useEffect(() => {
    fetchAdmins();
    
    // Get current logged in user email
    const userEmail = localStorage.getItem('admin-email');
    setCurrentUserEmail(userEmail);
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching admins:', error);
        return;
      }
      
      if (data) {
        setAdmins(data);
      }
    } catch (err) {
      console.error('Failed to fetch admins:', err);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não conferem.",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter no mínimo 6 caracteres.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First try to register with Supabase Auth
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (authError) {
        console.error('Auth error:', authError);
        toast({
          title: "Erro",
          description: authError.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Then add to our admins table
      const { data, error } = await supabase
        .from('admins')
        .insert({ email })
        .select('*')
        .single();
      
      if (error) {
        console.error('DB error:', error);
        if (error.code === '23505') { // Unique violation
          toast({
            title: "Erro",
            description: "Este e-mail já está cadastrado como administrador.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro",
            description: "Ocorreu um erro ao adicionar o administrador.",
            variant: "destructive",
          });
        }
        setIsLoading(false);
        return;
      }
      
      // Update local admins state
      setAdmins([data, ...admins]);
      
      // Clear form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      toast({
        title: "Sucesso",
        description: "Administrador adicionado com sucesso.",
      });
    } catch (err) {
      console.error('Failed to add admin:', err);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao adicionar o administrador.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAdmin = async (id: string, adminEmail: string) => {
    // Prevent deleting yourself
    if (adminEmail === currentUserEmail) {
      toast({
        title: "Operação não permitida",
        description: "Você não pode remover seu próprio acesso administrativo.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('admins')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting admin:', error);
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao remover o administrador.",
          variant: "destructive",
        });
        return;
      }
      
      // Update local state
      setAdmins(admins.filter(admin => admin.id !== id));
      
      toast({
        title: "Sucesso",
        description: "Administrador removido com sucesso.",
      });
    } catch (err) {
      console.error('Failed to delete admin:', err);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao remover o administrador.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminGuard>
      <AdminLayout active="users">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Usuários Administrativos</h1>
          <p className="text-gray-500">Gerencie os usuários que têm acesso ao painel administrativo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Administradores</CardTitle>
                <CardDescription>Lista de usuários com acesso administrativo</CardDescription>
              </CardHeader>
              <CardContent>
                {admins.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Nenhum administrador encontrado.</p>
                ) : (
                  <div className="space-y-2">
                    {admins.map((admin) => (
                      <div 
                        key={admin.id} 
                        className="flex justify-between items-center p-3 border rounded-md"
                      >
                        <div>
                          <p className="font-medium">{admin.email}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(admin.created_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteAdmin(admin.id, admin.email)}
                          disabled={admin.email === currentUserEmail}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Administrador</CardTitle>
                <CardDescription>Cadastre um novo usuário com acesso administrativo</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddAdmin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      E-mail
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@exemplo.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Senha
                    </label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirmar Senha
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirme a senha"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#A21C1C] hover:bg-[#911616]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Adicionando..."
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Adicionar Administrador
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminUsers;
