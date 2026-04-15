import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, AlertTriangle, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mrrData = [
  { month: "Jan", value: 120000 },
  { month: "Fev", value: 125000 },
  { month: "Mar", value: 132000 },
  { month: "Abr", value: 141000 },
  { month: "Mai", value: 148000 },
  { month: "Jun", value: 156000 },
];

const billingData = [
  { client: "Tech Solutions Ltda", value: "R$ 4.500,00", status: "Vencido", days: 12 },
  { client: "Innovare Consultoria", value: "R$ 2.100,00", status: "Vencido", days: 5 },
  { client: "Nexus Digital", value: "R$ 8.900,00", status: "Risco Alto", days: 0 },
];

export function Dashboard() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Visão geral do seu negócio.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "MRR", value: "R$ 156.000", icon: DollarSign, trend: "+12%", up: true },
          { title: "Novos Clientes", value: "48", icon: Users, trend: "+4%", up: true },
          { title: "Churn Rate", value: "1.2%", icon: AlertTriangle, trend: "-0.4%", up: true },
          { title: "Pipeline Total", value: "R$ 840.000", icon: Target, trend: "+18%", up: true },
        ].map((kpi, i) => (
          <div key={i} className="flex flex-col space-y-2">
            <div className="flex items-center text-muted-foreground gap-2">
              <kpi.icon className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-medium">{kpi.title}</span>
            </div>
            <div className="text-3xl font-mono tracking-tight">{kpi.value}</div>
            <p className={`text-xs font-mono ${kpi.up ? 'text-accent' : 'text-destructive'}`}>
              {kpi.trend} vs último mês
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Evolução de Receita Recorrente</h2>
          <div className="h-[300px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mrrData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: 'var(--font-mono)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v/1000}k`} tick={{ fontSize: 12, fontFamily: 'var(--font-mono)' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '2px', border: '1px solid hsl(var(--border))', fontFamily: 'var(--font-mono)', fontSize: '12px' }}
                  formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'MRR']}
                />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 3, strokeWidth: 2 }} activeDot={{ r: 5, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Cobranças em Risco</h2>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-8 text-xs">Cliente</TableHead>
                <TableHead className="h-8 text-xs text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingData.map((item, i) => (
                <TableRow key={i} className="hover:bg-muted/50 border-b-0">
                  <TableCell className="py-3">
                    <div className="font-medium text-sm">{item.client}</div>
                    <div className="text-xs font-mono text-muted-foreground mt-0.5">{item.value}</div>
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <Badge variant={item.status === 'Vencido' ? 'destructive' : 'secondary'} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                      {item.status}
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
