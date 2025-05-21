
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Video, useVideos } from '@/hooks/useVideos';
import { Loader2 } from 'lucide-react';

const videoSchema = z.object({
  title: z.string().min(2, { message: "O título deve ter pelo menos 2 caracteres" }),
  url: z.string().url({ message: "Por favor insira uma URL válida" }),
});

type VideoFormValues = z.infer<typeof videoSchema>;

const VideoLinks = () => {
  const { videos, loading, updateVideo } = useVideos();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const { toast } = useToast();
  
  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      title: "",
      url: "",
    }
  });
  
  const openEditDialog = (video: Video) => {
    form.reset({
      title: video.title,
      url: video.video_url,
    });
    setCurrentVideo(video);
    setIsEditDialogOpen(true);
  };
  
  const onSubmitEdit = async (data: VideoFormValues) => {
    if (!currentVideo) return;
    
    const success = await updateVideo(currentVideo.id, data.url, data.title);
    
    if (success) {
      setIsEditDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <AdminGuard>
        <AdminLayout active="videos">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
          </div>
        </AdminLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminLayout active="videos">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Links de Vídeos</h1>
          <p className="text-gray-500">
            Gerencie os links dos vídeos que aparecem na página inicial.
            Há exatamente dois slots de vídeo disponíveis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <Card key={video.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Vídeo {video.id}: {video.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video rounded-md bg-gray-100 overflow-hidden">
                  <iframe 
                    src={video.video_url} 
                    className="w-full h-full" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 break-all">{video.video_url}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-[#A21C1C] hover:bg-[#911616]"
                  onClick={() => openEditDialog(video)}
                >
                  Editar Vídeo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Edit Video Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Vídeo {currentVideo?.id}</DialogTitle>
              <DialogDescription>
                Atualize as informações do vídeo. Suportamos URLs de incorporação do YouTube.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título do Vídeo</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o título do vídeo..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL do Vídeo</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.youtube.com/embed/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-[#A21C1C] hover:bg-[#911616]"
                  >
                    Salvar Alterações
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </AdminLayout>
    </AdminGuard>
  );
};

export default VideoLinks;
