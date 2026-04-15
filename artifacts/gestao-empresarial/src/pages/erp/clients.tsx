import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search, Plus, ChevronRight, TrendingUp, AlertCircle, CheckCircle2,
  Clock, Circle, FileText, CreditCard, Package, Users, ExternalLink,
  MoreHorizontal, Check, X, Send, Eye, PauseCircle, XCircle, ArrowUpRight,
  Building2, Mail, Phone, Calendar, Zap, Shield, Lock, Globe
} from "lucide-react";

const clients = [
  {
    id: 1,
    name: "Tech Solutions Ltda",
    contact: "João Silva",
    email: "joao@techsolutions.com.br",
    phone: "(11) 98765-4321",
    segment: "Tecnologia",
    plan: "Enterprise",
    status: "Ativo",
    mrr: 12000,
    aReceber: 12000,
    inadimplente: false,
    contractEnd: "31/12/2026",
    contractStatus: "Ativo",
    onboardingProgress: 75,
    onboardingStatus: "Em andamento",
    portalEnabled: true,
    proposalStatus: "Aceita",
    subscriptionStatus: "Ativa",
    nextBilling: "01/05/2026",
    paymentMethod: "Cartão •••• 4242",
    products: [
      { name: "GestorPro Enterprise", sku: "ENT-001", type: "Assinatura", price: 9600, unit: "mês", active: true },
      { name: "Módulo Analytics", sku: "ANA-010", type: "Assinatura", price: 2400, unit: "mês", active: true },
    ],
    invoices: [
      { id: "NF-2026-041", desc: "Enterprise + Analytics", value: 12000, due: "01/04/2026", status: "Paga" },
      { id: "NF-2026-030", desc: "Enterprise + Analytics", value: 12000, due: "01/03/2026", status: "Paga" },
      { id: "NF-2026-050", desc: "Enterprise + Analytics", value: 12000, due: "01/05/2026", status: "Pendente" },
    ],
    onboardingSteps: [
      { name: "Configuração inicial da conta", status: "done" },
      { name: "Importação de dados", status: "done" },
      { name: "Treinamento (CRM)", status: "done" },
      { name: "Treinamento (ERP)", status: "current" },
      { name: "Integrações", status: "pending" },
      { name: "Go-live", status: "pending" },
    ],
    proposals: [
      { id: "PROP-042", name: "Renovação Anual Enterprise", value: 144000, expiry: "30/04/2026", status: "Aceita", views: 3 },
    ],
    portalAccess: { enabled: true, lastLogin: "14/04/2026", modules: { invoices: true, plans: true, tickets: true, documents: true } },
    responsible: "Rafael Mendes",
    contractId: "CTR-26-001",
  },
  {
    id: 2,
    name: "Nexus Digital",
    contact: "Ana Lima",
    email: "ana@nexusdigital.com.br",
    phone: "(21) 97654-3210",
    segment: "Marketing",
    plan: "Pro",
    status: "Ativo",
    mrr: 5200,
    aReceber: 5200,
    inadimplente: false,
    contractEnd: "14/02/2027",
    contractStatus: "Ativo",
    onboardingProgress: 100,
    onboardingStatus: "Concluído",
    portalEnabled: true,
    proposalStatus: "Aceita",
    subscriptionStatus: "Ativa",
    nextBilling: "15/05/2026",
    paymentMethod: "Cartão •••• 1234",
    products: [
      { name: "GestorPro Pro", sku: "PRO-001", type: "Assinatura", price: 5200, unit: "mês", active: true },
    ],
    invoices: [
      { id: "NF-2026-038", desc: "Plano Pro", value: 5200, due: "15/04/2026", status: "Paga" },
      { id: "NF-2026-027", desc: "Plano Pro", value: 5200, due: "15/03/2026", status: "Paga" },
      { id: "NF-2026-049", desc: "Plano Pro", value: 5200, due: "15/05/2026", status: "Pendente" },
    ],
    onboardingSteps: [
      { name: "Configuração inicial", status: "done" },
      { name: "Importação de dados", status: "done" },
      { name: "Treinamento da equipe", status: "done" },
      { name: "Go-live", status: "done" },
    ],
    proposals: [
      { id: "PROP-038", name: "Upgrade para Enterprise", value: 144000, expiry: "01/05/2026", status: "Enviada", views: 5 },
    ],
    portalAccess: { enabled: true, lastLogin: "12/04/2026", modules: { invoices: true, plans: true, tickets: false, documents: true } },
    responsible: "Maria Santos",
    contractId: "CTR-26-008",
  },
  {
    id: 3,
    name: "Innovare Consultoria",
    contact: "Carlos Souza",
    email: "carlos@innovare.com.br",
    phone: "(31) 96543-2109",
    segment: "Consultoria",
    plan: "Pro",
    status: "Atenção",
    mrr: 2100,
    aReceber: 6300,
    inadimplente: true,
    contractEnd: "30/04/2026",
    contractStatus: "Vencendo",
    onboardingProgress: 100,
    onboardingStatus: "Concluído",
    portalEnabled: false,
    proposalStatus: "Em negociação",
    subscriptionStatus: "Ativa",
    nextBilling: "30/04/2026",
    paymentMethod: "Boleto",
    products: [
      { name: "Consultoria Técnica", sku: "SVC-007", type: "Serviço", price: 2100, unit: "mês", active: true },
    ],
    invoices: [
      { id: "NF-2026-021", desc: "Consultoria Técnica", value: 2100, due: "01/02/2026", status: "Vencida" },
      { id: "NF-2026-031", desc: "Consultoria Técnica", value: 2100, due: "01/03/2026", status: "Vencida" },
      { id: "NF-2026-041", desc: "Consultoria Técnica", value: 2100, due: "01/04/2026", status: "Vencida" },
    ],
    onboardingSteps: [
      { name: "Configuração inicial", status: "done" },
      { name: "Treinamento", status: "done" },
      { name: "Go-live", status: "done" },
    ],
    proposals: [
      { id: "PROP-041", name: "Renovação Contrato + Upgrade", value: 36000, expiry: "28/04/2026", status: "Em negociação", views: 8 },
    ],
    portalAccess: { enabled: false, lastLogin: "-", modules: { invoices: false, plans: false, tickets: false, documents: false } },
    responsible: "Rafael Mendes",
    contractId: "CTR-25-042",
  },
  {
    id: 4,
    name: "Criativa Design",
    contact: "Fernanda Costa",
    email: "fernanda@criativadesign.com.br",
    phone: "(11) 95432-1098",
    segment: "Design",
    plan: "Pro + API",
    status: "Ativo",
    mrr: 7200,
    aReceber: 7200,
    inadimplente: false,
    contractEnd: "28/02/2027",
    contractStatus: "Ativo",
    onboardingProgress: 100,
    onboardingStatus: "Concluído",
    portalEnabled: true,
    proposalStatus: "Aceita",
    subscriptionStatus: "Ativa",
    nextBilling: "01/05/2026",
    paymentMethod: "PIX",
    products: [
      { name: "GestorPro Pro", sku: "PRO-001", type: "Assinatura", price: 5200, unit: "mês", active: true },
      { name: "API Access", sku: "API-002", type: "Assinatura", price: 2000, unit: "mês", active: true },
    ],
    invoices: [
      { id: "NF-2026-039", desc: "Pro + API", value: 7200, due: "01/04/2026", status: "Paga" },
      { id: "NF-2026-050", desc: "Pro + API", value: 7200, due: "01/05/2026", status: "Pendente" },
    ],
    onboardingSteps: [
      { name: "Configuração inicial", status: "done" },
      { name: "Configuração de API", status: "done" },
      { name: "Treinamento", status: "done" },
      { name: "Go-live", status: "done" },
    ],
    proposals: [],
    portalAccess: { enabled: true, lastLogin: "10/04/2026", modules: { invoices: true, plans: true, tickets: true, documents: false } },
    responsible: "Maria Santos",
    contractId: "CTR-26-012",
  },
  {
    id: 5,
    name: "DataFlow Sistemas",
    contact: "Ricardo Almeida",
    email: "ricardo@dataflow.com.br",
    phone: "(41) 94321-0987",
    segment: "Tecnologia",
    plan: "Enterprise",
    status: "Pendente",
    mrr: 12000,
    aReceber: 0,
    inadimplente: false,
    contractEnd: "31/03/2027",
    contractStatus: "Rascunho",
    onboardingProgress: 0,
    onboardingStatus: "Aguardando",
    portalEnabled: false,
    proposalStatus: "Enviada",
    subscriptionStatus: "Cancelada",
    nextBilling: "-",
    paymentMethod: "-",
    products: [
      { name: "GestorPro Enterprise", sku: "ENT-001", type: "Assinatura", price: 12000, unit: "mês", active: false },
    ],
    invoices: [],
    onboardingSteps: [
      { name: "Assinatura do contrato", status: "current" },
      { name: "Configuração inicial", status: "pending" },
      { name: "Importação de dados", status: "pending" },
    ],
    proposals: [
      { id: "PROP-043", name: "Proposta Enterprise Anual", value: 144000, expiry: "20/04/2026", status: "Enviada", views: 2 },
    ],
    portalAccess: { enabled: false, lastLogin: "-", modules: { invoices: false, plans: false, tickets: false, documents: false } },
    responsible: "Maria Santos",
    contractId: "CTR-26-015",
  },
];

type Client = typeof clients[0];

const statusConfig: Record<string, { color: string; badge: "default" | "secondary" | "destructive" | "outline" }> = {
  Ativo: { color: "text-emerald-500", badge: "default" },
  Atenção: { color: "text-amber-500", badge: "destructive" },
  Pendente: { color: "text-muted-foreground", badge: "outline" },
};

const stepIcons = { done: Check, current: Clock, pending: Circle };
const stepColors = {
  done: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/50",
  current: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800/50 ring-1 ring-amber-400",
  pending: "bg-muted/30 text-muted-foreground border-border opacity-50",
};

const proposalStatusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline" }> = {
  Aceita: { variant: "default" },
  Enviada: { variant: "secondary" },
  "Em negociação": { variant: "outline" },
  Recusada: { variant: "destructive" },
};

const invoiceStatusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; color: string }> = {
  Paga: { variant: "default", color: "text-emerald-500" },
  Pendente: { variant: "secondary", color: "text-amber-500" },
  Vencida: { variant: "destructive", color: "text-red-500" },
};

const tabs = ["Visão Geral", "Assinatura & Cobrança", "Produtos", "Contrato", "Propostas", "Onboarding", "Portal"];

function fmt(v: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
}

function OverviewTab({ client }: { client: Client }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "MRR", value: fmt(client.mrr), sub: client.subscriptionStatus, alert: false },
          { label: "A Receber", value: fmt(client.aReceber), sub: client.inadimplente ? "⚠ Inadimplente" : "Em dia", alert: client.inadimplente },
          { label: "Contrato", value: client.contractStatus, sub: `até ${client.contractEnd}`, alert: client.contractStatus === "Vencendo" },
          { label: "Onboarding", value: `${client.onboardingProgress}%`, sub: client.onboardingStatus, alert: false },
        ].map((item) => (
          <div key={item.label} className={`p-4 border rounded-sm space-y-1 ${item.alert ? "border-destructive/40 bg-destructive/5" : "border-border bg-card"}`}>
            <p className="text-[10px] uppercase tracking-widest font-medium text-muted-foreground">{item.label}</p>
            <p className={`text-xl font-mono font-semibold ${item.alert ? "text-destructive" : "text-foreground"}`}>{item.value}</p>
            <p className={`text-xs ${item.alert ? "text-destructive/80" : "text-muted-foreground"}`}>{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-border rounded-sm p-4 space-y-3">
          <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground">Dados do Cliente</p>
          {[
            { icon: Building2, label: client.segment },
            { icon: Mail, label: client.email },
            { icon: Phone, label: client.phone },
            { icon: Users, label: `CS: ${client.responsible}` },
            { icon: FileText, label: `Contrato ${client.contractId}` },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="border border-border rounded-sm p-4 space-y-3">
          <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground">Status Resumido</p>
          {[
            { label: "Assinatura", value: client.subscriptionStatus, ok: client.subscriptionStatus === "Ativa" },
            { label: "Cobrança", value: client.nextBilling === "-" ? "Sem próx. cobrança" : `Próx. ${client.nextBilling}`, ok: !client.inadimplente },
            { label: "Portal do Cliente", value: client.portalEnabled ? "Habilitado" : "Desabilitado", ok: client.portalEnabled },
            { label: "Proposta", value: client.proposalStatus, ok: client.proposalStatus === "Aceita" },
            { label: "Onboarding", value: client.onboardingStatus, ok: client.onboardingStatus === "Concluído" },
          ].map(({ label, value, ok }) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{label}</span>
              <div className="flex items-center gap-1.5">
                {ok
                  ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  : <AlertCircle className="w-3.5 h-3.5 text-amber-500" />}
                <span className={`font-medium text-xs ${ok ? "text-foreground" : "text-amber-600 dark:text-amber-400"}`}>{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {client.inadimplente && (
        <div className="flex items-center gap-3 p-3 border border-destructive/30 bg-destructive/5 rounded-sm text-sm text-destructive">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>Atenção:</strong> Cliente com {client.invoices.filter(i => i.status === "Vencida").length} fatura(s) vencida(s) totalizando {fmt(client.aReceber)}. Ação necessária.
          </span>
        </div>
      )}
    </div>
  );
}

function BillingTab({ client }: { client: Client }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-medium text-muted-foreground mb-1">MRR</p>
          <p className="text-xl font-mono">{fmt(client.mrr)}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-medium text-muted-foreground mb-1">Próx. Cobrança</p>
          <p className="text-xl font-mono">{client.nextBilling}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-medium text-muted-foreground mb-1">Pagamento</p>
          <p className="text-sm font-medium mt-1">{client.paymentMethod}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground">Assinatura</p>
          <div className="flex items-center gap-1.5">
            {client.subscriptionStatus === "Ativa"
              ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              : client.subscriptionStatus === "Pausada"
              ? <PauseCircle className="w-3.5 h-3.5 text-amber-500" />
              : <XCircle className="w-3.5 h-3.5 text-muted-foreground" />}
            <span className="text-xs font-medium">{client.subscriptionStatus}</span>
          </div>
        </div>
        <div className="border border-border rounded-sm p-3 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Plano</span>
            <span className="font-medium">{client.plan}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Valor mensal</span>
            <span className="font-mono font-medium">{fmt(client.mrr)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Frequência</span>
            <span>Mensal</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground">Histórico de Faturas</p>
          <Button size="sm" variant="outline" className="rounded-sm h-7 text-xs px-3">
            <Plus className="w-3 h-3 mr-1.5" />Nova Cobrança
          </Button>
        </div>
        {client.invoices.length === 0 ? (
          <div className="border border-border rounded-sm p-6 text-center text-sm text-muted-foreground">Nenhuma fatura emitida</div>
        ) : (
          <div className="border border-border rounded-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-9 text-[10px] uppercase tracking-wider font-medium w-32">Nº Fatura</TableHead>
                  <TableHead className="h-9 text-[10px] uppercase tracking-wider font-medium">Descrição</TableHead>
                  <TableHead className="h-9 text-[10px] uppercase tracking-wider font-medium">Vencimento</TableHead>
                  <TableHead className="h-9 text-[10px] uppercase tracking-wider font-medium text-right">Valor</TableHead>
                  <TableHead className="h-9 text-[10px] uppercase tracking-wider font-medium text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {client.invoices.map((inv) => (
                  <TableRow key={inv.id} className="hover:bg-muted/30">
                    <TableCell className="py-2.5 text-xs font-mono text-muted-foreground">{inv.id}</TableCell>
                    <TableCell className="py-2.5 text-sm">{inv.desc}</TableCell>
                    <TableCell className="py-2.5 text-sm font-mono">{inv.due}</TableCell>
                    <TableCell className="py-2.5 text-sm font-mono font-medium text-right">{fmt(inv.value)}</TableCell>
                    <TableCell className="py-2.5 text-right">
                      <Badge variant={invoiceStatusConfig[inv.status].variant} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                        {inv.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductsTab({ client }: { client: Client }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground">Produtos & Serviços Contratados</p>
        <Button size="sm" variant="outline" className="rounded-sm h-7 text-xs px-3">
          <Plus className="w-3 h-3 mr-1.5" />Adicionar Produto
        </Button>
      </div>
      <div className="space-y-2">
        {client.products.map((p, i) => (
          <div key={i} className="border border-border rounded-sm p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center">
                <Package className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs font-mono text-muted-foreground mt-0.5">{p.sku} • {p.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-mono font-semibold">{fmt(p.price)}</p>
                <p className="text-xs text-muted-foreground">/{p.unit}</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={p.active} className="scale-90" />
                <span className="text-xs text-muted-foreground">{p.active ? "Ativo" : "Inativo"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between p-4 border border-border rounded-sm bg-muted/30">
        <span className="text-sm font-medium">Total mensal</span>
        <span className="text-lg font-mono font-semibold">{fmt(client.products.reduce((s, p) => s + (p.active ? p.price : 0), 0))}</span>
      </div>
    </div>
  );
}

function ContractTab({ client }: { client: Client }) {
  const alertExpiring = client.contractStatus === "Vencendo";
  return (
    <div className="space-y-4">
      {alertExpiring && (
        <div className="flex items-center gap-3 p-3 border border-destructive/30 bg-destructive/5 rounded-sm text-sm text-destructive">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Contrato vence em breve. Inicie a renovação para evitar interrupção.</span>
        </div>
      )}
      <div className="border border-border rounded-sm overflow-hidden">
        <div className="p-4 bg-muted/20 border-b border-border flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">{client.contractId}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Contrato de Prestação de Serviços</p>
          </div>
          <Badge variant={client.contractStatus === "Ativo" ? "default" : client.contractStatus === "Vencendo" ? "destructive" : "outline"}
            className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
            {client.contractStatus}
          </Badge>
        </div>
        <div className="p-4 space-y-3 text-sm">
          {[
            { label: "Cliente", value: client.name },
            { label: "Plano", value: client.plan },
            { label: "Valor Mensal", value: fmt(client.mrr) },
            { label: "Valor Anual", value: fmt(client.mrr * 12) },
            { label: "Término do Contrato", value: client.contractEnd },
            { label: "Responsável CS", value: client.responsible },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium font-mono">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="rounded-sm h-8 text-xs flex-1">
          <FileText className="w-3.5 h-3.5 mr-1.5" />Ver Documento
        </Button>
        <Button variant="outline" size="sm" className="rounded-sm h-8 text-xs flex-1">
          <ArrowUpRight className="w-3.5 h-3.5 mr-1.5" />Renovar Contrato
        </Button>
      </div>
    </div>
  );
}

function ProposalsTab({ client }: { client: Client }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground">Propostas</p>
        <Button size="sm" variant="outline" className="rounded-sm h-7 text-xs px-3">
          <Plus className="w-3 h-3 mr-1.5" />Nova Proposta
        </Button>
      </div>
      {client.proposals.length === 0 ? (
        <div className="border border-border rounded-sm p-8 text-center text-sm text-muted-foreground">
          Nenhuma proposta para este cliente
        </div>
      ) : (
        <div className="space-y-2">
          {client.proposals.map((p) => (
            <div key={p.id} className="border border-border rounded-sm p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">{p.id}</p>
                </div>
                <Badge variant={proposalStatusConfig[p.status].variant} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                  {p.status}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Valor</p>
                  <p className="font-mono font-semibold">{fmt(p.value)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Expira</p>
                  <p className="font-mono">{p.expiry}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Visualizações</p>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="font-mono">{p.views}x</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-sm h-7 text-xs">
                  <ExternalLink className="w-3 h-3 mr-1.5" />Ver Proposta
                </Button>
                {p.status !== "Aceita" && (
                  <Button variant="outline" size="sm" className="rounded-sm h-7 text-xs">
                    <Send className="w-3 h-3 mr-1.5" />Reenviar
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OnboardingTab({ client }: { client: Client }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground">Implantação</p>
        <Badge variant={client.onboardingStatus === "Concluído" ? "default" : "secondary"}
          className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
          {client.onboardingStatus}
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-mono text-muted-foreground mb-2">
            <span>Progresso</span>
            <span className="text-foreground">{client.onboardingProgress}%</span>
          </div>
          <Progress value={client.onboardingProgress} className="h-1.5" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {client.onboardingSteps.map((step, j) => {
          const Icon = stepIcons[step.status as keyof typeof stepIcons];
          return (
            <div key={j} className={`p-3 rounded-sm border flex flex-col justify-between min-h-[80px] ${stepColors[step.status as keyof typeof stepColors]}`}>
              <div className="flex justify-between items-start">
                <Icon className={`w-4 h-4 ${step.status === "current" ? "animate-pulse" : ""}`} />
                <span className="text-[10px] font-mono opacity-50">{j + 1}/{client.onboardingSteps.length}</span>
              </div>
              <p className={`text-xs font-medium leading-tight mt-2 ${step.status === "pending" ? "opacity-80" : ""}`}>
                {step.name}
              </p>
            </div>
          );
        })}
      </div>

      {client.onboardingStatus !== "Concluído" && (
        <Button variant="outline" size="sm" className="rounded-sm h-8 text-xs w-full">
          <ArrowUpRight className="w-3.5 h-3.5 mr-1.5" />Gerenciar Implantação
        </Button>
      )}
    </div>
  );
}

function PortalTab({ client }: { client: Client }) {
  const modules = [
    { key: "invoices", label: "Faturas", icon: CreditCard, desc: "Visualizar e baixar faturas" },
    { key: "plans", label: "Planos", icon: Zap, desc: "Ver e solicitar mudanças de plano" },
    { key: "tickets", label: "Suporte", icon: HelpIcon, desc: "Abrir e acompanhar tickets" },
    { key: "documents", label: "Documentos", icon: FileText, desc: "Acessar documentos e contratos" },
  ];

  return (
    <div className="space-y-5">
      <div className="border border-border rounded-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center">
            <Globe className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold">Acesso ao Portal do Cliente</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {client.portalAccess.enabled
                ? `Último acesso: ${client.portalAccess.lastLogin}`
                : "Acesso não habilitado"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={client.portalAccess.enabled} className="scale-90" />
          <span className="text-xs text-muted-foreground">{client.portalAccess.enabled ? "Habilitado" : "Desabilitado"}</span>
        </div>
      </div>

      {client.portalAccess.enabled && (
        <Button variant="outline" size="sm" className="rounded-sm h-8 text-xs w-full">
          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />Abrir Portal como este Cliente
        </Button>
      )}

      <div>
        <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground mb-3">Módulos de Acesso</p>
        <div className="space-y-2">
          {modules.map(({ key, label, icon: Icon, desc }) => {
            const enabled = client.portalAccess.modules[key as keyof typeof client.portalAccess.modules];
            return (
              <div key={key} className={`border rounded-sm p-3 flex items-center justify-between ${!client.portalAccess.enabled ? "opacity-40 pointer-events-none" : ""}`}>
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={enabled} className="scale-90" />
                  {enabled
                    ? <Lock className="w-3.5 h-3.5 text-emerald-500" />
                    : <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border border-border rounded-sm p-4 space-y-2">
        <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground mb-3">Link de Acesso</p>
        <div className="flex gap-2">
          <Input
            readOnly
            value={client.portalAccess.enabled ? `https://app.gestorpro.com.br/portal?c=${client.id}` : "—"}
            className="rounded-sm text-xs font-mono border-muted-foreground/20 bg-muted/30 h-8"
          />
          <Button variant="outline" size="sm" className="rounded-sm h-8 text-xs flex-shrink-0" disabled={!client.portalAccess.enabled}>
            <Send className="w-3 h-3 mr-1.5" />Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}

function HelpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" />
    </svg>
  );
}

export function ClientsPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number>(clients[0].id);
  const [activeTab, setActiveTab] = useState("Visão Geral");

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase()) ||
    c.segment.toLowerCase().includes(search.toLowerCase())
  );

  const selected = clients.find(c => c.id === selectedId) ?? clients[0];

  const handleSelect = (id: number) => {
    setSelectedId(id);
    setActiveTab("Visão Geral");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Clientes</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">
            {clients.filter(c => c.status === "Ativo").length} ativos · {clients.filter(c => c.inadimplente).length} inadimplentes · {clients.filter(c => c.contractStatus === "Vencendo").length} contrato vencendo
          </p>
        </div>
        <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Novo Cliente</Button>
      </div>

      <div className="flex gap-4 h-[calc(100vh-180px)] min-h-[500px]">
        <div className="w-72 flex-shrink-0 flex flex-col gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent h-8 text-sm"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 pr-0.5">
            {filtered.map(c => {
              const isActive = c.id === selectedId;
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelect(c.id)}
                  className={`w-full text-left p-3 rounded-sm border transition-all ${
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-muted-foreground/40 hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Avatar className="w-7 h-7 rounded-sm flex-shrink-0">
                      <AvatarFallback className={`text-[10px] font-bold rounded-sm ${isActive ? "bg-background/20 text-background" : "bg-muted text-foreground"}`}>
                        {initials(c.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold truncate ${isActive ? "text-background" : "text-foreground"}`}>{c.name}</p>
                      <p className={`text-[10px] truncate ${isActive ? "text-background/70" : "text-muted-foreground"}`}>{c.plan} · {c.segment}</p>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                      <span className={`text-[10px] font-mono ${isActive ? "text-background/80" : "text-muted-foreground"}`}>
                        {fmt(c.mrr)}
                      </span>
                      {c.inadimplente && !isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                      )}
                      {c.contractStatus === "Vencendo" && !c.inadimplente && !isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground">Nenhum cliente encontrado</div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col border border-border rounded-sm overflow-hidden min-w-0">
          <div className="flex-shrink-0 p-4 border-b border-border bg-muted/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="w-10 h-10 rounded-sm flex-shrink-0">
                <AvatarFallback className="rounded-sm bg-muted font-bold text-sm">{initials(selected.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold truncate">{selected.name}</h2>
                  <Badge variant={statusConfig[selected.status].badge} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 flex-shrink-0">
                    {selected.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{selected.contact} · {selected.email}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm flex-shrink-0">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>

          <div className="flex-shrink-0 flex border-b border-border overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === "Visão Geral" && <OverviewTab client={selected} />}
            {activeTab === "Assinatura & Cobrança" && <BillingTab client={selected} />}
            {activeTab === "Produtos" && <ProductsTab client={selected} />}
            {activeTab === "Contrato" && <ContractTab client={selected} />}
            {activeTab === "Propostas" && <ProposalsTab client={selected} />}
            {activeTab === "Onboarding" && <OnboardingTab client={selected} />}
            {activeTab === "Portal" && <PortalTab client={selected} />}
          </div>
        </div>
      </div>
    </div>
  );
}
