import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal, CheckCircle2, PauseCircle, XCircle } from "lucide-react";
import { GATEWAY_META, type Gateway } from "@/lib/client-config";

const subscriptions = [
  { client: "Tech Solutions Ltda", plan: "Enterprise", value: "R$ 12.000", currency: "BRL", frequency: "Mensal", nextBilling: "01/05/2026", status: "Ativa", method: "Cartão •••• 4242", gateway: "asaas" as Gateway, country: "🇧🇷" },
  { client: "Nexus Digital", plan: "Pro", value: "R$ 5.200", currency: "BRL", frequency: "Mensal", nextBilling: "15/05/2026", status: "Ativa", method: "Cartão •••• 1234", gateway: "asaas" as Gateway, country: "🇧🇷" },
  { client: "Criativa Design", plan: "Pro + API", value: "R$ 7.200", currency: "BRL", frequency: "Mensal", nextBilling: "01/05/2026", status: "Ativa", method: "PIX", gateway: "asaas" as Gateway, country: "🇧🇷" },
  { client: "LogiTech BR", plan: "Enterprise", value: "R$ 9.600", currency: "BRL", frequency: "Mensal", nextBilling: "25/04/2026", status: "Ativa", method: "Boleto", gateway: "asaas" as Gateway, country: "🇧🇷" },
  { client: "Saúde+ Clínicas", plan: "Pro", value: "R$ 5.200", currency: "BRL", frequency: "Mensal", nextBilling: "10/05/2026", status: "Ativa", method: "Cartão •••• 5678", gateway: "asaas" as Gateway, country: "🇧🇷" },
  { client: "Acme Corp", plan: "Enterprise", value: "$ 2.400", currency: "USD", frequency: "Monthly", nextBilling: "01/05/2026", status: "Ativa", method: "Card •••• 4242", gateway: "stripe" as Gateway, country: "🇺🇸" },
  { client: "Verde Energia", plan: "Básico", value: "R$ 1.800", currency: "BRL", frequency: "Mensal", nextBilling: "-", status: "Pausada", method: "PIX", gateway: "asaas" as Gateway, country: "🇧🇷" },
  { client: "DataFlow Sistemas", plan: "Enterprise", value: "R$ 12.000", currency: "BRL", frequency: "Mensal", nextBilling: "-", status: "Cancelada", method: "Cartão •••• 9999", gateway: "asaas" as Gateway, country: "🇧🇷" },
  { client: "Agro Brasil", plan: "Pro", value: "R$ 5.200", currency: "BRL", frequency: "Mensal", nextBilling: "05/05/2026", status: "Ativa", method: "Boleto", gateway: "asaas" as Gateway, country: "🇧🇷" },
];

const statusConfig: Record<string, { icon: React.ElementType; colorClass: string }> = {
  Ativa: { icon: CheckCircle2, colorClass: "text-emerald-500" },
  Pausada: { icon: PauseCircle, colorClass: "text-amber-500" },
  Cancelada: { icon: XCircle, colorClass: "text-muted-foreground" },
};

function GatewayPill({ gateway }: { gateway: Gateway }) {
  const m = GATEWAY_META[gateway];
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium border ${m.color} ${m.bgColor} ${m.borderColor}`}>
      {m.label}
    </span>
  );
}

export function SubscriptionsPage() {
  const active = subscriptions.filter(s => s.status === "Ativa");

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Assinaturas</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">Receita recorrente · Stripe + Asaas</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4 border-y border-border">
        <div className="flex flex-col space-y-1">
          <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">Ativas</span>
          <span className="text-2xl font-mono">{active.length}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">MRR Total</span>
          <span className="text-2xl font-mono">R$ 58.200</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">via Asaas</span>
          <span className={`text-2xl font-mono ${GATEWAY_META.asaas.color}`}>
            {subscriptions.filter(s => s.gateway === "asaas" && s.status === "Ativa").length}
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">via Stripe</span>
          <span className={`text-2xl font-mono ${GATEWAY_META.stripe.color}`}>
            {subscriptions.filter(s => s.gateway === "stripe" && s.status === "Ativa").length}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar cliente, plano..." className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" />
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Cliente / Plano</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 hidden md:table-cell">Gateway · Pagamento</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Valor</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 hidden sm:table-cell">Próx. Cobrança</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Status</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((s, i) => {
                const Icon = statusConfig[s.status].icon;
                return (
                  <TableRow key={i} className={`hover:bg-muted/30 transition-colors ${s.status === "Cancelada" ? "opacity-60" : ""}`}>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{s.country}</span>
                        <div>
                          <div className="font-medium text-sm">{s.client}</div>
                          <div className="text-xs text-muted-foreground">{s.plan} · {s.frequency}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <GatewayPill gateway={s.gateway} />
                        <span className="text-xs text-muted-foreground">{s.method}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-right font-mono font-medium text-sm">{s.value}</TableCell>
                    <TableCell className="py-3 font-mono text-sm text-muted-foreground hidden sm:table-cell">{s.nextBilling}</TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-1.5">
                        <Icon className={`w-3.5 h-3.5 ${statusConfig[s.status].colorClass}`} />
                        <span className="text-xs font-medium">{s.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-right">
                      <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
