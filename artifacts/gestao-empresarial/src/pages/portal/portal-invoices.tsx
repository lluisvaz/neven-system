import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText, ArrowDownToLine } from "lucide-react";

const clientLocale = { currency: "BRL", currencySymbol: "R$", country: "🇧🇷", dateFormat: "DD/MM/YYYY" };

const invoices = [
  { id: "FAT-2026-0041", date: "01/04/2026", due: "15/04/2026", value: "R$ 15.500,00", status: "A Vencer", method: "PIX", nf: "NF 8842" },
  { id: "FAT-2026-0038", date: "01/03/2026", due: "15/03/2026", value: "R$ 15.500,00", status: "Pago", method: "PIX", nf: "NF 8721" },
  { id: "FAT-2026-0035", date: "01/02/2026", due: "15/02/2026", value: "R$ 15.500,00", status: "Pago", method: "Cartão", nf: "NF 8603" },
  { id: "FAT-2026-0032", date: "01/01/2026", due: "15/01/2026", value: "R$ 12.000,00", status: "Pago", method: "Boleto", nf: "NF 8490" },
  { id: "FAT-2025-0290", date: "01/12/2025", due: "15/12/2025", value: "R$ 12.000,00", status: "Pago", method: "PIX", nf: "NF 8380" },
  { id: "FAT-2025-0265", date: "01/11/2025", due: "15/11/2025", value: "R$ 12.000,00", status: "Pago", method: "Cartão", nf: "NF 8264" },
];

export function PortalInvoicesPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Faturas</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">Histórico de cobranças e pagamentos</p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground bg-muted/40 border border-border rounded-sm px-2.5 py-1.5 w-fit">
          <span>{clientLocale.country}</span>
          <span className="text-border">·</span>
          <span>{clientLocale.currency}</span>
          <span className="text-border">·</span>
          <span>{clientLocale.dateFormat}</span>
        </div>
      </div>

      <div className="border border-border rounded-sm overflow-hidden bg-card">
        <div className="overflow-x-auto no-scrollbar">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-36 hidden sm:table-cell">Fatura</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 hidden md:table-cell">Emissão / Vencimento</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Valor ({clientLocale.currencySymbol})</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 hidden sm:table-cell">Método</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 hidden md:table-cell">Nota Fiscal</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-center">Status</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-28"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id} className={`hover:bg-muted/30 transition-colors group ${inv.status === "Pago" ? "opacity-80" : ""}`}>
                <TableCell className="font-mono text-sm py-4 text-muted-foreground hidden sm:table-cell">{inv.id}</TableCell>
                <TableCell className="py-4 hidden md:table-cell">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-mono text-muted-foreground">E: {inv.date}</span>
                    <span className="text-sm font-mono font-medium">V: {inv.due}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-mono font-medium py-4 text-right">{inv.value}</TableCell>
                <TableCell className="text-sm py-4 text-muted-foreground font-mono hidden sm:table-cell">{inv.method}</TableCell>
                <TableCell className="py-4 hidden md:table-cell">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors w-fit">
                    <FileText className="w-3.5 h-3.5" />
                    <span className="font-mono">{inv.nf}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-center">
                  <Badge
                    variant={inv.status === "Pago" ? "default" : "secondary"}
                    className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5"
                  >
                    {inv.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {inv.status !== "Pago" && (
                      <Button variant="secondary" size="sm" className="h-8 rounded-sm text-xs px-3">Pagar</Button>
                    )}
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm" title="Baixar Fatura">
                      <ArrowDownToLine className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
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
