import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2, Users, Puzzle, Settings2, Shield, Plus, MoreHorizontal } from "lucide-react";
import { Link } from "wouter";

const settingsNav = [
  { name: "Empresa", href: "/settings", icon: Building2 },
  { name: "Usuários", href: "/settings/users", icon: Users },
  { name: "Integrações", href: "/settings/integrations", icon: Puzzle },
  { name: "Campos Customizados", href: "/settings/custom-fields", icon: Settings2 },
  { name: "Auditoria", href: "/settings/audit", icon: Shield },
];

const users = [
  { name: "Maria Santos", email: "maria@gestorpro.com.br", role: "Admin", department: "Diretoria", lastAccess: "15/04/2026 14:32", status: "Ativo" },
  { name: "Carlos Lima", email: "carlos@gestorpro.com.br", role: "Vendedor", department: "Comercial", lastAccess: "15/04/2026 10:15", status: "Ativo" },
  { name: "Rafael Mendes", email: "rafael@gestorpro.com.br", role: "Suporte / CS", department: "Suporte", lastAccess: "15/04/2026 16:00", status: "Ativo" },
  { name: "Ana Clara", email: "ana.clara@gestorpro.com.br", role: "Gestor Comercial", department: "Comercial", lastAccess: "14/04/2026 18:30", status: "Ativo" },
  { name: "Bruno Teixeira", email: "bruno@gestorpro.com.br", role: "Financeiro", department: "Financeiro", lastAccess: "15/04/2026 09:00", status: "Ativo" },
  { name: "Daniela Freitas", email: "daniela@gestorpro.com.br", role: "Vendedor", department: "Comercial", lastAccess: "01/03/2026 12:00", status: "Inativo" },
];

const roleBadge: Record<string, "default" | "secondary" | "outline"> = { Admin: "default", "Gestor Comercial": "secondary", Vendedor: "outline", Financeiro: "secondary", "Suporte / CS": "outline" };

export function SettingsUsersPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Configurações</h1><p className="text-muted-foreground mt-1">Gestão de usuários e permissões</p></div>

      <div className="flex gap-2 border-b pb-4">
        {settingsNav.map(nav => (
          <Link key={nav.name} href={nav.href}><Button variant={nav.href === "/settings/users" ? "default" : "ghost"} size="sm"><nav.icon className="w-4 h-4 mr-2" />{nav.name}</Button></Link>
        ))}
      </div>

      <div className="flex justify-end"><Button size="sm"><Plus className="w-4 h-4 mr-2" />Convidar Usuário</Button></div>

      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Usuário</TableHead><TableHead>Perfil</TableHead><TableHead>Departamento</TableHead><TableHead>Último Acesso</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>
            {users.map((u, i) => (
              <TableRow key={i} className={u.status === "Inativo" ? "opacity-50" : ""}>
                <TableCell><div className="flex items-center gap-3"><Avatar className="w-8 h-8"><AvatarFallback className="text-xs">{u.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar><div><p className="text-sm font-medium">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></div></div></TableCell>
                <TableCell><Badge variant={roleBadge[u.role] || "outline"} className="text-xs">{u.role}</Badge></TableCell>
                <TableCell className="text-sm">{u.department}</TableCell>
                <TableCell className="text-sm">{u.lastAccess}</TableCell>
                <TableCell><Badge variant={u.status === "Ativo" ? "default" : "destructive"}>{u.status}</Badge></TableCell>
                <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
