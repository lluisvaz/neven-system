import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search, Plus, AlertCircle, CheckCircle2, Clock, Circle, FileText,
  CreditCard, Package, ExternalLink, MoreHorizontal, Check, X, Send, Eye,
  PauseCircle, XCircle, ArrowUpRight, Building2, Mail, Phone, Globe,
  Lock, ChevronDown, Info,
} from "lucide-react";
import {
  COUNTRIES, GATEWAY_META, PORTAL_LANGUAGES, getCountry,
  type Gateway, type CountryConfig,
} from "@/lib/client-config";

const clients = [
  {
    id: 1, name: "Tech Solutions Ltda", contact: "João Silva",
    email: "joao@techsolutions.com.br", phone: "+55 (11) 98765-4321",
    segment: "Tecnologia", type: "PJ", document: "12.345.678/0001-90",
    country: "BR", currency: "BRL", locale: "pt-BR",
    gateway: "asaas" as Gateway, gatewayCustomerId: "cus_asaas_ts001",
    address: { street: "Av. Paulista, 1000", city: "São Paulo", state: "SP", zip: "01310-100" },
    plan: "Enterprise", status: "Ativo", mrr: 12000, aReceber: 12000, inadimplente: false,
    contractEnd: "31/12/2026", contractStatus: "Ativo", onboardingProgress: 75,
    onboardingStatus: "Em andamento", portalEnabled: true, proposalStatus: "Aceita",
    subscriptionStatus: "Ativa", nextBilling: "01/05/2026", paymentMethod: "Cartão •••• 4242",
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
    responsible: "Rafael Mendes", contractId: "CTR-26-001",
  },
  {
    id: 2, name: "Nexus Digital", contact: "Ana Lima",
    email: "ana@nexusdigital.com.br", phone: "+55 (21) 97654-3210",
    segment: "Marketing", type: "PJ", document: "98.765.432/0001-10",
    country: "BR", currency: "BRL", locale: "pt-BR",
    gateway: "asaas" as Gateway, gatewayCustomerId: "cus_asaas_nd002",
    address: { street: "Rua do Catete, 200", city: "Rio de Janeiro", state: "RJ", zip: "22220-000" },
    plan: "Pro", status: "Ativo", mrr: 5200, aReceber: 5200, inadimplente: false,
    contractEnd: "14/02/2027", contractStatus: "Ativo", onboardingProgress: 100,
    onboardingStatus: "Concluído", portalEnabled: true, proposalStatus: "Aceita",
    subscriptionStatus: "Ativa", nextBilling: "15/05/2026", paymentMethod: "Cartão •••• 1234",
    products: [
      { name: "GestorPro Pro", sku: "PRO-001", type: "Assinatura", price: 5200, unit: "mês", active: true },
    ],
    invoices: [
      { id: "NF-2026-038", desc: "Plano Pro", value: 5200, due: "15/04/2026", status: "Paga" },
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
    responsible: "Maria Santos", contractId: "CTR-26-008",
  },
  {
    id: 3, name: "Acme Corp", contact: "Michael Chen",
    email: "michael@acmecorp.com", phone: "+1 (415) 987-6543",
    segment: "Technology", type: "PJ", document: "82-1234567",
    country: "US", currency: "USD", locale: "en-US",
    gateway: "stripe" as Gateway, gatewayCustomerId: "cus_stripe_ac003",
    address: { street: "555 Market St", city: "San Francisco", state: "CA", zip: "94105" },
    plan: "Enterprise", status: "Ativo", mrr: 2400, aReceber: 2400, inadimplente: false,
    contractEnd: "01/01/2027", contractStatus: "Ativo", onboardingProgress: 100,
    onboardingStatus: "Concluído", portalEnabled: true, proposalStatus: "Aceita",
    subscriptionStatus: "Ativa", nextBilling: "01/05/2026", paymentMethod: "Card •••• 4242",
    products: [
      { name: "GestorPro Enterprise", sku: "ENT-001", type: "Subscription", price: 2400, unit: "mo", active: true },
    ],
    invoices: [
      { id: "INV-2026-039", desc: "Enterprise Plan", value: 2400, due: "01/04/2026", status: "Paga" },
      { id: "INV-2026-050", desc: "Enterprise Plan", value: 2400, due: "01/05/2026", status: "Pendente" },
    ],
    onboardingSteps: [
      { name: "Account setup", status: "done" },
      { name: "Data import", status: "done" },
      { name: "Team training", status: "done" },
      { name: "Go-live", status: "done" },
    ],
    proposals: [],
    portalAccess: { enabled: true, lastLogin: "13/04/2026", modules: { invoices: true, plans: true, tickets: true, documents: true } },
    responsible: "Maria Santos", contractId: "CTR-26-009",
  },
  {
    id: 4, name: "Innovare Consultoria", contact: "Carlos Souza",
    email: "carlos@innovare.com.br", phone: "+55 (31) 96543-2109",
    segment: "Consultoria", type: "PJ", document: "11.222.333/0001-44",
    country: "BR", currency: "BRL", locale: "pt-BR",
    gateway: "asaas" as Gateway, gatewayCustomerId: "cus_asaas_ic004",
    address: { street: "Rua Bahia, 50", city: "Belo Horizonte", state: "MG", zip: "30160-011" },
    plan: "Pro", status: "Atenção", mrr: 2100, aReceber: 6300, inadimplente: true,
    contractEnd: "30/04/2026", contractStatus: "Vencendo", onboardingProgress: 100,
    onboardingStatus: "Concluído", portalEnabled: false, proposalStatus: "Em negociação",
    subscriptionStatus: "Ativa", nextBilling: "30/04/2026", paymentMethod: "Boleto",
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
      { id: "PROP-041", name: "Renovação + Upgrade", value: 36000, expiry: "28/04/2026", status: "Em negociação", views: 8 },
    ],
    portalAccess: { enabled: false, lastLogin: "-", modules: { invoices: false, plans: false, tickets: false, documents: false } },
    responsible: "Rafael Mendes", contractId: "CTR-25-042",
  },
];

type Client = typeof clients[0];

const statusConfig: Record<string, { badge: "default" | "secondary" | "destructive" | "outline" }> = {
  Ativo: { badge: "default" },
  Atenção: { badge: "destructive" },
  Pendente: { badge: "outline" },
};

const stepIcons = { done: Check, current: Clock, pending: Circle };
const stepColors = {
  done: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/50",
  current: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800/50 ring-1 ring-amber-400",
  pending: "bg-muted/30 text-muted-foreground border-border opacity-50",
};

const invoiceStatusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline" }> = {
  Paga: { variant: "default" },
  Pendente: { variant: "secondary" },
  Vencida: { variant: "destructive" },
};

const proposalStatusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline" }> = {
  Aceita: { variant: "default" },
  Enviada: { variant: "secondary" },
  "Em negociação": { variant: "outline" },
  Recusada: { variant: "destructive" },
};

const tabs = ["Visão Geral", "Assinatura & Cobrança", "Produtos", "Contrato", "Propostas", "Onboarding", "Portal"];

function fmt(v: number, currency = "BRL", locale = "pt-BR") {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(v);
  } catch {
    return `${currency} ${v}`;
  }
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
}

function GatewayBadge({ gateway }: { gateway: Gateway }) {
  const meta = GATEWAY_META[gateway];
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium tracking-wide border ${meta.color} ${meta.bgColor} ${meta.borderColor}`}>
      {meta.label}
    </span>
  );
}

function OverviewTab({ client }: { client: Client }) {
  const country = getCountry(client.country);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "MRR", value: fmt(client.mrr, client.currency, client.locale), sub: client.subscriptionStatus, alert: false },
          { label: "A Receber", value: fmt(client.aReceber, client.currency, client.locale), sub: client.inadimplente ? "⚠ Inadimplente" : "Em dia", alert: client.inadimplente },
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
        <div className="border border-border rounded-sm p-4 space-y-2.5">
          <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground mb-3">Dados do Cliente</p>
          {[
            { icon: Building2, label: `${country.flag} ${client.country} · ${client.currency} · ${PORTAL_LANGUAGES[client.locale as keyof typeof PORTAL_LANGUAGES]}` },
            { icon: Mail, label: client.email },
            { icon: Phone, label: client.phone },
            { icon: Globe, label: `${client.address.city}, ${client.address.state}` },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-muted-foreground">Gateway:</span>
            <GatewayBadge gateway={client.gateway} />
            <span className="text-[10px] font-mono text-muted-foreground/60">{client.gatewayCustomerId}</span>
          </div>
        </div>

        <div className="border border-border rounded-sm p-4 space-y-2.5">
          <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground mb-3">Status Resumido</p>
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
                {ok ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <AlertCircle className="w-3.5 h-3.5 text-amber-500" />}
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
            <strong>Atenção:</strong> {client.invoices.filter(i => i.status === "Vencida").length} fatura(s) vencida(s) totalizando {fmt(client.aReceber, client.currency, client.locale)}.
          </span>
        </div>
      )}
    </div>
  );
}

function BillingTab({ client }: { client: Client }) {
  const country = getCountry(client.country);
  const gMeta = GATEWAY_META[client.gateway];
  return (
    <div className="space-y-6">
      <div className={`flex items-start gap-3 p-3 border rounded-sm ${gMeta.borderColor} ${gMeta.bgColor}`}>
        <Info className={`w-4 h-4 mt-0.5 flex-shrink-0 ${gMeta.color}`} />
        <div>
          <p className={`text-xs font-semibold ${gMeta.color}`}>Gateway: {gMeta.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{gMeta.description}</p>
          <p className="text-[10px] font-mono text-muted-foreground/70 mt-1">ID: {client.gatewayCustomerId}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-medium text-muted-foreground mb-1">MRR</p>
          <p className="text-xl font-mono">{fmt(client.mrr, client.currency, client.locale)}</p>
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
        <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground mb-2">Métodos disponíveis</p>
        <div className="flex flex-wrap gap-1.5">
          {country.paymentMethods.map(m => (
            <span key={m} className="px-2 py-0.5 text-[11px] border border-border rounded bg-muted/30 text-muted-foreground">{m}</span>
          ))}
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
                  <TableHead className="h-9 text-[10px] uppercase tracking-wider font-medium w-32">Nº</TableHead>
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
                    <TableCell className="py-2.5 text-sm font-mono font-medium text-right">{fmt(inv.value, client.currency, client.locale)}</TableCell>
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
        <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground">Produtos & Serviços</p>
        <Button size="sm" variant="outline" className="rounded-sm h-7 text-xs px-3">
          <Plus className="w-3 h-3 mr-1.5" />Adicionar
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
                <p className="text-xs font-mono text-muted-foreground">{p.sku} · {p.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-mono font-semibold">{fmt(p.price, client.currency, client.locale)}</p>
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
        <span className="text-lg font-mono font-semibold">{fmt(client.products.reduce((s, p) => s + (p.active ? p.price : 0), 0), client.currency, client.locale)}</span>
      </div>
    </div>
  );
}

function ContractTab({ client }: { client: Client }) {
  return (
    <div className="space-y-4">
      {client.contractStatus === "Vencendo" && (
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
            { label: "Valor Mensal", value: fmt(client.mrr, client.currency, client.locale) },
            { label: "Valor Anual", value: fmt(client.mrr * 12, client.currency, client.locale) },
            { label: "Término", value: client.contractEnd },
            { label: "CS Responsável", value: client.responsible },
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
          <ArrowUpRight className="w-3.5 h-3.5 mr-1.5" />Renovar
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
        <div className="border border-border rounded-sm p-8 text-center text-sm text-muted-foreground">Nenhuma proposta</div>
      ) : client.proposals.map((p) => (
        <div key={p.id} className="border border-border rounded-sm p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="text-xs font-mono text-muted-foreground">{p.id}</p>
            </div>
            <Badge variant={proposalStatusConfig[p.status].variant} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
              {p.status}
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Valor</p>
              <p className="font-mono font-semibold">{fmt(p.value, client.currency, client.locale)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Expira</p>
              <p className="font-mono">{p.expiry}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Views</p>
              <div className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-muted-foreground" /><span className="font-mono">{p.views}x</span></div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-sm h-7 text-xs"><ExternalLink className="w-3 h-3 mr-1.5" />Ver</Button>
            {p.status !== "Aceita" && <Button variant="outline" size="sm" className="rounded-sm h-7 text-xs"><Send className="w-3 h-3 mr-1.5" />Reenviar</Button>}
          </div>
        </div>
      ))}
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
            <span>Progresso</span><span className="text-foreground">{client.onboardingProgress}%</span>
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
              <p className="text-xs font-medium leading-tight mt-2">{step.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PortalTab({ client }: { client: Client }) {
  const portalModules = [
    { key: "invoices", label: "Faturas", icon: CreditCard, desc: "Visualizar e baixar faturas" },
    { key: "plans", label: "Planos", icon: Package, desc: "Ver e solicitar mudanças de plano" },
    { key: "tickets", label: "Suporte", icon: HelpIcon, desc: "Abrir e acompanhar tickets" },
    { key: "documents", label: "Documentos", icon: FileText, desc: "Acessar documentos e contratos" },
  ];
  return (
    <div className="space-y-5">
      <div className="border border-border rounded-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-semibold">Acesso ao Portal</p>
            <p className="text-xs text-muted-foreground">
              Idioma: {PORTAL_LANGUAGES[client.locale as keyof typeof PORTAL_LANGUAGES]} &nbsp;·&nbsp;
              {client.portalAccess.enabled ? `Último acesso: ${client.portalAccess.lastLogin}` : "Não habilitado"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={client.portalAccess.enabled} className="scale-90" />
          <span className="text-xs text-muted-foreground">{client.portalAccess.enabled ? "On" : "Off"}</span>
        </div>
      </div>
      {client.portalAccess.enabled && (
        <Button variant="outline" size="sm" className="rounded-sm h-8 text-xs w-full">
          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />Abrir Portal como este Cliente
        </Button>
      )}
      <div>
        <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground mb-3">Módulos</p>
        <div className="space-y-2">
          {portalModules.map(({ key, label, icon: Icon, desc }) => {
            const enabled = client.portalAccess.modules[key as keyof typeof client.portalAccess.modules];
            return (
              <div key={key} className={`border rounded-sm p-3 flex items-center justify-between ${!client.portalAccess.enabled ? "opacity-40 pointer-events-none" : ""}`}>
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={enabled} className="scale-90" />
                  <Lock className={`w-3.5 h-3.5 ${enabled ? "text-emerald-500" : "text-muted-foreground/40"}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border border-border rounded-sm p-4">
        <p className="text-xs uppercase tracking-widest font-medium text-muted-foreground mb-3">Link de Acesso</p>
        <div className="flex gap-2">
          <Input readOnly value={client.portalAccess.enabled ? `https://app.gestorpro.com.br/portal?c=${client.id}` : "—"}
            className="rounded-sm text-xs font-mono border-muted-foreground/20 bg-muted/30 h-8" />
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

interface NewClientForm {
  accountType: "PJ" | "PF";
  name: string;
  tradeName: string;
  document: string;
  countryCode: string;
  gateway: Gateway;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  portalLanguage: string;
  plan: string;
  mrr: string;
  contractMonths: string;
  responsible: string;
  notes: string;
}

const INITIAL_FORM: NewClientForm = {
  accountType: "PJ", name: "", tradeName: "", document: "",
  countryCode: "BR", gateway: "asaas",
  email: "", phone: "", website: "",
  address: "", city: "", state: "", zip: "",
  portalLanguage: "pt-BR",
  plan: "", mrr: "", contractMonths: "12", responsible: "", notes: "",
};

function NewClientSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<NewClientForm>(INITIAL_FORM);

  const country: CountryConfig = getCountry(form.countryCode);

  const set = (k: keyof NewClientForm, v: string) =>
    setForm(prev => ({ ...prev, [k]: v }));

  const handleCountryChange = (code: string) => {
    const c = getCountry(code);
    setForm(prev => ({
      ...prev,
      countryCode: code,
      gateway: c.defaultGateway,
      portalLanguage: c.locale,
      phone: c.phonePrefix + " ",
    }));
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-4">
      <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground border-b border-border pb-2">{title}</p>
      {children}
    </div>
  );

  const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground uppercase tracking-wider">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={v => !v && onClose()}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0" side="right">
        <SheetHeader className="px-6 py-4 border-b border-border sticky top-0 bg-background z-10">
          <SheetTitle className="text-base font-semibold">Novo Cliente</SheetTitle>
          <p className="text-xs text-muted-foreground">Preencha todas as informações para criar o cliente e configurar a cobrança.</p>
        </SheetHeader>

        <div className="px-6 py-6 space-y-8">
          <Section title="Tipo de Conta">
            <div className="grid grid-cols-2 gap-3">
              {(["PJ", "PF"] as const).map(t => (
                <button key={t} onClick={() => set("accountType", t)}
                  className={`p-3 border rounded-sm text-left transition-all ${form.accountType === t ? "border-foreground bg-foreground/5 font-semibold" : "border-border text-muted-foreground hover:border-muted-foreground/50"}`}>
                  <p className="text-sm font-medium">{t === "PJ" ? "Pessoa Jurídica" : "Pessoa Física"}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t === "PJ" ? "Empresa, LTDA, S.A., MEI" : "CPF, profissional autônomo"}</p>
                </button>
              ))}
            </div>
          </Section>

          <Section title="Localização & Moeda">
            <Field label="País" required>
              <Select value={form.countryCode} onValueChange={handleCountryChange}>
                <SelectTrigger className="rounded-sm h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map(c => (
                    <SelectItem key={c.code} value={c.code}>
                      <span className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                        <span className="text-muted-foreground text-xs">({c.currency})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <div className="grid grid-cols-3 gap-3 p-3 border border-border rounded-sm bg-muted/20">
              {[
                { label: "Moeda", value: `${country.currency} (${country.currencySymbol})` },
                { label: "Idioma do Portal", value: PORTAL_LANGUAGES[country.locale] },
                { label: "Fuso / Formato", value: country.locale },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
                  <p className="text-xs font-medium">{value}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Informações Básicas">
            <Field label={form.accountType === "PJ" ? "Razão Social" : "Nome Completo"} required>
              <Input value={form.name} onChange={e => set("name", e.target.value)}
                placeholder={form.accountType === "PJ" ? "Tech Solutions Ltda." : "João da Silva"}
                className="rounded-sm h-9" />
            </Field>
            {form.accountType === "PJ" && (
              <Field label="Nome Fantasia">
                <Input value={form.tradeName} onChange={e => set("tradeName", e.target.value)}
                  placeholder="Tech Solutions" className="rounded-sm h-9" />
              </Field>
            )}
            <div className="grid grid-cols-2 gap-3">
              <Field label={country.documentLabel} required>
                <Input value={form.document} onChange={e => set("document", e.target.value)}
                  placeholder={country.documentPlaceholder} className="rounded-sm h-9 font-mono" />
              </Field>
              <Field label="Segmento">
                <Select onValueChange={v => set("tradeName", v)}>
                  <SelectTrigger className="rounded-sm h-9"><SelectValue placeholder="Selecionar..." /></SelectTrigger>
                  <SelectContent>
                    {["Tecnologia", "Saúde", "Educação", "Varejo", "Consultoria", "Marketing", "Indústria", "Serviços", "Outro"].map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </Section>

          <Section title="Contato">
            <Field label="E-mail" required>
              <Input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                placeholder="contato@empresa.com" className="rounded-sm h-9" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={`Telefone (${country.phoneMask})`} required>
                <div className="flex">
                  <span className="flex items-center px-2.5 border border-r-0 border-border rounded-l-sm bg-muted/40 text-xs font-mono text-muted-foreground whitespace-nowrap">
                    {country.phonePrefix}
                  </span>
                  <Input value={form.phone} onChange={e => set("phone", e.target.value)}
                    placeholder={country.phonePlaceholder} className="rounded-l-none rounded-r-sm h-9 font-mono" />
                </div>
              </Field>
              <Field label="Website">
                <Input value={form.website} onChange={e => set("website", e.target.value)}
                  placeholder="https://empresa.com" className="rounded-sm h-9" />
              </Field>
            </div>
          </Section>

          <Section title="Endereço">
            <Field label="Logradouro">
              <Input value={form.address} onChange={e => set("address", e.target.value)}
                placeholder="Rua / Av. / Street" className="rounded-sm h-9" />
            </Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Cidade">
                <Input value={form.city} onChange={e => set("city", e.target.value)}
                  placeholder="São Paulo" className="rounded-sm h-9" />
              </Field>
              <Field label={country.stateLabel}>
                <Input value={form.state} onChange={e => set("state", e.target.value)}
                  placeholder="SP" className="rounded-sm h-9" />
              </Field>
              <Field label={country.zipLabel}>
                <Input value={form.zip} onChange={e => set("zip", e.target.value)}
                  placeholder={country.zipPlaceholder} className="rounded-sm h-9 font-mono" />
              </Field>
            </div>
          </Section>

          <Section title="Gateway de Pagamento">
            <p className="text-xs text-muted-foreground -mt-2">
              Defina como as cobranças serão processadas para este cliente.
              {country.code !== "BR" && <span className="text-amber-600 dark:text-amber-400"> · Asaas disponível apenas para clientes no Brasil.</span>}
            </p>
            <div className="space-y-2">
              {(["stripe", "asaas"] as Gateway[]).map(gw => {
                const meta = GATEWAY_META[gw];
                const available = country.gateways.includes(gw);
                return (
                  <label key={gw} className={`flex items-start gap-4 p-4 border rounded-sm transition-all ${
                    !available ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                  } ${form.gateway === gw && available ? `${meta.borderColor} ${meta.bgColor}` : "border-border hover:bg-muted/20"}`}>
                    <input type="radio" name="gateway" value={gw} checked={form.gateway === gw}
                      disabled={!available}
                      onChange={() => available && set("gateway", gw)}
                      className="mt-0.5 accent-current" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${meta.color}`}>{meta.label}</span>
                        {!available && <span className="text-[10px] text-muted-foreground">(indisponível para {country.name})</span>}
                        {form.gateway === gw && available && <span className="text-[10px] text-muted-foreground">· selecionado</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{meta.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {country.paymentMethods.filter((_, i) => gw === "stripe" ? i < 3 : true).map(m => (
                          <span key={m} className={`text-[10px] px-1.5 py-0.5 rounded border ${meta.borderColor} ${meta.bgColor} ${meta.color}`}>{m}</span>
                        ))}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </Section>

          <Section title="Plano & Contrato">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Plano / Produto" required>
                <Select onValueChange={v => set("plan", v)}>
                  <SelectTrigger className="rounded-sm h-9"><SelectValue placeholder="Selecionar..." /></SelectTrigger>
                  <SelectContent>
                    {["Básico", "Pro", "Pro + API", "Enterprise"].map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label={`Valor Mensal (${country.currency})`} required>
                <div className="flex">
                  <span className="flex items-center px-2.5 border border-r-0 border-border rounded-l-sm bg-muted/40 text-xs font-mono text-muted-foreground">
                    {country.currencySymbol}
                  </span>
                  <Input value={form.mrr} onChange={e => set("mrr", e.target.value)}
                    placeholder="0,00" className="rounded-l-none rounded-r-sm h-9 font-mono text-right" />
                </div>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Duração do Contrato">
                <Select value={form.contractMonths} onValueChange={v => set("contractMonths", v)}>
                  <SelectTrigger className="rounded-sm h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Mensal (sem fidelidade)</SelectItem>
                    <SelectItem value="3">Trimestral (3 meses)</SelectItem>
                    <SelectItem value="6">Semestral (6 meses)</SelectItem>
                    <SelectItem value="12">Anual (12 meses)</SelectItem>
                    <SelectItem value="24">Bienal (24 meses)</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="CS Responsável">
                <Select onValueChange={v => set("responsible", v)}>
                  <SelectTrigger className="rounded-sm h-9"><SelectValue placeholder="Selecionar..." /></SelectTrigger>
                  <SelectContent>
                    {["Rafael Mendes", "Maria Santos", "Ana Costa"].map(r => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </Section>

          <Section title="Observações Internas">
            <Textarea value={form.notes} onChange={e => set("notes", e.target.value)}
              placeholder="Contexto do deal, necessidades especiais, histórico de negociação..."
              className="rounded-sm min-h-[80px] text-sm" />
          </Section>
        </div>

        <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              {country.flag} {country.name}
            </span>
            <span>·</span>
            <GatewayBadge gateway={form.gateway} />
            <span>·</span>
            <span>{country.currency}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-sm" onClick={onClose}>Cancelar</Button>
            <Button size="sm" className="rounded-sm px-6">Criar Cliente</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function ClientsPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number>(clients[0].id);
  const [activeTab, setActiveTab] = useState("Visão Geral");
  const [showNewClient, setShowNewClient] = useState(false);

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase())
  );

  const selected = clients.find(c => c.id === selectedId) ?? clients[0];

  return (
    <>
      <NewClientSheet open={showNewClient} onClose={() => setShowNewClient(false)} />

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Clientes</h1>
            <p className="text-sm font-mono text-muted-foreground mt-1">
              {clients.filter(c => c.status === "Ativo").length} ativos ·{" "}
              {clients.filter(c => c.inadimplente).length} inadimplentes ·{" "}
              {clients.filter(c => c.contractStatus === "Vencendo").length} contrato vencendo
            </p>
          </div>
          <Button size="sm" className="rounded-sm" onClick={() => setShowNewClient(true)}>
            <Plus className="w-3.5 h-3.5 mr-2" />Novo Cliente
          </Button>
        </div>

        <div className="flex gap-4 h-[calc(100vh-180px)] min-h-[500px]">
          <div className="w-72 flex-shrink-0 flex flex-col gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar cliente..." value={search} onChange={e => setSearch(e.target.value)}
                className="pl-9 rounded-sm border-muted-foreground/20 h-8 text-sm" />
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 pr-0.5">
              {filtered.map(c => {
                const isActive = c.id === selectedId;
                const country = getCountry(c.country);
                return (
                  <button key={c.id} onClick={() => { setSelectedId(c.id); setActiveTab("Visão Geral"); }}
                    className={`w-full text-left p-3 rounded-sm border transition-all ${isActive ? "border-foreground bg-foreground text-background" : "border-border hover:border-muted-foreground/40 hover:bg-muted/30"}`}>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="w-7 h-7 rounded-sm flex-shrink-0">
                        <AvatarFallback className={`text-[10px] font-bold rounded-sm ${isActive ? "bg-background/20 text-background" : "bg-muted text-foreground"}`}>
                          {initials(c.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold truncate ${isActive ? "text-background" : "text-foreground"}`}>{c.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[10px]">{country.flag}</span>
                          <span className={`text-[10px] truncate ${isActive ? "text-background/70" : "text-muted-foreground"}`}>{c.plan} · {country.currency}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className={`text-[10px] font-mono ${isActive ? "text-background/80" : "text-muted-foreground"}`}>
                          {fmt(c.mrr, c.currency, c.locale)}
                        </span>
                        {!isActive && (
                          <span className={`text-[9px] font-mono ${GATEWAY_META[c.gateway].color}`}>{GATEWAY_META[c.gateway].label}</span>
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
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-semibold truncate">{selected.name}</h2>
                    <Badge variant={statusConfig[selected.status].badge} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                      {selected.status}
                    </Badge>
                    <GatewayBadge gateway={selected.gateway} />
                    <span className="text-xs text-muted-foreground">{getCountry(selected.country).flag} {selected.currency}</span>
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
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
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
    </>
  );
}
