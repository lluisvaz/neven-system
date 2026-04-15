import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { useFinancialData } from "@/lib/financial-data";

/**
 * DRE — Demonstrativo de Resultado do Exercício
 *
 * INTEGRATION NOTE (for future AI):
 * The "RECEITA OPERACIONAL BRUTA" line should be sourced from:
 *   - fin.mrrBRL        → Receita de Assinaturas (MRR atual)
 *   - fin.receivedThisMonthBRL → Receita total no mês (inclui avulsos e setup)
 * When the API is live, replace the hardcoded `current` values below
 * for the first three rows (categories: "Receita de Assinaturas",
 * "Receita de Serviços Avulsos", "Receita de Setup/Implantação")
 * with values derived from the FinancialSummary returned by
 * GET /api/financial/summary.
 *
 * All values are already in BRL (Asaas native + Stripe converted).
 */

function buildDreData(mrrBRL: number, receivedBRL: number) {
  const subscriptions = mrrBRL;
  const avulsos = Math.round(receivedBRL * 0.12);   // ≈ 12% of revenue = avulso services
  const setup = Math.round(receivedBRL * 0.043);    // ≈ 4.3% = setup/onboarding
  const grossRevenue = subscriptions + avulsos + setup;

  const issPct = 0.03;
  const pisCofinsPct = 0.02;
  const iss = -Math.round(grossRevenue * issPct);
  const pisCofins = -Math.round(grossRevenue * pisCofinsPct);
  const netRevenue = grossRevenue + iss + pisCofins;

  const infra = -Math.round(netRevenue * 0.07);
  const licencas = -Math.round(netRevenue * 0.024);
  const equipeTec = -Math.round(netRevenue * 0.148);
  const costServices = infra + licencas + equipeTec;
  const grossProfit = netRevenue + costServices;

  const admin = -Math.round(grossProfit * 0.167);
  const comercial = -Math.round(grossProfit * 0.139);
  const pessoalAdm = -Math.round(grossProfit * 0.196);
  const opex = admin + comercial + pessoalAdm;
  const ebitda = grossProfit + opex;

  const resultado = Math.round(ebitda * 0.036);
  const netResult = ebitda + resultado;

  return [
    { category: "RECEITA OPERACIONAL BRUTA", current: grossRevenue, previous: 172000, isHeader: true },
    { category: "Receita de Assinaturas (MRR)", current: subscriptions, previous: 148000, isHeader: false },
    { category: "Receita de Serviços Avulsos", current: avulsos, previous: 18000, isHeader: false },
    { category: "Receita de Setup/Implantação", current: setup, previous: 6000, isHeader: false },
    { category: "(-) DEDUÇÕES DA RECEITA", current: iss + pisCofins, previous: -8600, isHeader: true },
    { category: "Impostos sobre Serviços (ISS)", current: iss, previous: -5160, isHeader: false },
    { category: "PIS/COFINS", current: pisCofins, previous: -3440, isHeader: false },
    { category: "RECEITA OPERACIONAL LÍQUIDA", current: netRevenue, previous: 163400, isHeader: true },
    { category: "(-) CUSTOS DOS SERVIÇOS", current: costServices, previous: -39500, isHeader: true },
    { category: "Infraestrutura (Cloud/Hosting)", current: infra, previous: -11800, isHeader: false },
    { category: "Licenças de Software", current: licencas, previous: -3900, isHeader: false },
    { category: "Equipe Técnica (Salários)", current: equipeTec, previous: -23800, isHeader: false },
    { category: "LUCRO BRUTO", current: grossProfit, previous: 123900, isHeader: true },
    { category: "(-) DESPESAS OPERACIONAIS", current: opex, previous: -62100, isHeader: true },
    { category: "Administrativo", current: admin, previous: -21000, isHeader: false },
    { category: "Comercial/Marketing", current: comercial, previous: -17200, isHeader: false },
    { category: "Pessoal (Administrativo)", current: pessoalAdm, previous: -23900, isHeader: false },
    { category: "RESULTADO OPERACIONAL (EBITDA)", current: ebitda, previous: 61800, isHeader: true },
    { category: "Resultado Financeiro", current: resultado, previous: 1800, isHeader: false },
    { category: "RESULTADO LÍQUIDO", current: netResult, previous: 63600, isHeader: true },
  ];
}

function formatCurrency(value: number) {
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  return value < 0 ? `(${formatted})` : formatted;
}

export function DrePage() {
  const { data: fin, loading, refresh } = useFinancialData();

  const mrrBRL = fin?.mrrBRL ?? 156000;
  const receivedBRL = fin?.receivedThisMonthBRL ?? 186400;
  const dreData = buildDreData(mrrBRL, receivedBRL);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">DRE</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">
            Demonstrativo de Resultado · em R$ · Stripe + Asaas
            {!fin?.isLiveData && <span className="ml-2 text-amber-500 text-[10px]">[dados simulados]</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex border border-border rounded-sm overflow-hidden text-sm">
            <button className="px-3 py-1.5 hover:bg-muted/50 transition-colors">Anual</button>
            <button className="px-3 py-1.5 hover:bg-muted/50 transition-colors border-l border-r border-border">Trimestral</button>
            <button className="px-3 py-1.5 bg-muted font-medium transition-colors">Mensal</button>
          </div>
          <Button variant="outline" size="icon" className="rounded-sm w-9 h-9" onClick={refresh} disabled={loading}>
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline" size="sm" className="rounded-sm"><Download className="w-3.5 h-3.5 mr-2" />Exportar</Button>
        </div>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <div className="bg-muted/50 p-4 border-b border-border flex justify-between items-center">
          <h2 className="text-sm font-medium">Comparativo Mensal</h2>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Abril/2026 vs Março/2026</span>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b-2">
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-[400px]">Conta</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Abril/2026 (R$)</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Março/2026 (R$)</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right w-32">Variação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dreData.map((row, i) => {
              const variation = row.previous !== 0 ? ((row.current - row.previous) / Math.abs(row.previous) * 100) : 0;
              const isPositiveEffect = (row.current >= 0 && variation > 0) || (row.current < 0 && variation < 0);
              return (
                <TableRow key={i} className={`hover:bg-muted/30 transition-colors ${row.isHeader ? "bg-muted/10 border-b border-border" : "border-b-0"} ${loading ? "opacity-50" : ""}`}>
                  <TableCell className={`py-2 text-sm ${row.isHeader ? "font-medium uppercase tracking-wider text-xs" : "text-muted-foreground pl-8"}`}>
                    {row.category}
                  </TableCell>
                  <TableCell className={`py-2 text-sm font-mono text-right ${row.isHeader ? "font-medium text-foreground" : ""}`}>
                    {formatCurrency(row.current)}
                  </TableCell>
                  <TableCell className={`py-2 text-sm font-mono text-right text-muted-foreground ${row.isHeader ? "font-medium" : ""}`}>
                    {formatCurrency(row.previous)}
                  </TableCell>
                  <TableCell className={`py-2 text-sm font-mono text-right ${row.isHeader ? "font-medium" : ""}`}>
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] ${
                      variation === 0 ? "text-muted-foreground" :
                      isPositiveEffect ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" : "text-rose-600 bg-rose-50 dark:bg-rose-950/30"
                    }`}>
                      {variation > 0 ? "+" : ""}{variation.toFixed(1)}%
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
