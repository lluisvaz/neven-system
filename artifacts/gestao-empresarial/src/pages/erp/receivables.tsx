import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download } from "lucide-react";

const summaryCards = [
  { title: "A Receber", value: "R$ 248.500", highlight: false },
  { title: "Vencido", value: "R$ 32.400", highlight: true },
  { title: "Recebido (Mês)", value: "R$ 156.200", highlight: false },
  { title: "Inadimplência", value: "4.8%", highlight: false },
];

const receivables = [
  { id: "FAT-0041", client: "Tech Solutions Ltda", description: "Plano Enterprise", value: "R$ 8.500,00", due: "15/04/2026", status: "Pago", method: "PIX" },
  { id: "FAT-0042", client: "Nexus Digital", description: "Módulo Analytics", value: "R$ 6.460,00", due: "20/04/2026", status: "Pendente", method: "Boleto" },
  { id: "FAT-0038", client: "Innovare Consultoria", description: "Consultoria Setup", value: "R$ 2.100,00", due: "10/04/2026", status: "Vencido", method: "Boleto" },
  { id: "FAT-0043", client: "Criativa Design", description: "Plano Pro", value: "R$ 5.200,00", due: "15/04/2026", status: "Pago", method: "Cartão" },
  { id: "FAT-0035", client: "Verde Energia", description: "Plano Básico", value: "R$ 1.800,00", due: "15/03/2026", status: "Vencido", method: "PIX" },
  { id: "FAT-0044", client: "LogiTech BR", description: "Plano Enterprise", value: "R$ 9.120,00", due: "25/04/2026", status: "Pendente", method: "Cartão" },
];

const statusBadge: Record<string, "default" | "secondary" | "destructive" | "outline"> = { Pago: "default", Pendente: "secondary", Vencido: "destructive", Cancelado: "outline" };

export function ReceivablesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Contas a Receber</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">Gestão de recebíveis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-sm"><Download className="w-3.5 h-3.5 mr-2" />Exportar</Button>
          <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Nova Fatura</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4 border-y border-border">
        {summaryCards.map((card, i) => (
          <div key={i} className="flex flex-col space-y-1">
            <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">{card.title}</span>
            <span className={`text-2xl font-mono ${card.highlight ? 'text-destructive' : 'text-foreground'}`}>{card.value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar fatura, cliente..." className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" data-testid="input-search-receivables" />
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">ID</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Cliente / Descrição</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Valor</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Vencimento</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {receivables.map(r => (
              <TableRow key={r.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="text-sm font-mono py-3 text-muted-foreground">{r.id}</TableCell>
                <TableCell className="py-3">
                  <div className="text-sm font-medium">{r.client}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{r.description}</div>
                </TableCell>
                <TableCell className="text-sm font-mono font-medium py-3">{r.value}</TableCell>
                <TableCell className="text-sm font-mono py-3 text-muted-foreground">{r.due}</TableCell>
                <TableCell className="py-3 text-right">
                  <Badge variant={statusBadge[r.status]} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                    {r.status}
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
