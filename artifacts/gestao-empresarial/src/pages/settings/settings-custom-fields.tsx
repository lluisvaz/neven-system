import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Building2, Users, Puzzle, Settings2, Shield, Plus, GripVertical, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";

const settingsNav = [
  { name: "Empresa", href: "/settings", icon: Building2 },
  { name: "Usuários", href: "/settings/users", icon: Users },
  { name: "Integrações", href: "/settings/integrations", icon: Puzzle },
  { name: "Campos Customizados", href: "/settings/custom-fields", icon: Settings2 },
  { name: "Auditoria", href: "/settings/audit", icon: Shield },
];

const customFields = [
  { id: 1, name: "Setor de Atuação", entity: "Contatos", type: "Select", required: true, visible: true, group: "Dados Empresariais" },
  { id: 2, name: "Faturamento Anual", entity: "Contas", type: "Moeda", required: false, visible: false, group: "Financeiro" },
  { id: 3, name: "Número de Funcionários", entity: "Contas", type: "Número", required: false, visible: false, group: "Dados Empresariais" },
  { id: 4, name: "LinkedIn", entity: "Contatos", type: "URL", required: false, visible: true, group: "Redes Sociais" },
  { id: 5, name: "Data de Assinatura", entity: "Contratos", type: "Data", required: true, visible: true, group: "Contrato" },
  { id: 6, name: "Origem da Indicação", entity: "Oportunidades", type: "Texto curto", required: false, visible: false, group: "Comercial" },
  { id: 7, name: "NPS Individual", entity: "Contatos", type: "Número", required: false, visible: true, group: "Satisfação" },
];

export function SettingsCustomFieldsPage() {
  const [location] = useLocation();

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">Personalize os dados de cada módulo</p>
        </div>
        <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Novo Campo</Button>
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

      <div className="border border-border rounded-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10"></TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Nome do Campo</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Entidade / Grupo</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Tipo</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-center">Obrigatório</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-center">No Portal</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customFields.map((f) => (
              <TableRow key={f.id} className="hover:bg-muted/30 transition-colors group">
                <TableCell className="py-3">
                  <div className="cursor-grab opacity-30 group-hover:opacity-100 transition-opacity flex justify-center">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell className="py-3 font-medium text-sm">{f.name}</TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                      {f.entity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{f.group}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-sm text-muted-foreground font-mono">{f.type}</TableCell>
                <TableCell className="py-3 text-center">
                  <div className="flex justify-center">
                    <Switch checked={f.required} data-testid={`switch-required-${f.id}`} />
                  </div>
                </TableCell>
                <TableCell className="py-3 text-center">
                  <div className="flex justify-center">
                    <Switch checked={f.visible} data-testid={`switch-visible-${f.id}`} />
                  </div>
                </TableCell>
                <TableCell className="py-3 text-right">
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"><Settings className="w-4 h-4 text-muted-foreground" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
