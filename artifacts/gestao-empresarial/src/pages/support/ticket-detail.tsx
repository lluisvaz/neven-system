import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, Paperclip, Clock, CheckCircle2, UserCircle2 } from "lucide-react";
import { Link } from "wouter";

const ticket = {
  id: "TKT-1042", title: "Erro ao gerar relatório DRE", client: "Tech Solutions Ltda", contact: "João Silva",
  category: "Bug", priority: "P1", status: "Em andamento", responsible: "Rafael Mendes",
  created: "14/04/2026 10:32", plan: "Enterprise", contractValue: "R$ 15.500/mês", previousTickets: 3, nps: 8,
};

const messages = [
  { author: "João Silva", role: "client", date: "14/04/2026 10:32", text: "Ao tentar gerar o relatório DRE do mês de março, o sistema apresenta erro 500. Já tentei em diferentes navegadores e o problema persiste. Preciso desse relatório para a reunião de diretoria amanhã." },
  { author: "Rafael Mendes", role: "support", date: "14/04/2026 11:15", text: "Olá João, obrigado por reportar. Vou investigar o problema imediatamente. Poderia confirmar se o erro ocorre para todos os períodos ou apenas março/2026?" },
  { author: "João Silva", role: "client", date: "14/04/2026 14:20", text: "Testei agora e o erro ocorre apenas para março/2026 e abril/2026. Os meses anteriores geram normalmente." },
  { author: "Rafael Mendes", role: "support", date: "15/04/2026 09:00", text: "Identificamos o problema. Houve uma atualização na categorização de lançamentos que afetou o cálculo do DRE para períodos recentes. Estamos aplicando a correção e em breve o relatório estará disponível." },
];

export function TicketDetailPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 border-b border-border pb-6">
        <Link href="/support/tickets">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">{ticket.title}</h1>
            <Badge variant="destructive" className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">{ticket.priority}</Badge>
            <Badge variant="secondary" className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">{ticket.status}</Badge>
          </div>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <span className="font-mono text-xs">{ticket.id}</span>
            <span>•</span>
            <span>{ticket.client}</span>
            <span>•</span>
            <span className="font-mono text-xs">{ticket.created}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 ${msg.role === "support" ? "flex-row-reverse" : ""}`}>
                <Avatar className="w-8 h-8 rounded-sm flex-shrink-0">
                  <AvatarFallback className={`text-[10px] font-mono rounded-sm ${msg.role === "support" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>
                    {msg.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex flex-col ${msg.role === "support" ? "items-end" : "items-start"} max-w-[85%]`}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-medium">{msg.author}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{msg.date}</span>
                  </div>
                  <div className={`p-4 rounded-sm text-sm leading-relaxed ${
                    msg.role === "support" 
                      ? "bg-accent/10 text-foreground border border-accent/20" 
                      : "bg-muted border border-border"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-border mt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Responder</h3>
            <div className="border border-border rounded-sm overflow-hidden focus-within:ring-1 focus-within:ring-accent focus-within:border-accent transition-all">
              <Textarea 
                placeholder="Escreva sua resposta..." 
                className="border-0 rounded-none focus-visible:ring-0 resize-none min-h-[120px] p-4 text-sm" 
                data-testid="input-ticket-reply" 
              />
              <div className="flex items-center justify-between p-2 bg-muted/50 border-t border-border">
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm text-muted-foreground hover:text-foreground">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <Select defaultValue="keep_open">
                    <SelectTrigger className="h-8 text-xs rounded-sm border-border bg-background w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="keep_open" className="text-xs">Manter em andamento</SelectItem>
                      <SelectItem value="wait_client" className="text-xs">Aguardar cliente</SelectItem>
                      <SelectItem value="resolve" className="text-xs">Marcar como resolvido</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" className="rounded-sm h-8 px-4 text-xs font-medium">
                    <Send className="w-3.5 h-3.5 mr-2" />
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="space-y-4 border border-border p-4 rounded-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Detalhes</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <Select defaultValue={ticket.status}>
                  <SelectTrigger className="h-8 text-xs rounded-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Novo" className="text-xs">Novo</SelectItem>
                    <SelectItem value="Em andamento" className="text-xs">Em andamento</SelectItem>
                    <SelectItem value="Aguardando cliente" className="text-xs">Aguardando cliente</SelectItem>
                    <SelectItem value="Resolvido" className="text-xs">Resolvido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Responsável</p>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="w-5 h-5 rounded-sm"><AvatarFallback className="text-[8px] bg-secondary text-secondary-foreground rounded-sm">{ticket.responsible.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                  <p className="text-sm font-medium">{ticket.responsible}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Categoria</p>
                <p className="text-sm">{ticket.category}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 border border-border p-4 rounded-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cliente</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 rounded-sm">
                  <AvatarFallback className="text-xs font-mono bg-secondary text-secondary-foreground rounded-sm">
                    JS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{ticket.contact}</p>
                  <p className="text-xs text-muted-foreground">{ticket.client}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-border grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Plano</p>
                  <p className="text-sm">{ticket.plan}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">MRR</p>
                  <p className="text-sm font-mono">{ticket.contractValue.split('/')[0]}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Tickets Ant.</p>
                  <p className="text-sm font-mono">{ticket.previousTickets}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">NPS</p>
                  <p className="text-sm font-mono text-emerald-600">{ticket.nps}/10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
