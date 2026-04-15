import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Send, MessageSquare } from "lucide-react";
import { Link } from "wouter";

const tickets = [
  { id: "TKT-1042", title: "Erro ao gerar relatório DRE", category: "Bug", priority: "Alta", status: "Em andamento", created: "14/04/2026", updated: "Hoje às 10:30" },
  { id: "TKT-1035", title: "Dúvida sobre limites da API", category: "Dúvida", priority: "Baixa", status: "Resolvido", created: "02/04/2026", updated: "03/04/2026" },
  { id: "TKT-1028", title: "Solicitação de novos relatórios", category: "Solicitação", priority: "Média", status: "Fechado", created: "20/03/2026", updated: "25/03/2026" },
  { id: "TKT-1015", title: "Dificuldade na emissão de nota fiscal", category: "Dúvida", priority: "Média", status: "Fechado", created: "05/03/2026", updated: "06/03/2026" },
];

const statusBadge: Record<string, "default" | "secondary" | "outline"> = { 
  "Em andamento": "secondary", 
  Resolvido: "default", 
  Fechado: "outline" 
};

export function PortalTicketsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Meus Chamados</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">Acompanhe e abra solicitações de suporte</p>
        </div>
        <Button size="sm" onClick={() => setShowForm(!showForm)} className="rounded-sm" disabled={showForm}>
          <Plus className="w-3.5 h-3.5 mr-2" />Novo Chamado
        </Button>
      </div>

      {showForm && (
        <div className="border border-border rounded-sm bg-card p-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Abrir Solicitação</h2>
            <Button variant="ghost" size="sm" className="rounded-sm text-muted-foreground" onClick={() => setShowForm(false)}>Cancelar</Button>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Assunto Principal</Label>
              <Input placeholder="Descreva brevemente o problema ou necessidade" className="rounded-sm" data-testid="input-ticket-subject" />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Categoria</Label>
                <Select defaultValue="question">
                  <SelectTrigger className="rounded-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Problema / Erro (Bug)</SelectItem>
                    <SelectItem value="question">Dúvida Operacional</SelectItem>
                    <SelectItem value="request">Solicitação de Melhoria</SelectItem>
                    <SelectItem value="financial">Financeiro / Cobrança</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nível de Urgência</Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="rounded-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Alta (Impede o uso do sistema)</SelectItem>
                    <SelectItem value="medium">Média (Dificulta parte do processo)</SelectItem>
                    <SelectItem value="low">Baixa (Não afeta operação diária)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Descrição Detalhada</Label>
              <Textarea 
                placeholder="Descreva com o máximo de detalhes possível o que está acontecendo..." 
                className="rounded-sm min-h-[120px] resize-none" 
              />
              <p className="text-[10px] text-muted-foreground">Inclua passos para reproduzir, mensagens de erro exatas ou qualquer informação relevante.</p>
            </div>
            
            <div className="flex justify-end pt-2">
              <Button className="rounded-sm px-8">
                <Send className="w-3.5 h-3.5 mr-2" />Enviar Solicitação
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="border border-border rounded-sm overflow-hidden bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-24">ID</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Assunto</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Categoria / Prioridade</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Abertura / Última Info</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-center">Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map(t => (
              <TableRow key={t.id} className={`hover:bg-muted/30 transition-colors group cursor-pointer ${["Resolvido", "Fechado"].includes(t.status) ? "opacity-70" : ""}`}>
                <TableCell className="font-mono text-sm py-4 text-muted-foreground">{t.id}</TableCell>
                <TableCell className="py-4">
                  <div className="text-sm font-medium group-hover:text-accent transition-colors">{t.title}</div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-sm">{t.category}</span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">{t.priority}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-mono text-foreground">{t.created}</span>
                    <span className="text-xs font-mono text-muted-foreground">{t.updated}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-center">
                  <Badge variant={statusBadge[t.status]} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                    {t.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity text-accent">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
