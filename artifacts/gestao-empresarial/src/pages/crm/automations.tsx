import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Zap, Mail, MessageSquare, CheckSquare, ArrowRight } from "lucide-react";

const automations = [
  { name: "Boas-vindas ao novo cliente", trigger: "Contato criado com status 'Cliente Ativo'", actions: ["Enviar e-mail de boas-vindas", "Criar tarefa de onboarding para CS"], active: true, runs: 142 },
  { name: "Lembrete de cobrança D-5", trigger: "Cobrança com vencimento em 5 dias", actions: ["Enviar WhatsApp com link de pagamento"], active: true, runs: 328 },
  { name: "Alerta de oportunidade parada", trigger: "Oportunidade sem atividade há 7 dias", actions: ["Notificar responsável", "Criar tarefa de follow-up"], active: true, runs: 56 },
  { name: "Follow-up pós-proposta", trigger: "Oportunidade entra em etapa 'Proposta'", actions: ["Esperar 3 dias", "Enviar e-mail de follow-up", "Criar tarefa para vendedor"], active: false, runs: 89 },
  { name: "Aniversário do cliente", trigger: "Data de aniversário (0 dias antes)", actions: ["Enviar WhatsApp de felicitação"], active: true, runs: 24 },
  { name: "Score baixo - Resgate", trigger: "Score de engajamento abaixo de 30", actions: ["Criar tarefa de resgate para CS", "Alterar status para 'Em risco'"], active: true, runs: 17 },
];

const actionIcons: Record<string, typeof Mail> = {
  "Enviar e-mail": Mail, "Enviar WhatsApp": MessageSquare, "Criar tarefa": CheckSquare, "Notificar": Zap, "Esperar": Zap, "Alterar": Zap,
};

function getActionIcon(action: string) {
  for (const [key, Icon] of Object.entries(actionIcons)) {
    if (action.startsWith(key)) return Icon;
  }
  return Zap;
}

export function AutomationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automações</h1>
          <p className="text-muted-foreground mt-1">{automations.filter(a => a.active).length} automações ativas</p>
        </div>
        <Button size="sm"><Plus className="w-4 h-4 mr-2" />Nova Automação</Button>
      </div>

      <div className="space-y-4">
        {automations.map((auto, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted"><Zap className="w-4 h-4 text-muted-foreground" /></div>
                  <div>
                    <p className="font-medium">{auto.name}</p>
                    <p className="text-xs text-muted-foreground">{auto.runs} execuções</p>
                  </div>
                </div>
                <Switch checked={auto.active} data-testid={`switch-automation-${i}`} />
              </div>
              <div className="flex items-center gap-2 flex-wrap text-sm">
                <Badge variant="outline" className="text-xs">Gatilho: {auto.trigger}</Badge>
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
                {auto.actions.map((action, j) => {
                  const Icon = getActionIcon(action);
                  return (
                    <Badge key={j} variant="secondary" className="text-xs flex items-center gap-1">
                      <Icon className="w-3 h-3" />{action}
                    </Badge>
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
