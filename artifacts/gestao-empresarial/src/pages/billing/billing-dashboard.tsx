import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const dailyReceipts = [
  { day: "01", current: 18200 }, { day: "05", current: 24500 },
  { day: "10", current: 31200 }, { day: "15", current: 45800 },
  { day: "20", current: 12000 }, { day: "25", current: 0 },
  { day: "30", current: 0 },
];

const mrrTrend = [
  { month: "Out", value: 126000 }, { month: "Nov", value: 131000 }, { month: "Dez", value: 135000 }, 
  { month: "Jan", value: 140000 }, { month: "Fev", value: 145000 }, { month: "Mar", value: 148000 }, 
  { month: "Abr", value: 156000 },
];

const topDefaulters = [
  { client: "Innovare Consultoria", value: "R$ 2.100,00", days: 5 },
  { client: "Verde Energia", value: "R$ 1.800,00", days: 31 },
  { client: "StarUp Labs", value: "R$ 3.200,00", days: 12 },
];

export function BillingDashboardPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Faturamento</h1>
        <p className="text-sm font-mono text-muted-foreground mt-1">Visão geral de cobranças e receita</p>
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
            <span className={`text-2xl font-mono ${kpi.alert ? 'text-destructive' : 'text-foreground'}`}>{kpi.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">MRR (Últimos 6 meses)</h2>
          <div className="h-[250px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mrrTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: 'var(--font-mono)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} tick={{ fontSize: 12, fontFamily: 'var(--font-mono)' }} />
                <Tooltip contentStyle={{ borderRadius: '2px', border: '1px solid hsl(var(--border))', fontFamily: 'var(--font-mono)', fontSize: '12px' }} />
                <Line type="stepAfter" dataKey="value" stroke="hsl(var(--foreground))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Recebimentos (Abril)</h2>
          <div className="h-[250px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyReceipts} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: 'var(--font-mono)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} tick={{ fontSize: 12, fontFamily: 'var(--font-mono)' }} />
                <Tooltip contentStyle={{ borderRadius: '2px', border: '1px solid hsl(var(--border))', fontFamily: 'var(--font-mono)', fontSize: '12px' }} cursor={{ fill: 'hsl(var(--muted))' }} />
                <Bar dataKey="current" fill="hsl(var(--accent))" radius={[2,2,0,0]} />
              </BarChart>
            </ResponsiveContainer>
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
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Valor</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Atraso</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topDefaulters.map((d, i) => (
                <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="py-3 text-sm font-medium">{d.client}</TableCell>
                  <TableCell className="py-3 text-sm font-mono">{d.value}</TableCell>
                  <TableCell className="py-3">
                    <Badge variant="destructive" className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                      {d.days} dias
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <Button variant="outline" size="sm" className="rounded-sm h-7 text-xs">Cobrar</Button>
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
