import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ArrowUpRight } from "lucide-react";

const currentPlan = {
  name: "Enterprise", value: "R$ 12.000,00/mês", addons: ["Módulo Analytics - R$ 3.500,00/mês"],
  total: "R$ 15.500,00/mês", contractStart: "01/01/2026", contractEnd: "31/12/2026", billing: "Mensal", method: "PIX",
  features: ["Usuários ilimitados", "CRM completo", "ERP financeiro", "Automações avançadas", "API completa", "Suporte prioritário", "SLA 4h", "Gerente de conta dedicado"],
};

const availablePlans = [
  { name: "Básico", value: "R$ 1.800,00/mês", features: ["Até 5 usuários", "CRM básico", "Cobranças", "Suporte por e-mail"], current: false },
  { name: "Pro", value: "R$ 5.200,00/mês", features: ["Até 15 usuários", "CRM completo", "ERP financeiro", "Automações básicas", "API limitada", "Suporte prioritário"], current: false },
  { name: "Enterprise", value: "R$ 12.000,00/mês", features: currentPlan.features, current: true },
];

export function PortalPlansPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight">Meus Planos e Contratos</h1><p className="text-muted-foreground mt-1">Gerencie sua assinatura e addons</p></div>

      <Card className="border-primary">
        <CardHeader><CardTitle className="flex items-center justify-between"><span>Plano Atual</span><Badge variant="default">Ativo</Badge></CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><p className="text-muted-foreground">Plano</p><p className="font-bold text-lg">{currentPlan.name}</p></div>
            <div><p className="text-muted-foreground">Valor Base</p><p className="font-medium">{currentPlan.value}</p></div>
            <div><p className="text-muted-foreground">Total Mensal</p><p className="font-bold text-lg">{currentPlan.total}</p></div>
            <div><p className="text-muted-foreground">Cobrança</p><p className="font-medium">{currentPlan.billing} via {currentPlan.method}</p></div>
          </div>
          <Separator />
          <div><p className="text-sm text-muted-foreground mb-2">Addons ativos:</p>{currentPlan.addons.map((a, i) => <Badge key={i} variant="outline" className="mr-2">{a}</Badge>)}</div>
          <div className="text-xs text-muted-foreground">Contrato: {currentPlan.contractStart} a {currentPlan.contractEnd}</div>
          <div className="flex gap-2"><Button variant="outline" size="sm">Cancelar Assinatura</Button></div>
        </CardContent>
      </Card>

      <h2 className="text-lg font-semibold mt-8">Comparar Planos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {availablePlans.map((plan, i) => (
          <Card key={i} className={plan.current ? "border-primary" : ""}>
            <CardContent className="pt-6 space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="text-2xl font-bold mt-2">{plan.value}</p>
              </div>
              <Separator />
              <ul className="space-y-2">{plan.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />{f}</li>)}</ul>
              <Button className="w-full" variant={plan.current ? "outline" : "default"} disabled={plan.current}>{plan.current ? "Plano Atual" : "Fazer Upgrade"}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
