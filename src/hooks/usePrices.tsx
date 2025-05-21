
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface Prices {
  id: number;
  active: boolean;
  price_a: number;
  price_b: number;
  price_c: number | null;
}

export function usePrices() {
  const [prices, setPrices] = useState<Prices | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPrices = async () => {
    try {
      const { data, error } = await supabase
        .from('prices')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) {
        throw error;
      }

      setPrices(data);
    } catch (error: any) {
      console.error('Error fetching prices:', error);
      toast({
        title: 'Error fetching prices',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();

    // Set up realtime subscription
    const channel = supabase
      .channel('public:prices')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'prices' }, 
        (payload) => {
          console.log('Prices change received!', payload);
          fetchPrices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const updatePrices = async (updatedPrices: {
    active?: boolean;
    price_a?: number;
    price_b?: number;
    price_c?: number | null;
  }) => {
    try {
      const { error } = await supabase
        .from('prices')
        .update(updatedPrices)
        .eq('id', 1);

      if (error) {
        throw error;
      }

      toast({
        title: 'Prices updated',
        description: 'The price settings have been updated successfully',
      });

      return true;
    } catch (error: any) {
      console.error('Error updating prices:', error);
      toast({
        title: 'Error updating prices',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  return { prices, loading, updatePrices };
}
