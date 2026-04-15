import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const dreData = [
  { category: "RECEITA OPERACIONAL BRUTA", current: 186400, previous: 172000, isHeader: true, level: 0 },
  { category: "Receita de Assinaturas", current: 156000, previous: 148000, isHeader: false, level: 1 },
  { category: "Receita de Serviços Avulsos", current: 22400, previous: 18000, isHeader: false, level: 1 },
  { category: "Receita de Setup/Implantação", current: 8000, previous: 6000, isHeader: false, level: 1 },
  { category: "(-) DEDUÇÕES DA RECEITA", current: -9320, previous: -8600, isHeader: true, level: 0 },
  { category: "Impostos sobre Serviços (ISS)", current: -5592, previous: -5160, isHeader: false, level: 1 },
  { category: "PIS/COFINS", current: -3728, previous: -3440, isHeader: false, level: 1 },
  { category: "RECEITA OPERACIONAL LÍQUIDA", current: 177080, previous: 163400, isHeader: true, level: 0 },
  { category: "(-) CUSTOS DOS SERVIÇOS", current: -42800, previous: -39500, isHeader: true, level: 0 },
  { category: "Infraestrutura (Cloud/Hosting)", current: -12400, previous: -11800, isHeader: false, level: 1 },
  { category: "Licenças de Software", current: -4200, previous: -3900, isHeader: false, level: 1 },
  { category: "Equipe Técnica (Salários)", current: -26200, previous: -23800, isHeader: false, level: 1 },
  { category: "LUCRO BRUTO", current: 134280, previous: 123900, isHeader: true, level: 0 },
  { category: "(-) DESPESAS OPERACIONAIS", current: -67300, previous: -62100, isHeader: true, level: 0 },
  { category: "Administrativo", current: -22450, previous: -21000, isHeader: false, level: 1 },
  { category: "Comercial/Marketing", current: -18600, previous: -17200, isHeader: false, level: 1 },
  { category: "Pessoal (Administrativo)", current: -26250, previous: -23900, isHeader: false, level: 1 },
  { category: "RESULTADO OPERACIONAL (EBITDA)", current: 66980, previous: 61800, isHeader: true, level: 0 },
  { category: "Resultado Financeiro", current: 2400, previous: 1800, isHeader: false, level: 1 },
  { category: "RESULTADO LÍQUIDO", current: 69380, previous: 63600, isHeader: true, level: 0 },
];

function formatCurrency(value: number) {
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return value < 0 ? `(${formatted})` : formatted;
}

export function DrePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">DRE</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">Demonstrativo de Resultado do Exercício</p>
        </div>
        <div className="flex gap-2">
           <div className="flex border border-border rounded-sm overflow-hidden text-sm">
            <button className="px-3 py-1.5 hover:bg-muted/50 transition-colors">Anual</button>
            <button className="px-3 py-1.5 hover:bg-muted/50 transition-colors border-l border-r border-border">Trimestral</button>
            <button className="px-3 py-1.5 bg-muted font-medium transition-colors">Mensal</button>
          </div>
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
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Abril/2026</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Março/2026</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right w-32">Variação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dreData.map((row, i) => {
              const variation = row.previous !== 0 ? ((row.current - row.previous) / Math.abs(row.previous) * 100) : 0;
              // A variation is "good" if it's revenue going up or expenses going down
              const isRevenue = i < 4 || (i >= 7 && i <= 8) || i == 12 || i >= 17; // Roughly identifying revenue/profit lines
              const isPositiveEffect = (row.current >= 0 && variation > 0) || (row.current < 0 && variation > 0);
              
              return (
                <TableRow key={i} className={`hover:bg-muted/30 transition-colors ${row.isHeader ? "bg-muted/10 border-b border-border" : "border-b-0"}`}>
                  <TableCell className={`py-2 text-sm ${row.isHeader ? 'font-medium uppercase tracking-wider text-xs' : 'text-muted-foreground pl-8'}`}>
                    {row.category}
                  </TableCell>
                  <TableCell className={`py-2 text-sm font-mono text-right ${row.isHeader ? 'font-medium text-foreground' : ''}`}>
                    {formatCurrency(row.current)}
                  </TableCell>
                  <TableCell className={`py-2 text-sm font-mono text-right text-muted-foreground ${row.isHeader ? 'font-medium' : ''}`}>
                    {formatCurrency(row.previous)}
                  </TableCell>
                  <TableCell className={`py-2 text-sm font-mono text-right ${row.isHeader ? 'font-medium' : ''}`}>
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] ${
                      variation === 0 ? 'text-muted-foreground' :
                      isPositiveEffect ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' : 'text-rose-600 bg-rose-50 dark:bg-rose-950/30'
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
