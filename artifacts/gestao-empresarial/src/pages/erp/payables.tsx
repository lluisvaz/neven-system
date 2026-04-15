import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

const summaryCards = [
  { title: "A Pagar (Abril)", value: "R$ 67.300,00", highlight: false },
  { title: "Vencido", value: "R$ 4.200,00", highlight: true },
  { title: "Pago (Abril)", value: "R$ 42.800,00", highlight: false },
  { title: "Aguardando Aprovação", value: "3", highlight: false, isNumber: true },
];

const payables = [
  { id: "NF-8834", supplier: "AWS Brasil", description: "Hospedagem Cloud - Abril/2026", value: "R$ 12.400,00", due: "20/04/2026", status: "Pendente", costCenter: "Infraestrutura", approval: "Aprovado" },
  { id: "NF-9921", supplier: "Google Workspace", description: "Licenças G Suite - Abril/2026", value: "R$ 2.800,00", due: "25/04/2026", status: "Pendente", costCenter: "Tecnologia", approval: "Aprovado" },
  { id: "NF-7712", supplier: "Aluguel SP Offices", description: "Aluguel escritório - Abril/2026", value: "R$ 18.500,00", due: "05/04/2026", status: "Pago", costCenter: "Administrativo", approval: "Aprovado" },
  { id: "BOL-441", supplier: "Contabiliza Ltda", description: "Serviços contábeis - Março/2026", value: "R$ 4.200,00", due: "10/04/2026", status: "Vencido", costCenter: "Financeiro", approval: "Aprovado" },
  { id: "NF-10032", supplier: "Marketing Digital BR", description: "Campanha Google Ads - Abril/2026", value: "R$ 8.600,00", due: "30/04/2026", status: "Aguardando", costCenter: "Marketing", approval: "Pendente" },
  { id: "NF-10045", supplier: "Seguro Empresarial SA", description: "Seguro anual - Parcela 4/12", value: "R$ 1.950,00", due: "28/04/2026", status: "Aguardando", costCenter: "Administrativo", approval: "Pendente" },
];

const statusBadge: Record<string, "default" | "secondary" | "destructive" | "outline"> = { 
  Pago: "default", 
  Pendente: "secondary", 
  Vencido: "destructive", 
  Aguardando: "outline" 
};

export function PayablesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Contas a Pagar</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">Gestão de obrigações financeiras</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-sm"><Download className="w-3.5 h-3.5 mr-2" />Exportar</Button>
          <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Novo Lançamento</Button>
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
          <Input placeholder="Buscar fornecedor, NF..." className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" data-testid="input-search-payables" />
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-24">Doc</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Fornecedor / Descrição</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Valor</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Vencimento</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Centro de Custo</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payables.map(p => (
              <TableRow key={p.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="text-sm font-mono py-3 text-muted-foreground">{p.id}</TableCell>
                <TableCell className="py-3">
                  <div className="text-sm font-medium">{p.supplier}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{p.description}</div>
                </TableCell>
                <TableCell className="text-sm font-mono font-medium py-3">{p.value}</TableCell>
                <TableCell className="text-sm font-mono py-3 text-muted-foreground">{p.due}</TableCell>
                <TableCell className="py-3">
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{p.costCenter}</span>
                </TableCell>
                <TableCell className="py-3 text-right">
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={statusBadge[p.status]} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                      {p.status}
                    </Badge>
                    {p.approval !== 'Aprovado' && (
                      <span className="text-[10px] text-amber-600 font-medium tracking-wide uppercase">Pendente Aprovação</span>
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
