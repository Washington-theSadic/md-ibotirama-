
import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ImageUploader } from '@/components/admin/ImageUploader';
import { useAdmin } from '@/context/AdminContext';
import { Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const testimonialSchema = z.object({
  quote: z.string().min(10, { message: "O depoimento deve ter pelo menos 10 caracteres" }),
  author: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  business: z.string().min(2, { message: "O nome do estabelecimento deve ter pelo menos 2 caracteres" }),
  location: z.string().min(2, { message: "A cidade deve ter pelo menos 2 caracteres" }),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

const Testimonials = () => {
  const { testimonials, updateTestimonials } = useAdmin();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLogoDialogOpen, setIsLogoDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<string | null>(null);
  const [tempLogoUrl, setTempLogoUrl] = useState<string>('');
  const { toast } = useToast();
  
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      quote: "",
      author: "",
      business: "",
      location: "",
    }
  });
  
  const openAddDialog = () => {
    form.reset({
      quote: "",
      author: "",
      business: "",
      location: "",
    });
    setTempLogoUrl('');
    setCurrentTestimonial(null);
    setIsAddDialogOpen(true);
  };
  
  const openEditDialog = (testimonial: any) => {
    form.reset({
      quote: testimonial.quote,
      author: testimonial.author,
      business: testimonial.business,
      location: testimonial.location,
    });
    setTempLogoUrl(testimonial.logoUrl);
    setCurrentTestimonial(testimonial.id);
    setIsEditDialogOpen(true);
  };
  
  const confirmDelete = (id: string) => {
    setCurrentTestimonial(id);
    setIsDeleteDialogOpen(true);
  };
  
  const openLogoDialog = () => {
    setIsLogoDialogOpen(true);
  };
  
  const handleLogoSelected = (logoUrl: string) => {
    setTempLogoUrl(logoUrl);
    setIsLogoDialogOpen(false);
  };
  
  const onSubmitAdd = (data: TestimonialFormValues) => {
    const newTestimonial = {
      id: `testimonial-${Date.now()}`,
      ...data,
      logoUrl: tempLogoUrl || '/placeholder.svg' // Use default logo if none selected
    };
    
    updateTestimonials([...testimonials, newTestimonial]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Depoimento adicionado",
      description: "O novo depoimento foi adicionado com sucesso"
    });
  };
  
  const onSubmitEdit = (data: TestimonialFormValues) => {
    if (!currentTestimonial) return;
    
    const updatedTestimonials = testimonials.map(testimonial => 
      testimonial.id === currentTestimonial 
        ? { ...testimonial, ...data, logoUrl: tempLogoUrl }
        : testimonial
    );
    
    updateTestimonials(updatedTestimonials);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Depoimento atualizado",
      description: "O depoimento foi atualizado com sucesso"
    });
  };
  
  const handleDelete = () => {
    if (!currentTestimonial) return;
    
    const updatedTestimonials = testimonials.filter(
      testimonial => testimonial.id !== currentTestimonial
    );
    
    updateTestimonials(updatedTestimonials);
    setIsDeleteDialogOpen(false);
    setCurrentTestimonial(null);
    
    toast({
      title: "Depoimento excluído",
      description: "O depoimento foi excluído com sucesso"
    });
  };

  return (
    <AdminGuard>
      <AdminLayout active="testimonials">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Depoimentos</h1>
            <p className="text-gray-500">Gerencie os depoimentos exibidos no site</p>
          </div>
          <Button 
            onClick={openAddDialog}
            className="bg-[#A21C1C] hover:bg-[#911616]"
          >
            Adicionar Depoimento
          </Button>
        </div>
        
        {testimonials.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-gray-500 mb-4">Nenhum depoimento cadastrado</p>
              <Button 
                onClick={openAddDialog}
                className="bg-[#A21C1C] hover:bg-[#911616]"
              >
                Adicionar Depoimento
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-[#A21C1C] flex items-center justify-center overflow-hidden">
                      <img 
                        src={testimonial.logoUrl || '/placeholder.svg'} 
                        alt={`${testimonial.business} Logo`} 
                        className="h-10 w-10 object-contain rounded-full"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.business}</CardTitle>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="italic text-gray-700">"{testimonial.quote}"</p>
                  <p className="text-sm font-medium mt-2">- {testimonial.author}</p>
                </CardContent>
                <CardFooter className="pt-2 flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => openEditDialog(testimonial)}
                  >
                    <Edit size={16} className="mr-2" />
                    Editar
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => confirmDelete(testimonial.id)}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Excluir
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        {/* Add Testimonial Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Depoimento</DialogTitle>
              <DialogDescription>
                Preencha os campos para adicionar um novo depoimento
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitAdd)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="quote"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Depoimento</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Digite o depoimento..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Proprietário</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da pessoa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="business"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Estabelecimento</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do estabelecimento" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Cidade/UF" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Logomarca</Label>
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 border rounded flex items-center justify-center bg-gray-100">
                      {tempLogoUrl ? (
                        <img 
                          src={tempLogoUrl} 
                          alt="Logo Preview" 
                          className="h-14 w-14 object-contain" 
                        />
                      ) : (
                        <span className="text-gray-400">Logo</span>
                      )}
                    </div>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={openLogoDialog}
                    >
                      {tempLogoUrl ? "Trocar Logo" : "Adicionar Logo"}
                    </Button>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-[#A21C1C] hover:bg-[#911616]"
                  >
                    Adicionar Depoimento
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        {/* Edit Testimonial Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Editar Depoimento</DialogTitle>
              <DialogDescription>
                Atualize os campos do depoimento
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="quote"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Depoimento</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Digite o depoimento..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Proprietário</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da pessoa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="business"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Estabelecimento</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do estabelecimento" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Cidade/UF" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Logomarca</Label>
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 border rounded flex items-center justify-center bg-gray-100">
                      {tempLogoUrl ? (
                        <img 
                          src={tempLogoUrl} 
                          alt="Logo Preview" 
                          className="h-14 w-14 object-contain" 
                        />
                      ) : (
                        <span className="text-gray-400">Logo</span>
                      )}
                    </div>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={openLogoDialog}
                    >
                      {tempLogoUrl ? "Trocar Logo" : "Adicionar Logo"}
                    </Button>
                  </div>
                </div>
                
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
        
        {/* Logo Upload Dialog */}
        <Dialog open={isLogoDialogOpen} onOpenChange={setIsLogoDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Logomarca</DialogTitle>
              <DialogDescription>
                Faça upload da logo ou adicione via URL
              </DialogDescription>
            </DialogHeader>
            <ImageUploader 
              onImageSelected={handleLogoSelected} 
              buttonText="Escolher Logo"
            />
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir este depoimento? Esta ação não pode ser desfeita.
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

export default Testimonials;
