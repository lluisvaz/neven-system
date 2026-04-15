import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/support/tickets"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <div className="flex-1">
          <div className="flex items-center gap-2"><h1 className="text-2xl font-bold tracking-tight">{ticket.id}</h1><Badge variant="destructive">{ticket.priority}</Badge><Badge variant="secondary">{ticket.status}</Badge></div>
          <p className="text-muted-foreground mt-1">{ticket.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="pt-4 space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "support" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="w-8 h-8 flex-shrink-0"><AvatarFallback className="text-xs">{msg.author.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                  <div className={`flex-1 max-w-[80%] ${msg.role === "support" ? "text-right" : ""}`}>
                    <div className={`inline-block text-left p-3 rounded-lg text-sm ${msg.role === "support" ? "bg-primary/10" : "bg-muted"}`}>
                      {msg.text}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{msg.author} - {msg.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 space-y-3">
              <Textarea placeholder="Digite sua resposta..." rows={3} data-testid="input-ticket-reply" />
              <div className="flex justify-end"><Button size="sm"><Send className="w-4 h-4 mr-2" />Enviar Resposta</Button></div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Informações do Ticket</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Select defaultValue={ticket.status}><SelectTrigger className="w-40 h-8"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Novo">Novo</SelectItem><SelectItem value="Em andamento">Em andamento</SelectItem><SelectItem value="Aguardando cliente">Aguardando cliente</SelectItem><SelectItem value="Resolvido">Resolvido</SelectItem></SelectContent></Select></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Prioridade</span><Badge variant="destructive">{ticket.priority}</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Categoria</span><span>{ticket.category}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Responsável</span><span>{ticket.responsible}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Criado em</span><span>{ticket.created}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm">Informações do Cliente</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-3"><Avatar className="w-10 h-10"><AvatarFallback>JS</AvatarFallback></Avatar><div><p className="font-medium">{ticket.contact}</p><p className="text-xs text-muted-foreground">{ticket.client}</p></div></div>
              <Separator />
              <div className="flex justify-between"><span className="text-muted-foreground">Plano</span><Badge variant="outline">{ticket.plan}</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Valor</span><span>{ticket.contractValue}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tickets anteriores</span><span>{ticket.previousTickets}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">NPS</span><span>{ticket.nps}/10</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
