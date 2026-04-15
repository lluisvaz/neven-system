import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download, DollarSign, AlertTriangle, TrendingDown, Clock } from "lucide-react";

const summaryCards = [
  { title: "Total a Pagar", value: "R$ 67.300,00", icon: DollarSign, color: "text-blue-500" },
  { title: "Vencido", value: "R$ 4.200,00", icon: AlertTriangle, color: "text-red-500" },
  { title: "Pago (Abril)", value: "R$ 42.800,00", icon: TrendingDown, color: "text-emerald-500" },
  { title: "Aguardando Aprovação", value: "3", icon: Clock, color: "text-amber-500" },
];

const payables = [
  { id: "NF-8834", supplier: "AWS Brasil", description: "Hospedagem Cloud - Abril/2026", value: "R$ 12.400,00", due: "20/04/2026", status: "Pendente", costCenter: "Infraestrutura", approval: "Aprovado", nf: "NF 8834" },
  { id: "NF-9921", supplier: "Google Workspace", description: "Licenças G Suite - Abril/2026", value: "R$ 2.800,00", due: "25/04/2026", status: "Pendente", costCenter: "Tecnologia", approval: "Aprovado", nf: "NF 9921" },
  { id: "NF-7712", supplier: "Aluguel SP Offices", description: "Aluguel escritório - Abril/2026", value: "R$ 18.500,00", due: "05/04/2026", status: "Pago", costCenter: "Administrativo", approval: "Aprovado", nf: "NF 7712" },
  { id: "BOL-441", supplier: "Contabiliza Ltda", description: "Serviços contábeis - Março/2026", value: "R$ 4.200,00", due: "10/04/2026", status: "Vencido", costCenter: "Financeiro", approval: "Aprovado", nf: "BOL 441" },
  { id: "NF-10032", supplier: "Marketing Digital BR", description: "Campanha Google Ads - Abril/2026", value: "R$ 8.600,00", due: "30/04/2026", status: "Aguardando", costCenter: "Marketing", approval: "Pendente", nf: "NF 10032" },
  { id: "NF-10045", supplier: "Seguro Empresarial SA", description: "Seguro anual - Parcela 4/12", value: "R$ 1.950,00", due: "28/04/2026", status: "Aguardando", costCenter: "Administrativo", approval: "Pendente", nf: "NF 10045" },
];

const statusBadge: Record<string, "default" | "secondary" | "destructive" | "outline"> = { Pago: "default", Pendente: "secondary", Vencido: "destructive", Aguardando: "outline" };

export function PayablesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contas a Pagar</h1>
          <p className="text-muted-foreground mt-1">Gerencie suas despesas e fornecedores</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Exportar</Button>
          <Button size="sm"><Plus className="w-4 h-4 mr-2" />Novo Lançamento</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <Card key={i}><CardContent className="pt-4 flex items-center gap-3"><div className={`p-2 rounded-lg bg-muted ${card.color}`}><card.icon className="w-5 h-5" /></div><div><p className="text-xs text-muted-foreground">{card.title}</p><p className="text-xl font-bold">{card.value}</p></div></CardContent></Card>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Buscar por fornecedor, NF..." className="pl-9" data-testid="input-search-payables" /></div>
        <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>NF/Boleto</TableHead><TableHead>Fornecedor</TableHead><TableHead>Descrição</TableHead><TableHead>Valor</TableHead><TableHead>Vencimento</TableHead><TableHead>Centro de Custo</TableHead><TableHead>Aprovação</TableHead><TableHead>Status</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {payables.map(p => (
              <TableRow key={p.id}>
                <TableCell className="text-sm font-mono">{p.nf}</TableCell>
                <TableCell className="text-sm font-medium">{p.supplier}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.description}</TableCell>
                <TableCell className="text-sm font-medium">{p.value}</TableCell>
                <TableCell className="text-sm">{p.due}</TableCell>
                <TableCell><Badge variant="outline" className="text-xs">{p.costCenter}</Badge></TableCell>
                <TableCell><Badge variant={p.approval === "Aprovado" ? "default" : "secondary"} className="text-xs">{p.approval}</Badge></TableCell>
                <TableCell><Badge variant={statusBadge[p.status]}>{p.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
