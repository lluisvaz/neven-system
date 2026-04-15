import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, FileText, Eye, ThumbsUp, ThumbsDown } from "lucide-react";

const articles = [
  { title: "Como configurar a integração com Stripe", category: "Integrações", visibility: "Público", views: 342, helpful: 89, notHelpful: 3, updated: "10/04/2026" },
  { title: "Guia de criação de cobranças recorrentes", category: "Faturamento", visibility: "Público", views: 256, helpful: 67, notHelpful: 5, updated: "08/04/2026" },
  { title: "Configurando automações de CRM", category: "CRM", visibility: "Público", views: 198, helpful: 45, notHelpful: 2, updated: "05/04/2026" },
  { title: "FAQ - Perguntas frequentes sobre pagamentos", category: "Faturamento", visibility: "Público", views: 523, helpful: 134, notHelpful: 8, updated: "12/04/2026" },
  { title: "Manual do módulo de relatórios", category: "Relatórios", visibility: "Público", views: 167, helpful: 38, notHelpful: 4, updated: "01/04/2026" },
  { title: "Procedimento interno de escalonamento", category: "Interno", visibility: "Interno", views: 45, helpful: 12, notHelpful: 0, updated: "14/04/2026" },
  { title: "Guia de troubleshooting - Erros comuns", category: "Interno", visibility: "Interno", views: 89, helpful: 23, notHelpful: 1, updated: "11/04/2026" },
  { title: "Onboarding - Primeiros passos na plataforma", category: "Geral", visibility: "Público", views: 892, helpful: 210, notHelpful: 12, updated: "15/04/2026" },
];

const categories = ["Todos", "Geral", "CRM", "Faturamento", "Relatórios", "Integrações", "Interno"];

export function KnowledgePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold tracking-tight">Base de Conhecimento</h1><p className="text-muted-foreground mt-1">{articles.length} artigos publicados</p></div>
        <Button size="sm"><Plus className="w-4 h-4 mr-2" />Novo Artigo</Button>
      </div>

      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Buscar artigos..." className="pl-9" data-testid="input-search-knowledge" /></div>

      <Tabs defaultValue="Todos">
        <TabsList className="flex-wrap">{categories.map(c => <TabsTrigger key={c} value={c}>{c}</TabsTrigger>)}</TabsList>
        {categories.map(cat => (
          <TabsContent key={cat} value={cat} className="space-y-3 mt-4">
            {articles.filter(a => cat === "Todos" || a.category === cat).map((article, i) => (
              <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="pt-4 flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-muted flex-shrink-0"><FileText className="w-4 h-4 text-muted-foreground" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{article.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{article.category}</Badge>
                      <Badge variant={article.visibility === "Público" ? "default" : "secondary"} className="text-xs">{article.visibility}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground flex-shrink-0">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views}</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{article.helpful}</span>
                    <span className="flex items-center gap-1"><ThumbsDown className="w-3 h-3" />{article.notHelpful}</span>
                    <span>{article.updated}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
