import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, AlertTriangle, RefreshCw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

const dailyReceipts = [
  { day: "01", current: 18200, previous: 15400 }, { day: "05", current: 24500, previous: 22000 },
  { day: "10", current: 31200, previous: 28000 }, { day: "15", current: 45800, previous: 38000 },
  { day: "20", current: 12000, previous: 32000 }, { day: "25", current: 0, previous: 28500 },
  { day: "30", current: 0, previous: 18200 },
];

const paymentMethods = [
  { name: "Cartão", value: 45, color: "hsl(221, 83%, 53%)" },
  { name: "PIX", value: 30, color: "hsl(160, 60%, 45%)" },
  { name: "Boleto", value: 20, color: "hsl(40, 90%, 50%)" },
  { name: "Transferência", value: 5, color: "hsl(280, 60%, 50%)" },
];

const mrrTrend = [
  { month: "Mai/25", value: 98000 }, { month: "Jun/25", value: 102000 }, { month: "Jul/25", value: 108000 },
  { month: "Ago/25", value: 115000 }, { month: "Set/25", value: 120000 }, { month: "Out/25", value: 126000 },
  { month: "Nov/25", value: 131000 }, { month: "Dez/25", value: 135000 }, { month: "Jan/26", value: 140000 },
  { month: "Fev/26", value: 145000 }, { month: "Mar/26", value: 148000 }, { month: "Abr/26", value: 156000 },
];

const topDefaulters = [
  { client: "Innovare Consultoria", value: "R$ 2.100,00", days: 5, lastContact: "12/04/2026" },
  { client: "Verde Energia", value: "R$ 1.800,00", days: 31, lastContact: "15/03/2026" },
  { client: "StarUp Labs", value: "R$ 3.200,00", days: 12, lastContact: "08/04/2026" },
];

export function BillingDashboardPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Faturamento</h1><p className="text-muted-foreground mt-1">Visão geral de cobranças e receita</p></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "MRR", value: "R$ 156.000", icon: DollarSign, sub: "+5.4% vs mês anterior" },
          { title: "ARR (Projeção)", value: "R$ 1.872.000", icon: TrendingUp, sub: "Baseado no MRR atual" },
          { title: "Inadimplência", value: "4.8%", icon: AlertTriangle, sub: "R$ 32.400 vencido" },
          { title: "Assinaturas Ativas", value: "87", icon: RefreshCw, sub: "3 novas este mês" },
        ].map((kpi, i) => (
          <Card key={i}><CardContent className="pt-4"><div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-muted"><kpi.icon className="w-5 h-5 text-muted-foreground" /></div><div><p className="text-xs text-muted-foreground">{kpi.title}</p><p className="text-xl font-bold">{kpi.value}</p><p className="text-xs text-muted-foreground">{kpi.sub}</p></div></div></CardContent></Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle>Recebimentos Diários</CardTitle></CardHeader><CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyReceipts}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="day" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} /><Tooltip /><Legend /><Bar dataKey="current" name="Abril/2026" fill="hsl(var(--chart-1))" radius={[4,4,0,0]} /><Bar dataKey="previous" name="Março/2026" fill="hsl(var(--chart-3))" radius={[4,4,0,0]} opacity={0.5} /></BarChart>
          </ResponsiveContainer>
        </CardContent></Card>

        <Card><CardHeader><CardTitle>Métodos de Pagamento</CardTitle></CardHeader><CardContent className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart><Pie data={paymentMethods} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>{paymentMethods.map((entry, i) => <Cell key={i} fill={entry.color} />)}</Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </CardContent></Card>
      </div>

      <Card><CardHeader><CardTitle>Evolução MRR - Últimos 12 meses</CardTitle></CardHeader><CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mrrTrend}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} tickFormatter={v => `R$${v/1000}k`} /><Tooltip /><Line type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 3 }} /></LineChart>
        </ResponsiveContainer>
      </CardContent></Card>

      <Card><CardHeader><CardTitle>Top Inadimplentes</CardTitle></CardHeader><CardContent className="p-0">
        <Table><TableHeader><TableRow><TableHead>Cliente</TableHead><TableHead>Valor</TableHead><TableHead>Dias em Atraso</TableHead><TableHead>Último Contato</TableHead><TableHead></TableHead></TableRow></TableHeader>
        <TableBody>{topDefaulters.map((d, i) => (
          <TableRow key={i}><TableCell className="font-medium">{d.client}</TableCell><TableCell>{d.value}</TableCell><TableCell><Badge variant="destructive">{d.days} dias</Badge></TableCell><TableCell className="text-sm">{d.lastContact}</TableCell><TableCell><Button variant="outline" size="sm">Enviar Lembrete</Button></TableCell></TableRow>
        ))}</TableBody></Table>
      </CardContent></Card>
    </div>
  );
}
