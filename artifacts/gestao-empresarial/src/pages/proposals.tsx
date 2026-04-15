import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Eye, Copy, Send } from "lucide-react";

const proposals = [
  { id: "PROP-2026-018", client: "Tech Solutions Ltda", contact: "João Silva", title: "Upgrade para Enterprise + Analytics", value: "R$ 15.500,00/mês", created: "10/04/2026", expiry: "25/04/2026", status: "Enviada", views: 4, responsible: "Maria Santos" },
  { id: "PROP-2026-017", client: "Saúde+ Clínicas", contact: "Juliana Martins", title: "Implantação Plano Pro + Setup", value: "R$ 9.200,00/mês", created: "08/04/2026", expiry: "23/04/2026", status: "Visualizada", views: 7, responsible: "Carlos Lima" },
  { id: "PROP-2026-016", client: "DataFlow Sistemas", contact: "Ricardo Almeida", title: "Contrato Anual Enterprise", value: "R$ 12.000,00/mês", created: "05/04/2026", expiry: "20/04/2026", status: "Em negociação", views: 12, responsible: "Carlos Lima" },
  { id: "PROP-2026-015", client: "Criativa Design", contact: "Fernanda Souza", title: "Renovação Pro + API Avançada", value: "R$ 7.200,00/mês", created: "01/04/2026", expiry: "16/04/2026", status: "Aceita", views: 5, responsible: "Rafael Mendes" },
  { id: "PROP-2026-014", client: "Verde Energia", contact: "Camila Rocha", title: "Plano Básico com Consultoria", value: "R$ 2.800,00/mês", created: "25/03/2026", expiry: "09/04/2026", status: "Recusada", views: 2, responsible: "Maria Santos" },
  { id: "PROP-2026-013", client: "LogiTech BR", contact: "Marcos Ferreira", title: "Migração para Enterprise", value: "R$ 9.600,00/mês", created: "20/03/2026", expiry: "04/04/2026", status: "Expirada", views: 0, responsible: "Carlos Lima" },
];

const statusBadge: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Rascunho: "outline", Enviada: "secondary", Visualizada: "secondary", "Em negociação": "secondary", Aceita: "default", Recusada: "destructive", Expirada: "outline"
};

export function ProposalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold tracking-tight">Propostas Comerciais</h1><p className="text-muted-foreground mt-1">{proposals.filter(p => !["Aceita", "Recusada", "Expirada"].includes(p.status)).length} propostas em aberto</p></div>
        <Button size="sm"><Plus className="w-4 h-4 mr-2" />Nova Proposta</Button>
      </div>

      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Buscar propostas..." className="pl-9" data-testid="input-search-proposals" /></div>

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Proposta</TableHead><TableHead>Cliente</TableHead><TableHead>Título</TableHead><TableHead>Valor</TableHead><TableHead>Validade</TableHead><TableHead>Visualizações</TableHead><TableHead>Status</TableHead><TableHead></TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {proposals.map(p => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-sm">{p.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2"><Avatar className="w-6 h-6"><AvatarFallback className="text-[10px]">{p.contact.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar><div><p className="text-sm font-medium">{p.client}</p><p className="text-xs text-muted-foreground">{p.contact}</p></div></div>
                </TableCell>
                <TableCell className="text-sm max-w-[200px] truncate">{p.title}</TableCell>
                <TableCell className="text-sm font-medium">{p.value}</TableCell>
                <TableCell className="text-sm">{p.expiry}</TableCell>
                <TableCell className="text-sm"><div className="flex items-center gap-1"><Eye className="w-3 h-3 text-muted-foreground" />{p.views}</div></TableCell>
                <TableCell><Badge variant={statusBadge[p.status]}>{p.status}</Badge></TableCell>
                <TableCell><div className="flex gap-1"><Button variant="ghost" size="icon"><Copy className="w-3 h-3" /></Button><Button variant="ghost" size="icon"><Send className="w-3 h-3" /></Button></div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
