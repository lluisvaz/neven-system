import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, CreditCard, Eye } from "lucide-react";

const invoices = [
  { id: "FAT-2026-0041", date: "01/04/2026", due: "15/04/2026", value: "R$ 15.500,00", status: "Pago", method: "PIX", nf: "NF 8842" },
  { id: "FAT-2026-0038", date: "01/03/2026", due: "15/03/2026", value: "R$ 15.500,00", status: "Pago", method: "Cartão", nf: "NF 8721" },
  { id: "FAT-2026-0035", date: "01/02/2026", due: "15/02/2026", value: "R$ 15.500,00", status: "Pago", method: "PIX", nf: "NF 8603" },
  { id: "FAT-2026-0032", date: "01/01/2026", due: "15/01/2026", value: "R$ 12.000,00", status: "Pago", method: "Boleto", nf: "NF 8490" },
  { id: "FAT-2025-0290", date: "01/12/2025", due: "15/12/2025", value: "R$ 12.000,00", status: "Pago", method: "PIX", nf: "NF 8380" },
  { id: "FAT-2025-0265", date: "01/11/2025", due: "15/11/2025", value: "R$ 12.000,00", status: "Pago", method: "Cartão", nf: "NF 8264" },
];

export function PortalInvoicesPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight">Minhas Faturas</h1><p className="text-muted-foreground mt-1">Histórico de cobranças e pagamentos</p></div>

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Fatura</TableHead><TableHead>Emissão</TableHead><TableHead>Vencimento</TableHead><TableHead>Valor</TableHead><TableHead>Método</TableHead><TableHead>NF</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>
            {invoices.map(inv => (
              <TableRow key={inv.id}>
                <TableCell className="font-mono text-sm">{inv.id}</TableCell>
                <TableCell className="text-sm">{inv.date}</TableCell>
                <TableCell className="text-sm">{inv.due}</TableCell>
                <TableCell className="text-sm font-medium">{inv.value}</TableCell>
                <TableCell className="text-sm">{inv.method}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{inv.nf}</TableCell>
                <TableCell><Badge variant="default">{inv.status}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon"><Download className="w-4 h-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
