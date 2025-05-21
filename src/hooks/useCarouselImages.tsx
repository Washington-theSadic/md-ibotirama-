
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface CarouselImage {
  id: string;
  carousel: string;
  image_url: string;
  display_order: number;
}

export function useCarouselImages(carouselName: 'campaign' | 'team') {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('carousel_images')
        .select('*')
        .eq('carousel', carouselName)
        .order('display_order');

      if (error) {
        throw error;
      }

      setImages(data || []);
    } catch (error: any) {
      console.error(`Error fetching ${carouselName} images:`, error);
      toast({
        title: `Error fetching ${carouselName} images`,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();

    // Set up realtime subscription
    const channel = supabase
      .channel(`public:carousel_images:${carouselName}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'carousel_images',
          filter: `carousel=eq.${carouselName}` 
        }, 
        (payload) => {
          console.log('Carousel images change received!', payload);
          fetchImages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [carouselName, toast]);

  const addImage = async (imageUrl: string) => {
    try {
      // Get the highest display_order and add 1
      const maxOrderResult = await supabase
        .from('carousel_images')
        .select('display_order')
        .eq('carousel', carouselName)
        .order('display_order', { ascending: false })
        .limit(1);

      const nextOrder = maxOrderResult.data?.length ? maxOrderResult.data[0].display_order + 1 : 1;

      const { error } = await supabase
        .from('carousel_images')
        .insert({
          carousel: carouselName,
          image_url: imageUrl,
          display_order: nextOrder
        });

      if (error) {
        throw error;
      }

      toast({
        title: 'Image added',
        description: `The image has been added to the ${carouselName} carousel`,
      });

      return true;
    } catch (error: any) {
      console.error('Error adding image:', error);
      toast({
        title: 'Error adding image',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  const deleteImage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('carousel_images')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Image deleted',
        description: `The image has been removed from the ${carouselName} carousel`,
      });

      return true;
    } catch (error: any) {
      console.error('Error deleting image:', error);
      toast({
        title: 'Error deleting image',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${carouselName}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('carousel-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('carousel-images')
        .getPublicUrl(filePath);

      await addImage(data.publicUrl);
      
      return true;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error uploading image',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  return { images, loading, addImage, deleteImage, uploadImage };
}
