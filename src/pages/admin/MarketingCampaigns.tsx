
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ImageUploader } from '@/components/admin/ImageUploader';
import { useAdmin } from '@/context/AdminContext';
import { Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const MarketingCampaigns = () => {
  const { marketingCampaigns, updateMarketingCampaigns } = useAdmin();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleAddImage = (imageUrl: string) => {
    const newCampaign = {
      id: `campaign-${Date.now()}`,
      imageUrl
    };
    
    updateMarketingCampaigns([...marketingCampaigns, newCampaign]);
    setIsAddDialogOpen(false);
    toast({
      title: "Campanha adicionada",
      description: "A nova campanha foi adicionada com sucesso"
    });
  };
  
  const confirmDelete = (id: string) => {
    setCampaignToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDelete = () => {
    if (!campaignToDelete) return;
    
    const updatedCampaigns = marketingCampaigns.filter(
      campaign => campaign.id !== campaignToDelete
    );
    
    updateMarketingCampaigns(updatedCampaigns);
    setIsDeleteDialogOpen(false);
    setCampaignToDelete(null);
    
    toast({
      title: "Campanha excluída",
      description: "A campanha foi excluída com sucesso"
    });
  };

  return (
    <AdminGuard>
      <AdminLayout active="marketing">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Campanhas de Marketing</h1>
            <p className="text-gray-500">Gerencie as campanhas de marketing exibidas no site</p>
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-[#A21C1C] hover:bg-[#911616]"
          >
            Adicionar Imagem
          </Button>
        </div>
        
        {marketingCampaigns.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-gray-500 mb-4">Nenhuma campanha cadastrada</p>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-[#A21C1C] hover:bg-[#911616]"
              >
                Adicionar Imagem
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketingCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader className="p-0">
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={campaign.imageUrl} 
                      alt="Campanha de Marketing" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </CardHeader>
                <CardFooter className="p-4 flex justify-end">
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={() => confirmDelete(campaign.id)}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Excluir
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        {/* Add Campaign Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Campanha</DialogTitle>
              <DialogDescription>
                Adicione uma imagem via URL
              </DialogDescription>
            </DialogHeader>
            <ImageUploader 
              onImageSelected={handleAddImage} 
              buttonText="Adicionar Imagem"
            />
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir esta campanha? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
              >
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AdminLayout>
    </AdminGuard>
  );
};

export default MarketingCampaigns;
