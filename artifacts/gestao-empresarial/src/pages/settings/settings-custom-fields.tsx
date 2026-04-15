import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Building2, Users, Puzzle, Settings2, Shield, Plus, GripVertical } from "lucide-react";
import { Link } from "wouter";

const settingsNav = [
  { name: "Empresa", href: "/settings", icon: Building2 },
  { name: "Usuários", href: "/settings/users", icon: Users },
  { name: "Integrações", href: "/settings/integrations", icon: Puzzle },
  { name: "Campos Customizados", href: "/settings/custom-fields", icon: Settings2 },
  { name: "Auditoria", href: "/settings/audit", icon: Shield },
];

const customFields = [
  { name: "Setor de Atuação", entity: "Contatos", type: "Select", required: true, visible: true, group: "Dados Empresariais" },
  { name: "Faturamento Anual", entity: "Contas", type: "Moeda", required: false, visible: false, group: "Financeiro" },
  { name: "Número de Funcionários", entity: "Contas", type: "Número", required: false, visible: false, group: "Dados Empresariais" },
  { name: "LinkedIn", entity: "Contatos", type: "URL", required: false, visible: true, group: "Redes Sociais" },
  { name: "Data de Assinatura", entity: "Contratos", type: "Data", required: true, visible: true, group: "Contrato" },
  { name: "Origem da Indicação", entity: "Oportunidades", type: "Texto curto", required: false, visible: false, group: "Comercial" },
  { name: "NPS Individual", entity: "Contatos", type: "Número", required: false, visible: true, group: "Satisfação" },
];

export function SettingsCustomFieldsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Configurações</h1><p className="text-muted-foreground mt-1">Campos customizados do sistema</p></div>

      <div className="flex gap-2 border-b pb-4">
        {settingsNav.map(nav => (
          <Link key={nav.name} href={nav.href}><Button variant={nav.href === "/settings/custom-fields" ? "default" : "ghost"} size="sm"><nav.icon className="w-4 h-4 mr-2" />{nav.name}</Button></Link>
        ))}
      </div>

      <div className="flex justify-end"><Button size="sm"><Plus className="w-4 h-4 mr-2" />Novo Campo</Button></div>

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead className="w-8"></TableHead><TableHead>Nome</TableHead><TableHead>Entidade</TableHead><TableHead>Tipo</TableHead><TableHead>Grupo</TableHead><TableHead>Obrigatório</TableHead><TableHead>Visível para Cliente</TableHead></TableRow></TableHeader>
          <TableBody>
            {customFields.map((f, i) => (
              <TableRow key={i}>
                <TableCell><GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" /></TableCell>
                <TableCell className="font-medium text-sm">{f.name}</TableCell>
                <TableCell><Badge variant="outline" className="text-xs">{f.entity}</Badge></TableCell>
                <TableCell className="text-sm">{f.type}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{f.group}</TableCell>
                <TableCell><Switch checked={f.required} data-testid={`switch-required-${i}`} /></TableCell>
                <TableCell><Switch checked={f.visible} data-testid={`switch-visible-${i}`} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
