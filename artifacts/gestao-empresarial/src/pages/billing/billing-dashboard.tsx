import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { RefreshCw } from "lucide-react";
import { useFinancialData, fmtBRL, fmtBRLCompact } from "@/lib/financial-data";
import { GATEWAY_META } from "@/lib/client-config";

const dailyReceipts = [
  { day: "01", asaas: 14200, stripe: 4000 }, { day: "05", asaas: 18500, stripe: 6000 },
  { day: "10", asaas: 24200, stripe: 7000 }, { day: "15", asaas: 36800, stripe: 9000 },
  { day: "20", asaas: 10000, stripe: 2000 }, { day: "25", asaas: 0, stripe: 0 },
  { day: "30", asaas: 0, stripe: 0 },
];

const mrrTrend = [
  { month: "Out", value: 126000 }, { month: "Nov", value: 131000 }, { month: "Dez", value: 135000 },
  { month: "Jan", value: 140000 }, { month: "Fev", value: 145000 }, { month: "Mar", value: 148000 },
  { month: "Abr", value: 156000 },
];

const topDefaulters = [
  { client: "Innovare Consultoria", value: 2100, days: 5, gateway: "asaas" as const },
  { client: "Verde Energia", value: 1800, days: 31, gateway: "asaas" as const },
  { client: "StarUp Labs", value: 3200, days: 12, gateway: "asaas" as const },
];

const gatewayBreakdown = [
  { gateway: "asaas" as const, clients: 71, mrrBRL: 131000, share: 84, methods: "PIX, Boleto, Cartão" },
  { gateway: "stripe" as const, clients: 16, mrrBRL: 25000, share: 16, methods: "Card, Wire, ACH" },
];

function GatewayPill({ gateway }: { gateway: "stripe" | "asaas" }) {
  const m = GATEWAY_META[gateway];
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium border ${m.color} ${m.bgColor} ${m.borderColor}`}>
      {m.label}
    </span>
  );
}

export function BillingDashboardPage() {
  const { data: fin, loading, refresh } = useFinancialData();

  const mrr = fin?.mrrBRL ?? 156000;
  const arr = fin?.arrBRL ?? 156000 * 12;
  const delinquency = fin?.delinquencyRate ?? 4.8;
  const subscriptions = fin?.activeSubscriptions ?? 87;

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Faturamento</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">
            Visão geral · Stripe + Asaas · tudo em R$
            {!fin?.isLiveData && <span className="ml-2 text-amber-500 text-[10px]">[dados simulados]</span>}
          </p>
        </div>
        <Button variant="outline" size="icon" className="rounded-sm w-9 h-9" onClick={refresh} disabled={loading}>
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4 border-y border-border">
        {[
          { title: "MRR (BRL)", value: fmtBRLCompact(mrr), alert: false },
          { title: "ARR (BRL)", value: fmtBRLCompact(arr), alert: false },
          { title: "Inadimplência", value: `${delinquency}%`, alert: true },
          { title: "Assinaturas", value: String(subscriptions), alert: false },
        ].map((kpi, i) => (
          <div key={i} className="flex flex-col space-y-1">
            <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">{kpi.title}</span>
            <span className={`text-2xl font-mono ${kpi.alert ? "text-destructive" : "text-foreground"} ${loading ? "opacity-40" : ""}`}>{kpi.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gatewayBreakdown.map(gw => {
          const m = GATEWAY_META[gw.gateway];
          return (
            <div key={gw.gateway} className={`p-4 border rounded-sm ${m.borderColor} ${m.bgColor}`}>
              <div className="flex items-center justify-between mb-3">
                <GatewayPill gateway={gw.gateway} />
                <span className={`text-xs font-mono font-semibold ${m.color}`}>{gw.share}% do MRR</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Clientes</p>
                  <p className={`font-mono font-semibold ${m.color}`}>{gw.clients}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">MRR (BRL)</p>
                  <p className={`font-mono font-semibold ${m.color}`}>{fmtBRLCompact(gw.mrrBRL)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Métodos</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{gw.methods}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">MRR em R$ (Últimos 6 meses)</h2>
          <div className="h-[220px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mrrTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={v => `R$${v / 1000}k`} tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }} />
                <Tooltip
                  contentStyle={{ borderRadius: "2px", border: "1px solid hsl(var(--border))", fontFamily: "var(--font-mono)", fontSize: "12px" }}
                  formatter={(v: number) => [fmtBRL(v), "MRR"]}
                />
                <Line type="stepAfter" dataKey="value" stroke="hsl(var(--foreground))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Recebimentos por Gateway em R$ (Abril)</h2>
          <div className="h-[220px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyReceipts} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={v => `R$${v / 1000}k`} tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }} />
                <Tooltip
                  contentStyle={{ borderRadius: "2px", border: "1px solid hsl(var(--border))", fontFamily: "var(--font-mono)", fontSize: "12px" }}
                  formatter={(v: number, name: string) => [fmtBRL(v), name === "asaas" ? "Asaas" : "Stripe (conv. BRL)"]}
                  cursor={{ fill: "hsl(var(--muted))" }}
                />
                <Bar dataKey="asaas" name="asaas" stackId="a" fill="hsl(var(--accent))" radius={[0, 0, 0, 0]} />
                <Bar dataKey="stripe" name="stripe" stackId="a" fill="hsl(var(--foreground))" radius={[2, 2, 0, 0]} opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-accent" /><span>Asaas (BRL)</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-foreground opacity-60" /><span>Stripe (USD conv. em BRL)</span></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Atenção Necessária</h2>
        <div className="border border-border rounded-sm overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Cliente</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Gateway</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Valor (R$)</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Atraso</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topDefaulters.map((d, i) => (
                <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="py-3 text-sm font-medium">{d.client}</TableCell>
                  <TableCell className="py-3"><GatewayPill gateway={d.gateway} /></TableCell>
                  <TableCell className="py-3 text-sm font-mono">{fmtBRL(d.value)}</TableCell>
                  <TableCell className="py-3">
                    <Badge variant="destructive" className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">{d.days} dias</Badge>
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <Button variant="outline" size="sm" className="rounded-sm h-7 text-xs">Cobrar via {GATEWAY_META[d.gateway].label}</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
