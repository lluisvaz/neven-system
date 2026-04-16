import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, AlertCircle } from "lucide-react";

const contracts = [
  { id: "CTR-26-001", client: "Tech Solutions Ltda", products: "Enterprise + Analytics", value: "R$ 15.500,00", start: "01/01/2026", end: "31/12/2026", status: "Ativo" },
  { id: "CTR-26-008", client: "Nexus Digital", products: "Plano Pro", value: "R$ 5.200,00", start: "15/02/2026", end: "14/02/2027", status: "Ativo" },
  { id: "CTR-25-042", client: "Innovare Consultoria", products: "Consultoria Técnica", value: "R$ 2.100,00", start: "01/12/2025", end: "30/04/2026", status: "Vencendo" },
  { id: "CTR-26-012", client: "Criativa Design", products: "Plano Pro + API", value: "R$ 7.200,00", start: "01/03/2026", end: "28/02/2027", status: "Ativo" },
  { id: "CTR-26-015", client: "DataFlow Sistemas", products: "Plano Enterprise", value: "R$ 12.000,00", start: "01/04/2026", end: "31/03/2027", status: "Rascunho" },
  { id: "CTR-25-028", client: "Verde Energia", products: "Plano Básico", value: "R$ 1.800,00", start: "01/06/2025", end: "31/05/2026", status: "Cancelado" },
];

const statusBadge: Record<string, "default" | "secondary" | "destructive" | "outline"> = { 
  Ativo: "default", 
  Vencendo: "destructive", 
  Rascunho: "outline", 
  Cancelado: "secondary" 
};

export function ContractsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Contratos</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">Gestão de assinaturas e serviços</p>
        </div>
        <Button size="sm" className="rounded-sm w-fit"><Plus className="w-3.5 h-3.5 mr-2" />Novo Contrato</Button>
      </div>

      <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-sm p-3 flex items-center gap-3 text-sm">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        <p><strong>Atenção:</strong> 1 contrato vence nos próximos 30 dias (Innovare Consultoria).</p>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar cliente, contrato..." className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" data-testid="input-search-contracts" />
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-28 hidden sm:table-cell">ID</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Cliente / Escopo</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 hidden md:table-cell">Vigência</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right hidden sm:table-cell">Valor Mensal</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map(c => (
                <TableRow key={c.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="text-sm font-mono py-3 text-muted-foreground hidden sm:table-cell">{c.id}</TableCell>
                  <TableCell className="py-3">
                    <div className="text-sm font-medium">{c.client}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{c.products}</div>
                  </TableCell>
                  <TableCell className="py-3 hidden md:table-cell">
                    <div className="text-sm font-mono">{c.start}</div>
                    <div className="text-xs font-mono text-muted-foreground mt-0.5">Até {c.end}</div>
                  </TableCell>
                  <TableCell className="py-3 text-sm font-mono font-medium text-right hidden sm:table-cell">{c.value}</TableCell>
                  <TableCell className="py-3 text-right">
                    <Badge variant={statusBadge[c.status]} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                      {c.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
