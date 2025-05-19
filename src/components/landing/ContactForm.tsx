
import React from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  business: z.string().min(2, {
    message: "Nome do estabelecimento deve ter pelo menos 2 caracteres.",
  }),
  phone: z.string().min(10, {
    message: "Por favor insira um telefone válido.",
  }),
  segment: z.string({
    required_error: "Por favor selecione um segmento.",
  }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const ContactForm = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      business: "",
      phone: "",
      segment: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    // Construct WhatsApp message
    const whatsappNumber = "5577913017960"; // Correct number: 77 9130-1796
    const message = encodeURIComponent(
      `*Nova solicitação de parceria*\n\n` +
      `*Nome:* ${data.name}\n` +
      `*Estabelecimento:* ${data.business}\n` +
      `*Telefone:* ${data.phone}\n` +
      `*Segmento:* ${data.segment}\n` +
      `*Mensagem:* ${data.message || "Não informada"}`
    );
    
    // Create WhatsApp URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    
    // Show success toast
    toast({
      title: "Formulário preenchido com sucesso!",
      description: "Você será redirecionado para o WhatsApp.",
    });
    
    // Use timeout to ensure toast is visible before redirect
    setTimeout(() => {
      // For mobile compatibility, try to use window.open first with _blank target
      // If that doesn't work (e.g., popup blockers), fall back to location.href
      const newWindow = window.open(whatsappUrl, '_blank');
      
      // If window.open was blocked or returned null, use location.href
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }
      
      form.reset();
    }, 1500);
  }

  const segments = [
    "Restaurante",
    "Lanchonete",
    "Pizzaria",
    "Farmácia",
    "Mercado",
    "Conveniência",
    "Pet Shop",
    "Serviços",
    "Outro"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="business"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do estabelecimento</FormLabel>
              <FormControl>
                <Input placeholder="Nome do seu estabelecimento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone/WhatsApp</FormLabel>
              <FormControl>
                <Input placeholder="(00) 00000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="segment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Segmento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o segmento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {segments.map((segment) => (
                    <SelectItem key={segment} value={segment}>
                      {segment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escreva sua mensagem aqui"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full bg-[#A21C1C] hover:bg-[#911616] transition-colors duration-300 shadow-md hover:shadow-lg">
          Enviar
        </Button>
      </form>
    </Form>
  );
};
