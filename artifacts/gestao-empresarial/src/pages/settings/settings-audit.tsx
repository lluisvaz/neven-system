import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users, Puzzle, Shield, Download, Search } from "lucide-react";
import { Link, useLocation } from "wouter";

const settingsNav = [
  { name: "Empresa", href: "/settings", icon: Building2 },
  { name: "Usuários", href: "/settings/users", icon: Users },
  { name: "Integrações", href: "/settings/integrations", icon: Puzzle },
  { name: "Auditoria", href: "/settings/audit", icon: Shield },
];

const auditLogs = [
  { id: 1, date: "15/04/2026", time: "16:32:45", user: "Maria Santos", action: "Edição", module: "CRM", detail: "Contato 'João Silva' - status alterado: Prospect → Cliente Ativo", ip: "189.100.12.45" },
  { id: 2, date: "15/04/2026", time: "14:15:10", user: "Carlos Lima", action: "Criação", module: "CRM", detail: "Nova oportunidade 'Upgrade Tech Solutions' criada", ip: "189.100.12.45" },
  { id: 3, date: "15/04/2026", time: "11:00:05", user: "Rafael Mendes", action: "Edição", module: "Suporte", detail: "Ticket TKT-1042 - status alterado: Novo → Em andamento", ip: "200.150.88.12" },
  { id: 4, date: "15/04/2026", time: "10:32:00", user: "Sistema", action: "Sistema", module: "Faturamento", detail: "Cobrança FAT-2026-0041 - pagamento confirmado via Stripe webhook", ip: "Integração" },
  { id: 5, date: "14/04/2026", time: "18:30:22", user: "Ana Clara", action: "Exportação", module: "Relatórios", detail: "Relatório 'Performance de Vendedores' exportado em XLSX", ip: "177.200.45.67" },
  { id: 6, date: "14/04/2026", time: "16:00:15", user: "Bruno Teixeira", action: "Edição", module: "ERP", detail: "Conta a pagar NF-8834 - aprovação concedida", ip: "189.100.12.45" },
  { id: 7, date: "14/04/2026", time: "10:00:55", user: "Maria Santos", action: "Configuração", module: "Sistema", detail: "Template de e-mail 'Lembrete D-5' atualizado", ip: "189.100.12.45" },
  { id: 8, date: "13/04/2026", time: "09:00:12", user: "Maria Santos", action: "Login", module: "Auth", detail: "Sessão iniciada via formulário", ip: "189.100.12.45" },
];

const actionBadge: Record<string, "default" | "secondary" | "outline" | "destructive"> = { 
  Criação: "default", 
  Edição: "secondary", 
  Exclusão: "destructive", 
  Exportação: "outline", 
  Login: "outline", 
  Sistema: "secondary", 
  Configuração: "secondary" 
};

export function SettingsAuditPage() {
  const [location] = useLocation();

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">Registro de atividades para conformidade</p>
        </div>
      </div>

      <div className="flex gap-6 border-b border-border pb-px overflow-x-auto hide-scrollbar">
        {settingsNav.map(nav => {
          const isActive = location === nav.href;
          return (
            <Link key={nav.name} href={nav.href}>
              <div className={`flex items-center gap-2 pb-3 text-sm font-medium uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap
                ${isActive ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                <nav.icon className="w-4 h-4" />
                {nav.name}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar por usuário, ação ou detalhe..." className="pl-9 rounded-sm border-muted-foreground/20 focus-visible:ring-accent" data-testid="input-search-audit" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-40 rounded-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Ações</SelectItem>
            <SelectItem value="creation">Criação</SelectItem>
            <SelectItem value="edit">Edição</SelectItem>
            <SelectItem value="delete">Exclusão</SelectItem>
            <SelectItem value="export">Exportação</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="rounded-sm"><Download className="w-4 h-4 mr-2" />Exportar Log</Button>
      </div>

      <div className="border border-border rounded-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-32">Data / Hora</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Usuário / IP</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Ação / Módulo</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Detalhes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="py-3">
                  <div className="font-mono text-sm text-foreground">{log.date}</div>
                  <div className="font-mono text-xs text-muted-foreground mt-0.5">{log.time}</div>
                </TableCell>
                <TableCell className="py-3">
                  <div className="text-sm font-medium">{log.user}</div>
                  <div className="text-xs font-mono text-muted-foreground mt-0.5">{log.ip}</div>
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={actionBadge[log.action] || "outline"} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                      {log.action}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{log.module}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-sm text-muted-foreground max-w-md truncate">
                  {log.detail}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
