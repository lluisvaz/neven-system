import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, TrendingUp, TrendingDown, Wallet, RefreshCw, Zap } from "lucide-react";
import { useFinancialData, fmtBRL } from "@/lib/financial-data";

const cashflowData = [
  { day: "01/04", projected: 320000, actual: 315000 },
  { day: "05/04", projected: 310000, actual: 308000 },
  { day: "10/04", projected: 295000, actual: 290000 },
  { day: "15/04", projected: 340000, actual: 345000 },
  { day: "20/04", projected: 355000, actual: null },
  { day: "25/04", projected: 370000, actual: null },
  { day: "30/04", projected: 385000, actual: null },
];

const entries = [
  { date: "15/04/2026", description: "Recebimento - Tech Solutions", category: "Receita Recorrente", type: "Entrada", value: "8.500,00", gateway: "Asaas" },
  { date: "14/04/2026", description: "Recebimento - Criativa Design", category: "Receita Recorrente", type: "Entrada", value: "5.200,00", gateway: "Asaas" },
  { date: "13/04/2026", description: "Recebimento - Acme Corp (USD)", category: "Receita Recorrente", type: "Entrada", value: "12.288,00", gateway: "Stripe" },
  { date: "12/04/2026", description: "Pagamento - AWS Brasil", category: "Infraestrutura", type: "Saída", value: "12.400,00", gateway: "—" },
  { date: "10/04/2026", description: "Recebimento - LogiTech BR", category: "Receita Avulsa", type: "Entrada", value: "9.120,00", gateway: "Asaas" },
  { date: "05/04/2026", description: "Pagamento - Aluguel SP", category: "Administrativo", type: "Saída", value: "18.500,00", gateway: "—" },
  { date: "01/04/2026", description: "Impostos Municipais", category: "Tributos", type: "Saída", value: "5.430,00", gateway: "—" },
];

const GW_COLORS: Record<string, string> = {
  Asaas: "text-sky-600 dark:text-sky-400",
  Stripe: "text-violet-600 dark:text-violet-400",
};

export function CashflowPage() {
  const { data: fin, loading, refresh } = useFinancialData();

  const saldoAtual = fin?.totalBalanceBRL ?? 345000;
  const entradasPrevistas = fin?.receivableBRL ?? 186400;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Fluxo de Caixa</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">
            Projeção de 30 dias · Saldo = Stripe + Asaas (em R$)
            {!fin?.isLiveData && <span className="ml-2 text-amber-500 text-[10px]">[dados simulados]</span>}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex border border-border rounded-sm overflow-hidden text-sm">
            <button className="px-3 py-1.5 hover:bg-muted/50 transition-colors">7d</button>
            <button className="px-3 py-1.5 bg-muted font-medium transition-colors border-l border-r border-border">30d</button>
            <button className="px-3 py-1.5 hover:bg-muted/50 transition-colors">90d</button>
          </div>
          <Button variant="outline" size="icon" className="rounded-sm w-9 h-9" onClick={refresh} disabled={loading}>
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline" size="sm" className="rounded-sm"><Download className="w-3.5 h-3.5 mr-2" />Exportar</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 border-y border-border">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center text-muted-foreground gap-2">
            <Wallet className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-medium">Saldo Atual (BRL)</span>
          </div>
          <span className={`text-2xl font-mono text-foreground ${loading ? "opacity-40" : ""}`}>
            {fmtBRL(saldoAtual)}
          </span>
          <div className="flex gap-2 mt-1 flex-wrap">
            <span className="text-[10px] text-sky-600 dark:text-sky-400 font-mono">Asaas: {fmtBRL(fin?.asaas.balanceBRL ?? 320424)}</span>
            <span className="text-[10px] text-muted-foreground">+</span>
            <span className="text-[10px] text-violet-600 dark:text-violet-400 font-mono">Stripe: {fmtBRL(fin?.stripe.availableBRL ?? 24576)}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center text-muted-foreground gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-medium">A Receber (BRL)</span>
          </div>
          <span className={`text-2xl font-mono text-foreground ${loading ? "opacity-40" : ""}`}>
            {fmtBRL(entradasPrevistas)}
          </span>
          <span className="text-[10px] text-muted-foreground mt-1">Faturas pendentes convertidas em R$</span>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center text-muted-foreground gap-2">
            <TrendingDown className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-medium">Saídas Previstas</span>
          </div>
          <span className="text-2xl font-mono text-foreground">R$ 67.300</span>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Projeção vs Realizado (Abril 2026)</h2>
        <div className="h-[300px] -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cashflowData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={v => `R$${v / 1000}k`} tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }} />
              <Tooltip
                contentStyle={{ borderRadius: "2px", border: "1px solid hsl(var(--border))", fontFamily: "var(--font-mono)", fontSize: "12px" }}
                formatter={(value: number, name: string) => [`R$ ${value.toLocaleString("pt-BR")}`, name === "projected" ? "Projetado" : "Realizado"]}
              />
              <Line type="monotone" dataKey="projected" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="4 4" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="actual" stroke="hsl(var(--foreground))" strokeWidth={2} dot={{ r: 3, strokeWidth: 2 }} activeDot={{ r: 5, strokeWidth: 0 }} connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground justify-end pt-2">
          <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-foreground" />Realizado</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 border-t border-dashed border-muted-foreground" />Projetado</div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Movimentações Recentes</h2>
        <div className="border border-border rounded-sm overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-32">Data</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Descrição</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Categoria</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-20">Gateway</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-20">Tipo</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Valor (R$)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((e, i) => (
                <TableRow key={i} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="text-sm font-mono py-3 text-muted-foreground">{e.date}</TableCell>
                  <TableCell className="text-sm font-medium py-3">{e.description}</TableCell>
                  <TableCell className="py-3">
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{e.category}</span>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className={`text-xs font-mono font-medium ${GW_COLORS[e.gateway] ?? "text-muted-foreground"}`}>{e.gateway}</span>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge variant={e.type === "Entrada" ? "secondary" : "outline"} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                      {e.type}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-sm font-mono font-medium py-3 text-right ${e.type === "Entrada" ? "text-emerald-600 dark:text-emerald-500" : "text-foreground"}`}>
                    {e.type === "Entrada" ? "+" : "-"}{e.value}
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
