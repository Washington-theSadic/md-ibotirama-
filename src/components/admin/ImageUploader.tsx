
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ImageIcon, Link, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ImageUploaderProps {
  onImageSelected: (imageUrl: string) => void;
  onFileUpload?: (file: File) => void;
  buttonText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageSelected, 
  onFileUpload,
  buttonText = "Selecionar Imagem" 
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) return;
    
    setFile(selectedFile);
    
    // If we don't have onFileUpload handler, use object URL
    if (!onFileUpload) {
      const objectUrl = URL.createObjectURL(selectedFile);
      onImageSelected(objectUrl);
    }
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
  };

  const handleUpload = () => {
    if (!file || !onFileUpload) return;
    onFileUpload(file);
  };
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="upload">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Enviar Arquivo</TabsTrigger>
          <TabsTrigger value="url">Adicionar por URL</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-4">Clique para fazer upload de uma imagem</p>
            
            <div className="space-y-4 w-full">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
              
              {file && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Arquivo selecionado: {file.name}</p>
                  {onFileUpload && (
                    <Button
                      onClick={handleUpload}
                      className="bg-[#A21C1C] hover:bg-[#911616] text-white mt-2 w-full"
                    >
                      <Upload size={16} className="mr-2" />
                      Enviar Imagem
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="url">
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
