import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
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
  { client: "Innovare Consultoria", value: "R$ 2.100,00", days: 5, gateway: "asaas" as const },
  { client: "Verde Energia", value: "R$ 1.800,00", days: 31, gateway: "asaas" as const },
  { client: "StarUp Labs", value: "R$ 3.200,00", days: 12, gateway: "asaas" as const },
];

const gatewayBreakdown = [
  { gateway: "asaas" as const, clients: 71, mrr: "R$ 131k", share: "84%", methods: "PIX, Boleto, Cartão" },
  { gateway: "stripe" as const, clients: 16, mrr: "$ 25k (USD)", share: "16%", methods: "Card, Wire, ACH" },
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
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Faturamento</h1>
        <p className="text-sm font-mono text-muted-foreground mt-1">Visão geral · Stripe + Asaas</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4 border-y border-border">
        {[
          { title: "MRR", value: "R$ 156k" },
          { title: "ARR", value: "R$ 1.87M" },
          { title: "Inadimplência", value: "4.8%", alert: true },
          { title: "Assinaturas", value: "87" },
        ].map((kpi, i) => (
          <div key={i} className="flex flex-col space-y-1">
            <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">{kpi.title}</span>
            <span className={`text-2xl font-mono ${kpi.alert ? "text-destructive" : "text-foreground"}`}>{kpi.value}</span>
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
                <span className={`text-xs font-mono font-semibold ${m.color}`}>{gw.share} do MRR</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Clientes</p>
                  <p className={`font-mono font-semibold ${m.color}`}>{gw.clients}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">MRR</p>
                  <p className={`font-mono font-semibold ${m.color}`}>{gw.mrr}</p>
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
          <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">MRR (Últimos 6 meses)</h2>
          <div className="h-[220px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mrrTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}k`} tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }} />
                <Tooltip contentStyle={{ borderRadius: "2px", border: "1px solid hsl(var(--border))", fontFamily: "var(--font-mono)", fontSize: "12px" }} />
                <Line type="stepAfter" dataKey="value" stroke="hsl(var(--foreground))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Recebimentos por Gateway (Abril)</h2>
          <div className="h-[220px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyReceipts} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}k`} tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }} />
                <Tooltip contentStyle={{ borderRadius: "2px", border: "1px solid hsl(var(--border))", fontFamily: "var(--font-mono)", fontSize: "12px" }} cursor={{ fill: "hsl(var(--muted))" }} />
                <Bar dataKey="asaas" name="Asaas" stackId="a" fill="hsl(var(--accent))" radius={[0, 0, 0, 0]} />
                <Bar dataKey="stripe" name="Stripe" stackId="a" fill="hsl(var(--foreground))" radius={[2, 2, 0, 0]} opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-accent" /><span>Asaas (BRL)</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-foreground opacity-60" /><span>Stripe (USD/other)</span></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Atenção Necessária</h2>
        <div className="border border-border rounded-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Cliente</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Gateway</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Valor</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Atraso</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topDefaulters.map((d, i) => (
                <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="py-3 text-sm font-medium">{d.client}</TableCell>
                  <TableCell className="py-3"><GatewayPill gateway={d.gateway} /></TableCell>
                  <TableCell className="py-3 text-sm font-mono">{d.value}</TableCell>
                  <TableCell className="py-3">
                    <Badge variant="destructive" className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                      {d.days} dias
                    </Badge>
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
  );
}
