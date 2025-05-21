
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface Video {
  id: number;
  title: string;
  video_url: string;
}

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('id');

        if (error) {
          throw error;
        }

        if (data) {
          setVideos(data);
        }
      } catch (error: any) {
        console.error('Error fetching videos:', error);
        toast({
          title: 'Error fetching videos',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();

    // Set up realtime subscription
    const channel = supabase
      .channel('public:videos')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'videos' }, 
        (payload) => {
          console.log('Videos change received!', payload);
          fetchVideos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const updateVideo = async (id: number, video_url: string, title: string) => {
    try {
      const { error } = await supabase
        .from('videos')
        .update({ video_url, title })
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Video updated',
        description: 'The video has been updated successfully',
      });

      return true;
    } catch (error: any) {
      console.error('Error updating video:', error);
      toast({
        title: 'Error updating video',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  return { videos, loading, updateVideo };
}
