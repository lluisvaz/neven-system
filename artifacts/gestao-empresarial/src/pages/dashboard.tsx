import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Activity, AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Visão geral do seu negócio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "MRR", value: "R$ 156.000", icon: DollarSign, trend: "+12%", up: true },
          { title: "Novos Clientes", value: "48", icon: Users, trend: "+4%", up: true },
          { title: "Churn Rate", value: "1.2%", icon: AlertTriangle, trend: "-0.4%", up: true },
          { title: "Pipeline Total", value: "R$ 840.000", icon: Target, trend: "+18%", up: true },
        ].map((kpi, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <kpi.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className={`text-xs flex items-center mt-1 ${kpi.up ? 'text-emerald-500' : 'text-red-500'}`}>
                {kpi.up ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {kpi.trend} em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Evolução de Receita Recorrente</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mrrData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v/1000}k`} />
                <Tooltip formatter={(value) => `R$ ${value}`} />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cobranças em Risco</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingData.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="font-medium">{item.client}</div>
                      <div className="text-xs text-muted-foreground">{item.value}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'Vencido' ? 'destructive' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
