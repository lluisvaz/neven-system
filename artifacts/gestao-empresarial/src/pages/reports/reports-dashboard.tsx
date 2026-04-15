import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, TrendingDown, AlertTriangle, HelpCircle, Target, ThumbsUp, Heart } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const revenueData = [
  { month: "Jan", realized: 138000, projected: 140000, target: 135000 },
  { month: "Fev", realized: 145000, projected: 148000, target: 140000 },
  { month: "Mar", realized: 148000, projected: 152000, target: 145000 },
  { month: "Abr", realized: 156000, projected: 160000, target: 150000 },
];

const funnelData = [
  { stage: "Prospecção", count: 45, value: 180000 },
  { stage: "Qualificação", count: 28, value: 120000 },
  { stage: "Proposta", count: 18, value: 95000 },
  { stage: "Negociação", count: 8, value: 68000 },
  { stage: "Fechamento", count: 4, value: 42000 },
];

const kpis = [
  { title: "MRR", value: "R$ 156.000", icon: DollarSign, trend: "+12%", color: "text-blue-500" },
  { title: "Novos Clientes", value: "48", icon: Users, trend: "+4%", color: "text-emerald-500" },
  { title: "Churn", value: "1.2%", icon: TrendingDown, trend: "-0.4%", color: "text-red-500" },
  { title: "Inadimplência", value: "4.8%", icon: AlertTriangle, trend: "+0.3%", color: "text-amber-500" },
  { title: "Tickets Abertos", value: "12", icon: HelpCircle, trend: "-3", color: "text-purple-500" },
  { title: "Pipeline Total", value: "R$ 840k", icon: Target, trend: "+18%", color: "text-indigo-500" },
  { title: "NPS Médio", value: "72", icon: ThumbsUp, trend: "+5", color: "text-emerald-500" },
  { title: "LTV Médio", value: "R$ 48.200", icon: Heart, trend: "+8%", color: "text-teal-500" },
];

export function ReportsDashboardPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Relatórios</h1><p className="text-muted-foreground mt-1">Dashboard executivo da operação</p></div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <Card key={i}><CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2"><kpi.icon className={`w-4 h-4 ${kpi.color}`} /><span className="text-xs text-muted-foreground">{kpi.trend}</span></div>
            <p className="text-2xl font-bold">{kpi.value}</p><p className="text-xs text-muted-foreground">{kpi.title}</p>
          </CardContent></Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle>Receita</CardTitle></CardHeader><CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} /><Tooltip /><Legend />
            <Area type="monotone" dataKey="realized" name="Realizada" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.2} />
            <Area type="monotone" dataKey="projected" name="Prevista" stroke="hsl(var(--chart-2))" fill="none" strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent></Card>

        <Card><CardHeader><CardTitle>Funil de Vendas</CardTitle></CardHeader><CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData} layout="vertical"><CartesianGrid strokeDasharray="3 3" horizontal={false} /><XAxis type="number" axisLine={false} tickLine={false} /><YAxis type="category" dataKey="stage" axisLine={false} tickLine={false} width={100} /><Tooltip /><Bar dataKey="count" name="Oportunidades" fill="hsl(var(--chart-1))" radius={[0,4,4,0]} /></BarChart>
          </ResponsiveContainer>
        </CardContent></Card>
      </div>
    </div>
  );
}
