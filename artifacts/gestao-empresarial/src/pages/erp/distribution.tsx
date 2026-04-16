import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  BriefcaseBusiness, Building2, CheckCircle2,
  CircleDollarSign, Plus, RefreshCw, Save, Trash2,
  TrendingUp, Users, Wallet, AlertCircle, Zap,
} from "lucide-react";
import { useFinancialData, fmtBRL } from "@/lib/financial-data";

const GW = {
  stripe: { label: "Stripe", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950/30", border: "border-violet-200 dark:border-violet-800/50" },
  asaas:  { label: "Asaas",  color: "text-sky-600 dark:text-sky-400",    bg: "bg-sky-50 dark:bg-sky-950/30",    border: "border-sky-200 dark:border-sky-800/50" },
} as const;

type Partner = { id: number; name: string; share: number };
type Expense = { id: number; name: string; amount: number; type: string };

const initialPartners: Partner[] = [
  { id: 1, name: "Sócio fundador", share: 70 },
  { id: 2, name: "Sócio operador", share: 30 },
];

const initialExpenses: Expense[] = [
  { id: 1, name: "Funcionários e folha",       amount: 8000,  type: "Pessoas" },
  { id: 2, name: "Vercel",                     amount: 200,   type: "Ferramentas" },
  { id: 3, name: "Claude",                     amount: 100,   type: "Ferramentas" },
  { id: 4, name: "Impostos e contabilidade",   amount: 4000,  type: "Tributos" },
  { id: 5, name: "Marketing e vendas",         amount: 2500,  type: "Crescimento" },
  { id: 6, name: "Infraestrutura e servidores",amount: 1800,  type: "Tecnologia" },
  { id: 7, name: "Reserva para imprevistos",   amount: 1000,  type: "Reserva" },
];

const storageKey = "gestorpro-financial-distribution-v2";
const clampPercent = (v: number) => Math.max(0, Math.min(100, Math.round(v)));

export function DistributionPage() {
  const { data: fin, loading, error, refresh } = useFinancialData();

  const [monthlyRevenue, setMonthlyRevenue] = useState(220000);
  const [useGatewayBalance, setUseGatewayBalance] = useState(true);
  const [companyCashPercent, setCompanyCashPercent] = useState(30);
  const [partnersPercent, setPartnersPercent] = useState(20);
  const [expensesPercent, setExpensesPercent] = useState(50);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [savedAt, setSavedAt] = useState("Ainda não salvo");

  useEffect(() => {
    if (fin && useGatewayBalance) {
      setMonthlyRevenue(Math.round(fin.totalBalanceBRL));
    }
  }, [fin, useGatewayBalance]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      setCompanyCashPercent(parsed.companyCashPercent ?? 30);
      setPartnersPercent(parsed.partnersPercent ?? 20);
      setExpensesPercent(parsed.expensesPercent ?? 50);
      setPartners(parsed.partners?.length ? parsed.partners : initialPartners);
      const loadedExpenses: Expense[] = parsed.expenses?.length
        ? parsed.expenses.map((e: Expense & { share?: number }) => ({
            id: e.id,
            name: e.name,
            type: e.type,
            amount: e.amount ?? 0,
          }))
        : initialExpenses;
      setExpenses(loadedExpenses);
      setSavedAt(parsed.savedAt ?? "Configuração carregada");
      if (parsed.useGatewayBalance !== undefined) setUseGatewayBalance(parsed.useGatewayBalance);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  // Keep expensesPercent in sync with the sum of individual expense amounts
  useEffect(() => {
    if (monthlyRevenue > 0) {
      const expTotal = expenses.reduce((s, e) => s + (isFinite(e.amount) ? e.amount : 0), 0);
      const derivedPct = clampPercent(Math.round((expTotal / monthlyRevenue) * 100));
      setExpensesPercent(derivedPct);
    }
  }, [expenses, monthlyRevenue]);

  const totals = useMemo(() => {
    const expensesAmountTotal = expenses.reduce((s, e) => s + (isFinite(e.amount) ? e.amount : 0), 0);
    const allocatedPercent = companyCashPercent + partnersPercent + expensesPercent;
    const unallocatedPercent = 100 - allocatedPercent;
    return {
      allocatedPercent,
      unallocatedPercent,
      companyCashValue: (monthlyRevenue * companyCashPercent) / 100,
      partnersValue: (monthlyRevenue * partnersPercent) / 100,
      expensesValue: expensesAmountTotal,
      unallocatedValue: (monthlyRevenue * unallocatedPercent) / 100,
      partnersShareTotal: partners.reduce((s, p) => s + p.share, 0),
      expensesAmountTotal,
    };
  }, [companyCashPercent, expenses, expensesPercent, monthlyRevenue, partners, partnersPercent]);

  const status = totals.allocatedPercent === 100 ? "Fechado em 100%" : totals.allocatedPercent > 100 ? "Acima de 100%" : "Falta alocar";

  const saveSettings = () => {
    const savedAtLabel = new Date().toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    window.localStorage.setItem(storageKey, JSON.stringify({
      companyCashPercent, partnersPercent, expensesPercent,
      partners, expenses, savedAt: savedAtLabel, useGatewayBalance,
    }));
    setSavedAt(savedAtLabel);
  };

  const updatePartner = (id: number, field: keyof Partner, value: string | number) =>
    setPartners(cur => cur.map(p => p.id === id ? { ...p, [field]: field === "share" ? clampPercent(Number(value)) : String(value) } : p));

  const updateExpense = (id: number, field: keyof Expense, value: string | number) =>
    setExpenses(cur => cur.map(e => e.id === id ? {
      ...e,
      [field]: field === "amount" ? Math.max(0, Number(value)) : String(value),
    } : e));

  const updateExpenseByPct = (id: number, pct: number) => {
    const cleanPct = Math.max(0, Math.min(999, Number(pct)));
    const newAmount = totals.expensesValue > 0 ? (cleanPct / 100) * totals.expensesValue : 0;
    setExpenses(cur => cur.map(e => e.id === id ? { ...e, amount: Math.round(newAmount * 100) / 100 } : e));
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Distribuição Financeira</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure quanto entra no caixa da empresa, quanto vai para sócios e quanto fica reservado para despesas.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Badge variant={totals.allocatedPercent === 100 ? "secondary" : totals.allocatedPercent > 100 ? "destructive" : "outline"} className="rounded-sm justify-center">
            {status}: {totals.allocatedPercent}%
          </Badge>
          <Button className="rounded-sm" onClick={saveSettings}>
            <Save className="w-4 h-4 mr-2" />Salvar configuração
          </Button>
        </div>
      </header>

      {/* ── GATEWAY BALANCE PANEL ─────────────────────────────────────── */}
      <div className="border border-border rounded-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/20 border-b border-border">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
              Saldo dos Gateways — Receita Base
            </span>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={useGatewayBalance} onChange={e => {
                setUseGatewayBalance(e.target.checked);
                if (e.target.checked && fin) setMonthlyRevenue(Math.round(fin.totalBalanceBRL));
              }} className="rounded" />
              Usar saldo real como base
            </label>
            <Button variant="ghost" size="icon" className="w-7 h-7 rounded-sm" onClick={refresh} disabled={loading}>
              <RefreshCw className={`w-3.5 h-3.5 text-muted-foreground ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 px-4 py-3 text-sm text-destructive bg-destructive/5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Erro ao carregar saldo: {error}. Usando valor manual.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Asaas */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border ${GW.asaas.color} ${GW.asaas.bg} ${GW.asaas.border}`}>Asaas</span>
            </div>
            <p className={`text-2xl font-mono font-semibold ${loading ? "opacity-40" : ""}`}>
              {fmtBRL(fin?.asaas.balanceBRL ?? 0)}
            </p>
          </div>

          {/* Stripe */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border ${GW.stripe.color} ${GW.stripe.bg} ${GW.stripe.border}`}>Stripe</span>
            </div>
            <p className={`text-2xl font-mono font-semibold ${loading ? "opacity-40" : ""}`}>
              {fmtBRL(fin?.stripe.availableBRL ?? 0)}
            </p>
          </div>

          {/* Total */}
          <div className="p-4 bg-muted/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border border-border bg-background text-foreground">TOTAL</span>
            </div>
            <p className={`text-2xl font-mono font-semibold ${loading ? "opacity-40" : ""} text-foreground`}>
              {fmtBRL(fin?.totalBalanceBRL ?? 0)}
            </p>
          </div>
        </div>
      </div>

      {/* ── SUMMARY CARDS ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <Card className="rounded-sm">
          <CardContent className="p-4">
            <div className="flex items-center text-muted-foreground gap-2 justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-wider font-medium">Receita Base</span>
              </div>
              {useGatewayBalance && (
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">auto</span>
              )}
            </div>
            <Input
              value={monthlyRevenue.toLocaleString("pt-BR")}
              onChange={e => {
                setUseGatewayBalance(false);
                const n = Number(e.target.value.replace(/\D/g, ""));
                if (Number.isFinite(n)) setMonthlyRevenue(n);
              }}
              className="mt-3 rounded-sm font-mono text-xl h-11"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {useGatewayBalance
                ? "Alimentado pelo saldo da sua conta Stripe + Asaas."
                : "Valor manual. Marque 'Usar saldo real' para sincronizar."}
            </p>
          </CardContent>
        </Card>
        {[
          { icon: Building2, label: "Caixa da empresa", value: totals.companyCashValue, pct: companyCashPercent, desc: "Reserva, capital de giro e crescimento." },
          { icon: Users, label: "Bolso dos sócios", value: totals.partnersValue, pct: partnersPercent, desc: "Pró-labore e distribuição." },
          { icon: BriefcaseBusiness, label: "Despesas", value: totals.expensesValue, pct: expensesPercent, desc: "Folha, ferramentas, impostos e operação." },
        ].map(({ icon: Icon, label, value, pct, desc }) => (
          <Card key={label} className="rounded-sm">
            <CardContent className="p-4">
              <div className="flex items-center text-muted-foreground gap-2">
                <Icon className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-wider font-medium">{label}</span>
              </div>
              <div className="text-2xl font-mono mt-3">{fmtBRL(value)}</div>
              <p className="text-xs text-muted-foreground mt-2">{pct}% · {desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── DISTRIBUTION RULE + MONTHLY SUMMARY ───────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <Card className="xl:col-span-5 rounded-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Regra principal de distribuição</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            {[
              { label: "Caixa da empresa",    value: companyCashPercent, setValue: setCompanyCashPercent, icon: Building2,        desc: "Reserva, capital de giro, reinvestimento, segurança e crescimento.", auto: false },
              { label: "Retirada dos sócios", value: partnersPercent,    setValue: setPartnersPercent,    icon: Wallet,           desc: "Pró-labore, distribuição planejada e pagamento para sócios.", auto: false },
              { label: "Despesas da operação",value: expensesPercent,    setValue: setExpensesPercent,    icon: BriefcaseBusiness, desc: `Calculado automaticamente pela soma das categorias de despesas (${fmtBRL(totals.expensesAmountTotal)}).`, auto: true },
            ].map((item) => (
              <div key={item.label} className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="h-9 w-9 rounded-sm bg-muted flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium flex items-center gap-2">
                        {item.label}
                        {item.auto && <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 px-1 py-0.5 rounded-sm">auto</span>}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={item.value}
                      onChange={e => !item.auto && item.setValue(clampPercent(Number(e.target.value)))}
                      readOnly={item.auto}
                      className={`w-20 rounded-sm font-mono text-right ${item.auto ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    <span className="text-sm font-mono text-muted-foreground">%</span>
                  </div>
                </div>
                <Slider
                  value={[item.value]}
                  min={0} max={100} step={1}
                  onValueChange={v => !item.auto && item.setValue(v[0])}
                  className={item.auto ? "opacity-50 pointer-events-none" : ""}
                />
              </div>
            ))}

            <div className={`border rounded-sm p-3 ${totals.allocatedPercent === 100 ? "border-border bg-muted/30" : totals.allocatedPercent > 100 ? "border-destructive/40 bg-destructive/5" : "border-accent/40 bg-accent/5"}`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {totals.allocatedPercent === 100 ? <CheckCircle2 className="w-4 h-4 text-accent" /> : <CircleDollarSign className="w-4 h-4 text-muted-foreground" />}
                  <span className="text-sm font-medium">Saldo da regra</span>
                </div>
                <span className="font-mono text-sm">{totals.unallocatedPercent}% · {fmtBRL(totals.unallocatedValue)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">O ideal é fechar em 100%. Se passar de 100%, a empresa está prometendo mais dinheiro do que a receita permite.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-7 rounded-sm">
          <CardHeader className="pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Resumo mensal projetado</CardTitle>
            <Badge variant="outline" className="rounded-sm w-fit">Último salvamento: {savedAt}</Badge>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                ["Receita analisada", fmtBRL(monthlyRevenue), "100%"],
                ["Total alocado", fmtBRL(totals.companyCashValue + totals.partnersValue + totals.expensesValue), `${totals.allocatedPercent}%`],
                ["Saldo restante", fmtBRL(totals.unallocatedValue), `${totals.unallocatedPercent}%`],
              ].map(([label, value, percent]) => (
                <div key={label} className="border border-border rounded-sm p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="text-2xl font-mono mt-2">{value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{percent}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["Caixa da empresa", companyCashPercent, totals.companyCashValue, "bg-accent"],
                ["Sócios", partnersPercent, totals.partnersValue, "bg-foreground"],
                ["Despesas", expensesPercent, totals.expensesValue, "bg-muted-foreground"],
              ].map(([label, percent, value, color]) => (
                <div key={String(label)} className="space-y-2">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span>{label}</span>
                    <span className="font-mono">{percent}% · {fmtBRL(Number(value))}</span>
                  </div>
                  <div className="h-3 rounded-sm bg-muted overflow-hidden">
                    <div className={`h-full ${color}`} style={{ width: `${Math.min(100, Number(percent))}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── PARTNERS + EXPENSES ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="rounded-sm">
          <CardHeader className="pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Divisão entre sócios</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Define como o valor destinado aos sócios será repartido.</p>
            </div>
            <Button variant="outline" size="sm" className="rounded-sm w-fit" onClick={() => setPartners(c => [...c, { id: Date.now(), name: "Novo sócio", share: 0 }])}>
              <Plus className="w-4 h-4 mr-2" />Sócio
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto no-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="h-8 text-xs">Sócio</TableHead>
                    <TableHead className="h-8 text-xs w-28">%</TableHead>
                    <TableHead className="h-8 text-xs text-right">Valor (BRL)</TableHead>
                    <TableHead className="h-8 text-xs w-12" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.map(p => (
                    <TableRow key={p.id} className="hover:bg-muted/50">
                      <TableCell className="py-3 min-w-[180px]">
                        <Input value={p.name} onChange={e => updatePartner(p.id, "name", e.target.value)} className="rounded-sm" />
                      </TableCell>
                      <TableCell className="py-3">
                        <Input type="number" value={p.share} onChange={e => updatePartner(p.id, "share", e.target.value)} className="rounded-sm font-mono text-right" />
                      </TableCell>
                      <TableCell className="py-3 text-right font-mono">{fmtBRL((totals.partnersValue * p.share) / 100)}</TableCell>
                      <TableCell className="py-3 text-right">
                        <Button variant="ghost" size="icon" className="rounded-sm h-8 w-8" onClick={() => setPartners(c => c.filter(x => x.id !== p.id))}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="border-t border-border px-4 py-3 flex justify-between text-sm">
              <span className="text-muted-foreground">Total da divisão</span>
              <span className={`font-mono ${totals.partnersShareTotal === 100 ? "text-foreground" : "text-destructive"}`}>{totals.partnersShareTotal}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm">
          <CardHeader className="pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Categorias de despesas</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Detalhe tudo que consome o orçamento de despesas.</p>
            </div>
            <Button variant="outline" size="sm" className="rounded-sm w-fit" onClick={() => setExpenses(c => [...c, { id: Date.now(), name: "Nova despesa", amount: 0, type: "Operação" }])}>
              <Plus className="w-4 h-4 mr-2" />Despesa
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto no-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="h-8 text-xs">Despesa</TableHead>
                    <TableHead className="h-8 text-xs">Tipo</TableHead>
                    <TableHead className="h-8 text-xs w-20">%</TableHead>
                    <TableHead className="h-8 text-xs w-28">R$</TableHead>
                    <TableHead className="h-8 text-xs w-12" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map(e => {
                    const safeAmount = isFinite(e.amount) ? e.amount : 0;
                    // % = this expense's share of the total expenses pool
                    const pct = totals.expensesAmountTotal > 0
                      ? Math.round((safeAmount / totals.expensesAmountTotal) * 10000) / 100
                      : 0;
                    return (
                      <TableRow key={e.id} className="hover:bg-muted/50">
                        <TableCell className="py-2 min-w-[160px]">
                          <Input value={e.name ?? ""} onChange={ev => updateExpense(e.id, "name", ev.target.value)} className="rounded-sm h-8 text-xs" />
                        </TableCell>
                        <TableCell className="py-2 min-w-[110px]">
                          <Input value={e.type ?? ""} onChange={ev => updateExpense(e.id, "type", ev.target.value)} className="rounded-sm h-8 text-xs" />
                        </TableCell>
                        <TableCell className="py-2">
                          <Input
                            type="number"
                            value={isFinite(pct) ? pct : 0}
                            onChange={ev => updateExpenseByPct(e.id, Number(ev.target.value))}
                            className="rounded-sm font-mono text-right h-8 text-xs"
                            min={0}
                            step={0.1}
                          />
                        </TableCell>
                        <TableCell className="py-2">
                          <Input
                            type="number"
                            value={safeAmount}
                            onChange={ev => updateExpense(e.id, "amount", ev.target.value)}
                            className="rounded-sm font-mono text-right h-8 text-xs"
                            min={0}
                          />
                        </TableCell>
                        <TableCell className="py-2 text-right">
                          <Button variant="ghost" size="icon" className="rounded-sm h-8 w-8" onClick={() => setExpenses(c => c.filter(x => x.id !== e.id))}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <div className="border-t border-border px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-muted-foreground">Total das despesas</span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground">
                  {expensesPercent}% da receita base
                </span>
                <span className="font-mono font-semibold">{fmtBRL(totals.expensesAmountTotal)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
