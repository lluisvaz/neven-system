import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, HelpCircle, FileText, TrendingUp, Download, Eye, Activity } from "lucide-react";
import { Link } from "wouter";

const client = {
  name: "João",
  country: "🇧🇷",
  locale: "pt-BR",
  currency: "BRL",
  currencySymbol: "R$",
  plan: "Enterprise",
  nextBilling: "01/05/2026",
  monthlyValue: "R$ 15,5k",
  openTickets: 1,
};

const recentInvoices = [
  { id: "FAT-0041", date: "01/04/2026", value: "R$ 15.500,00", status: "A Vencer" },
  { id: "FAT-0038", date: "01/03/2026", value: "R$ 15.500,00", status: "Pago" },
  { id: "FAT-0035", date: "01/02/2026", value: "R$ 15.500,00", status: "Pago" },
];

const recentDocuments = [
  { name: "Contrato Anual 2026.pdf", date: "01/01/2026", type: "Contrato" },
  { name: "NF Março-2026.pdf", date: "01/03/2026", type: "Nota Fiscal" },
  { name: "Termos de Uso Revisados.pdf", date: "15/02/2026", type: "Legal" },
];

const activeTickets = [
  { id: "TKT-1042", title: "Dúvida sobre integração da API de pagamentos", status: "Em andamento", updated: "Hoje às 10:30" },
];

export function PortalDashboardPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Visão Geral</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Bem-vindo(a) ao portal do cliente, {client.name}.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground bg-muted/40 border border-border rounded-sm px-2.5 py-1.5">
          <span>{client.country}</span>
          <span className="text-border">·</span>
          <span>{client.currency}</span>
          <span className="text-border">·</span>
          <span>{client.locale}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4 border-y border-border">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center text-muted-foreground gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-medium">Plano Atual</span>
          </div>
          <span className="text-2xl font-mono text-foreground">{client.plan}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center text-muted-foreground gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-medium">Próx. Cobrança</span>
          </div>
          <span className="text-2xl font-mono text-foreground">{client.nextBilling}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center text-muted-foreground gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-medium">Valor Mensal</span>
          </div>
          <span className="text-2xl font-mono text-foreground">{client.monthlyValue}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center text-muted-foreground gap-2">
            <HelpCircle className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-medium">Chamados Abertos</span>
          </div>
          <span className="text-2xl font-mono text-foreground">{client.openTickets}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Últimas Faturas</h2>
            <Link href="/portal/invoices">
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">Ver histórico</Button>
            </Link>
          </div>
          <div className="border border-border rounded-sm overflow-hidden bg-card">
            {recentInvoices.map((inv, i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <div>
                  <p className="text-sm font-medium font-mono">{inv.id}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">{inv.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono font-medium">{inv.value}</p>
                  <Badge
                    variant={inv.status === "Pago" ? "default" : "secondary"}
                    className="mt-1 rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5"
                  >
                    {inv.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider font-medium text-muted-foreground">Atividades Recentes</h2>

          {activeTickets.length > 0 && (
            <div className="border border-border rounded-sm overflow-hidden bg-card p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 rounded-sm bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Chamado em Andamento</span>
                    <span className="text-xs font-mono text-muted-foreground">{activeTickets[0].updated}</span>
                  </div>
                  <p className="text-sm font-medium mt-1">{activeTickets[0].title}</p>
                  <Link href="/portal/tickets">
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs mt-2 text-accent">Acompanhar</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="border border-border rounded-sm overflow-hidden bg-card">
            {recentDocuments.map((doc, i) => (
              <div key={i} className="flex items-center gap-3 p-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
                <div className="p-2 rounded-sm bg-muted flex-shrink-0">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{doc.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{doc.type}</span>
                    <span className="text-[10px] text-muted-foreground">·</span>
                    <span className="text-xs font-mono text-muted-foreground">{doc.date}</span>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm"><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm"><Download className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right">
            <Link href="/portal/documents">
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">Ver todos os documentos</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
