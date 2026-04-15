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
  { title: "MRR", value: "R$ 156.000", icon: DollarSign, trend: "+12%", up: true },
  { title: "Novos Clientes", value: "48", icon: Users, trend: "+4%", up: true },
  { title: "Churn", value: "1.2%", icon: TrendingDown, trend: "-0.4%", up: true },
  { title: "Inadimplência", value: "4.8%", icon: AlertTriangle, trend: "+0.3%", up: false },
  { title: "Tickets Abertos", value: "12", icon: HelpCircle, trend: "-3", up: true },
  { title: "Pipeline Total", value: "R$ 840k", icon: Target, trend: "+18%", up: true },
  { title: "NPS Médio", value: "72", icon: ThumbsUp, trend: "+5", up: true },
  { title: "LTV Médio", value: "R$ 48.200", icon: Heart, trend: "+8%", up: true },
];

export function ReportsDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Relatórios</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">Dashboard executivo da operação</p>
        </div>
        <div className="flex gap-2">
          <div className="flex border border-border rounded-sm overflow-hidden text-sm">
            <button className="px-3 py-1.5 bg-muted font-medium transition-colors border-r border-border">Visão Geral</button>
            <button className="px-3 py-1.5 hover:bg-muted/50 transition-colors border-r border-border">Vendas</button>
            <button className="px-3 py-1.5 hover:bg-muted/50 transition-colors border-r border-border">Financeiro</button>
            <button className="px-3 py-1.5 hover:bg-muted/50 transition-colors">Suporte</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4 border-y border-border">
        {kpis.map((kpi, i) => (
          <div key={i} className="flex flex-col space-y-1">
            <div className="flex items-center text-muted-foreground gap-2">
              <kpi.icon className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-medium">{kpi.title}</span>
            </div>
            <span className="text-2xl font-mono text-foreground">{kpi.value}</span>
            <span className={`text-[10px] font-mono uppercase tracking-wider ${kpi.up ? 'text-emerald-600 dark:text-emerald-500' : 'text-destructive'}`}>
              {kpi.trend} vs mês anterior
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Evolução de Receita</h2>
          <div className="h-[300px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: 'var(--font-mono)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} tick={{ fontSize: 12, fontFamily: 'var(--font-mono)' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '2px', border: '1px solid hsl(var(--border))', fontFamily: 'var(--font-mono)', fontSize: '12px' }}
                  formatter={(value: number, name: string) => [`R$ ${value.toLocaleString('pt-BR')}`, name === 'realized' ? 'Realizada' : 'Prevista']}
                />
                <Area type="monotone" dataKey="realized" stroke="hsl(var(--accent))" strokeWidth={2} fill="hsl(var(--accent))" fillOpacity={0.1} activeDot={{ r: 5, strokeWidth: 0 }} />
                <Area type="monotone" dataKey="projected" stroke="hsl(var(--muted-foreground))" strokeWidth={2} fill="none" strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground justify-end pt-2">
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-accent"></div>Realizada</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-muted-foreground border-t border-dashed border-muted-foreground"></div>Prevista</div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Funil de Vendas Atual</h2>
          <div className="h-[300px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 10, right: 10, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: 'var(--font-mono)' }} />
                <YAxis type="category" dataKey="stage" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontFamily: 'var(--font-mono)', fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '2px', border: '1px solid hsl(var(--border))', fontFamily: 'var(--font-mono)', fontSize: '12px' }}
                  cursor={{ fill: 'hsl(var(--muted))' }}
                />
                <Bar dataKey="count" fill="hsl(var(--foreground))" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
