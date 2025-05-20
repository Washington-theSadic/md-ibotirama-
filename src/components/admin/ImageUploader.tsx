
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ImageIcon, Link } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (imageUrl: string) => void;
  buttonText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, buttonText = "Selecionar Imagem" }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isUrlMode, setIsUrlMode] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Generate a local object URL for the image
    const imageUrl = URL.createObjectURL(file);
    onImageSelected(imageUrl);
    
    toast({
      title: "Imagem selecionada",
      description: "A imagem foi selecionada com sucesso!",
    });
  };
  
  const handleUrlSubmit = () => {
    if (!imageUrl.trim()) {
      toast({
        title: "URL inválida",
        description: "Por favor, insira uma URL válida",
        variant: "destructive"
      });
      return;
    }
    
    // Simple URL validation
    if (!imageUrl.match(/^(http|https):\/\/[^ "]+$/)) {
      toast({
        title: "URL inválida",
        description: "Por favor, insira uma URL válida iniciando com http:// ou https://",
        variant: "destructive"
      });
      return;
    }
    
    onImageSelected(imageUrl);
    setImageUrl('');
    
    toast({
      title: "Imagem adicionada",
      description: "A imagem foi adicionada com sucesso!",
    });
  };
  
  return (
    <div className="space-y-4">
      {!isUrlMode ? (
        <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
          <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 mb-4">Clique para fazer upload de uma imagem</p>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button
              type="button" 
              variant="outline" 
              className="bg-[#A21C1C] hover:bg-[#911616] text-white"
            >
              {buttonText}
            </Button>
          </label>
          <p className="text-xs text-gray-500 mt-4">ou</p>
          <Button 
            variant="link" 
            onClick={() => setIsUrlMode(true)} 
            className="text-[#A21C1C]"
          >
            <Link size={16} className="mr-1" />
            Adicionar por URL
          </Button>
        </div>
      ) : (
        <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL da imagem
          </label>
          <div className="flex space-x-2">
            <Input
              type="url"
              placeholder="https://exemplo.com/imagem.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleUrlSubmit}
              className="bg-[#A21C1C] hover:bg-[#911616] text-white"
            >
              Adicionar
            </Button>
          </div>
          <Button 
            variant="link" 
            onClick={() => setIsUrlMode(false)} 
            className="mt-4 text-[#A21C1C]"
          >
            Voltar para upload de arquivo
          </Button>
        </div>
      )}
    </div>
  );
};
