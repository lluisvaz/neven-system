import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download, RefreshCw } from "lucide-react";
import { GATEWAY_META, type Gateway } from "@/lib/client-config";
import { useFinancialData, fmtBRL } from "@/lib/financial-data";

const receivables = [
  { id: "FAT-0041", client: "Tech Solutions Ltda", description: "Plano Enterprise", valueBRL: 8500, currency: "BRL", due: "15/04/2026", status: "Pago", method: "PIX", gateway: "asaas" as Gateway },
  { id: "FAT-0042", client: "Nexus Digital", description: "Módulo Analytics", valueBRL: 6460, currency: "BRL", due: "20/04/2026", status: "Pendente", method: "Boleto", gateway: "asaas" as Gateway },
  { id: "FAT-0038", client: "Innovare Consultoria", description: "Consultoria Setup", valueBRL: 2100, currency: "BRL", due: "10/04/2026", status: "Vencido", method: "Boleto", gateway: "asaas" as Gateway },
  { id: "FAT-0043", client: "Criativa Design", description: "Plano Pro", valueBRL: 5200, currency: "BRL", due: "15/04/2026", status: "Pago", method: "Cartão", gateway: "asaas" as Gateway },
  { id: "FAT-0044", client: "LogiTech BR", description: "Plano Enterprise", valueBRL: 9120, currency: "BRL", due: "25/04/2026", status: "Pendente", method: "Cartão", gateway: "asaas" as Gateway },
  { id: "INV-0039", client: "Acme Corp", description: "Enterprise Plan (USD $2,400)", valueBRL: 12288, currency: "USD", due: "01/05/2026", status: "Pendente", method: "Card •••• 4242", gateway: "stripe" as Gateway },
  { id: "FAT-0035", client: "Verde Energia", description: "Plano Básico", valueBRL: 1800, currency: "BRL", due: "15/03/2026", status: "Vencido", method: "PIX", gateway: "asaas" as Gateway },
];

const statusBadge: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Pago: "default", Pendente: "secondary", Vencido: "destructive", Cancelado: "outline",
};

function GatewayPill({ gateway }: { gateway: Gateway }) {
  const m = GATEWAY_META[gateway];
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium border ${m.color} ${m.bgColor} ${m.borderColor}`}>
      {m.label}
    </span>
  );
}

export function ReceivablesPage() {
  const { data: fin, loading, refresh } = useFinancialData();

  const summaryCards = [
    { title: "A Receber (BRL)", value: fmtBRL(fin?.receivableBRL ?? 248500), highlight: false },
    { title: "Vencido (BRL)", value: fmtBRL(fin?.overdueBRL ?? 32400), highlight: true },
    { title: "Recebido no Mês (BRL)", value: fmtBRL(fin?.receivedThisMonthBRL ?? 156200), highlight: false },
    { title: "Inadimplência", value: `${fin?.delinquencyRate ?? 4.8}%`, highlight: false },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Contas a Receber</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">
            Stripe + Asaas · tudo convertido em R$
            {!fin?.isLiveData && <span className="ml-2 text-amber-500 text-[10px]">[dados simulados]</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-sm w-9 h-9" onClick={refresh} disabled={loading}>
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline" size="sm" className="rounded-sm"><Download className="w-3.5 h-3.5 mr-2" />Exportar</Button>
          <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Nova Fatura</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4 border-y border-border">
        {summaryCards.map((card, i) => (
          <div key={i} className="flex flex-col space-y-1">
            <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">{card.title}</span>
            <span className={`text-2xl font-mono ${card.highlight ? "text-destructive" : "text-foreground"} ${loading ? "opacity-40" : ""}`}>
              {card.value}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 py-3 border-b border-border">
        {(["asaas", "stripe"] as Gateway[]).map(gw => {
          const m = GATEWAY_META[gw];
          const gwItems = receivables.filter(r => r.gateway === gw);
          const totalBRL = gwItems.reduce((s, r) => s + r.valueBRL, 0);
          const overdue = gwItems.filter(r => r.status === "Vencido").length;
          return (
            <div key={gw} className={`flex items-center justify-between p-3 rounded-sm border ${m.borderColor} ${m.bgColor}`}>
              <div>
                <p className={`text-xs font-semibold ${m.color}`}>{m.label}</p>
                <p className="text-xs text-muted-foreground">{gwItems.length} faturas · {fmtBRL(totalBRL)}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-mono font-semibold ${overdue > 0 ? "text-destructive" : m.color}`}>
                  {overdue > 0 ? `${overdue} vencida(s)` : "Em dia"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar fatura, cliente..." className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" />
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">ID</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Cliente / Descrição</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Gateway · Método</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Vencimento</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Valor (R$)</TableHead>
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
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <GatewayPill gateway={r.gateway} />
                    <span className="text-xs text-muted-foreground">{r.method}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-mono py-3 text-muted-foreground">{r.due}</TableCell>
                <TableCell className="text-sm font-mono font-medium py-3 text-right">
                  {fmtBRL(r.valueBRL)}
                  {r.currency !== "BRL" && (
                    <div className="text-[10px] text-muted-foreground font-normal">orig. {r.currency}</div>
                  )}
                </TableCell>
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
    </div>
  );
}
