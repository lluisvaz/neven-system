import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, FileText, Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const articles = [
  { id: 1, title: "Como configurar a integração com Stripe", category: "Integrações", visibility: "Público", views: 342, helpful: 89, notHelpful: 3, updated: "10/04/2026", status: "Publicado" },
  { id: 2, title: "Guia de criação de cobranças recorrentes", category: "Faturamento", visibility: "Público", views: 256, helpful: 67, notHelpful: 5, updated: "08/04/2026", status: "Publicado" },
  { id: 3, title: "Configurando automações de CRM", category: "CRM", visibility: "Público", views: 198, helpful: 45, notHelpful: 2, updated: "05/04/2026", status: "Publicado" },
  { id: 4, title: "FAQ - Perguntas frequentes sobre pagamentos", category: "Faturamento", visibility: "Público", views: 523, helpful: 134, notHelpful: 8, updated: "12/04/2026", status: "Publicado" },
  { id: 5, title: "Manual do módulo de relatórios", category: "Relatórios", visibility: "Público", views: 167, helpful: 38, notHelpful: 4, updated: "01/04/2026", status: "Publicado" },
  { id: 6, title: "Procedimento interno de escalonamento", category: "Interno", visibility: "Interno", views: 45, helpful: 12, notHelpful: 0, updated: "14/04/2026", status: "Rascunho" },
  { id: 7, title: "Guia de troubleshooting - Erros comuns", category: "Interno", visibility: "Interno", views: 89, helpful: 23, notHelpful: 1, updated: "11/04/2026", status: "Publicado" },
  { id: 8, title: "Onboarding - Primeiros passos na plataforma", category: "Geral", visibility: "Público", views: 892, helpful: 210, notHelpful: 12, updated: "15/04/2026", status: "Publicado" },
];

const categories = ["Todos", "Geral", "CRM", "Faturamento", "Relatórios", "Integrações", "Interno"];

export function KnowledgePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Base de Conhecimento</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">{articles.length} artigos na biblioteca</p>
        </div>
        <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Novo Artigo</Button>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar artigos..." className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" data-testid="input-search-knowledge" />
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
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Artigo</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Categoria</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-center">Visibilidade</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-center">Métricas</TableHead>
                    <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Atualização</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.filter(a => cat === "Todos" || a.category === cat).map((article) => (
                    <TableRow key={article.id} className="hover:bg-muted/30 transition-colors group cursor-pointer">
                      <TableCell className="py-4">
                        <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="font-medium text-sm group-hover:text-accent transition-colors flex items-center gap-2">
                          {article.title}
                          {article.status === "Rascunho" && (
                            <Badge variant="secondary" className="rounded-sm text-[9px] uppercase tracking-wider px-1.5 py-0">Rascunho</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge variant="outline" className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                          {article.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 text-center">
                        <span className="text-xs text-muted-foreground">{article.visibility}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center justify-center gap-3 text-xs font-mono text-muted-foreground">
                          <span className="flex items-center gap-1" title="Visualizações"><Eye className="w-3.5 h-3.5" />{article.views}</span>
                          <span className="flex items-center gap-1" title="Útil"><ThumbsUp className="w-3 h-3 text-emerald-600/70" />{article.helpful}</span>
                          <span className="flex items-center gap-1" title="Não útil"><ThumbsDown className="w-3 h-3 text-rose-600/70" />{article.notHelpful}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-right text-xs font-mono text-muted-foreground">
                        {article.updated}
                      </TableCell>
                    </TableRow>
                  ))}
                  {articles.filter(a => cat === "Todos" || a.category === cat).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-12 text-center text-muted-foreground text-sm">
                        Nenhum artigo encontrado nesta categoria.
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
