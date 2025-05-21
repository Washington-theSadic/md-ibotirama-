
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import { usePrices } from '@/hooks/usePrices';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

const priceSchema = z.object({
  adhesion_fee: z.coerce.number().min(0, { message: "O valor não pode ser negativo" }),
  commission_percentage: z.coerce.number().min(0, { message: "O percentual não pode ser negativo" }).max(100, { message: "O percentual não pode ser maior que 100%" }),
  price_c: z.coerce.number().min(0, { message: "O valor não pode ser negativo" }).optional().nullable(),
});

type PriceFormValues = z.infer<typeof priceSchema>;

const AdminSettings = () => {
  const { prices, loading, updatePrices } = usePrices();
  const [showPriceSection, setShowPriceSection] = useState(prices?.active ?? true);
  const { toast } = useToast();
  
  const form = useForm<PriceFormValues>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      adhesion_fee: prices?.price_a ?? 150,
      commission_percentage: prices?.price_b ?? 9.5,
      price_c: prices?.price_c ?? null,
    }
  });

  // Update form values when prices are loaded
  React.useEffect(() => {
    if (prices) {
      form.reset({
        adhesion_fee: prices.price_a,
        commission_percentage: prices.price_b,
        price_c: prices.price_c,
      });
      setShowPriceSection(prices.active);
    }
  }, [prices, form]);
  
  const onSubmit = async (data: PriceFormValues) => {
    const success = await updatePrices({
      active: showPriceSection,
      price_a: data.adhesion_fee,
      price_b: data.commission_percentage,
      price_c: data.price_c,
    });
    
    if (success) {
      toast({
        title: "Configurações salvas",
        description: "As configurações de preços foram atualizadas com sucesso",
      });
    }
  };

  const handleToggleChange = (checked: boolean) => {
    setShowPriceSection(checked);
  };

  if (loading) {
    return (
      <AdminGuard>
        <AdminLayout active="settings">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
          </div>
        </AdminLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminLayout active="settings">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Configurações</h1>
          <p className="text-gray-500">Gerencie as configurações do site</p>
        </div>
        
        <Tabs defaultValue="prices">
          <TabsList className="mb-6">
            <TabsTrigger value="prices">Preços</TabsTrigger>
            <TabsTrigger value="footer">Links do Rodapé</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prices">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Preços</CardTitle>
                <CardDescription>
                  Configure os preços exibidos na página inicial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-6">
                  <Switch 
                    checked={showPriceSection} 
                    onCheckedChange={handleToggleChange} 
                    id="price-section-toggle"
                  />
                  <Label htmlFor="price-section-toggle">
                    {showPriceSection ? "Seção de preços visível" : "Seção de preços oculta"}
                  </Label>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="adhesion_fee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Taxa de Adesão (R$)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="commission_percentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Percentual de Comissão (%)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price_c"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço C (Opcional)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.01" 
                              {...field} 
                              value={field.value || ''} 
                              onChange={(e) => {
                                const value = e.target.value === '' ? null : parseFloat(e.target.value);
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-[#A21C1C] hover:bg-[#911616]"
                    >
                      Salvar Configurações
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="footer">
            <Card>
              <CardHeader>
                <CardTitle>Links do Rodapé</CardTitle>
                <CardDescription>
                  Gerencie os links exibidos no rodapé do site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Os links do rodapé são gerenciados através do painel administrativo do Supabase.
                  Por favor, acesse o painel do Supabase para editar os links.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminSettings;
