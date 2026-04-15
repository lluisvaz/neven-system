import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal, CheckCircle2, PauseCircle, XCircle } from "lucide-react";

const subscriptions = [
  { client: "Tech Solutions Ltda", plan: "Enterprise", value: "R$ 12.000,00", frequency: "Mensal", nextBilling: "01/05/2026", status: "Ativa", method: "Cartão •••• 4242" },
  { client: "Nexus Digital", plan: "Pro", value: "R$ 5.200,00", frequency: "Mensal", nextBilling: "15/05/2026", status: "Ativa", method: "Cartão •••• 1234" },
  { client: "Criativa Design", plan: "Pro + API", value: "R$ 7.200,00", frequency: "Mensal", nextBilling: "01/05/2026", status: "Ativa", method: "PIX" },
  { client: "LogiTech BR", plan: "Enterprise", value: "R$ 9.600,00", frequency: "Mensal", nextBilling: "25/04/2026", status: "Ativa", method: "Boleto" },
  { client: "Saúde+ Clínicas", plan: "Pro", value: "R$ 5.200,00", frequency: "Mensal", nextBilling: "10/05/2026", status: "Ativa", method: "Cartão •••• 5678" },
  { client: "Verde Energia", plan: "Básico", value: "R$ 1.800,00", frequency: "Mensal", nextBilling: "-", status: "Pausada", method: "PIX" },
  { client: "DataFlow Sistemas", plan: "Enterprise", value: "R$ 12.000,00", frequency: "Mensal", nextBilling: "-", status: "Cancelada", method: "Cartão •••• 9999" },
  { client: "Agro Brasil", plan: "Pro", value: "R$ 5.200,00", frequency: "Mensal", nextBilling: "05/05/2026", status: "Ativa", method: "Boleto" },
];

const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", icon: any, colorClass: string }> = { 
  Ativa: { variant: "default", icon: CheckCircle2, colorClass: "text-emerald-500" }, 
  Pausada: { variant: "secondary", icon: PauseCircle, colorClass: "text-amber-500" }, 
  Cancelada: { variant: "outline", icon: XCircle, colorClass: "text-muted-foreground" } 
};

export function SubscriptionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Assinaturas</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">Gestão de receita recorrente</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 py-4 border-y border-border">
        <div className="flex flex-col space-y-1">
          <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">Ativas</span>
          <span className="text-2xl font-mono text-foreground">{subscriptions.filter(s => s.status === 'Ativa').length}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">MRR Total</span>
          <span className="text-2xl font-mono text-foreground">R$ 58.200</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">Ticket Médio</span>
          <span className="text-2xl font-mono text-foreground">R$ 7.275</span>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar cliente, plano..." className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" data-testid="input-search-subscriptions" />
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Cliente / Plano</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Valor</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Próx. Cobrança</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Pagamento</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Status</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((s, i) => (
              <TableRow key={i} className={`hover:bg-muted/30 transition-colors ${s.status === 'Cancelada' ? 'opacity-60' : ''}`}>
                <TableCell className="py-3">
                  <div className="font-medium text-sm">{s.client}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.plan} <span className="px-1">•</span> {s.frequency}</div>
                </TableCell>
                <TableCell className="py-3 text-right font-mono font-medium text-sm">{s.value}</TableCell>
                <TableCell className="py-3 font-mono text-sm text-muted-foreground">{s.nextBilling}</TableCell>
                <TableCell className="py-3 text-sm text-muted-foreground">{s.method}</TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-1.5">
                    {(() => {
                      const Icon = statusConfig[s.status].icon;
                      return <Icon className={`w-3.5 h-3.5 ${statusConfig[s.status].colorClass}`} />;
                    })()}
                    <span className="text-xs font-medium">{s.status}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-right">
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm"><MoreHorizontal className="w-4 h-4 text-muted-foreground" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
