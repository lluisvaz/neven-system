import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, Puzzle, Settings2, Shield } from "lucide-react";
import { Link } from "wouter";

const settingsNav = [
  { name: "Empresa", href: "/settings", icon: Building2 },
  { name: "Usuários", href: "/settings/users", icon: Users },
  { name: "Integrações", href: "/settings/integrations", icon: Puzzle },
  { name: "Campos Customizados", href: "/settings/custom-fields", icon: Settings2 },
  { name: "Auditoria", href: "/settings/audit", icon: Shield },
];

export function SettingsCompanyPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Configurações</h1><p className="text-muted-foreground mt-1">Configurações gerais da plataforma</p></div>

      <div className="flex gap-2 border-b pb-4">
        {settingsNav.map(nav => (
          <Link key={nav.name} href={nav.href}><Button variant={nav.href === "/settings" ? "default" : "ghost"} size="sm"><nav.icon className="w-4 h-4 mr-2" />{nav.name}</Button></Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Dados da Empresa</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Nome da Empresa</Label><Input defaultValue="GestorPro Tecnologia Ltda" data-testid="input-company-name" /></div>
            <div className="space-y-2"><Label>CNPJ</Label><Input defaultValue="12.345.678/0001-90" /></div>
            <div className="space-y-2"><Label>Endereço</Label><Input defaultValue="Rua Augusta, 1500, Sala 301 - Consolação, São Paulo - SP" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>CEP</Label><Input defaultValue="01304-001" /></div>
              <div className="space-y-2"><Label>Telefone</Label><Input defaultValue="+55 11 3000-0000" /></div>
            </div>
            <Button size="sm">Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Personalização</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Logo da Empresa</Label><div className="flex items-center gap-4"><div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">Logo</div><Button variant="outline" size="sm">Upload</Button></div></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Cor Primária</Label><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-primary border" /><Input defaultValue="#1a1a2e" /></div></div>
              <div className="space-y-2"><Label>Cor Secundária</Label><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-blue-500 border" /><Input defaultValue="#0066ff" /></div></div>
            </div>
            <Separator />
            <div className="space-y-2"><Label>Domínio do Portal do Cliente</Label><Input defaultValue="cliente.gestorpro.com.br" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Fuso Horário</Label><Select defaultValue="brt"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="brt">Brasília (BRT -03:00)</SelectItem><SelectItem value="amt">Manaus (AMT -04:00)</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label>Moeda Padrão</Label><Select defaultValue="brl"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="brl">Real (BRL)</SelectItem><SelectItem value="usd">Dólar (USD)</SelectItem></SelectContent></Select></div>
            </div>
            <Button size="sm">Salvar</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
