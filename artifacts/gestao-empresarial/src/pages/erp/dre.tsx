import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const formatted = `R$ ${abs.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  return value < 0 ? `(${formatted})` : formatted;
}

export function DrePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">DRE - Demonstrativo de Resultado</h1>
          <p className="text-muted-foreground mt-1">Análise de resultado por período</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="mensal"><SelectTrigger className="w-36"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="mensal">Mensal</SelectItem><SelectItem value="trimestral">Trimestral</SelectItem><SelectItem value="anual">Anual</SelectItem></SelectContent></Select>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Exportar PDF</Button>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Abril/2026 vs Março/2026</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Conta</TableHead>
                <TableHead className="text-right">Abril/2026</TableHead>
                <TableHead className="text-right">Março/2026</TableHead>
                <TableHead className="text-right">Variação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dreData.map((row, i) => {
                const variation = row.previous !== 0 ? ((row.current - row.previous) / Math.abs(row.previous) * 100) : 0;
                const isPositive = (row.current >= 0 && variation > 0) || (row.current < 0 && variation < 0);
                return (
                  <TableRow key={i} className={row.isHeader ? "bg-muted/50 font-semibold" : ""}>
                    <TableCell className={`text-sm ${row.level === 1 ? "pl-8" : ""}`}>{row.category}</TableCell>
                    <TableCell className={`text-sm text-right ${row.current < 0 ? "text-red-600" : ""}`}>{formatCurrency(row.current)}</TableCell>
                    <TableCell className={`text-sm text-right ${row.previous < 0 ? "text-red-600" : ""}`}>{formatCurrency(row.previous)}</TableCell>
                    <TableCell className={`text-sm text-right ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
                      {variation > 0 ? "+" : ""}{variation.toFixed(1)}%
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
