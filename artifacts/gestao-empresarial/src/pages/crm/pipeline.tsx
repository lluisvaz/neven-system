import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, GripVertical } from "lucide-react";

const stages = [
  { name: "Prospecção", color: "bg-chart-5", deals: [
    { title: "CRM para LogiTech", company: "LogiTech BR", value: "R$ 4.500/mês", days: 3, priority: "normal" },
    { title: "ERP Verde Energia", company: "Verde Energia", value: "R$ 8.200/mês", days: 7, priority: "baixa" },
  ]},
  { name: "Qualificação", color: "bg-chart-4", deals: [
    { title: "Plataforma Saúde+", company: "Saúde+ Clínicas", value: "R$ 12.000/mês", days: 2, priority: "alta" },
  ]},
  { name: "Proposta", color: "bg-chart-3", deals: [
    { title: "Upgrade Tech Solutions", company: "Tech Solutions Ltda", value: "R$ 15.000/mês", days: 1, priority: "alta" },
    { title: "Módulo Financeiro Nexus", company: "Nexus Digital", value: "R$ 6.800/mês", days: 5, priority: "normal" },
  ]},
  { name: "Negociação", color: "bg-chart-2", deals: [
    { title: "Contrato Anual DataFlow", company: "DataFlow Sistemas", value: "R$ 9.600/mês", days: 0, priority: "alta" },
  ]},
  { name: "Fechamento", color: "bg-chart-1", deals: [
    { title: "Renovação Criativa", company: "Criativa Design", value: "R$ 5.200/mês", days: 0, priority: "normal" },
  ]},
];

const priorityColors: Record<string, string> = { baixa: "text-muted-foreground", normal: "text-foreground", alta: "text-accent font-medium" };

export function PipelinePage() {
  return (
    <div className="space-y-8 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pipeline</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">Oportunidades ativas</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="b2b">
            <SelectTrigger className="w-40 rounded-sm border-muted-foreground/20 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="b2b" className="text-xs">Vendas B2B</SelectItem>
              <SelectItem value="b2c" className="text-xs">Vendas B2C</SelectItem>
              <SelectItem value="renovacao" className="text-xs">Renovações</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Nova Deal</Button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 flex-1 items-start">
        {stages.map(stage => {
          const total = stage.deals.reduce((s, d) => s + parseFloat(d.value.replace(/[^\d]/g, '')) / 100, 0);
          return (
            <div key={stage.name} className="w-[300px] flex-shrink-0 flex flex-col max-h-full">
              <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-sm ${stage.color}`} />
                  <h3 className="text-xs font-medium uppercase tracking-wider">{stage.name}</h3>
                  <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 rounded-sm">{stage.deals.length}</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">R$ {total.toLocaleString('pt-BR')}k</span>
              </div>
              <div className="space-y-3 overflow-y-auto no-scrollbar flex-1 pr-1">
                {stage.deals.map((deal, i) => (
                  <div key={i} className="group bg-card border border-border rounded-sm p-4 cursor-grab hover:border-muted-foreground/30 transition-colors">
                    <div className="flex items-start gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground/30 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex-1 space-y-3">
                        <div>
                          <p className={`text-sm leading-tight ${priorityColors[deal.priority]}`}>{deal.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{deal.company}</p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border/50">
                          <span className="text-xs font-mono font-medium">{deal.value}</span>
                          {deal.days > 0 && (
                            <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">
                              {deal.days}d idle
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
