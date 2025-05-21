
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ImageUploader } from '@/components/admin/ImageUploader';
import { useCarouselImages } from '@/hooks/useCarouselImages';
import { Trash2, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const TeamImages = () => {
  const { images, loading, addImage, deleteImage, uploadImage } = useCarouselImages('team');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  
  const confirmDelete = (id: string) => {
    setImageToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDelete = async () => {
    if (!imageToDelete) return;
    
    const success = await deleteImage(imageToDelete);
    
    if (success) {
      setIsDeleteDialogOpen(false);
      setImageToDelete(null);
    }
  };

  const handleAddImage = async (imageUrl: string) => {
    const success = await addImage(imageUrl);
    
    if (success) {
      setIsAddDialogOpen(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    await uploadImage(file);
    setIsAddDialogOpen(false);
  };

  if (loading) {
    return (
      <AdminGuard>
        <AdminLayout active="team">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
          </div>
        </AdminLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminLayout active="team">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Imagens da Equipe</h1>
            <p className="text-gray-500">Gerencie as imagens da equipe exibidas no site</p>
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-[#A21C1C] hover:bg-[#911616]"
          >
            Adicionar Imagem
          </Button>
        </div>
        
        {images.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-gray-500 mb-4">Nenhuma imagem da equipe cadastrada</p>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-[#A21C1C] hover:bg-[#911616]"
              >
                Adicionar Imagem
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((image) => (
              <Card key={image.id}>
                <CardHeader className="p-0">
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={image.image_url} 
                      alt="Imagem da Equipe" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </CardHeader>
                <CardFooter className="p-4 flex justify-end">
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={() => confirmDelete(image.id)}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Excluir
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        {/* Add Team Image Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Imagem da Equipe</DialogTitle>
              <DialogDescription>
                Faça upload de uma imagem ou adicione via URL
              </DialogDescription>
            </DialogHeader>
            <ImageUploader 
              onImageSelected={handleAddImage}
              onFileUpload={handleFileUpload}
              buttonText="Escolher Imagem"
            />
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir esta imagem? Esta ação não pode ser desfeita.
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

export default TeamImages;
