import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Banknote,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Plus,
  Save,
  Trash2,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

type Partner = {
  id: number;
  name: string;
  share: number;
};

type Expense = {
  id: number;
  name: string;
  share: number;
  type: string;
};

const initialPartners: Partner[] = [
  { id: 1, name: "Sócio fundador", share: 70 },
  { id: 2, name: "Sócio operador", share: 30 },
];

const initialExpenses: Expense[] = [
  { id: 1, name: "Funcionários e folha", share: 36, type: "Pessoas" },
  { id: 2, name: "Assinaturas de ferramentas", share: 14, type: "Ferramentas" },
  { id: 3, name: "Impostos e contabilidade", share: 18, type: "Tributos" },
  { id: 4, name: "Marketing e vendas", share: 12, type: "Crescimento" },
  { id: 5, name: "Infraestrutura e servidores", share: 8, type: "Tecnologia" },
  { id: 6, name: "Aluguel, escritório e operação", share: 7, type: "Operação" },
  { id: 7, name: "Reserva para imprevistos", share: 5, type: "Reserva" },
];

const storageKey = "gestorpro-financial-distribution";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const normalizeNumber = (value: string) => {
  const parsed = Number(value.replace(/\D/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const clampPercent = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function DistributionPage() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(220000);
  const [companyCashPercent, setCompanyCashPercent] = useState(30);
  const [partnersPercent, setPartnersPercent] = useState(20);
  const [expensesPercent, setExpensesPercent] = useState(50);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [savedAt, setSavedAt] = useState("Ainda não salvo");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setMonthlyRevenue(parsed.monthlyRevenue ?? 220000);
      setCompanyCashPercent(parsed.companyCashPercent ?? 30);
      setPartnersPercent(parsed.partnersPercent ?? 20);
      setExpensesPercent(parsed.expensesPercent ?? 50);
      setPartners(parsed.partners?.length ? parsed.partners : initialPartners);
      setExpenses(parsed.expenses?.length ? parsed.expenses : initialExpenses);
      setSavedAt(parsed.savedAt ?? "Configuração carregada");
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  const totals = useMemo(() => {
    const allocatedPercent = companyCashPercent + partnersPercent + expensesPercent;
    const unallocatedPercent = 100 - allocatedPercent;
    const companyCashValue = (monthlyRevenue * companyCashPercent) / 100;
    const partnersValue = (monthlyRevenue * partnersPercent) / 100;
    const expensesValue = (monthlyRevenue * expensesPercent) / 100;
    const unallocatedValue = (monthlyRevenue * unallocatedPercent) / 100;
    const partnersShareTotal = partners.reduce((sum, partner) => sum + partner.share, 0);
    const expensesShareTotal = expenses.reduce((sum, expense) => sum + expense.share, 0);

    return {
      allocatedPercent,
      unallocatedPercent,
      companyCashValue,
      partnersValue,
      expensesValue,
      unallocatedValue,
      partnersShareTotal,
      expensesShareTotal,
    };
  }, [companyCashPercent, expenses, expensesPercent, monthlyRevenue, partners, partnersPercent]);

  const status = totals.allocatedPercent === 100 ? "Fechado em 100%" : totals.allocatedPercent > 100 ? "Acima de 100%" : "Falta alocar";

  const updatePartner = (id: number, field: keyof Partner, value: string | number) => {
    setPartners((current) =>
      current.map((partner) =>
        partner.id === id
          ? { ...partner, [field]: field === "share" ? clampPercent(Number(value)) : String(value) }
          : partner,
      ),
    );
  };

  const updateExpense = (id: number, field: keyof Expense, value: string | number) => {
    setExpenses((current) =>
      current.map((expense) =>
        expense.id === id
          ? { ...expense, [field]: field === "share" ? clampPercent(Number(value)) : String(value) }
          : expense,
      ),
    );
  };

  const addPartner = () => {
    setPartners((current) => [...current, { id: Date.now(), name: "Novo sócio", share: 0 }]);
  };

  const addExpense = () => {
    setExpenses((current) => [...current, { id: Date.now(), name: "Nova despesa", share: 0, type: "Operação" }]);
  };

  const saveSettings = () => {
    const savedAtLabel = new Date().toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        monthlyRevenue,
        companyCashPercent,
        partnersPercent,
        expensesPercent,
        partners,
        expenses,
        savedAt: savedAtLabel,
      }),
    );
    setSavedAt(savedAtLabel);
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
            <Save className="w-4 h-4 mr-2" />
            Salvar configuração
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <Card className="rounded-sm">
          <CardContent className="p-4">
            <div className="flex items-center text-muted-foreground gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Receita Base</span>
            </div>
            <Input
              value={monthlyRevenue.toLocaleString("pt-BR")}
              onChange={(event) => setMonthlyRevenue(normalizeNumber(event.target.value))}
              className="mt-3 rounded-sm font-mono text-xl h-11"
            />
            <p className="text-xs text-muted-foreground mt-2">Base mensal usada para simular a distribuição.</p>
          </CardContent>
        </Card>
        <Card className="rounded-sm">
          <CardContent className="p-4">
            <div className="flex items-center text-muted-foreground gap-2">
              <Building2 className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Caixa da empresa</span>
            </div>
            <div className="text-2xl font-mono mt-3">{currency.format(totals.companyCashValue)}</div>
            <p className="text-xs text-muted-foreground mt-2">{companyCashPercent}% para reserva, capital de giro e crescimento.</p>
          </CardContent>
        </Card>
        <Card className="rounded-sm">
          <CardContent className="p-4">
            <div className="flex items-center text-muted-foreground gap-2">
              <Users className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Bolso dos sócios</span>
            </div>
            <div className="text-2xl font-mono mt-3">{currency.format(totals.partnersValue)}</div>
            <p className="text-xs text-muted-foreground mt-2">{partnersPercent}% dividido entre sócios conforme regras abaixo.</p>
          </CardContent>
        </Card>
        <Card className="rounded-sm">
          <CardContent className="p-4">
            <div className="flex items-center text-muted-foreground gap-2">
              <BriefcaseBusiness className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Despesas</span>
            </div>
            <div className="text-2xl font-mono mt-3">{currency.format(totals.expensesValue)}</div>
            <p className="text-xs text-muted-foreground mt-2">{expensesPercent}% para funcionários, ferramentas, impostos e operação.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <Card className="xl:col-span-5 rounded-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Regra principal de distribuição</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            {[
              {
                label: "Caixa da empresa",
                value: companyCashPercent,
                setValue: setCompanyCashPercent,
                description: "Reserva, capital de giro, reinvestimento, segurança e crescimento.",
                icon: Building2,
              },
              {
                label: "Retirada dos sócios",
                value: partnersPercent,
                setValue: setPartnersPercent,
                description: "Pró-labore, distribuição planejada e pagamento para sócios.",
                icon: Wallet,
              },
              {
                label: "Despesas da operação",
                value: expensesPercent,
                setValue: setExpensesPercent,
                description: "Folha, assinaturas, fornecedores, impostos, infraestrutura e recorrências.",
                icon: BriefcaseBusiness,
              },
            ].map((item) => (
              <div key={item.label} className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="h-9 w-9 rounded-sm bg-muted flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">{item.label}</Label>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={item.value}
                      onChange={(event) => item.setValue(clampPercent(Number(event.target.value)))}
                      className="w-20 rounded-sm font-mono text-right"
                    />
                    <span className="text-sm font-mono text-muted-foreground">%</span>
                  </div>
                </div>
                <Slider value={[item.value]} min={0} max={100} step={1} onValueChange={(value) => item.setValue(value[0])} />
              </div>
            ))}

            <div className={`border rounded-sm p-3 ${totals.allocatedPercent === 100 ? "border-border bg-muted/30" : totals.allocatedPercent > 100 ? "border-destructive/40 bg-destructive/5" : "border-accent/40 bg-accent/5"}`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {totals.allocatedPercent === 100 ? <CheckCircle2 className="w-4 h-4 text-accent" /> : <CircleDollarSign className="w-4 h-4 text-muted-foreground" />}
                  <span className="text-sm font-medium">Saldo da regra</span>
                </div>
                <span className="font-mono text-sm">{totals.unallocatedPercent}% · {currency.format(totals.unallocatedValue)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                O ideal é fechar em 100%. Se passar de 100%, a empresa está prometendo mais dinheiro do que a receita permite.
              </p>
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
                ["Receita analisada", currency.format(monthlyRevenue), "100%"],
                ["Total alocado", currency.format(totals.companyCashValue + totals.partnersValue + totals.expensesValue), `${totals.allocatedPercent}%`],
                ["Saldo restante", currency.format(totals.unallocatedValue), `${totals.unallocatedPercent}%`],
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
                    <span className="font-mono">{percent}% · {currency.format(Number(value))}</span>
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="rounded-sm">
          <CardHeader className="pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Divisão entre sócios</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Define como o valor destinado aos sócios será repartido.</p>
            </div>
            <Button variant="outline" size="sm" className="rounded-sm w-fit" onClick={addPartner}>
              <Plus className="w-4 h-4 mr-2" />
              Sócio
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto no-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="h-8 text-xs">Sócio</TableHead>
                    <TableHead className="h-8 text-xs w-28">%</TableHead>
                    <TableHead className="h-8 text-xs text-right">Valor</TableHead>
                    <TableHead className="h-8 text-xs w-12" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.map((partner) => (
                    <TableRow key={partner.id} className="hover:bg-muted/50">
                      <TableCell className="py-3 min-w-[180px]">
                        <Input value={partner.name} onChange={(event) => updatePartner(partner.id, "name", event.target.value)} className="rounded-sm" />
                      </TableCell>
                      <TableCell className="py-3">
                        <Input type="number" value={partner.share} onChange={(event) => updatePartner(partner.id, "share", event.target.value)} className="rounded-sm font-mono text-right" />
                      </TableCell>
                      <TableCell className="py-3 text-right font-mono">
                        {currency.format((totals.partnersValue * partner.share) / 100)}
                      </TableCell>
                      <TableCell className="py-3 text-right">
                        <Button variant="ghost" size="icon" className="rounded-sm h-8 w-8" onClick={() => setPartners((current) => current.filter((item) => item.id !== partner.id))}>
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
            <Button variant="outline" size="sm" className="rounded-sm w-fit" onClick={addExpense}>
              <Plus className="w-4 h-4 mr-2" />
              Despesa
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto no-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="h-8 text-xs">Despesa</TableHead>
                    <TableHead className="h-8 text-xs">Tipo</TableHead>
                    <TableHead className="h-8 text-xs w-24">%</TableHead>
                    <TableHead className="h-8 text-xs text-right">Valor</TableHead>
                    <TableHead className="h-8 text-xs w-12" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id} className="hover:bg-muted/50">
                      <TableCell className="py-3 min-w-[190px]">
                        <Input value={expense.name} onChange={(event) => updateExpense(expense.id, "name", event.target.value)} className="rounded-sm" />
                      </TableCell>
                      <TableCell className="py-3 min-w-[130px]">
                        <Input value={expense.type} onChange={(event) => updateExpense(expense.id, "type", event.target.value)} className="rounded-sm" />
                      </TableCell>
                      <TableCell className="py-3">
                        <Input type="number" value={expense.share} onChange={(event) => updateExpense(expense.id, "share", event.target.value)} className="rounded-sm font-mono text-right" />
                      </TableCell>
                      <TableCell className="py-3 text-right font-mono">
                        {currency.format((totals.expensesValue * expense.share) / 100)}
                      </TableCell>
                      <TableCell className="py-3 text-right">
                        <Button variant="ghost" size="icon" className="rounded-sm h-8 w-8" onClick={() => setExpenses((current) => current.filter((item) => item.id !== expense.id))}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="border-t border-border px-4 py-3 flex justify-between text-sm">
              <span className="text-muted-foreground">Total das despesas</span>
              <span className={`font-mono ${totals.expensesShareTotal === 100 ? "text-foreground" : "text-destructive"}`}>{totals.expensesShareTotal}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Como usar essa configuração</CardTitle>
        </CardHeader>
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex gap-3">
            <Banknote className="w-5 h-5 text-accent flex-shrink-0" />
            <p>Use a receita mensal prevista para simular quanto dinheiro deve ser separado antes de qualquer retirada.</p>
          </div>
          <div className="flex gap-3">
            <Users className="w-5 h-5 text-accent flex-shrink-0" />
            <p>Defina a regra de sócios para evitar retiradas sem controle e manter clareza entre pró-labore e distribuição.</p>
          </div>
          <div className="flex gap-3">
            <BriefcaseBusiness className="w-5 h-5 text-accent flex-shrink-0" />
            <p>Quebre despesas em categorias para enxergar folha, ferramentas, impostos, marketing, infraestrutura e reservas.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}