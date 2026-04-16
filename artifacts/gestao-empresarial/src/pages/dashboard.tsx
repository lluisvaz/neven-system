import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useFinancialData, fmtBRLCompact } from "@/lib/financial-data";
import {
  AlertTriangle,
  Banknote,
  BarChart3,
  CheckCircle2,
  Clock3,
  CreditCard,
  DollarSign,
  Gauge,
  HeartPulse,
  LineChart as LineChartIcon,
  PackageCheck,
  ShieldAlert,
  Target,
  TicketCheck,
  TrendingDown,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueData = [
  { month: "Jan", mrr: 120000, caixa: 86000, pipeline: 520000 },
  { month: "Fev", mrr: 125000, caixa: 92000, pipeline: 560000 },
  { month: "Mar", mrr: 132000, caixa: 104000, pipeline: 610000 },
  { month: "Abr", mrr: 141000, caixa: 116000, pipeline: 690000 },
  { month: "Mai", mrr: 148000, caixa: 122000, pipeline: 760000 },
  { month: "Jun", mrr: 156000, caixa: 137000, pipeline: 840000 },
];

const salesFunnel = [
  { stage: "Leads", value: 420 },
  { stage: "Qualificados", value: 186 },
  { stage: "Propostas", value: 74 },
  { stage: "Negociação", value: 39 },
  { stage: "Fechados", value: 22 },
];

const channelData = [
  { name: "Indicação", value: 34, color: "hsl(var(--accent))" },
  { name: "Inbound", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Outbound", value: 21, color: "hsl(var(--chart-3))" },
  { name: "Parceiros", value: 17, color: "hsl(var(--chart-4))" },
];

const kpis = [
  { title: "MRR", value: "R$ 156 mil", trend: "+12,1%", tone: "positive", icon: DollarSign, note: "Receita recorrente mensal" },
  { title: "ARR", value: "R$ 1,87 mi", trend: "+18,4%", tone: "positive", icon: LineChartIcon, note: "Receita anualizada" },
  { title: "Pipeline", value: "R$ 840 mil", trend: "+18%", tone: "positive", icon: Target, note: "Oportunidades abertas" },
  { title: "Win rate", value: "31,7%", trend: "+3,4 p.p.", tone: "positive", icon: CheckCircle2, note: "Taxa de fechamento" },
  { title: "CAC payback", value: "4,8 meses", trend: "-0,7 mês", tone: "positive", icon: WalletCards, note: "Retorno de aquisição" },
  { title: "Churn", value: "1,2%", trend: "-0,4 p.p.", tone: "positive", icon: TrendingDown, note: "Cancelamentos do mês" },
  { title: "Inadimplência", value: "3,6%", trend: "+0,8 p.p.", tone: "warning", icon: AlertTriangle, note: "Cobranças vencidas" },
  { title: "NPS", value: "72", trend: "+6 pts", tone: "positive", icon: HeartPulse, note: "Satisfação dos clientes" },
  { title: "SLA suporte", value: "94%", trend: "+5 p.p.", tone: "positive", icon: TicketCheck, note: "Atendidos no prazo" },
  { title: "Margem bruta", value: "63,4%", trend: "+2,1 p.p.", tone: "positive", icon: Gauge, note: "Eficiência operacional" },
  { title: "Runway", value: "14 meses", trend: "+2 meses", tone: "positive", icon: Banknote, note: "Fôlego de caixa" },
];

const executiveInsights = [
  { area: "Receita", insight: "MRR acelerou 5,4% no mês e chegou a R$ 156 mil; maior contribuição veio de upsell em contas enterprise.", impact: "Alta", action: "Priorizar expansão nos 24 clientes com uso acima de 80%." },
  { area: "Vendas", insight: "Pipeline cobre 5,4x a meta mensal, mas 31% está parado há mais de 14 dias em negociação.", impact: "Alta", action: "Ativar cadência executiva para propostas acima de R$ 30 mil." },
  { area: "Financeiro", insight: "Inadimplência subiu para 3,6%; três clientes concentram R$ 15,5 mil em risco imediato.", impact: "Crítica", action: "Executar régua de cobrança e renegociação em até 48h." },
  { area: "Cliente", insight: "NPS avançou para 72, porém contas com chamados recorrentes têm churn previsto 2,8x maior.", impact: "Alta", action: "Criar plano de sucesso para clientes com mais de 3 tickets no mês." },
  { area: "Operações", insight: "Tempo médio de onboarding caiu para 9 dias, mas implantação contábil segue como gargalo.", impact: "Média", action: "Padronizar checklist e automatizar coleta documental." },
];

const billingRisk = [
  { client: "Tech Solutions Ltda", value: "R$ 4.500,00", status: "Vencido", days: 12, owner: "Financeiro" },
  { client: "Innovare Consultoria", value: "R$ 2.100,00", status: "Vencido", days: 5, owner: "CS" },
  { client: "Nexus Digital", value: "R$ 8.900,00", status: "Risco Alto", days: 0, owner: "Comercial" },
  { client: "Blue Corp", value: "R$ 3.750,00", status: "Promessa", days: 2, owner: "Financeiro" },
];

const operationalAlerts = [
  { title: "Renovações nos próximos 30 dias", value: "R$ 98 mil", status: "18 contratos", icon: CreditCard },
  { title: "Clientes com health score baixo", value: "14", status: "Risco de churn", icon: ShieldAlert },
  { title: "Tickets críticos abertos", value: "7", status: "2 fora do SLA", icon: Clock3 },
  { title: "Pedidos pendentes de expedição", value: "23", status: "R$ 61 mil", icon: PackageCheck },
  { title: "Propostas aguardando assinatura", value: "R$ 142 mil", status: "11 propostas", icon: BarChart3 },
];

const formatCurrency = (value: number) => `R$ ${(value / 1000).toLocaleString("pt-BR")}k`;

export function Dashboard() {
  const { data: fin, loading } = useFinancialData();

  const mrr = fin?.mrrBRL;
  const arr = fin?.arrBRL;
  const delinquency = fin?.delinquencyRate;
  const totalBalance = fin?.totalBalanceBRL;

  function dynKpis() {
    return kpis.map(k => {
      if (k.title === "MRR" && mrr != null) return { ...k, value: fmtBRLCompact(mrr) };
      if (k.title === "ARR" && arr != null) return { ...k, value: fmtBRLCompact(arr) };
      if (k.title === "Inadimplência" && delinquency != null) return { ...k, value: `${delinquency}%` };
      if (k.title === "Runway" && totalBalance != null && mrr != null && mrr > 0) {
        const months = Math.round(totalBalance / mrr);
        return { ...k, value: `${months} meses` };
      }
      return k;
    });
  }

  const now = new Date();
  const updatedAt = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard Executivo</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Insights consolidados de vendas, financeiro, clientes, operação, suporte, estoque e crescimento.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:flex gap-2 text-xs font-mono">
          <Badge variant="secondary" className="rounded-sm justify-center">Meta mês: 82%</Badge>
          {mrr != null && <Badge variant="secondary" className={`rounded-sm justify-center ${loading ? "opacity-40" : ""}`}>MRR: {fmtBRLCompact(mrr)}</Badge>}
          <Badge variant="secondary" className="rounded-sm justify-center">Forecast: R$ 211 mil</Badge>
          <Badge variant="secondary" className="rounded-sm justify-center">Atualizado {updatedAt}</Badge>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-3">
        {dynKpis().map((kpi) => (
          <Card key={kpi.title} className="rounded-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground gap-2">
                    <kpi.icon className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-wider font-medium">{kpi.title}</span>
                  </div>
                  <div className={`text-2xl font-mono tracking-tight ${loading && ["MRR", "ARR", "Inadimplência", "Runway"].includes(kpi.title) ? "opacity-40" : ""}`}>{kpi.value}</div>
                </div>
                <span className={`text-xs font-mono ${kpi.tone === "warning" ? "text-destructive" : "text-accent"}`}>
                  {kpi.trend}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-3">{kpi.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <Card className="xl:col-span-7 rounded-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Receita, caixa e pipeline</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={formatCurrency} tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }} />
                  <Tooltip
                    contentStyle={{ borderRadius: "2px", border: "1px solid hsl(var(--border))", fontFamily: "var(--font-mono)", fontSize: "12px" }}
                    formatter={(value: number, name: string) => [formatCurrency(value), name.toUpperCase()]}
                  />
                  <Area type="monotone" dataKey="pipeline" stroke="hsl(var(--chart-4))" fill="hsl(var(--chart-4))" fillOpacity={0.08} strokeWidth={2} />
                  <Area type="monotone" dataKey="caixa" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.1} strokeWidth={2} />
                  <Line type="monotone" dataKey="mrr" stroke="hsl(var(--accent))" strokeWidth={3} dot={{ r: 3, strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-3 rounded-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Funil comercial</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesFunnel} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }} interval={0} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontFamily: "var(--font-mono)" }} />
                  <Tooltip contentStyle={{ borderRadius: "2px", border: "1px solid hsl(var(--border))", fontFamily: "var(--font-mono)", fontSize: "12px" }} />
                  <Bar dataKey="value" fill="hsl(var(--accent))" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2 rounded-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Canais</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="h-[190px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={channelData} dataKey="value" nameKey="name" innerRadius={42} outerRadius={72} paddingAngle={3}>
                    {channelData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "2px", border: "1px solid hsl(var(--border))", fontFamily: "var(--font-mono)", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {channelData.map((channel) => (
                <div key={channel.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: channel.color }} />
                  <span className="truncate">{channel.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 rounded-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Insights prioritários</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto no-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="h-8 text-xs">Área</TableHead>
                    <TableHead className="h-8 text-xs">Insight</TableHead>
                    <TableHead className="h-8 text-xs">Impacto</TableHead>
                    <TableHead className="h-8 text-xs">Próxima ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {executiveInsights.map((item) => (
                    <TableRow key={item.area} className="hover:bg-muted/50">
                      <TableCell className="py-3 font-medium text-sm">{item.area}</TableCell>
                      <TableCell className="py-3 text-sm text-muted-foreground min-w-[280px]">{item.insight}</TableCell>
                      <TableCell className="py-3">
                        <Badge variant={item.impact === "Crítica" ? "destructive" : "secondary"} className="rounded-sm font-mono text-[10px] uppercase tracking-wider">
                          {item.impact}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3 text-sm min-w-[240px]">{item.action}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Alertas operacionais</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 space-y-3">
            {operationalAlerts.map((alert) => (
              <div key={alert.title} className="flex items-start gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0">
                <div className="mt-0.5 h-8 w-8 rounded-sm bg-muted flex items-center justify-center">
                  <alert.icon className="h-4 w-4 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium truncate">{alert.title}</p>
                    <span className="text-sm font-mono">{alert.value}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{alert.status}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="rounded-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Cobranças em risco</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto no-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="h-8 text-xs">Cliente</TableHead>
                    <TableHead className="h-8 text-xs text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingRisk.map((item) => (
                    <TableRow key={item.client} className="hover:bg-muted/50">
                      <TableCell className="py-3">
                        <div className="font-medium text-sm">{item.client}</div>
                        <div className="text-xs font-mono text-muted-foreground mt-0.5">{item.value} · {item.owner}</div>
                      </TableCell>
                      <TableCell className="py-3 text-right">
                        <Badge variant={item.status === "Vencido" ? "destructive" : "secondary"} className="rounded-sm font-mono text-[10px] uppercase tracking-wider">
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Saúde de clientes</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {[
              { label: "Expansão provável", value: "32 contas", pct: "46%" },
              { label: "Atenção CS", value: "21 contas", pct: "30%" },
              { label: "Risco de churn", value: "14 contas", pct: "20%" },
              { label: "Bloqueio financeiro", value: "3 contas", pct: "4%" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-mono">{item.value}</span>
                </div>
                <div className="mt-2 h-2 bg-muted rounded-sm overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: item.pct }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Financeiro</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {[
              ["Contas a receber", "R$ 274 mil"],
              ["Contas a pagar", "R$ 119 mil"],
              ["Saldo projetado 30d", "R$ 412 mil"],
              ["Margem líquida", "22,8%"],
              ["Despesas variáveis", "R$ 47 mil"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-3 border-b border-border pb-2 last:border-b-0">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-mono">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Prioridades do dia</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {[
              "Cobrar 4 faturas críticas antes das 15h.",
              "Revisar 11 propostas sem resposta há 7 dias.",
              "Resolver 2 tickets fora do SLA.",
              "Acionar clientes com health score abaixo de 60.",
              "Acompanhar onboarding de 3 novos clientes.",
            ].map((item, index) => (
              <div key={item} className="flex gap-3 text-sm">
                <span className="font-mono text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}