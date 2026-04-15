import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Plus } from "lucide-react";
import { Link } from "wouter";

const tickets = [
  { id: "TKT-1042", title: "Erro ao gerar relatório DRE", client: "Tech Solutions Ltda", category: "Bug", priority: "P1", status: "Em andamento", responsible: "Rafael Mendes", slaUsed: 60, created: "14/04/2026", updated: "15/04/2026" },
  { id: "TKT-1041", title: "Dúvida sobre integração com API", client: "Nexus Digital", category: "Dúvida", priority: "P3", status: "Aguardando", responsible: "Carlos Lima", slaUsed: 30, created: "13/04/2026", updated: "14/04/2026" },
  { id: "TKT-1040", title: "Solicitar acesso ao módulo Analytics", client: "Criativa Design", category: "Solicitação", priority: "P2", status: "Novo", responsible: "-", slaUsed: 10, created: "15/04/2026", updated: "15/04/2026" },
  { id: "TKT-1039", title: "Cobrança duplicada no cartão", client: "LogiTech BR", category: "Financeiro", priority: "P1", status: "Em andamento", responsible: "Maria Santos", slaUsed: 85, created: "12/04/2026", updated: "15/04/2026" },
  { id: "TKT-1038", title: "Problema de login na área do cliente", client: "Saúde+ Clínicas", category: "Bug", priority: "P2", status: "Resolvido", responsible: "Rafael Mendes", slaUsed: 100, created: "10/04/2026", updated: "12/04/2026" },
  { id: "TKT-1037", title: "Solicitação de exportação de dados", client: "DataFlow Sistemas", category: "Solicitação", priority: "P3", status: "Fechado", responsible: "Carlos Lima", slaUsed: 100, created: "08/04/2026", updated: "10/04/2026" },
];

const statusBadge: Record<string, "default" | "secondary" | "destructive" | "outline"> = { 
  "Em andamento": "secondary", 
  "Aguardando": "outline", 
  Novo: "default", 
  Resolvido: "default", 
  Fechado: "outline" 
};

const priorityBadge: Record<string, "destructive" | "secondary" | "outline"> = { 
  P1: "destructive", 
  P2: "secondary", 
  P3: "outline", 
  P4: "outline" 
};

export function TicketsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tickets de Suporte</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">{tickets.filter(t => !["Resolvido", "Fechado"].includes(t.status)).length} abertos</p>
        </div>
        <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Novo Ticket</Button>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar tickets..." className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" data-testid="input-search-tickets" />
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-24">Ticket</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Assunto</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Cliente</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-center">Prioridade</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-24 text-center">SLA</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Responsável</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map(t => (
              <TableRow key={t.id} className={`hover:bg-muted/30 transition-colors ${["Resolvido", "Fechado"].includes(t.status) ? "opacity-60" : ""}`}>
                <TableCell className="py-3 text-sm font-mono">
                  <Link href={`/support/tickets/${t.id}`} className="text-muted-foreground hover:text-accent transition-colors">{t.id}</Link>
                </TableCell>
                <TableCell className="py-3">
                  <div className="text-sm font-medium">
                    <Link href={`/support/tickets/${t.id}`} className="hover:text-accent transition-colors">{t.title}</Link>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">Criado em {t.created} • Atualizado em {t.updated}</div>
                </TableCell>
                <TableCell className="py-3 text-sm">{t.client}</TableCell>
                <TableCell className="py-3 text-center">
                  <Badge variant={priorityBadge[t.priority]} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                    {t.priority}
                  </Badge>
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex flex-col items-center gap-1">
                    <Progress value={t.slaUsed} className={`h-1.5 w-full ${t.slaUsed > 80 && !["Resolvido", "Fechado"].includes(t.status) ? '[&>div]:bg-destructive' : ''}`} />
                    <span className="text-[10px] font-mono text-muted-foreground">{t.slaUsed}%</span>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  {t.responsible !== "-" ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="w-5 h-5 rounded-sm"><AvatarFallback className="text-[8px] bg-secondary text-secondary-foreground rounded-sm">{t.responsible.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                      <span className="text-xs">{t.responsible}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">Não atribuído</span>
                  )}
                </TableCell>
                <TableCell className="py-3 text-right">
                  <Badge variant={statusBadge[t.status]} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                    {t.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
