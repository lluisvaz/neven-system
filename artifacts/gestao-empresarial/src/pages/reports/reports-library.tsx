import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Download, Clock, BarChart3 } from "lucide-react";

const reports = [
  { name: "DRE Gerencial", description: "Demonstrativo de resultado por período com drill-down por categoria", category: "Financeiro", lastRun: "15/04/2026" },
  { name: "Fluxo de Caixa Projetado", description: "Entradas/saídas previstas para os próximos 90 dias", category: "Financeiro", lastRun: "15/04/2026" },
  { name: "Aging de Inadimplência", description: "Cobranças vencidas agrupadas por faixas de dias (0-30, 31-60, 61-90, 90+)", category: "Financeiro", lastRun: "14/04/2026" },
  { name: "Cohort de Churn", description: "Análise de retenção por coorte de aquisição (mês de contratação)", category: "Clientes", lastRun: "10/04/2026" },
  { name: "LTV por Segmento", description: "Lifetime Value médio agrupado por tags/origem/produto", category: "Clientes", lastRun: "08/04/2026" },
  { name: "Análise de Pipeline", description: "Conversão por etapa, tempo médio por etapa, taxa de fechamento por vendedor", category: "Comercial", lastRun: "12/04/2026" },
  { name: "Performance de Vendedores", description: "Metas vs. realizado, ranking, atividades realizadas", category: "Comercial", lastRun: "15/04/2026" },
  { name: "NPS Histórico", description: "Evolução do NPS mensal com análise de promotores/neutros/detratores", category: "Clientes", lastRun: "01/04/2026" },
  { name: "Análise de Produto", description: "Receita por produto, churn por produto, upsell rate", category: "Comercial", lastRun: "05/04/2026" },
  { name: "Relatório de Atividades", description: "Log de atividades da equipe por período, tipo e usuário", category: "Operacional", lastRun: "15/04/2026" },
];

const categories = ["Todos", "Financeiro", "Comercial", "Clientes", "Operacional"];

export function ReportsLibraryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold tracking-tight">Biblioteca de Relatórios</h1><p className="text-muted-foreground mt-1">{reports.length} relatórios disponíveis</p></div>
        <Button size="sm"><BarChart3 className="w-4 h-4 mr-2" />Criar Relatório Custom</Button>
      </div>

      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Buscar relatório..." className="pl-9" data-testid="input-search-reports" /></div>

      <Tabs defaultValue="Todos">
        <TabsList>{categories.map(c => <TabsTrigger key={c} value={c}>{c}</TabsTrigger>)}</TabsList>
        {categories.map(cat => (
          <TabsContent key={cat} value={cat} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {reports.filter(r => cat === "Todos" || r.category === cat).map((report, i) => (
              <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-muted"><FileText className="w-4 h-4 text-muted-foreground" /></div><div><p className="font-medium text-sm">{report.name}</p><Badge variant="outline" className="text-xs mt-1">{report.category}</Badge></div></div>
                    <Button variant="ghost" size="icon"><Download className="w-4 h-4" /></Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{report.description}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />Último: {report.lastRun}</div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
