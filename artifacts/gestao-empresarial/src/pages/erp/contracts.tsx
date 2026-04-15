import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, AlertTriangle } from "lucide-react";

const contracts = [
  { id: "CTR-2026-001", client: "Tech Solutions Ltda", type: "Enterprise Anual", products: "Plano Enterprise + Analytics", value: "R$ 15.500,00/mês", start: "01/01/2026", end: "31/12/2026", renewal: "01/12/2026", responsible: "Maria Santos", status: "Ativo", signature: "Assinado" },
  { id: "CTR-2026-008", client: "Nexus Digital", type: "Pro Mensal", products: "Plano Pro", value: "R$ 5.200,00/mês", start: "15/02/2026", end: "Indeterminado", renewal: "-", responsible: "Carlos Lima", status: "Ativo", signature: "Assinado" },
  { id: "CTR-2025-042", client: "Innovare Consultoria", type: "Consultoria", products: "Consultoria Técnica", value: "R$ 2.100,00/parcela", start: "01/12/2025", end: "30/04/2026", renewal: "15/04/2026", responsible: "Maria Santos", status: "Vencendo", signature: "Assinado" },
  { id: "CTR-2026-012", client: "Criativa Design", type: "Pro Anual", products: "Plano Pro + API", value: "R$ 7.200,00/mês", start: "01/03/2026", end: "28/02/2027", renewal: "01/02/2027", responsible: "Rafael Mendes", status: "Ativo", signature: "Assinado" },
  { id: "CTR-2026-015", client: "DataFlow Sistemas", type: "Enterprise Anual", products: "Plano Enterprise", value: "R$ 12.000,00/mês", start: "01/04/2026", end: "31/03/2027", renewal: "01/03/2027", responsible: "Carlos Lima", status: "Rascunho", signature: "Aguardando" },
  { id: "CTR-2025-028", client: "Verde Energia", type: "Básico Mensal", products: "Plano Básico", value: "R$ 1.800,00/mês", start: "01/06/2025", end: "Indeterminado", renewal: "-", responsible: "Maria Santos", status: "Cancelado", signature: "Assinado" },
];

const statusBadge: Record<string, "default" | "secondary" | "destructive" | "outline"> = { Ativo: "default", Vencendo: "secondary", Rascunho: "outline", Cancelado: "destructive" };

export function ContractsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contratos</h1>
          <p className="text-muted-foreground mt-1">Gestão de contratos com clientes</p>
        </div>
        <Button size="sm"><Plus className="w-4 h-4 mr-2" />Novo Contrato</Button>
      </div>

      <Card className="border-amber-200 bg-amber-50/50">
        <CardContent className="pt-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <div>
            <p className="text-sm font-medium text-amber-900">1 contrato vencendo nos próximos 30 dias</p>
            <p className="text-xs text-amber-700">Innovare Consultoria - CTR-2025-042 - Vence em 30/04/2026</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Buscar por cliente, contrato..." className="pl-9" data-testid="input-search-contracts" /></div>
        <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Contrato</TableHead><TableHead>Cliente</TableHead><TableHead>Tipo</TableHead><TableHead>Valor</TableHead><TableHead>Início</TableHead><TableHead>Término</TableHead><TableHead>Assinatura</TableHead><TableHead>Status</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {contracts.map(c => (
              <TableRow key={c.id}>
                <TableCell className="text-sm font-mono">{c.id}</TableCell>
                <TableCell className="text-sm font-medium">{c.client}</TableCell>
                <TableCell className="text-sm">{c.type}</TableCell>
                <TableCell className="text-sm font-medium">{c.value}</TableCell>
                <TableCell className="text-sm">{c.start}</TableCell>
                <TableCell className="text-sm">{c.end}</TableCell>
                <TableCell><Badge variant={c.signature === "Assinado" ? "default" : "outline"} className="text-xs">{c.signature}</Badge></TableCell>
                <TableCell><Badge variant={statusBadge[c.status]}>{c.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
