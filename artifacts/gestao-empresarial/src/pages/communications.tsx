import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Search, Send, Mail, MessageSquare, Phone } from "lucide-react";

const conversations = [
  { id: 1, contact: "João Silva", company: "Tech Solutions Ltda", lastMessage: "Entendido, vou revisar a proposta e retorno até sexta.", channel: "whatsapp", unread: 0, time: "14:32" },
  { id: 2, contact: "Ana Oliveira", company: "Nexus Digital", lastMessage: "Boa tarde! Podemos agendar uma call para discutir o upgrade?", channel: "email", unread: 1, time: "11:45" },
  { id: 3, contact: "Pedro Costa", company: "Innovare Consultoria", lastMessage: "O boleto da parcela 3 foi gerado?", channel: "whatsapp", unread: 2, time: "10:20" },
  { id: 4, contact: "Fernanda Souza", company: "Criativa Design", lastMessage: "Perfeito, muito obrigada pelo suporte!", channel: "whatsapp", unread: 0, time: "Ontem" },
  { id: 5, contact: "Marcos Ferreira", company: "LogiTech BR", lastMessage: "Segue em anexo o documento solicitado.", channel: "email", unread: 0, time: "Ontem" },
];

const activeMessages = [
  { author: "Maria Santos", role: "agent", text: "Olá João! Segue a proposta atualizada conforme conversamos. O valor do plano Enterprise com o módulo Analytics incluso ficou em R$ 15.500/mês.", time: "14:15", channel: "whatsapp" },
  { author: "João Silva", role: "client", text: "Recebido, Maria. Vou analisar com o time financeiro.", time: "14:20", channel: "whatsapp" },
  { author: "João Silva", role: "client", text: "Entendido, vou revisar a proposta e retorno até sexta.", time: "14:32", channel: "whatsapp" },
];

const channelIcons: Record<string, typeof Mail> = { email: Mail, whatsapp: MessageSquare, phone: Phone };

export function CommunicationsPage() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Comunicações</h1><p className="text-muted-foreground mt-1">Caixa de entrada unificada</p></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        <Card className="lg:col-span-1 flex flex-col">
          <CardContent className="pt-4 flex-1 flex flex-col">
            <div className="relative mb-3"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Buscar conversa..." className="pl-9" data-testid="input-search-conversations" /></div>
            <div className="flex-1 overflow-y-auto space-y-1">
              {conversations.map((conv, i) => {
                const ChannelIcon = channelIcons[conv.channel] || MessageSquare;
                return (
                  <div key={conv.id} onClick={() => setSelected(i)} className={`p-3 rounded-lg cursor-pointer transition-colors ${selected === i ? "bg-muted" : "hover:bg-muted/50"}`}>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8"><AvatarFallback className="text-xs">{conv.contact.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium truncate">{conv.contact}</p>
                          <span className="text-xs text-muted-foreground flex-shrink-0">{conv.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ChannelIcon className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                          <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                        </div>
                      </div>
                      {conv.unread > 0 && <Badge className="text-xs w-5 h-5 flex items-center justify-center p-0">{conv.unread}</Badge>}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8"><AvatarFallback className="text-xs">{conversations[selected].contact.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                <div>
                  <p className="font-medium text-sm">{conversations[selected].contact}</p>
                  <p className="text-xs text-muted-foreground">{conversations[selected].company}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon"><Phone className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon"><Mail className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon"><MessageSquare className="w-4 h-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="flex-1 overflow-y-auto py-4 space-y-4">
            {activeMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "agent" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] p-3 rounded-lg text-sm ${msg.role === "agent" ? "bg-primary/10" : "bg-muted"}`}>
                  <p>{msg.text}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {channelIcons[msg.channel] && (() => { const Icon = channelIcons[msg.channel]; return <Icon className="w-3 h-3 text-muted-foreground" />; })()}
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <Separator />
          <CardContent className="pt-3">
            <div className="flex gap-2">
              <Textarea placeholder="Digite sua mensagem..." rows={1} className="min-h-[40px]" data-testid="input-message" />
              <Button size="icon"><Send className="w-4 h-4" /></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
