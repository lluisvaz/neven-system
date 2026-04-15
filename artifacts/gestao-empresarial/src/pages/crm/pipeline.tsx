import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Flame } from "lucide-react";

const stages = [
  { name: "Prospecção", color: "bg-blue-500", deals: [
    { title: "CRM para LogiTech", contact: "Marcos Ferreira", value: "R$ 4.500/mês", temp: "morno", days: 3, tasks: 2 },
    { title: "ERP Verde Energia", contact: "Camila Rocha", value: "R$ 8.200/mês", temp: "frio", days: 7, tasks: 1 },
  ]},
  { name: "Qualificação", color: "bg-indigo-500", deals: [
    { title: "Plataforma Saúde+", contact: "Juliana Martins", value: "R$ 12.000/mês", temp: "quente", days: 2, tasks: 0 },
  ]},
  { name: "Proposta", color: "bg-violet-500", deals: [
    { title: "Upgrade Tech Solutions", contact: "João Silva", value: "R$ 15.000/mês", temp: "quente", days: 1, tasks: 1 },
    { title: "Módulo Financeiro Nexus", contact: "Ana Oliveira", value: "R$ 6.800/mês", temp: "morno", days: 5, tasks: 3 },
  ]},
  { name: "Negociação", color: "bg-amber-500", deals: [
    { title: "Contrato Anual DataFlow", contact: "Ricardo Almeida", value: "R$ 9.600/mês", temp: "quente", days: 0, tasks: 0 },
  ]},
  { name: "Fechamento", color: "bg-emerald-500", deals: [
    { title: "Renovação Criativa", contact: "Fernanda Souza", value: "R$ 5.200/mês", temp: "quente", days: 0, tasks: 0 },
  ]},
];

const tempColors: Record<string, string> = { frio: "text-blue-400", morno: "text-amber-400", quente: "text-red-400" };

export function PipelinePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pipeline de Vendas</h1>
          <p className="text-muted-foreground mt-1">Gerencie suas oportunidades de negócio</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="b2b"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="b2b">Vendas B2B</SelectItem><SelectItem value="b2c">Vendas B2C</SelectItem><SelectItem value="renovacao">Renovações</SelectItem></SelectContent></Select>
          <Button size="sm"><Plus className="w-4 h-4 mr-2" />Nova Oportunidade</Button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map(stage => {
          const total = stage.deals.reduce((s, d) => s + parseFloat(d.value.replace(/[^\d]/g, '')) / 100, 0);
          return (
            <div key={stage.name} className="min-w-[280px] flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                  <h3 className="text-sm font-semibold">{stage.name}</h3>
                  <span className="text-xs text-muted-foreground">({stage.deals.length})</span>
                </div>
                <span className="text-xs text-muted-foreground">R$ {total.toLocaleString('pt-BR')}k</span>
              </div>
              <div className="space-y-3">
                {stage.deals.map((deal, i) => (
                  <Card key={i} className="cursor-grab hover:shadow-md transition-shadow">
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium leading-tight">{deal.title}</p>
                        <Flame className={`w-4 h-4 flex-shrink-0 ${tempColors[deal.temp]}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5"><AvatarFallback className="text-[10px]">{deal.contact.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                        <span className="text-xs text-muted-foreground">{deal.contact}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{deal.value}</span>
                        <div className="flex gap-2">
                          {deal.tasks > 0 && <Badge variant="outline" className="text-xs">{deal.tasks} tarefas</Badge>}
                          {deal.days > 3 && <Badge variant="destructive" className="text-xs">{deal.days}d</Badge>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
