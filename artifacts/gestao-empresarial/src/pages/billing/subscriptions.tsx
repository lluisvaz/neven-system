import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal } from "lucide-react";

const subscriptions = [
  { client: "Tech Solutions Ltda", plan: "Enterprise", value: "R$ 12.000,00", frequency: "Mensal", nextBilling: "01/05/2026", status: "Ativa", method: "Cartão **** 4242" },
  { client: "Nexus Digital", plan: "Pro", value: "R$ 5.200,00", frequency: "Mensal", nextBilling: "15/05/2026", status: "Ativa", method: "Cartão **** 1234" },
  { client: "Criativa Design", plan: "Pro + API", value: "R$ 7.200,00", frequency: "Mensal", nextBilling: "01/05/2026", status: "Ativa", method: "PIX" },
  { client: "LogiTech BR", plan: "Enterprise", value: "R$ 9.600,00", frequency: "Mensal", nextBilling: "25/04/2026", status: "Ativa", method: "Boleto" },
  { client: "Saúde+ Clínicas", plan: "Pro", value: "R$ 5.200,00", frequency: "Mensal", nextBilling: "10/05/2026", status: "Ativa", method: "Cartão **** 5678" },
  { client: "Verde Energia", plan: "Básico", value: "R$ 1.800,00", frequency: "Mensal", nextBilling: "-", status: "Pausada", method: "PIX" },
  { client: "DataFlow Sistemas", plan: "Enterprise", value: "R$ 12.000,00", frequency: "Mensal", nextBilling: "-", status: "Cancelada", method: "Cartão **** 9999" },
  { client: "Agro Brasil", plan: "Pro", value: "R$ 5.200,00", frequency: "Mensal", nextBilling: "05/05/2026", status: "Ativa", method: "Boleto" },
];

const statusBadge: Record<string, "default" | "secondary" | "destructive"> = { Ativa: "default", Pausada: "secondary", Cancelada: "destructive" };

export function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold tracking-tight">Assinaturas</h1><p className="text-muted-foreground mt-1">{subscriptions.filter(s => s.status === "Ativa").length} assinaturas ativas</p></div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Buscar por cliente, plano..." className="pl-9" data-testid="input-search-subscriptions" /></div>
        <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Cliente</TableHead><TableHead>Plano</TableHead><TableHead>Valor</TableHead><TableHead>Frequência</TableHead><TableHead>Próx. Cobrança</TableHead><TableHead>Método</TableHead><TableHead>Status</TableHead><TableHead></TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {subscriptions.map((s, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{s.client}</TableCell>
                <TableCell><Badge variant="outline" className="text-xs">{s.plan}</Badge></TableCell>
                <TableCell className="font-medium">{s.value}</TableCell>
                <TableCell className="text-sm">{s.frequency}</TableCell>
                <TableCell className="text-sm">{s.nextBilling}</TableCell>
                <TableCell className="text-sm">{s.method}</TableCell>
                <TableCell><Badge variant={statusBadge[s.status]}>{s.status}</Badge></TableCell>
                <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
