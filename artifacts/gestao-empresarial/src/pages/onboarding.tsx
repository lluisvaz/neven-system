import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, CheckCircle2, Circle, Clock } from "lucide-react";

const onboardings = [
  {
    client: "Tech Solutions Ltda", contact: "João Silva", responsible: "Rafael Mendes", plan: "Enterprise",
    startDate: "01/04/2026", targetDate: "30/04/2026", progress: 75, status: "Em andamento",
    steps: [
      { name: "Configuração inicial da conta", status: "done" },
      { name: "Importação de dados", status: "done" },
      { name: "Treinamento da equipe (módulo CRM)", status: "done" },
      { name: "Treinamento da equipe (módulo ERP)", status: "current" },
      { name: "Configuração de integrações", status: "pending" },
      { name: "Go-live e acompanhamento", status: "pending" },
    ],
  },
  {
    client: "LogiTech BR", contact: "Marcos Ferreira", responsible: "Rafael Mendes", plan: "Enterprise",
    startDate: "08/04/2026", targetDate: "15/05/2026", progress: 33, status: "Em andamento",
    steps: [
      { name: "Configuração inicial da conta", status: "done" },
      { name: "Importação de dados", status: "current" },
      { name: "Treinamento da equipe", status: "pending" },
      { name: "Configuração de automações", status: "pending" },
      { name: "Go-live", status: "pending" },
    ],
  },
  {
    client: "DataFlow Sistemas", contact: "Ricardo Almeida", responsible: "Maria Santos", plan: "Enterprise",
    startDate: "-", targetDate: "-", progress: 0, status: "Aguardando",
    steps: [
      { name: "Assinatura do contrato", status: "pending" },
      { name: "Configuração inicial", status: "pending" },
      { name: "Importação de dados", status: "pending" },
    ],
  },
];

const stepIcons = { done: CheckCircle2, current: Clock, pending: Circle };
const stepColors = { done: "text-emerald-500", current: "text-amber-500", pending: "text-muted-foreground" };

export function OnboardingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold tracking-tight">Onboarding de Clientes</h1><p className="text-muted-foreground mt-1">{onboardings.filter(o => o.status === "Em andamento").length} onboardings em andamento</p></div>
        <Button size="sm"><Plus className="w-4 h-4 mr-2" />Novo Onboarding</Button>
      </div>

      <div className="space-y-6">
        {onboardings.map((ob, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10"><AvatarFallback>{ob.contact.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                  <div>
                    <p className="font-bold">{ob.client}</p>
                    <p className="text-xs text-muted-foreground">{ob.contact} - Plano {ob.plan}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={ob.status === "Em andamento" ? "secondary" : "outline"}>{ob.status}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">CS: {ob.responsible}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Progress value={ob.progress} className="flex-1 h-2" />
                <span className="text-sm font-medium">{ob.progress}%</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span>Início: {ob.startDate}</span><span>Meta: {ob.targetDate}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {ob.steps.map((step, j) => {
                  const Icon = stepIcons[step.status as keyof typeof stepIcons];
                  return (
                    <div key={j} className={`p-2 rounded-lg border text-center ${step.status === "current" ? "border-amber-300 bg-amber-50/50" : ""}`}>
                      <Icon className={`w-4 h-4 mx-auto mb-1 ${stepColors[step.status as keyof typeof stepColors]}`} />
                      <p className="text-xs">{step.name}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
