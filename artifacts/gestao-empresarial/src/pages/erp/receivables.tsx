import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download, DollarSign, AlertTriangle, TrendingUp, Clock } from "lucide-react";

const summaryCards = [
  { title: "Total a Receber", value: "R$ 248.500,00", icon: DollarSign, color: "text-blue-500" },
  { title: "Vencido", value: "R$ 32.400,00", icon: AlertTriangle, color: "text-red-500" },
  { title: "Recebido (Abril)", value: "R$ 156.200,00", icon: TrendingUp, color: "text-emerald-500" },
  { title: "Taxa Inadimplência", value: "4.8%", icon: Clock, color: "text-amber-500" },
];

const receivables = [
  { id: "FAT-2026-0041", client: "Tech Solutions Ltda", description: "Plano Enterprise - Abril/2026", grossValue: "R$ 8.500,00", discount: "R$ 0,00", netValue: "R$ 8.500,00", issued: "01/04/2026", due: "15/04/2026", paid: "12/04/2026", status: "Pago", method: "PIX", stripe: true },
  { id: "FAT-2026-0042", client: "Nexus Digital", description: "Módulo Analytics - Abril/2026", grossValue: "R$ 6.800,00", discount: "R$ 340,00", netValue: "R$ 6.460,00", issued: "01/04/2026", due: "20/04/2026", paid: "-", status: "Pendente", method: "Boleto", stripe: false },
  { id: "FAT-2026-0038", client: "Innovare Consultoria", description: "Consultoria Setup - Parcela 2/4", grossValue: "R$ 2.100,00", discount: "R$ 0,00", netValue: "R$ 2.100,00", issued: "15/03/2026", due: "10/04/2026", paid: "-", status: "Vencido", method: "Boleto", stripe: false },
  { id: "FAT-2026-0043", client: "Criativa Design", description: "Plano Pro - Abril/2026", grossValue: "R$ 5.200,00", discount: "R$ 0,00", netValue: "R$ 5.200,00", issued: "01/04/2026", due: "15/04/2026", paid: "14/04/2026", status: "Pago", method: "Cartão", stripe: true },
  { id: "FAT-2026-0035", client: "Verde Energia", description: "Plano Básico - Março/2026", grossValue: "R$ 1.800,00", discount: "R$ 0,00", netValue: "R$ 1.800,00", issued: "01/03/2026", due: "15/03/2026", paid: "-", status: "Vencido", method: "PIX", stripe: true },
  { id: "FAT-2026-0044", client: "LogiTech BR", description: "Plano Enterprise - Abril/2026", grossValue: "R$ 9.600,00", discount: "R$ 480,00", netValue: "R$ 9.120,00", issued: "01/04/2026", due: "25/04/2026", paid: "-", status: "Pendente", method: "Cartão", stripe: true },
];

const statusBadge: Record<string, "default" | "secondary" | "destructive" | "outline"> = { Pago: "default", Pendente: "secondary", Vencido: "destructive", Cancelado: "outline" };

export function ReceivablesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contas a Receber</h1>
          <p className="text-muted-foreground mt-1">Gerencie seus recebíveis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Exportar</Button>
          <Button size="sm"><Plus className="w-4 h-4 mr-2" />Nova Cobrança</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <Card key={i}>
            <CardContent className="pt-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-muted ${card.color}`}><card.icon className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-muted-foreground">{card.title}</p>
                <p className="text-xl font-bold">{card.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar por cliente, documento..." className="pl-9" data-testid="input-search-receivables" />
        </div>
        <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Valor Líquido</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Método</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receivables.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="text-sm font-mono">{r.id}</TableCell>
                  <TableCell className="text-sm font-medium">{r.client}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.description}</TableCell>
                  <TableCell className="text-sm font-medium">{r.netValue}</TableCell>
                  <TableCell className="text-sm">{r.due}</TableCell>
                  <TableCell className="text-sm">{r.paid}</TableCell>
                  <TableCell><Badge variant={statusBadge[r.status]}>{r.status}</Badge></TableCell>
                  <TableCell className="text-sm flex items-center gap-1">{r.method}{r.stripe && <Badge variant="outline" className="text-[10px] ml-1">Stripe</Badge>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
