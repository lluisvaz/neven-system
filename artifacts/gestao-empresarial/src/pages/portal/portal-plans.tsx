import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const currentPlan = {
  name: "Enterprise", value: "R$ 12.000,00", period: "/mês", addons: [{ name: "Módulo Analytics", price: "R$ 3.500,00" }],
  total: "R$ 15.500,00", contractStart: "01/01/2026", contractEnd: "31/12/2026", billing: "Mensal", method: "PIX",
  features: ["Usuários ilimitados", "CRM completo", "ERP financeiro", "Automações avançadas", "API completa", "Suporte prioritário", "SLA 4h", "Gerente de conta dedicado"],
};

const availablePlans = [
  { name: "Básico", value: "R$ 1.800,00", period: "/mês", features: ["Até 5 usuários", "CRM básico", "Cobranças", "Suporte por e-mail"], current: false, recommended: false },
  { name: "Pro", value: "R$ 5.200,00", period: "/mês", features: ["Até 15 usuários", "CRM completo", "ERP financeiro", "Automações básicas", "API limitada", "Suporte prioritário"], current: false, recommended: false },
  { name: "Enterprise", value: "R$ 12.000,00", period: "/mês", features: ["Usuários ilimitados", "CRM completo", "ERP financeiro", "Automações avançadas", "API completa", "Suporte prioritário", "SLA 4h", "Gerente de conta"], current: true, recommended: true },
];

export function PortalPlansPage() {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Meu Plano</h1>
        <p className="text-sm font-mono text-muted-foreground mt-1">Gerencie sua assinatura e complementos</p>
      </div>

      <div className="border border-border rounded-sm overflow-hidden bg-card">
        <div className="bg-muted/30 p-6 border-b border-border flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">{currentPlan.name}</h2>
              <Badge variant="default" className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">Ativo</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Contrato vigente de {currentPlan.contractStart} a {currentPlan.contractEnd}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Total Mensal</p>
            <div className="flex items-baseline gap-1 mt-1 justify-end">
              <span className="text-2xl font-mono font-bold tracking-tight">{currentPlan.total}</span>
              <span className="text-sm text-muted-foreground font-mono">{currentPlan.period}</span>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Composição da Assinatura</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Plano {currentPlan.name}</span>
                <span className="font-mono">{currentPlan.value}</span>
              </div>
              {currentPlan.addons.map((addon, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                    {addon.name}
                  </span>
                  <span className="font-mono text-muted-foreground">{addon.price}</span>
                </div>
              ))}
              <div className="pt-3 mt-3 border-t border-border flex justify-between items-center">
                <Button variant="link" size="sm" className="h-auto p-0 text-xs text-accent">Adicionar Módulos</Button>
                <div className="text-xs text-muted-foreground">Faturamento {currentPlan.billing} via {currentPlan.method}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">O que está incluso</h3>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
              {currentPlan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">Comparativo de Planos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availablePlans.map((plan, i) => (
            <div key={i} className={`flex flex-col border rounded-sm bg-card overflow-hidden transition-all ${plan.current ? 'border-accent ring-1 ring-accent' : 'border-border'}`}>
              {plan.recommended && (
                <div className="bg-accent text-accent-foreground text-[10px] uppercase tracking-wider font-bold text-center py-1">
                  Recomendado
                </div>
              )}
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-2xl font-mono font-bold tracking-tight">{plan.value}</span>
                    <span className="text-sm text-muted-foreground font-mono">{plan.period}</span>
                  </div>
                </div>
                
                <div className="h-px w-full bg-border my-4" />
                
                <ul className="space-y-3 flex-1 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.current ? "secondary" : "outline"} 
                  className={`w-full rounded-sm ${plan.current ? 'cursor-default pointer-events-none' : ''}`}
                >
                  {plan.current ? "Seu Plano Atual" : "Fazer Upgrade"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
