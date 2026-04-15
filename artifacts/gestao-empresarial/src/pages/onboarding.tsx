import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Check, Clock, Circle, ArrowRight } from "lucide-react";

const onboardings = [
  {
    id: 1, client: "Tech Solutions Ltda", contact: "João Silva", responsible: "Rafael Mendes", plan: "Enterprise",
    startDate: "01/04/2026", targetDate: "30/04/2026", progress: 75, status: "Em andamento",
    steps: [
      { name: "Configuração inicial da conta", status: "done" },
      { name: "Importação de dados", status: "done" },
      { name: "Treinamento (CRM)", status: "done" },
      { name: "Treinamento (ERP)", status: "current" },
      { name: "Integrações", status: "pending" },
      { name: "Go-live", status: "pending" },
    ],
  },
  {
    id: 2, client: "LogiTech BR", contact: "Marcos Ferreira", responsible: "Rafael Mendes", plan: "Enterprise",
    startDate: "08/04/2026", targetDate: "15/05/2026", progress: 33, status: "Em andamento",
    steps: [
      { name: "Configuração inicial", status: "done" },
      { name: "Importação de dados", status: "current" },
      { name: "Treinamento da equipe", status: "pending" },
      { name: "Automações", status: "pending" },
      { name: "Go-live", status: "pending" },
    ],
  },
  {
    id: 3, client: "DataFlow Sistemas", contact: "Ricardo Almeida", responsible: "Maria Santos", plan: "Pro",
    startDate: "Aguardando", targetDate: "-", progress: 0, status: "Aguardando",
    steps: [
      { name: "Assinatura do contrato", status: "current" },
      { name: "Configuração inicial", status: "pending" },
      { name: "Importação de dados", status: "pending" },
    ],
  },
];

const stepIcons = { done: Check, current: Clock, pending: Circle };
const stepColors = { 
  done: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/50", 
  current: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800/50 ring-1 ring-amber-400 dark:ring-amber-500", 
  pending: "bg-muted/30 text-muted-foreground border-border opacity-50" 
};

export function OnboardingPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Onboarding</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">{onboardings.filter(o => o.status === "Em andamento").length} implantações ativas</p>
        </div>
        <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Nova Implantação</Button>
      </div>

      <div className="space-y-6">
        {onboardings.map((ob) => (
          <div key={ob.id} className="border border-border rounded-sm bg-card overflow-hidden">
            <div className="p-5 border-b border-border bg-muted/10 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 rounded-sm border border-border">
                  <AvatarFallback className="text-sm font-mono bg-background text-foreground rounded-sm">
                    {ob.contact.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold tracking-tight">{ob.client}</h2>
                    <Badge variant={ob.status === "Em andamento" ? "secondary" : "outline"} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                      {ob.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{ob.contact} • Plano {ob.plan}</p>
                </div>
              </div>
              
              <div className="text-right space-y-1">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">CS Responsável</p>
                <p className="text-sm font-medium">{ob.responsible}</p>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
                    <span>Progresso Total</span>
                    <span className={ob.progress > 0 ? "text-foreground" : ""}>{ob.progress}%</span>
                  </div>
                  <Progress value={ob.progress} className="h-1.5" />
                </div>
                <div className="w-px h-8 bg-border hidden md:block"></div>
                <div className="hidden md:flex flex-col gap-1 w-32">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Início</span>
                  <span className="text-sm font-mono">{ob.startDate}</span>
                </div>
                <div className="hidden md:flex flex-col gap-1 w-32">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Meta (Go-Live)</span>
                  <span className="text-sm font-mono">{ob.targetDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 md:grid md:grid-cols-6 md:gap-3">
                {ob.steps.map((step, j) => {
                  const Icon = stepIcons[step.status as keyof typeof stepIcons];
                  const isCurrent = step.status === "current";
                  
                  return (
                    <div key={j} className={`p-3 rounded-sm border flex flex-col justify-between min-h-[90px] ${stepColors[step.status as keyof typeof stepColors]}`}>
                      <div className="flex justify-between items-start">
                        <Icon className={`w-4 h-4 ${isCurrent ? 'animate-pulse' : ''}`} />
                        <span className="text-[10px] font-mono opacity-50">{j+1}/{ob.steps.length}</span>
                      </div>
                      <p className={`text-xs font-medium leading-tight mt-2 ${step.status === 'pending' ? 'opacity-80' : ''}`}>
                        {step.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {ob.status === "Em andamento" && (
              <div className="px-5 py-3 border-t border-border bg-muted/30 flex justify-end">
                <Button variant="ghost" size="sm" className="rounded-sm text-xs h-8 text-accent hover:text-accent">
                  Detalhes do Projeto <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
