import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2, Users, Puzzle, Settings2, Shield, Plus, MoreHorizontal } from "lucide-react";
import { Link, useLocation } from "wouter";

const settingsNav = [
  { name: "Empresa", href: "/settings", icon: Building2 },
  { name: "Usuários", href: "/settings/users", icon: Users },
  { name: "Integrações", href: "/settings/integrations", icon: Puzzle },
  { name: "Campos Customizados", href: "/settings/custom-fields", icon: Settings2 },
  { name: "Auditoria", href: "/settings/audit", icon: Shield },
];

const users = [
  { id: 1, name: "Maria Santos", email: "maria@gestorpro.com.br", role: "Admin", department: "Diretoria", lastAccess: "15/04/2026", status: "Ativo" },
  { id: 2, name: "Carlos Lima", email: "carlos@gestorpro.com.br", role: "Vendedor", department: "Comercial", lastAccess: "15/04/2026", status: "Ativo" },
  { id: 3, name: "Rafael Mendes", email: "rafael@gestorpro.com.br", role: "Suporte / CS", department: "Suporte", lastAccess: "15/04/2026", status: "Ativo" },
  { id: 4, name: "Ana Clara", email: "ana.clara@gestorpro.com.br", role: "Gestor Comercial", department: "Comercial", lastAccess: "14/04/2026", status: "Ativo" },
  { id: 5, name: "Bruno Teixeira", email: "bruno@gestorpro.com.br", role: "Financeiro", department: "Financeiro", lastAccess: "15/04/2026", status: "Ativo" },
  { id: 6, name: "Daniela Freitas", email: "daniela@gestorpro.com.br", role: "Vendedor", department: "Comercial", lastAccess: "01/03/2026", status: "Inativo" },
];

const roleBadge: Record<string, "default" | "secondary" | "outline"> = { 
  Admin: "default", 
  "Gestor Comercial": "secondary", 
  Vendedor: "outline", 
  Financeiro: "secondary", 
  "Suporte / CS": "outline" 
};

export function SettingsUsersPage() {
  const [location] = useLocation();

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">Gerencie acessos e permissões</p>
        </div>
        <Button size="sm" className="rounded-sm"><Plus className="w-3.5 h-3.5 mr-2" />Convidar Usuário</Button>
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
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Usuário</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Perfil</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10">Departamento</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-right">Último Acesso</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 text-center">Status</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wider h-10 w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id} className={`hover:bg-muted/30 transition-colors ${u.status === "Inativo" ? "opacity-50" : ""}`}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 rounded-sm">
                      <AvatarFallback className="text-[10px] font-mono bg-secondary text-secondary-foreground rounded-sm">
                        {u.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <Badge variant={roleBadge[u.role] || "outline"} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-sm text-muted-foreground">{u.department}</TableCell>
                <TableCell className="py-3 text-right text-sm font-mono text-muted-foreground">{u.lastAccess}</TableCell>
                <TableCell className="py-3 text-center">
                  <Badge variant={u.status === "Ativo" ? "default" : "secondary"} className="rounded-sm font-mono text-[10px] uppercase tracking-wider px-2 py-0.5">
                    {u.status}
                  </Badge>
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
