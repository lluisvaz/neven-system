import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Zap, Mail, MessageSquare, CheckSquare, ArrowRight, Filter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const automations = [
  { id: 1, name: "Boas-vindas ao novo cliente", trigger: "Contato criado com status 'Cliente Ativo'", actions: ["Enviar e-mail de boas-vindas", "Criar tarefa de onboarding para CS"], active: true, runs: 142, lastRun: "Há 2 horas" },
  { id: 2, name: "Lembrete de cobrança D-5", trigger: "Cobrança com vencimento em 5 dias", actions: ["Enviar WhatsApp com link de pagamento"], active: true, runs: 328, lastRun: "Há 1 dia" },
  { id: 3, name: "Alerta de oportunidade parada", trigger: "Oportunidade sem atividade há 7 dias", actions: ["Notificar responsável", "Criar tarefa de follow-up"], active: true, runs: 56, lastRun: "Há 3 horas" },
  { id: 4, name: "Follow-up pós-proposta", trigger: "Oportunidade entra em etapa 'Proposta'", actions: ["Esperar 3 dias", "Enviar e-mail de follow-up"], active: false, runs: 89, lastRun: "Há 5 dias" },
  { id: 5, name: "Aniversário do cliente", trigger: "Data de aniversário (0 dias antes)", actions: ["Enviar WhatsApp de felicitação"], active: true, runs: 24, lastRun: "Hoje" },
  { id: 6, name: "Score baixo - Resgate", trigger: "Score de engajamento abaixo de 30", actions: ["Criar tarefa de resgate para CS", "Alterar status para 'Em risco'"], active: true, runs: 17, lastRun: "Ontem" },
  { id: 7, name: "Cobrança vencida D+1", trigger: "Fatura 1 dia após o vencimento", actions: ["Enviar e-mail de aviso", "Alterar status financeiro"], active: true, runs: 45, lastRun: "Há 4 horas" },
  { id: 8, name: "Renovação de contrato D-30", trigger: "Contrato vence em 30 dias", actions: ["Criar tarefa de renovação", "Enviar e-mail de pesquisa"], active: false, runs: 12, lastRun: "Há 15 dias" },
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Automações</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">{automations.filter(a => a.active).length} ativas de {automations.length} totais</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Nova Automação</Button>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar automação..." className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" data-testid="input-search-automations" />
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-[50px]"></TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Nome</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Gatilho & Ações</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Execuções</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Última</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {automations.map((auto) => (
              <TableRow key={auto.id} className={`hover:bg-muted/30 transition-colors ${!auto.active ? "opacity-60" : ""}`}>
                <TableCell className="py-3">
                  <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center">
                    <Zap className={`w-4 h-4 ${auto.active ? 'text-accent' : 'text-muted-foreground'}`} />
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <div className="font-medium text-sm">{auto.name}</div>
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">SE</span>
                      <span className="text-sm font-medium">{auto.trigger}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">FAÇA</span>
                      {auto.actions.map((action, j) => {
                        const Icon = getActionIcon(action);
                        return (
                          <div key={j} className="flex items-center gap-1 bg-muted/50 rounded px-2 py-0.5 text-xs text-muted-foreground border border-border">
                            <Icon className="w-3 h-3" />
                            <span>{action}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-right font-mono text-sm">
                  {auto.runs.toLocaleString('pt-BR')}
                </TableCell>
                <TableCell className="py-3 text-right text-sm text-muted-foreground">
                  {auto.lastRun}
                </TableCell>
                <TableCell className="py-3 text-center">
                  <div className="flex justify-center">
                    <Switch checked={auto.active} data-testid={`switch-automation-${auto.id}`} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
