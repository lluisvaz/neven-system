import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send, Mail, MessageSquare, Phone, MoreVertical, Paperclip } from "lucide-react";

const conversations = [
  { id: 1, contact: "João Silva", company: "Tech Solutions Ltda", lastMessage: "Entendido, vou revisar a proposta e retorno até sexta.", channel: "whatsapp", unread: 0, time: "14:32" },
  { id: 2, contact: "Ana Oliveira", company: "Nexus Digital", lastMessage: "Boa tarde! Podemos agendar uma call para discutir o upgrade?", channel: "email", unread: 1, time: "11:45" },
  { id: 3, contact: "Pedro Costa", company: "Innovare Consultoria", lastMessage: "O boleto da parcela 3 foi gerado?", channel: "whatsapp", unread: 2, time: "10:20" },
  { id: 4, contact: "Fernanda Souza", company: "Criativa Design", lastMessage: "Perfeito, muito obrigada pelo suporte!", channel: "whatsapp", unread: 0, time: "Ontem" },
  { id: 5, contact: "Marcos Ferreira", company: "LogiTech BR", lastMessage: "Segue em anexo o documento solicitado.", channel: "email", unread: 0, time: "Ontem" },
  { id: 6, contact: "Camila Rocha", company: "Verde Energia", lastMessage: "Estou com problemas para logar, podem ajudar?", channel: "whatsapp", unread: 0, time: "Segunda" },
];

const activeMessages = [
  { id: 1, author: "Maria Santos", role: "agent", text: "Olá João! Segue a proposta atualizada conforme conversamos. O valor do plano Enterprise com o módulo Analytics incluso ficou em R$ 15.500/mês.", time: "14:15", channel: "whatsapp" },
  { id: 2, author: "João Silva", role: "client", text: "Recebido, Maria. Vou analisar com o time financeiro.", time: "14:20", channel: "whatsapp" },
  { id: 3, author: "João Silva", role: "client", text: "Entendido, vou revisar a proposta e retorno até sexta.", time: "14:32", channel: "whatsapp" },
];

const channelIcons: Record<string, typeof Mail> = { 
  email: Mail, 
  whatsapp: MessageSquare, 
  phone: Phone 
};

export function CommunicationsPage() {
  const [selected, setSelected] = useState(0);
  const activeConv = conversations[selected];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Comunicações</h1>
        <p className="text-sm font-mono text-muted-foreground mt-1">Caixa de entrada unificada (WhatsApp, Email, Telefone)</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 border border-border rounded-sm overflow-hidden bg-card min-h-0">
        
        {/* Sidebar: List of Conversations */}
        <div className="lg:col-span-4 border-r border-border flex flex-col h-full bg-muted/10">
          <div className="p-4 border-b border-border bg-card">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar contatos ou mensagens..." className="pl-9 rounded-sm border-muted-foreground/20 bg-background" data-testid="input-search-conversations" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {conversations.map((conv, i) => {
              const ChannelIcon = channelIcons[conv.channel] || MessageSquare;
              const isSelected = selected === i;
              
              return (
                <div 
                  key={conv.id} 
                  onClick={() => setSelected(i)} 
                  className={`p-4 border-b border-border/50 cursor-pointer transition-colors
                    ${isSelected ? 'bg-accent/5 border-l-2 border-l-accent' : 'hover:bg-muted/30 border-l-2 border-l-transparent'}`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10 rounded-sm mt-0.5">
                      <AvatarFallback className={`text-[10px] font-mono rounded-sm ${isSelected ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                        {conv.contact.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm truncate ${isSelected ? 'font-semibold text-foreground' : 'font-medium'}`}>
                          {conv.contact}
                        </p>
                        <span className="text-[10px] font-mono text-muted-foreground flex-shrink-0 ml-2">{conv.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1 truncate">{conv.company}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <ChannelIcon className={`w-3 h-3 flex-shrink-0 ${conv.channel === 'whatsapp' ? 'text-emerald-500' : 'text-muted-foreground'}`} />
                        <p className={`text-xs truncate ${conv.unread > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                          {conv.lastMessage}
                        </p>
                      </div>
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="ml-2 w-5 h-5 rounded-full flex items-center justify-center p-0 text-[10px] flex-shrink-0 bg-accent text-accent-foreground">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main: Active Conversation */}
        <div className="lg:col-span-8 flex flex-col h-full bg-background relative">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-card">
            <div className="flex items-center gap-4">
              <Avatar className="w-10 h-10 rounded-sm">
                <AvatarFallback className="text-[10px] font-mono bg-accent text-accent-foreground rounded-sm">
                  {activeConv.contact.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-sm font-semibold">{activeConv.contact}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">{activeConv.company}</span>
                  <span className="text-[10px] text-muted-foreground">•</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm text-muted-foreground hover:text-foreground"><Phone className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm text-muted-foreground hover:text-foreground"><MoreVertical className="w-4 h-4" /></Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/5">
            {/* Date divider */}
            <div className="flex justify-center">
              <span className="text-[10px] font-mono uppercase tracking-wider bg-muted/50 px-2 py-1 rounded-sm text-muted-foreground">Hoje</span>
            </div>

            {activeMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "agent" ? "justify-end" : "justify-start"}`}>
                <div className="flex flex-col gap-1 max-w-[70%]">
                  <div className={`flex items-baseline gap-2 ${msg.role === "agent" ? "justify-end" : "justify-start"} px-1`}>
                    <span className="text-xs font-medium">{msg.author}</span>
                  </div>
                  
                  <div className={`p-4 text-sm leading-relaxed rounded-sm ${
                    msg.role === "agent" 
                      ? "bg-accent/10 border border-accent/20 text-foreground rounded-tr-none" 
                      : "bg-card border border-border rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                  
                  <div className={`flex items-center gap-1.5 px-1 mt-0.5 ${msg.role === "agent" ? "justify-end" : "justify-start"}`}>
                    <span className="text-[10px] font-mono text-muted-foreground">{msg.time}</span>
                    {msg.role === "agent" && <span className="text-[10px] text-accent">✓✓</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-border bg-card">
            <div className="border border-border rounded-sm overflow-hidden focus-within:ring-1 focus-within:ring-accent focus-within:border-accent transition-all flex flex-col">
              <Textarea 
                placeholder={`Mensagem para ${activeConv.contact}...`}
                className="border-0 rounded-none focus-visible:ring-0 resize-none min-h-[80px] p-3 text-sm bg-transparent" 
                data-testid="input-message" 
              />
              <div className="flex items-center justify-between p-2 bg-muted/30 border-t border-border">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm text-muted-foreground hover:text-foreground">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                </div>
                <Button size="sm" className="rounded-sm h-8 px-4">
                  <Send className="w-3.5 h-3.5 mr-2" />
                  Enviar
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-muted-foreground font-mono">
              <span className="uppercase tracking-wider">Respondendo via {activeConv.channel}</span>
              <span>Enter para enviar, Shift+Enter para quebrar linha</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
