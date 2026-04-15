import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Send } from "lucide-react";
import { useState } from "react";

const tickets = [
  { id: "TKT-1042", title: "Erro ao gerar relatório DRE", category: "Bug", priority: "Alta", status: "Em andamento", created: "14/04/2026", updated: "15/04/2026" },
  { id: "TKT-1035", title: "Dúvida sobre limites da API", category: "Dúvida", priority: "Baixa", status: "Resolvido", created: "02/04/2026", updated: "03/04/2026" },
  { id: "TKT-1028", title: "Solicitação de novos relatórios", category: "Solicitação", priority: "Média", status: "Fechado", created: "20/03/2026", updated: "25/03/2026" },
];

const statusBadge: Record<string, "default" | "secondary" | "outline"> = { "Em andamento": "secondary", Resolvido: "default", Fechado: "outline" };

export function PortalTicketsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Meus Chamados</h1><p className="text-muted-foreground mt-1">Acompanhe e abra chamados de suporte</p></div>
        <Button size="sm" onClick={() => setShowForm(!showForm)}><Plus className="w-4 h-4 mr-2" />Novo Chamado</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader><CardTitle className="text-base">Abrir Novo Chamado</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Assunto</Label><Input placeholder="Descreva brevemente o problema" data-testid="input-ticket-subject" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Categoria</Label><Select defaultValue="bug"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="bug">Bug / Erro</SelectItem><SelectItem value="question">Dúvida</SelectItem><SelectItem value="request">Solicitação</SelectItem><SelectItem value="financial">Financeiro</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label>Prioridade</Label><Select defaultValue="medium"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="high">Alta</SelectItem><SelectItem value="medium">Média</SelectItem><SelectItem value="low">Baixa</SelectItem></SelectContent></Select></div>
            </div>
            <div className="space-y-2"><Label>Descrição</Label><Textarea placeholder="Descreva o problema em detalhes..." rows={4} /></div>
            <div className="flex justify-end gap-2"><Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Cancelar</Button><Button size="sm"><Send className="w-4 h-4 mr-2" />Enviar Chamado</Button></div>
          </CardContent>
        </Card>
      )}

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Ticket</TableHead><TableHead>Assunto</TableHead><TableHead>Categoria</TableHead><TableHead>Prioridade</TableHead><TableHead>Criado em</TableHead><TableHead>Atualizado</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {tickets.map(t => (
              <TableRow key={t.id}>
                <TableCell className="font-mono text-sm">{t.id}</TableCell>
                <TableCell className="text-sm font-medium">{t.title}</TableCell>
                <TableCell><Badge variant="outline" className="text-xs">{t.category}</Badge></TableCell>
                <TableCell className="text-sm">{t.priority}</TableCell>
                <TableCell className="text-sm">{t.created}</TableCell>
                <TableCell className="text-sm">{t.updated}</TableCell>
                <TableCell><Badge variant={statusBadge[t.status]}>{t.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
