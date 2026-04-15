import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Download, Clock, BarChart3 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const reports = [
  { id: 1, name: "DRE Gerencial", description: "Demonstrativo de resultado por período com drill-down por categoria", category: "Financeiro", lastRun: "15/04/2026", schedule: "Mensal" },
  { id: 2, name: "Fluxo de Caixa Projetado", description: "Entradas/saídas previstas para os próximos 90 dias", category: "Financeiro", lastRun: "15/04/2026", schedule: "Diário" },
  { id: 3, name: "Aging de Inadimplência", description: "Cobranças vencidas agrupadas por faixas de dias (0-30, 31-60, 61-90, 90+)", category: "Financeiro", lastRun: "14/04/2026", schedule: "Semanal" },
  { id: 4, name: "Cohort de Churn", description: "Análise de retenção por coorte de aquisição (mês de contratação)", category: "Clientes", lastRun: "10/04/2026", schedule: "Mensal" },
  { id: 5, name: "LTV por Segmento", description: "Lifetime Value médio agrupado por tags/origem/produto", category: "Clientes", lastRun: "08/04/2026", schedule: "Mensal" },
  { id: 6, name: "Análise de Pipeline", description: "Conversão por etapa, tempo médio por etapa, taxa de fechamento por vendedor", category: "Comercial", lastRun: "12/04/2026", schedule: "Semanal" },
  { id: 7, name: "Performance de Vendedores", description: "Metas vs. realizado, ranking, atividades realizadas", category: "Comercial", lastRun: "15/04/2026", schedule: "Semanal" },
  { id: 8, name: "NPS Histórico", description: "Evolução do NPS mensal com análise de promotores/neutros/detratores", category: "Clientes", lastRun: "01/04/2026", schedule: "Mensal" },
  { id: 9, name: "Análise de Produto", description: "Receita por produto, churn por produto, upsell rate", category: "Comercial", lastRun: "05/04/2026", schedule: "Sob demanda" },
  { id: 10, name: "Relatório de Atividades", description: "Log de atividades da equipe por período, tipo e usuário", category: "Operacional", lastRun: "15/04/2026", schedule: "Diário" },
];

const categories = ["Todos", "Financeiro", "Comercial", "Clientes", "Operacional"];

export function ReportsLibraryPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Biblioteca de Relatórios</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">{reports.length} relatórios disponíveis</p>
        </div>
        <Button size="sm" className="rounded-sm"><BarChart3 className="w-3.5 h-3.5 mr-2" />Criar Relatório Custom</Button>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar relatório..." className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" data-testid="input-search-reports" />
        </div>
      </div>

      <Tabs defaultValue="Todos" className="space-y-6">
        <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-auto p-0 space-x-6 overflow-x-auto flex-nowrap hide-scrollbar">
          {categories.map(c => (
            <TabsTrigger 
              key={c} 
              value={c}
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-0 pb-2 text-sm uppercase tracking-wider font-medium text-muted-foreground data-[state=active]:text-foreground whitespace-nowrap"
            >
              {c}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(cat => (
          <TabsContent key={cat} value={cat} className="space-y-0 mt-0">
            <div className="border border-border rounded-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-10"></TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Relatório</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Categoria</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Agendamento</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Última Execução</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-24"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.filter(r => cat === "Todos" || r.category === cat).map((report) => (
                    <TableRow key={report.id} className="hover:bg-muted/30 transition-colors group cursor-pointer">
                      <TableCell className="py-4">
                        <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="font-medium text-sm group-hover:text-accent transition-colors">{report.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-sm">{report.description}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge variant="outline" className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                          {report.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 text-sm text-muted-foreground">{report.schedule}</TableCell>
                      <TableCell className="py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 text-xs font-mono text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {report.lastRun}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm" title="Baixar último">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="secondary" size="sm" className="rounded-sm h-8 px-3 text-xs" title="Gerar agora">
                            Gerar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {reports.filter(r => cat === "Todos" || r.category === cat).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-12 text-center text-muted-foreground text-sm">
                        Nenhum relatório encontrado nesta categoria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
