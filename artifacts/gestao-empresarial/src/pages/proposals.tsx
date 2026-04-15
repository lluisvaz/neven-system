import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Eye, Copy, Send, Filter, FileText } from "lucide-react";

const proposals = [
  { id: "PROP-26-018", client: "Tech Solutions Ltda", contact: "João Silva", title: "Upgrade para Enterprise + Analytics", value: "R$ 15.500,00", created: "10/04/2026", expiry: "25/04/2026", status: "Enviada", views: 4, responsible: "Maria Santos" },
  { id: "PROP-26-017", client: "Saúde+ Clínicas", contact: "Juliana Martins", title: "Implantação Plano Pro + Setup", value: "R$ 9.200,00", created: "08/04/2026", expiry: "23/04/2026", status: "Visualizada", views: 7, responsible: "Carlos Lima" },
  { id: "PROP-26-016", client: "DataFlow Sistemas", contact: "Ricardo Almeida", title: "Contrato Anual Enterprise", value: "R$ 12.000,00", created: "05/04/2026", expiry: "20/04/2026", status: "Em negociação", views: 12, responsible: "Carlos Lima" },
  { id: "PROP-26-015", client: "Criativa Design", contact: "Fernanda Souza", title: "Renovação Pro + API Avançada", value: "R$ 7.200,00", created: "01/04/2026", expiry: "16/04/2026", status: "Aceita", views: 5, responsible: "Rafael Mendes" },
  { id: "PROP-26-014", client: "Verde Energia", contact: "Camila Rocha", title: "Plano Básico com Consultoria", value: "R$ 2.800,00", created: "25/03/2026", expiry: "09/04/2026", status: "Recusada", views: 2, responsible: "Maria Santos" },
  { id: "PROP-26-013", client: "LogiTech BR", contact: "Marcos Ferreira", title: "Migração para Enterprise", value: "R$ 9.600,00", created: "20/03/2026", expiry: "04/04/2026", status: "Expirada", views: 0, responsible: "Carlos Lima" },
];

const statusBadge: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Rascunho: "outline", 
  Enviada: "secondary", 
  Visualizada: "secondary", 
  "Em negociação": "default", 
  Aceita: "outline", 
  Recusada: "destructive", 
  Expirada: "outline"
};

export function ProposalsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Propostas</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">{proposals.filter(p => !["Aceita", "Recusada", "Expirada"].includes(p.status)).length} propostas ativas</p>
        </div>
        <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Nova Proposta</Button>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar cliente, título..." className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" data-testid="input-search-proposals" />
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-24">ID</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Cliente</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Título / Escopo</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Valor Mensal</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-center">Validade</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-center">Status</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map(p => (
              <TableRow key={p.id} className={`hover:bg-muted/30 transition-colors group ${["Aceita", "Recusada", "Expirada"].includes(p.status) ? "opacity-60" : ""}`}>
                <TableCell className="font-mono text-sm py-4 text-muted-foreground">{p.id}</TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 rounded-sm">
                      <AvatarFallback className="text-[10px] font-mono bg-secondary text-secondary-foreground rounded-sm">
                        {p.contact.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{p.client}</p>
                      <p className="text-xs text-muted-foreground">{p.contact}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="text-sm font-medium group-hover:text-accent transition-colors max-w-[220px] truncate cursor-pointer">{p.title}</div>
                  {p.views > 0 && (
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-muted-foreground mt-1">
                      <Eye className="w-3 h-3" /> Visualizada {p.views}x
                    </div>
                  )}
                </TableCell>
                <TableCell className="py-4 text-right font-mono font-medium text-sm">{p.value}</TableCell>
                <TableCell className="py-4 text-center">
                  <div className="flex flex-col gap-0.5 items-center justify-center">
                    <span className="text-xs font-mono text-foreground">{p.expiry}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-center">
                  <Badge variant={statusBadge[p.status]} className={`rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 ${p.status === 'Em negociação' ? 'bg-accent text-accent-foreground hover:bg-accent/90' : p.status === 'Aceita' ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-500' : ''}`}>
                    {p.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm" title="Abrir Documento"><FileText className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm" title="Copiar Link"><Copy className="w-4 h-4" /></Button>
                    {p.status !== "Aceita" && p.status !== "Recusada" && p.status !== "Expirada" && (
                      <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm text-accent hover:text-accent hover:bg-accent/10" title="Reenviar"><Send className="w-4 h-4" /></Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
