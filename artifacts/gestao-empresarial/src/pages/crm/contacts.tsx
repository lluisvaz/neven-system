import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, Upload, Download, Filter, LayoutList, Kanban, GripVertical } from "lucide-react";
import { Link } from "wouter";

type Stage = "Novo" | "Qualificação" | "Proposta" | "Negociação" | "Fechamento";

type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  countryCode: string;
  currency: string;
  stage: Stage;
  responsible: string;
  lastContact: string;
  value: string;
  paymentMethods: string[];
};

const leads: Lead[] = [
  { id: "1", name: "João Silva", company: "Tech Solutions Ltda", email: "joao@techsolutions.com.br", phone: "+55 11 99887-6655", country: "Brasil", countryCode: "🇧🇷", currency: "BRL", stage: "Proposta", responsible: "Maria Santos", lastContact: "12/04/2026", value: "R$ 15.000/mês", paymentMethods: ["PIX", "Cartão"] },
  { id: "2", name: "Ana Oliveira", company: "Nexus Digital", email: "ana@nexusdigital.com.br", phone: "+55 21 98765-4321", country: "Brasil", countryCode: "🇧🇷", currency: "BRL", stage: "Qualificação", responsible: "Carlos Lima", lastContact: "10/04/2026", value: "R$ 6.800/mês", paymentMethods: ["Boleto", "PIX"] },
  { id: "3", name: "Pedro Costa", company: "Innovare Consultoria", email: "pedro@innovare.com.br", phone: "+55 31 97654-3210", country: "Brasil", countryCode: "🇧🇷", currency: "BRL", stage: "Novo", responsible: "Maria Santos", lastContact: "08/04/2026", value: "R$ 3.200/mês", paymentMethods: ["Boleto"] },
  { id: "4", name: "Carlos Mendes", company: "Global Ventures LLC", email: "carlos@globalventures.com", phone: "+1 415 555-0123", country: "EUA", countryCode: "🇺🇸", currency: "USD", stage: "Negociação", responsible: "Rafael Mendes", lastContact: "14/04/2026", value: "$ 9.600/mês", paymentMethods: ["Credit Card", "Wire Transfer"] },
  { id: "5", name: "Sophie Leblanc", company: "Innov Paris SARL", email: "sophie@innovparis.fr", phone: "+33 6 12 34 56 78", country: "França", countryCode: "🇫🇷", currency: "EUR", stage: "Proposta", responsible: "Carlos Lima", lastContact: "11/04/2026", value: "€ 5.400/mês", paymentMethods: ["SEPA", "Cartão"] },
  { id: "6", name: "Ricardo Almeida", company: "DataFlow Sistemas", email: "ricardo@dataflow.com.br", phone: "+55 51 95432-1098", country: "Brasil", countryCode: "🇧🇷", currency: "BRL", stage: "Negociação", responsible: "Carlos Lima", lastContact: "01/04/2026", value: "R$ 9.600/mês", paymentMethods: ["PIX"] },
  { id: "7", name: "Marcos Ferreira", company: "LogiTech BR", email: "marcos@logitech.com.br", phone: "+55 21 93210-9876", country: "Brasil", countryCode: "🇧🇷", currency: "BRL", stage: "Novo", responsible: "Rafael Mendes", lastContact: "13/04/2026", value: "R$ 4.500/mês", paymentMethods: ["Boleto", "PIX"] },
  { id: "8", name: "Juliana Martins", company: "Saúde+ Clínicas", email: "juliana@saudemais.com.br", phone: "+55 31 92109-8765", country: "Brasil", countryCode: "🇧🇷", currency: "BRL", stage: "Qualificação", responsible: "Carlos Lima", lastContact: "11/04/2026", value: "R$ 12.000/mês", paymentMethods: ["PIX", "Cartão"] },
];

const stages: Stage[] = ["Novo", "Qualificação", "Proposta", "Negociação", "Fechamento"];

const stageColors: Record<Stage, string> = {
  "Novo": "bg-chart-5",
  "Qualificação": "bg-chart-4",
  "Proposta": "bg-chart-3",
  "Negociação": "bg-chart-2",
  "Fechamento": "bg-chart-1",
};

const stageBadgeVariant: Record<Stage, "default" | "secondary" | "outline"> = {
  "Novo": "outline",
  "Qualificação": "secondary",
  "Proposta": "secondary",
  "Negociação": "default",
  "Fechamento": "default",
};

export function ContactsPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "kanban">("list");

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.company.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase())
  );

  const byStage = (stage: Stage) => filtered.filter(l => l.stage === stage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">{leads.length} leads no pipeline</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-sm"><Upload className="w-3.5 h-3.5 mr-2" />Importar</Button>
          <Button variant="outline" size="sm" className="rounded-sm"><Download className="w-3.5 h-3.5 mr-2" />Exportar</Button>
          <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Novo Lead</Button>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, empresa ou e-mail..."
            className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
        <div className="flex items-center border border-border rounded-sm overflow-hidden ml-auto">
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 px-3 h-8 text-xs transition-colors ${view === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
          >
            <LayoutList className="w-3.5 h-3.5" />
            Lista
          </button>
          <button
            onClick={() => setView("kanban")}
            className={`flex items-center gap-1.5 px-3 h-8 text-xs transition-colors ${view === "kanban" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
          >
            <Kanban className="w-3.5 h-3.5" />
            Kanban
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div className="border border-border rounded-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Lead</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Contato</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">País / Moeda</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Etapa</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Valor</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Responsável</TableHead>
                <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Último Contato</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(lead => (
                <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/30 transition-colors">
                  <TableCell className="py-3">
                    <Link href={`/crm/contacts/${lead.id}`} className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 rounded-sm">
                        <AvatarFallback className="text-[10px] font-mono bg-secondary text-secondary-foreground rounded-sm">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm text-foreground hover:text-accent transition-colors">
                          {lead.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">{lead.company}</div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="text-sm">{lead.email}</div>
                    <div className="text-xs font-mono text-muted-foreground mt-0.5">{lead.phone}</div>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-1.5 text-sm">
                      <span>{lead.countryCode}</span>
                      <span>{lead.country}</span>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground mt-0.5">{lead.currency}</div>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge variant={stageBadgeVariant[lead.stage]} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                      {lead.stage}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 font-mono text-sm">{lead.value}</TableCell>
                  <TableCell className="py-3 text-sm text-muted-foreground">{lead.responsible}</TableCell>
                  <TableCell className="py-3 text-sm font-mono text-right text-muted-foreground">{lead.lastContact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex gap-5 overflow-x-auto pb-4 items-start min-h-[500px]">
          {stages.map(stage => {
            const stageLeads = byStage(stage);
            const totalValue = stageLeads.length;
            return (
              <div key={stage} className="w-[270px] flex-shrink-0 flex flex-col">
                <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-sm ${stageColors[stage]}`} />
                    <h3 className="text-xs font-medium uppercase tracking-wider">{stage}</h3>
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 rounded-sm">{totalValue}</span>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-2.5 overflow-y-auto no-scrollbar flex-1">
                  {stageLeads.length === 0 && (
                    <div className="border border-dashed border-border rounded-sm p-4 text-center text-xs text-muted-foreground">
                      Sem leads nesta etapa
                    </div>
                  )}
                  {stageLeads.map(lead => (
                    <Link key={lead.id} href={`/crm/contacts/${lead.id}`}>
                      <div className="group bg-card border border-border rounded-sm p-3.5 cursor-pointer hover:border-muted-foreground/40 transition-colors">
                        <div className="flex items-start gap-2">
                          <GripVertical className="w-3.5 h-3.5 text-muted-foreground/30 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="flex-1 min-w-0 space-y-2.5">
                            <div>
                              <p className="text-sm font-medium leading-tight truncate">{lead.name}</p>
                              <p className="text-xs text-muted-foreground mt-0.5 truncate">{lead.company}</p>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <span>{lead.countryCode}</span>
                              <span>{lead.phone}</span>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-border/50">
                              <span className="text-xs font-mono font-medium">{lead.value}</span>
                              <span className="text-[10px] font-mono text-muted-foreground">{lead.currency}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
