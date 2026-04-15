import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users, Puzzle, Settings2, Shield, Download, Search } from "lucide-react";
import { Link } from "wouter";

const settingsNav = [
  { name: "Empresa", href: "/settings", icon: Building2 },
  { name: "Usuários", href: "/settings/users", icon: Users },
  { name: "Integrações", href: "/settings/integrations", icon: Puzzle },
  { name: "Campos Customizados", href: "/settings/custom-fields", icon: Settings2 },
  { name: "Auditoria", href: "/settings/audit", icon: Shield },
];

const auditLogs = [
  { date: "15/04/2026 16:32", user: "Maria Santos", action: "Edição", module: "CRM", detail: "Contato 'João Silva' - status alterado: Prospect → Cliente Ativo", ip: "189.100.xxx.xxx" },
  { date: "15/04/2026 14:15", user: "Carlos Lima", action: "Criação", module: "CRM", detail: "Nova oportunidade 'Upgrade Tech Solutions' criada", ip: "189.100.xxx.xxx" },
  { date: "15/04/2026 11:00", user: "Rafael Mendes", action: "Edição", module: "Suporte", detail: "Ticket TKT-1042 - status alterado: Novo → Em andamento", ip: "200.150.xxx.xxx" },
  { date: "15/04/2026 10:32", user: "Sistema", action: "Automação", module: "Faturamento", detail: "Cobrança FAT-2026-0041 - pagamento confirmado via Stripe webhook", ip: "N/A" },
  { date: "14/04/2026 18:30", user: "Ana Clara", action: "Exportação", module: "Relatórios", detail: "Relatório 'Performance de Vendedores' exportado em XLSX", ip: "177.200.xxx.xxx" },
  { date: "14/04/2026 16:00", user: "Bruno Teixeira", action: "Edição", module: "ERP", detail: "Conta a pagar NF-8834 - aprovação concedida", ip: "189.100.xxx.xxx" },
  { date: "14/04/2026 10:00", user: "Maria Santos", action: "Configuração", module: "Sistema", detail: "Template de e-mail 'Lembrete D-5' atualizado", ip: "189.100.xxx.xxx" },
  { date: "13/04/2026 09:00", user: "Maria Santos", action: "Login", module: "Auth", detail: "Login bem-sucedido", ip: "189.100.xxx.xxx" },
];

const actionBadge: Record<string, "default" | "secondary" | "outline" | "destructive"> = { Criação: "default", Edição: "secondary", Exclusão: "destructive", Exportação: "outline", Login: "outline", Automação: "secondary", Configuração: "secondary" };

export function SettingsAuditPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Configurações</h1><p className="text-muted-foreground mt-1">Log de auditoria do sistema</p></div>

      <div className="flex gap-2 border-b pb-4">
        {settingsNav.map(nav => (
          <Link key={nav.name} href={nav.href}><Button variant={nav.href === "/settings/audit" ? "default" : "ghost"} size="sm"><nav.icon className="w-4 h-4 mr-2" />{nav.name}</Button></Link>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Buscar no log..." className="pl-9" data-testid="input-search-audit" /></div>
        <Select defaultValue="all"><SelectTrigger className="w-36"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem><SelectItem value="creation">Criação</SelectItem><SelectItem value="edit">Edição</SelectItem><SelectItem value="delete">Exclusão</SelectItem><SelectItem value="export">Exportação</SelectItem></SelectContent></Select>
        <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Exportar CSV</Button>
      </div>

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Data/Hora</TableHead><TableHead>Usuário</TableHead><TableHead>Ação</TableHead><TableHead>Módulo</TableHead><TableHead>Detalhe</TableHead><TableHead>IP</TableHead></TableRow></TableHeader>
          <TableBody>
            {auditLogs.map((log, i) => (
              <TableRow key={i}>
                <TableCell className="text-xs font-mono whitespace-nowrap">{log.date}</TableCell>
                <TableCell className="text-sm">{log.user}</TableCell>
                <TableCell><Badge variant={actionBadge[log.action] || "outline"} className="text-xs">{log.action}</Badge></TableCell>
                <TableCell><Badge variant="outline" className="text-xs">{log.module}</Badge></TableCell>
                <TableCell className="text-xs text-muted-foreground max-w-[300px] truncate">{log.detail}</TableCell>
                <TableCell className="text-xs font-mono">{log.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
