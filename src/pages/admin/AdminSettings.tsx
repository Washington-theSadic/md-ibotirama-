
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Edit2, Save, Trash2 } from 'lucide-react';

interface PricingData {
  id: string;
  adhesion_fee: number;
  commission_percentage: number;
  show_pricing: boolean;
}

interface SiteLink {
  id: string;
  name: string;
  url: string;
  section: string;
  display_order: number;
  active: boolean;
}

const AdminSettings = () => {
  const [pricing, setPricing] = useState<PricingData | null>(null);
  const [footerLinks, setFooterLinks] = useState<SiteLink[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [newLink, setNewLink] = useState({ name: '', url: '', section: 'footer', active: true });
  const { toast } = useToast();

  useEffect(() => {
    fetchPricing();
    fetchFooterLinks();
  }, []);

  const fetchPricing = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing')
        .select('*')
        .single();
      
      if (error) {
        console.error('Error fetching pricing data:', error);
        return;
      }
      
      if (data) {
        setPricing(data);
      }
    } catch (err) {
      console.error('Failed to fetch pricing data:', err);
    }
  };

  const fetchFooterLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('site_links')
        .select('*')
        .eq('section', 'footer')
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching footer links:', error);
        return;
      }
      
      if (data) {
        setFooterLinks(data);
      }
    } catch (err) {
      console.error('Failed to fetch footer links:', err);
    }
  };

  const handlePricingChange = (field: string, value: any) => {
    if (pricing) {
      setPricing({ ...pricing, [field]: value });
    }
  };

  const savePricing = async () => {
    if (!pricing) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('pricing')
        .update({
          adhesion_fee: pricing.adhesion_fee,
          commission_percentage: pricing.commission_percentage,
          show_pricing: pricing.show_pricing,
          updated_at: new Date().toISOString()
        })
        .eq('id', pricing.id);
      
      if (error) {
        console.error('Error updating pricing:', error);
        toast({
          title: "Erro ao salvar",
          description: "Não foi possível atualizar os preços.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Preços atualizados",
        description: "As informações de preços foram atualizadas com sucesso.",
      });
    } catch (err) {
      console.error('Failed to update pricing:', err);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao atualizar os preços.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLinkChange = (id: string, field: string, value: any) => {
    setFooterLinks(links => links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const saveLink = async (id: string) => {
    setIsSaving(true);
    const link = footerLinks.find(l => l.id === id);
    if (!link) return;
    
    try {
      const { error } = await supabase
        .from('site_links')
        .update({
          name: link.name,
          url: link.url,
          active: link.active,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) {
        console.error('Error updating link:', error);
        toast({
          title: "Erro ao salvar",
          description: "Não foi possível atualizar o link.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Link atualizado",
        description: "O link foi atualizado com sucesso.",
      });
    } catch (err) {
      console.error('Failed to update link:', err);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao atualizar o link.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteLink = async (id: string) => {
    try {
      const { error } = await supabase
        .from('site_links')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting link:', error);
        toast({
          title: "Erro ao excluir",
          description: "Não foi possível excluir o link.",
          variant: "destructive",
        });
        return;
      }
      
      setFooterLinks(links => links.filter(link => link.id !== id));
      
      toast({
        title: "Link excluído",
        description: "O link foi excluído com sucesso.",
      });
    } catch (err) {
      console.error('Failed to delete link:', err);
      toast({
        title: "Erro ao excluir",
        description: "Ocorreu um erro ao excluir o link.",
        variant: "destructive",
      });
    }
  };

  const addNewLink = async () => {
    if (!newLink.name || !newLink.url) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o nome e a URL do link.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Get the highest display order
      const maxOrder = footerLinks.length > 0 
        ? Math.max(...footerLinks.map(link => link.display_order))
        : 0;
      
      const { data, error } = await supabase
        .from('site_links')
        .insert({
          ...newLink,
          display_order: maxOrder + 1
        })
        .select('*')
        .single();
      
      if (error) {
        console.error('Error adding link:', error);
        toast({
          title: "Erro ao adicionar",
          description: "Não foi possível adicionar o link.",
          variant: "destructive",
        });
        return;
      }
      
      setFooterLinks([...footerLinks, data]);
      setNewLink({ name: '', url: '', section: 'footer', active: true });
      
      toast({
        title: "Link adicionado",
        description: "O novo link foi adicionado com sucesso.",
      });
    } catch (err) {
      console.error('Failed to add link:', err);
      toast({
        title: "Erro ao adicionar",
        description: "Ocorreu um erro ao adicionar o link.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminGuard>
      <AdminLayout active="settings">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Configurações</h1>
          <p className="text-gray-500">Gerencie as configurações do site</p>
        </div>

        {pricing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Configurações de Preços</CardTitle>
              <CardDescription>Defina os valores de taxas e adesão exibidos no site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="adhesion_fee" className="text-sm font-medium">
                    Taxa de Adesão (R$)
                  </label>
                  <Input
                    id="adhesion_fee"
                    type="number"
                    value={pricing.adhesion_fee}
                    onChange={(e) => handlePricingChange('adhesion_fee', parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="commission" className="text-sm font-medium">
                    Comissão por Pedido (%)
                  </label>
                  <Input
                    id="commission"
                    type="number"
                    step="0.1"
                    value={pricing.commission_percentage}
                    onChange={(e) => handlePricingChange('commission_percentage', parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="show_pricing"
                  checked={pricing.show_pricing}
                  onCheckedChange={(checked) => handlePricingChange('show_pricing', checked)}
                />
                <label htmlFor="show_pricing" className="text-sm font-medium">
                  Exibir seção de preços no site
                </label>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={savePricing} 
                  disabled={isSaving}
                  className="bg-[#A21C1C] hover:bg-[#911616]"
                >
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Links do Rodapé</CardTitle>
            <CardDescription>Gerencie os links exibidos no rodapé do site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {footerLinks.map((link) => (
                  <div key={link.id} className="flex flex-wrap gap-2 items-center p-3 border rounded-md">
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Nome do link"
                        value={link.name}
                        onChange={(e) => handleLinkChange(link.id, 'name', e.target.value)}
                      />
                      <Input
                        placeholder="URL do link"
                        value={link.url}
                        onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={link.active}
                        onCheckedChange={(checked) => handleLinkChange(link.id, 'active', checked)}
                      />
                      <span className="text-sm">Ativo</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => saveLink(link.id)}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteLink(link.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t mt-6">
                <h3 className="font-medium mb-3">Adicionar Novo Link</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Nome do link"
                    value={newLink.name}
                    onChange={(e) => setNewLink({...newLink, name: e.target.value})}
                  />
                  <Input
                    placeholder="URL do link (ex: #contato)"
                    value={newLink.url}
                    onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                  />
                </div>
                <div className="mt-3">
                  <Button 
                    onClick={addNewLink}
                    className="bg-[#A21C1C] hover:bg-[#911616]"
                  >
                    Adicionar Link
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminSettings;
